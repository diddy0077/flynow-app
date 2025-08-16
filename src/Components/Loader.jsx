import { useEffect, useState } from "react";
import "../Loader.css";

export default function Loader({ onFinish, minMs = 15000 }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [takeOff, setTakeOff] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBurst(true); // start the glow burst
      setTakeOff(true); // plane takes off
      setFadeOut(true); // background fades
      setTimeout(() => {
        onFinish(); // remove loader
      }, 1500); // match takeoff duration
    }, minMs);

    return () => clearTimeout(timer);
  }, [onFinish, minMs]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-indigo-900 text-white z-50 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* App Name */}
        <span className="absolute text-xl font-bold tracking-wide z-10 font-secondary">
          FlyNow
        </span>

        {/* Glowing Base Path */}
        <div
          className={`w-full h-full border-4 border-indigo-400/30 rounded-full animate-pulse-glow ${
            burst ? "animate-burst" : ""
          }`}
        ></div>

        {/* Glowing Trail */}
        <div className="absolute w-full h-full rounded-full animate-trail-glow"></div>

        {/* Airplane */}
        <div
          className={`absolute w-8 h-8 ${
            takeOff ? "animate-takeoff" : "animate-orbit"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
