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

    // Map response to simplified object for React
    const simplified = (response.data || []).map(flight => {
      const itinerary = flight.itineraries[0]; // outbound
      const outboundSegment = itinerary.segments[0];

      // Flight number
      const flightNumber = outboundSegment.number || "Unknown";

      // Airline name from map
      const airlineName = airlineMap[outboundSegment.carrierCode] || outboundSegment.carrierCode;

      return {
        airline: airlineName,
        flightNumber,
        stops: itinerary.segments.length - 1,
        departure: itinerary.segments[0].departure,
        arrival: itinerary.segments[itinerary.segments.length - 1].arrival,
        duration: itinerary.duration,
        price: flight.price.total,
        currency: flight.price.currency,
        returnItinerary: flight.itineraries[1] || null,
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
