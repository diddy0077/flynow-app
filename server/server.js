import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Amadeus from "amadeus";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load airline data
const airlinesPath = path.resolve('./airlines.json');
const airlinesRaw = fs.readFileSync(airlinesPath, 'utf-8');
const airlinesArray = JSON.parse(airlinesRaw);

// Build a map: { "LQ": "LANMEI AIRLINES", ... }
const airlineMap = {};
airlinesArray.forEach(a => {
  airlineMap[a.iataCode] = a.commonName || a.businessName || "Unknown Airline";
});

// Load airport data
const airportsPath = path.resolve('./airports.json');
const airportsRaw = fs.readFileSync(airportsPath, 'utf-8');
const airportsArray = JSON.parse(airportsRaw);

// Build a map: { "LOS": { city: "Lagos", name: "Murtala Muhammed Intl" }, ... }
const airportMap = {};
airportsArray.forEach(a => {
  airportMap[a.iataCode] = { city: a.city, name: a.name };
});

// Amadeus setup
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

app.get("/search-flights", async (req, res) => {
  const { origin, destination, departureDate, returnDate, adults = "1" } = req.query;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({ error: "origin, destination, and departureDate are required" });
  }

  const params = {
    originLocationCode: origin.toUpperCase(),
    destinationLocationCode: destination.toUpperCase(),
    departureDate,
    adults: Number(adults),
  };
  if (returnDate) params.returnDate = returnDate;

  try {
    const response = await amadeus.shopping.flightOffersSearch.get(params);

    const simplified = (response.data || []).map(flight => {
      const itinerary = flight.itineraries[0]; // outbound
      const outboundSegment = itinerary.segments[0];
      const arrivalSegment = itinerary.segments[itinerary.segments.length - 1];

      const flightNumber = outboundSegment.number || "Unknown";
      const airlineName = airlineMap[outboundSegment.carrierCode] || outboundSegment.carrierCode;

      // Enrich departure and arrival with city & name
      const departureInfo = {
        ...outboundSegment.departure,
        city: airportMap[outboundSegment.departure.iataCode]?.city || null,
        name: airportMap[outboundSegment.departure.iataCode]?.name || null,
      };

      const arrivalInfo = {
        ...arrivalSegment.arrival,
        city: airportMap[arrivalSegment.arrival.iataCode]?.city || null,
        name: airportMap[arrivalSegment.arrival.iataCode]?.name || null,
      };

      // Enrich return itinerary if exists
      let returnItinerary = null;
      if (flight.itineraries[1]) {
        const retItin = flight.itineraries[1];
        returnItinerary = {
          ...retItin,
          segments: retItin.segments.map(seg => ({
            ...seg,
            departure: {
              ...seg.departure,
              city: airportMap[seg.departure.iataCode]?.city || null,
              name: airportMap[seg.departure.iataCode]?.name || null,
            },
            arrival: {
              ...seg.arrival,
              city: airportMap[seg.arrival.iataCode]?.city || null,
              name: airportMap[seg.arrival.iataCode]?.name || null,
            },
          })),
        };
      }

      return {
        airline: airlineName,
        flightNumber,
        stops: itinerary.segments.length - 1,
        departure: departureInfo,
        arrival: arrivalInfo,
        duration: itinerary.duration,
        price: flight.price.total,
        currency: flight.price.currency,
        seatsLeft: flight.numberOfBookableSeats,
        returnItinerary,
      };
    });

    res.json(simplified);
  } catch (err) {
    console.error("Amadeus API error:", err.response?.body || err);
    res.status(500).json({ error: err.response?.body?.error?.message || err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
