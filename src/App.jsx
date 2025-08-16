import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import './index.css';
import Home from "./Pages/Home.jsx";
import { Routes, Route } from 'react-router-dom';
import SearchResults from './Pages/SearchResults.jsx';
import Deals from './Pages/Deals.jsx';
import RentCar from './Pages/RentCar.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';
import BookFlight from './Pages/BookFlight'; 
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsOfService from './Pages/TermsOfService.jsx';
import 'aos/dist/aos.css';
import Hotels from './Pages/Hotels.jsx';
import Loader from './Components/Loader.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const showLoader = location.pathname === '/' && isLoading;

  // 🔹 Initialize Lenis for smooth scrolling
//  useEffect(() => {
//   const lenis = new Lenis({
//     duration: 0.8, // smoother & fast
//     easing: (t) => 1 - Math.pow(1 - t, 3), // cubic easing for natural feel
//     smooth: true,
//     smoothTouch: true, // enable smoothness on mobile too
//   });

//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);

//   return () => {
//     lenis.destroy();
//   };
// }, []);

  return (
    <>
      {showLoader ? (
        <Loader minMs={10000} onFinish={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<SearchResults />} />
            <Route path="/deals" element={<Deals />} />
            <Route path='/rent-car' element={<RentCar />} />
            <Route path='/contact' element={<Contact />} />  
            <Route path='/about' element={<About />} /> 
            <Route path="/book" element={<BookFlight />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/hotels" element={<Hotels />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
