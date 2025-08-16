// TestimonialSection.jsx
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import TestimonialCard from "./TestimonialCard";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Frequent Flyer",
    comment: "Booking my flight was super fast and seamless!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Business Traveler",
    comment: "Best interface I’ve used for international flights.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Amaka O.",
    role: "Solo Explorer",
    comment: "Loved the instant search and clear pricing!",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
];

export default function TestimonialSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    duration: 3000,
    drag: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <section className="py-20 bg-gradient-to-br from-sky-100 via-white to-blue-100">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-900 flex items-center justify-center gap-2">
          ✈️ What Our Travelers Say
        </h2>

        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((t) => (
            <div key={t.id} className="keen-slider__slide">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => slider.current?.moveToIdx(idx)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentSlide === idx
                  ? "bg-blue-600 scale-110"
                  : "bg-gray-300 hover:bg-blue-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
