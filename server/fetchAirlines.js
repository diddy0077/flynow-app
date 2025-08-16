// fetchAirlines.js
import fs from 'fs';
import Amadeus from 'amadeus';
import dotenv from 'dotenv';

dotenv.config();

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

async function fetchAndSaveAirlines() {
  try {
    const response = await amadeus.referenceData.airlines.get();
    fs.writeFileSync('airlines.json', JSON.stringify(response.data, null, 2));
    console.log('Airline list saved to airlines.json');
  } catch (err) {
    console.error('Error fetching airlines:', err);
  }
}

fetchAndSaveAirlines();
