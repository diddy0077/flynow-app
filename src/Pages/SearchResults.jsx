import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import OtherIssues from "../Components/OtherIssues";
import CTA from "../Components/CTA";
import Footer from "../Components/Footer";

// Helper to parse ISO 8601 duration (PT28H20M → 28h 20m)
function parseDuration(isoDuration) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return isoDuration;
  const hours = match[1] || 0;
  const minutes = match[2] || 0;
  return `${hours}h ${minutes}m`;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const navigate = useNavigate();
  const query = useQuery();
  const [flightResults, setFlightResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const resultsPerPage = 5;

  const from = query.get("origin");
  const to = query.get("destination");
  const departureDate = query.get("departureDate");
  const returnDate = query.get("returnDate") || "";
  const passengers = query.get("adults") || 1;

  useEffect(() => {
    if (!from || !to || !departureDate) return;

    const fetchFlights = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          origin: from,
          destination: to,
          departureDate,
          returnDate,
          adults: passengers,
        });

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/search-flights?${params.toString()}`
        );
        if (!res.ok) throw new Error("Server error fetching flights");

        const data = await res.json();
        console.log("Flight sample:", data[0]);
        setFlightResults(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch flights. Please try again.");
        setFlightResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, departureDate, returnDate, passengers]);

  // Pagination calculations
  const totalPages = Math.ceil(flightResults.length / resultsPerPage);
  const paginatedFlights = flightResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handlePageChange = (newPage) => {
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setPageLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-blue-600 text-sm">
              Fetching flights...
            </span>
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-red-600 mt-10">{error}</p>
        )}

        {!loading && !error && flightResults.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No flights found for the selected route.
          </p>
        )}

        {!loading && paginatedFlights.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-[1.8rem] md:text-3xl font-bold mb-8 text-indigo-900 whitespace-nowrap">
              Flight Search Results
            </h2>
            <div className="grid gap-6">
              {paginatedFlights.map((flight, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-indigo-800">
                      {flight.airline} {flight.flightNumber}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-[.9rem] md:text-sm whitespace-nowrap font-medium bg-blue-100 text-blue-800">
                      {flight.stops === 0
                        ? "Non-stop"
                        : `${flight.stops} Stop(s)`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    {/* Departure */}
                    <div>
                      <p className="text-gray-500">From</p>
                      <p className="font-medium">{flight.departure.iataCode}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(flight.departure.at).toLocaleString()}
                      </p>
                      {flight.departure.terminal && (
                        <p className="text-xs text-gray-400">
                          Terminal: {flight.departure.terminal}
                        </p>
                      )}
                    </div>

                    {/* Arrival */}
                    <div>
                      <p className="text-gray-500">To</p>
                      <p className="font-medium">{flight.arrival.iataCode}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(flight.arrival.at).toLocaleString()}
                      </p>
                      {flight.arrival.terminal && (
                        <p className="text-xs text-gray-400">
                          Terminal: {flight.arrival.terminal}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">
                        {parseDuration(flight.duration)}
                      </p>
                    </div>

                    {/* Seat Availability */}
                    {flight.seats && (
                      <div>
                        <p className="text-gray-500">Seats Left</p>
                        <p className="font-medium">{flight.seats}</p>
                      </div>
                    )}

                    {/* Return Flight */}
                    {flight.returnItinerary && (
                      <>
                        <div>
                          <p className="text-gray-500">Return From</p>
                          <p className="font-medium">
                            {flight.returnItinerary.segments[0].departure.iataCode}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {new Date(
                              flight.returnItinerary.segments[0].departure.at
                            ).toLocaleString()}
                          </p>
                          {flight.returnItinerary.segments[0].departure.terminal && (
                            <p className="text-xs text-gray-400">
                              Terminal: {flight.returnItinerary.segments[0].departure.terminal}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-gray-500">Return To</p>
                          <p className="font-medium">
                            {
                              flight.returnItinerary.segments.slice(-1)[0].arrival
                                .iataCode
                            }
                          </p>
                          <p className="text-gray-500 text-xs">
                            {new Date(
                              flight.returnItinerary.segments.slice(-1)[0].arrival.at
                            ).toLocaleString()}
                          </p>
                          {flight.returnItinerary.segments.slice(-1)[0].arrival.terminal && (
                            <p className="text-xs text-gray-400">
                              Terminal: {
                                flight.returnItinerary.segments.slice(-1)[0].arrival.terminal
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-gray-500">Return Duration</p>
                          <p className="font-medium">
                            {parseDuration(flight.returnItinerary.duration)}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Price */}
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-medium">
                        {flight.price} {flight.currency}
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={() => navigate("/book", { state: { flight } })}
                        className="justify-end bg-indigo-800 px-4 py-2 text-white font-semibold rounded-3xl cursor-pointer transition duration-300 active:scale-[0.9] mt-2 hover:bg-amber-400 hover:text-slate-700"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || pageLoading}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
                >
                  Prev
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || pageLoading}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}

            {pageLoading && (
              <div className="flex justify-center items-center mt-4">
                <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                <span className="ml-2 text-blue-600 text-sm">Loading...</span>
              </div>
            )}
          </section>
        )}
      </div>
      <OtherIssues />
      <CTA />
      <Footer />
    </>
  );
}

export default SearchResults;
