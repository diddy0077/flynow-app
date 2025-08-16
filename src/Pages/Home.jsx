import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Marque from "../Components/Marque.jsx";
import Header from "../Components/Header.jsx";
// import airImage from "../assets/flight.jpg";
import PopularDestinations from "../Components/Populardestinations.jsx";
import iataCodes from '../data/iata-codes.json';
import skyscanner from "../assets/skyscanner.jpeg";
import OtherIssues from '../Components/OtherIssues.jsx';
// import planeAnimation from "../assets/animations/study.json"; 
import TripTypeDropdown from "../Components/TripTypeDropdown.jsx";
import InfinityScroll from "../Components/Infinityscroll.jsx";
import Footer from "../Components/Footer.jsx";
import CTA from "../Components/CTA.jsx";
import { useLocation } from "react-router-dom";



function Home() {
const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("scrollToForm") === "true") {
      setTimeout(() => {
        document.getElementById("search-form")?.scrollIntoView({ behavior: "smooth" });
      }, 800); 
    }
  }, [location]);


  const [flightResults, setFlightResults] = useState([]);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    tripType: 'oneway'
  });

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800, // animation speed
      easing: "ease-in-out", 
      once: true, // animate only once
      offset: 100 // start animation earlier/later
    });
  }, []);

  function getIATACode(cityName) {
    return iataCodes.find(
      item => item.city.toLowerCase() === cityName.toLowerCase()
    )?.iata || null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'from') {
      const filtered = iataCodes.filter(
        item => item.city.toLowerCase().includes(value.toLowerCase()) ||
                 item.iata.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(value.length > 1 ? filtered : []);
    }

    if (name === 'to') {
      const filtered = iataCodes.filter(
        item => item.city.toLowerCase().includes(value.toLowerCase()) ||
                 item.iata.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(value.length > 1 ? filtered : []);
    }
  };

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'from') setFromSuggestions([]);
    if (field === 'to') setToSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { from, to, departure, return: returnDate, passengers, tripType } = formData;

    const fromIATA = getIATACode(from);
    const toIATA = getIATACode(to);

    if (!fromIATA || !toIATA) {
      alert("Could not find airport codes.");
      return;
    }

 function formatDate(dateString) {
  if (!dateString) return "";
  const [mm, dd, yyyy] = dateString.split("/");
  if (!mm || !dd || !yyyy) return ""; // fallback for invalid input
  return `${yyyy}-${mm.padStart(2,"0")}-${dd.padStart(2,"0")}`;
}

    const queryParams = new URLSearchParams({
  origin: fromIATA,                 // matches server
  destination: toIATA,              // matches server
  departureDate: departure, // key matches server
  returnDate: returnDate,   // key matches server
  adults: passengers,               // key matches server
  tripType
    }).toString();
    
    console.log({
  fromIATA,
  toIATA,
  departureDate: departure,   // already YYYY-MM-DD
  returnDate: returnDate || "",
  passengers,
  tripType
});

    navigate(`/results?${queryParams}`);
  };

  return (
    <div>
      <Marque />
      <Header />

     <section 
  style={{ 
    backgroundImage: `url('https://i.ibb.co/BVGDFfxp/flight.jpg')`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    position: 'relative' 
  }} 
  className="py-[6rem] px-8 md:py-[8rem] relative"
  data-aos="fade-in"
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Shape divider */}
  <div className="custom-shape-divider-bottom-1755034164 relative flex flex-col">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path 
        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19
        c-82.26-17.34-168.06-16.33-250.45.39
        -57.84,11.73-114,31.07-172,41.86
        A600.21,600.21,0,0,1,0,27.35V120H1200V95.8
        C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
        className="shape-fill"
      ></path>
    </svg>
   
  </div>

  {/* Content container */}
  <div className="relative flex flex-col items-center justify-center z-10 text-center text-white mb-8 px-2">
    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider">
       Find Your Perfect <span className="text-amber-400">Flight.</span>
    </h1>
    <p className="text-lg md:text-xl opacity-90 font-secondary md:font-primary tracking-widest md:min-w-full">
      Search, compare, and book flights to your dream destination in seconds.
    </p>
  </div>

  {/* Your existing form (unchanged) */}
  <form
          id="search-form"
          onSubmit={handleSubmit}
          className="form bg-white bg-opacity-90 p-6 rounded-[2rem] shadow-lg max-w-3xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-3"
          data-aos="zoom-in"
        >
          {/* From input */}
          <div className="flex flex-col relative">
            <label className='text-slate-800 text-sm' htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              name="from"
              placeholder="Enter city"
              value={formData.from}
              autoComplete="off"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-2 py-2 text-[.9rem] w-full transition duration-300"
              required
            />
            {fromSuggestions.length > 0 && (
              <ul className="absolute z-10 top-15 w-full max-h-60 overflow-y-auto bg-white border border-indigo-900 rounded-md shadow-lg mt-1 scrollbar-hide">
                {fromSuggestions.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelect('from', item.city)}
                    className="px-4 py-2 text-sm text-gray-800 hover:bg-indigo-800 hover:text-white cursor-pointer transition duration-200"
                  >
                    {item.city.toUpperCase()} ({item.iata})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To input */}
          <div className="flex flex-col relative">
            <label className='text-slate-800 text-sm' htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              name="to"
              placeholder="Enter city"
              value={formData.to}
              autoComplete="off"    
              onChange={handleChange}
              className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-2 py-2 text-[.9rem] w-full transition duration-300"
              required
            />
            {toSuggestions.length > 0 && (
              <ul className="absolute z-10 top-15 w-full max-h-60 overflow-y-auto bg-white border border-indigo-900 rounded-md shadow-lg mt-1 scrollbar-hide">
                {toSuggestions.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelect('to', item.city)}
                    className="px-4 py-2 text-sm text-gray-800 hover:bg-indigo-800 hover:text-white cursor-pointer transition duration-200"
                  >
                    {item.city.toUpperCase()} ({item.iata})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Departure */}
          <div className="flex flex-col">
            <label className='text-slate-800 text-sm' htmlFor="departure">Departure</label>
            <input
              type="date"
              id="departure"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              className="w-full md:w-full border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-[.9rem] px-2 py-2"
              required
            />
          </div>

          {/* Return */}
          <div className="flex flex-col">
            <label className='text-slate-800 text-sm' htmlFor="return">Return</label>
            <input
              type="date"
              id="return"
              name="return"
              value={formData.return}
              onChange={handleChange}
              className="w-full md:w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-[.9rem] px-2 py-2"
              disabled={formData.tripType === "oneway"}
            />
          </div>

          {/* Passengers */}
          <div className="flex flex-col">
            <label className='text-slate-800 text-sm' htmlFor="passengers">Passengers</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              min="1"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full md:w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-[.9rem] px-2 py-2"
            />
          </div>

          {/* Trip type */}
          <div className="flex flex-col">
            <label className='text-slate-800 text-sm' htmlFor="tripType">Trip Type</label>
            <TripTypeDropdown formData={formData} setFormData={setFormData} />
          </div>

          <button
            type="submit"
            className="hover:bg-amber-400 hover:text-slate-700 hover:font-semibold cursor-pointer bg-indigo-900 text-white col-span-full py-2 rounded-full transition active:scale-[0.95] duration-300 mt-2"
          >
            Search Flights
          </button>
        </form>
</section>


      <div data-aos="fade-up">
        <PopularDestinations />
      </div>

      <section 
        className="container mx-auto pt-[4rem] px-[1rem] pb-[4rem] text-white md:px-16"
        data-aos="fade-right"
      >
        <div  
          style={{ backgroundImage: `url(${skyscanner})`, backgroundSize: 'cover', backgroundPosition: 'top center' }} 
          className="rounded-[1rem] pt-[2rem] px-4 pb-8 flex flex-col justify-end h-[50vh] space-y-2 md:space-y-4 md:pb-[6rem] md:pt-[20rem] md:px-[3rem]" 
        >
          <p className="text-[1.3rem] max-w-[250px] md:max-w-full">Can't decide where to go?</p>
          <h3 className="font-semibold text-[1.5rem] md:text-[2rem] md:max-w-[250px]">Explore every destination</h3>
          <p   onClick={() => {
    const el = document.getElementById('search-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }} className="bg-white text-black self-start p-2 rounded-full px-3 font-medium cursor-pointer text-[.8rem]">Search flights Everywhere</p>
        </div>
      </section>

      <div data-aos="fade-up"><OtherIssues /></div>
      <div data-aos="fade-up"><InfinityScroll /></div>
      <div data-aos="fade-up"><CTA /></div>
        <Footer />
    </div>
  );
}

export default Home;
