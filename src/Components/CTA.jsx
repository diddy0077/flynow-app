import { useState } from "react";
import Modal from "./Modal.jsx";

function CTA() {
  function handleReload(e) {
    e.preventDefault();
  }

  const [modal, setModal] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);

  function toggleSubscibe() {
    setUnsubscribed(true);
  }

  function openModal() {
    setModal(true);
    document.body.style.overflow = "hidden"; // prevent page scroll
  }

  function closeModal() {
    setModal(false);
    document.body.style.overflow = "auto"; // restore page scroll
  }

  return (
    <section className="p-4 mt-8 mb-8">
      <h1 className="font-semibold text-center text-lg mt-4 md:text-xl">
        Like travel deals? Enter your email and we'll send them your way.
      </h1>
      <form
        onChange={handleReload}
        action="https://formspree.io/f/xdkdloyq"
        method="POST"
        className="flex flex-col items-center my-4 gap-4"
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email address"
          className="border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2 text-[.9rem] w-[80%] md:max-w-[50%] transition duration-300"
          required
        />
        <button
          type="submit"
          className="bg-indigo-800 text-white cursor-pointer hover:bg-amber-500 hover:text-slate-800 hover:font-semibold rounded-full md:text-[.8rem] px-4 py-2"
        >
          Send me deals
        </button>
      </form>
      <p className="text-center text-sm text-slate-800 md:text-sm mb-2">
        Your privacy is important to us, so we'll never spam you or share your
        info with third parties.
      </p>
      <p className="text-center text-sm text-slate-800 md:text-sm">
        Take a look at our{" "}
        <a href="/privacy-policy" className="underline">
          privacy policy
        </a>
        . And, we'd be sad to see you go, but you can{" "}
        <button onClick={openModal} className="underline cursor-pointer">
          unsubscribe
        </button>{" "}
        at any time.
      </p>

      {/* Use correct prop names */}
      <Modal
        isOpen={modal}
        onClose={closeModal}
        unsubscribed={unsubscribed}
        toggleSubscribe={toggleSubscibe}
      />
    </section>
  );
}

export default CTA;
