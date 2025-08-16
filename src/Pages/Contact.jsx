// Contact.jsx
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Marque from "../Components/Marque";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length === 0) {
      setSuccess("✅ Message sent successfully!");
      setTimeout(() => {
        return setSuccess("");
      }, 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <>
      <Marque />
      <Header />
      <section
        className="relative h-[50vh] flex flex-col items-center justify-center bg-cover bg-center animate-fade-in"
        style={{
          backgroundImage: `url('https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/gsp-2025/hn-early-bird-2025-summer-kayak.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative text-center max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Get in Touch With Us
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Have questions, feedback, or need assistance with your bookings? Our
            team is here to help you every step of the way.
          </p>
        </div>

        {/* Scroll Down Button */}
        <a
          href="#contact-form"
          className="absolute bottom-6 text-white hover:text-yellow-400 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </section>
      <section className="bg-gray-200 text-gray-900 min-h-screen px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-indigo-700">
            Contact FlyNow
          </h2>
          <p className="text-slate-800">
            We’re here to help. Get in touch anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto place-items-center">
          {/* Contact Form */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-xl w-full">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3 text-[.9rem] w-full transition duration-300"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3 text-[.9rem] w-full transition duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3 text-[.9rem] w-full transition duration-300"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-indigo-800 hover:bg-amber-400 hover:text-slate-700 font-semibold transition text-white px-6 py-3 rounded-lg w-full cursor-pointer active:scale-[0.92] duration-300"
              >
                Send Message
              </button>
              <p className="text-green-600 font-medium">{success}</p>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="flex flex-col justify-between space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-indigo-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-slate-600">+234 700-FLY-NOW</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-indigo-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-slate-600">support@flynow.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-indigo-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Head Office</h4>
                  <p className="text-slate-600">1 FlyNow Way, Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Optional Map */}
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-300 my-[4rem]">
          <iframe
            title="FlyNow Location"
            className="w-full h-100 grayscale"
            src="https://maps.google.com/maps?q=lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center text-slate-600">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <details className="bg-gray-100 p-4 rounded-xl transition duration-300">
              <summary className="cursor-pointer font-medium ">
                How do I change my booking?
              </summary>
              <p className="text-sm mt-2 text-slate-600">
                You can manage or change your booking from your dashboard after
                logging in.
              </p>
            </details>
            <details className="bg-gray-100 p-4 rounded-xl">
              <summary className="cursor-pointer font-medium">
                Can I cancel a flight?
              </summary>
              <p className="text-sm mt-2 text-slate-600">
                Yes, cancellation policies depend on the airline. We provide all
                info under your booking details.
              </p>
            </details>
            <details className="bg-gray-100 p-4 rounded-xl">
              <summary className="cursor-pointer font-medium">
                How do I get travel updates?
              </summary>
              <p className="text-sm mt-2 text-slate-600">
                You’ll receive real-time flight updates via email and SMS (if
                enabled).
              </p>
            </details>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
