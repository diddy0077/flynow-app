import React, { useState, useEffect } from "react";
import hotelsData from "../data/hotels.js";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { FaHotel } from "react-icons/fa";
import Marque from "../Components/Marque";
import HotelComponent from "../Components/HotelComponent.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hotels() {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(500);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10;

  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setHotels(hotelsData);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // reset to first page on new search
  };

 const filteredHotels = hotels.filter((hotel) => {
  const matchesCity =
    search.trim() === "" ||
    hotel.city.toLowerCase().includes(search.toLowerCase());

  const matchesPrice =
    price !== "" && !isNaN(price) && hotel.price <= Number(price);

  const matchesRating =
    rating !== "" && !isNaN(rating) && hotel.rating >= Number(rating);

  return matchesCity && matchesPrice && matchesRating;
});


 
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Marquee */}
      <div className="md:hidden">
        <Marque />
      </div>
      <Header />
      <div className="hidden md:block">
        <Marque />
      </div>

      {/* HERO SECTION */}
      <section
        className="relative bg-indigo-900 text-white overflow-hidden"
        data-aos="fade-in"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501117716987-c8e1ecb210d5?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Floating Icon */}
        <div className="absolute top-10 right-10 animate-bounce-slow z-10">
          <FaHotel className="text-amber-400 text-6xl opacity-80 drop-shadow-lg" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect <span className="text-amber-400">Stay</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Explore top-rated hotels and unique places to stay around the world
            — tailored just for you.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 max-w-3xl mx-auto"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Where are you going?"
              className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-900"
            />
            <input
              name="checkIn"
              value={dates.checkIn}
              onChange={(e) =>
                setDates((prev) => ({ ...prev, checkIn: e.target.value }))
              }
              type="date"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-900"
            />
            <input
              name="checkOut"
              value={dates.checkOut}
              onChange={(e) =>
                setDates((prev) => ({ ...prev, checkOut: e.target.value }))
              }
              type="date"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-900"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-indigo-900 font-semibold px-6 py-2 rounded transition duration-300 cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        <style>{`
          .animate-bounce-slow {
            animation: bounce 3s infinite;
          }
        `}</style>
      </section>

      <svg
        className="fill-indigo-900"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
      >
        <path d="M0 0v80l227.5 18c12.1 1 22.5-8.6 22.5-20.7s10.4-21.8 22.5-20.8l205 16.3c12.1 1 22.5-8.6 22.5-20.8s10.4-21.7 22.5-20.8l205 16.3c12.1 1 22.5-8.6 22.5-20.8S760.4 5 772.5 6L1000 24V0H0Z"></path>
      </svg>

      {/* FILTERS */}
      <section className="max-w-6xl mx-auto px-4 py-10 fade-up">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Find Hotels</h2>

        <div className="grid gap-4 md:grid-cols-3 bg-white p-4 rounded-lg shadow-md mb-8">
          <input
            type="text"
            placeholder="Search by city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Price: ${price}
            </label>
            <input
              type="range"
              min="50"
              max="500"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Rating: {rating}⭐
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-indigo-900 font-medium">
              Loading hotels...
            </span>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {currentHotels.length > 0 ? (
              currentHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-indigo-900">
                      {hotel.name}
                    </h3>
                    <p className="text-gray-500">{hotel.city}</p>
                    <p className="mt-2 text-amber-400 font-bold">
                      ${hotel.price}/night
                    </p>
                    <p className="text-sm text-gray-500">⭐ {hotel.rating}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {hotel.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 text-indigo-900 text-xs px-2 py-1 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">
                No hotels match your search.
              </p>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="cursor-pointer px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`cursor-pointer px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="cursor-pointer px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      <div data-aos="fade-up">
        <HotelComponent />
      </div>

      <Footer />
    </div>
  );
}
