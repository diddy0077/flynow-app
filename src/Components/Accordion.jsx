// Accordion.jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What makes FlyNow different?",
    answer:
      "FlyNow offers a seamless booking experience, transparent pricing, and world-class customer support.",
  },
  {
    question: "Is my booking refundable?",
    answer:
      "Most tickets are refundable within 24 hours of booking. Some fares offer flexible cancellation policies.",
  },
  {
    question: "Do you offer international flights?",
    answer:
      "Yes! We partner with over 100 international airlines to bring you the best global travel options.",
  },
  {
    question: "Can I manage my booking after payment?",
    answer:
      "Yes. You can change your seat, add luggage, or modify your itinerary from your account dashboard.",
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-700">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-xl overflow-hidden transition-all duration-300 bg-white shadow-md"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 transition"
            >
              <span className="font-medium text-[1rem]">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 cursor-pointer transform transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`px-4 pb-4 text-gray-700 text-[.9rem] transition-all duration-300 ${
                openIndex === i ? "block" : "hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
