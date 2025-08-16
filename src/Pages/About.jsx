import Header from "../Components/Header";
import image from "../assets/about-us.jpg"
import { useState } from "react";
import Footer from "../Components/Footer";
import TestimonialSection from "../Components/TestimonialSection";
import test from '../assets/test.jpg'
import Accordion from "../Components/Accordion";
import Marque from "../Components/Marque";
import { motion } from "framer-motion";


export default function AboutPage() {
   const travelTips = [
  "Arrive at the airport 2 hours before departure.",
  "Keep a digital and physical copy of your travel documents.",
  "Drink plenty of water during flights.",
  "Use packing cubes to stay organized.",
  "Check visa and entry requirements in advance.",
];
 
  const [state, setState] = useState(0)
  function showTip() {
    const random = Math.floor(Math.random() * travelTips.length)
    setState(random)
  }


  return (
    <>
      <Marque/>
      <Header />
       <section
      className="relative bg-cover bg-center h-[70vh] flex items-center justify-center animate-fade-in"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="relative z-10 max-w-3xl text-center text-white px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          About <span className="text-amber-400">FlyNow</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Your trusted partner in finding the best flights, hotels, and travel
          deals — anywhere, anytime.
        </p>
        <a
          href="#mission"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Learn More
        </a>
      </motion.div>
    </section>

    <section className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center mb-[3rem]">
          <h1 className="text-3xl md:text-4xl shawdow-lg font-bold text-indigo-800 mb-4 font-secondary">
            About FlyNow
          </h1>
          <p className="text-[1rem] md:text-lg text-slate-700 max-w-3xl mx-auto mb-[5rem]">
            Your trusted companion for seamless and affordable air travel. From searching to booking, we make your flight experience smooth and effortless.
          </p>
        </div>

        {/* Mission / Vision */}
        <div id="mission" className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-2">🌍 Our Mission</h2>
            <p className="text-slate-700 leading-relaxed">
              At FlyNow, our mission is to revolutionize the way people travel. We aim to provide fast, secure, and transparent flight bookings to travelers worldwide. Whether it's business, vacation, or emergency — we're here to help you get there.
            </p>
          </div>
          <img
            src={test}
            alt="Airplane mission visual"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Why Choose Us */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-6">✨ Why Choose FlyNow?</h2>
          <ul className="space-y-4 text-gray-700">
            <li>✅ Real-time flight search and comparison</li>
            <li>✅ Transparent pricing with no hidden fees</li>
            <li>✅ Secure payments and instant confirmation</li>
            <li>✅ 24/7 customer support</li>
            <li>✅ User-friendly and mobile-optimized interface</li>
          </ul>
        </div>

        {/* Fun Tip or Fact Generator Section */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">🧠 Travel Tip</h2>
            <p className="text-gray-700 italic">{`"${travelTips[state]}"`}</p>
          <button onClick={showTip} className="bg-indigo-600 py-2 px-4 rounded-lg text-white font-semibold cursor-pointer transition duration-300 active:scale-[0.9] mt-4 self-center">Show New Tip</button>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">Have questions or need help?</p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Our Support Team
          </a>
        </div>
        </div>
      </section>
      <Accordion/>
      <TestimonialSection />
      <Footer/>
      </>
  );
}
