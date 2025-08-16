import { useState, useEffect } from "react";

const images = [
  "https://i.ibb.co/s9Qwfv9Y/imgdeal1.jpg", // airplane window
  "https://i.ibb.co/FbNxWk4J/imagedeal2.jpg", // travel ticket
  "https://i.ibb.co/hJHdHC8q/imagedeal5.jpg", // scenic flight
];


export default function DealsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // every 3 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-4xl drop-shadow-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            loading="lazy"
            key={idx}
            src={src}
            alt={`Deal ${idx + 1}`}
            className="w-full flex-shrink-0 object-cover h-64"
          />
        ))}
      </div>

      {/* Optional navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black px-2 py-1 rounded-full"
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + images.length) % images.length)
        }
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black px-2 py-1 rounded-full"
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
      >
        ❯
      </button>
    </div>
  );
}
