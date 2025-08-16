import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  unsubscribed,
  toggleSubscribe,
}) {
  // Escape key handler
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // prevent background scroll
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // restore scroll
    };
  }, [isOpen, onClose]);

  // Click outside to close
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={handleBackdropClick}
      className="flex fixed w-screen h-screen inset-0 z-[10000] items-center justify-center bg-black/50 animate-fadeIn"
    >
      <div
        className="bg-white max-w-[350px] md:min-w-[500px] text-slate-600 flex flex-col items-center justify-center p-4 rounded-lg relative shadow-lg animate-scaleIn"
      >
        {/* Close button */}
        <div onClick={onClose} className="self-end mb-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 
            224 224 224-224 56 56-224 224 224 224-56 56
            -224-224-224 224Z" />
          </svg>
        </div>

        {/* Content */}
        {!unsubscribed ? (
          <div className="flex flex-col items-center">
            <p className="text-sm text-center">
              Are you sure you want to stop receiving email notifications about
              flight deals, hotel offers, and travel updates?
            </p>
            <p className="text-sm text-center">
              You’ll miss out on the latest discounts and important travel
              alerts.
            </p>
            <button
              onClick={toggleSubscribe}
              className="bg-red-600 text-sm p-2 px-4 mt-4 cursor-pointer hover:bg-red-400 rounded-[2rem] text-white font-semibold"
            >
              Unsubscribe
            </button>
          </div>
        ) : (
          <p className="text-center text-green-600">
            ✅ You have been unsubscribed from email alerts.
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
