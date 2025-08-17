import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Marque from '../Components/Marque';
import { PaystackButton } from 'react-paystack';
import emailjs from '@emailjs/browser';

function BookFlight() {


  function parseDuration(isoDuration) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return isoDuration;
  const hours = match[1] || 0;
  const minutes = match[2] || 0;
  return `${hours}h ${minutes}m`;
  }
  
  const location = useLocation();
  const flight = location.state?.flight;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    seatClass: 'Economy',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const publicKey = import.meta.env.VITE_PAYSTACK_KEY;

  // EUR → NGN conversion
  const EUR_TO_NGN = 1789.40; // Adjust with current rate if needed

  const getAmount = () => {
    if (!flight?.price) return 12000000; // fallback in kobo
    let priceInNGN = Number(flight.price) * EUR_TO_NGN * 100; // kobo
    switch (form.seatClass) {
      case 'Business':
        return Math.round(priceInNGN * 1.5);
      case 'First':
        return Math.round(priceInNGN * 2);
      default:
        return Math.round(priceInNGN);
    }
  };

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: form.email,
    amount: getAmount(),
    publicKey,
    metadata: { full_name: form.fullName, phone: form.phone, gender: form.gender, seat_class: form.seatClass },
    onSuccess: () => handleConfirm(),
    onClose: () => alert('Transaction closed. Booking not completed.'),
  };

  if (!flight) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">No flight selected. Please go back and choose a flight.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleConfirm = () => {
    if (!form.fullName || !form.email || !form.phone || !form.gender) {
      setError('Please fill out all fields before confirming!');
      return;
    }

    setLoading(true);
    setBookingConfirmed(false);

    const departureDateTime = new Date(flight.departure.at);

    const templateParams = {
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      gender: form.gender,
      seat_class: form.seatClass,
      price: `${flight.price} ${flight.currency} (~₦${Math.round(flight.price * EUR_TO_NGN).toLocaleString()})`,
      airline: flight.airline,
      flight_number: flight.flightNumber || 'N/A',
      from: `${flight.departure.iataCode} (${flight.departure.terminal || ''})`,
      to: `${flight.arrival.iataCode} (${flight.arrival.terminal || ''})`,
      date: departureDateTime.toLocaleDateString(),
      time: departureDateTime.toLocaleTimeString(),
    };

    emailjs
      .send('service_a6hjkhb', 'template_58i0o7p', templateParams, 'ceTU-oX8VYVv9Tgs6')
      .then(() => {
        setLoading(false);
        setBookingConfirmed(true);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        setError('Failed to send confirmation email. Please try again.');
      });
  };

  return (
    <div className="bg-gray-100">
      <Marque />
      <Header />
      <div className="max-w-4xl mx-[1rem] md:mx-auto p-6 mt-10 bg-white rounded-xl shadow-md my-[7rem] flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900">Flight Summary</h1>

        {/* Flight Details */}
        <div className="grid gap-2 text-gray-800 mb-8">
          <p><strong>Airline:</strong> {flight.airline}</p>
          <p><strong>Flight Number:</strong> {flight.flightNumber || 'N/A'}</p>
          <p><strong>From:</strong> {flight.departure.iataCode} ({flight.departure.terminal || 'N/A'})</p>
          <p><strong>To:</strong> {flight.arrival.iataCode} ({flight.arrival.terminal || 'N/A'})</p>
          <p><strong>Departure:</strong> {new Date(flight.departure.at).toLocaleString()}</p>
          <p><strong>Duration:</strong> {parseDuration(flight.duration)}</p>
          <p><strong>Stops:</strong> {flight.stops}</p>
          <p><strong>Price:</strong> {flight.price} {flight.currency} (~₦{Math.round(flight.price * EUR_TO_NGN).toLocaleString()})</p>
        </div>

        {/* Passenger Form */}
        <div className="grid gap-4 md:grid-cols-2">
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-2 py-2 text-[.9rem] w-full transition duration-300" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-2 py-2 text-[.9rem] w-full transition duration-300" />
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-2 py-2 text-[.9rem] w-full transition duration-300" />
          <select name="gender" value={form.gender} onChange={handleChange} className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-2 py-2 text-[.9rem] w-full transition duration-300">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        {/* Seat Class */}
        <div className="mt-6">
          <label className="block mb-2 font-medium">Seat Class:</label>
          <select name="seatClass" value={form.seatClass} onChange={handleChange} className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-2 py-2 text-[.9rem] w-full transition duration-300">
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First Class</option>
          </select>
        </div>

        {/* Pay & Confirm Button */}
        <div className="mt-6">
          {!loading ? (
            <PaystackButton {...paystackConfig} text="Pay & Confirm Booking" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg w-full cursor-pointer transition duration-300" />
          ) : (
            <div className="flex justify-center items-center gap-2">
              <div className="w-6 h-6 border-4 border-t-transparent border-amber-500 rounded-full animate-spin"></div>
              <span className="text-amber-600 font-medium">Processing booking...</span>
            </div>
          )}
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {bookingConfirmed && !loading && <div className="mt-4 text-green-600 font-semibold text-center">✅ Booking confirmed! A confirmation email has been sent.</div>}
      </div>
      <Footer />
    </div>
  );
}

export default BookFlight;
