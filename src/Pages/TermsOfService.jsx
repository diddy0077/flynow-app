import Header from "../Components/Header";
import Marque from "../Components/Marque";
import Footer from "../Components/Footer";

export default function TermsOfService() {
  return (
    <div>
      <div className="hidden md:block"><Marque/></div>
      <Header />
       <div className="md:hidden"><Marque/></div>
    <div className="min-h-screen bg-white px-6 py-12 md:px-20 text-slate-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-12 pb-2 border-b">Terms of Service</h1>

        <p className="mb-4 text-gray-700 text-[.9rem]">
          Welcome to our flight booking platform. By accessing or using our services, you agree to be bound by the following Terms of Service. Please read them carefully.
        </p>

        <section className="mb-6 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-2">1. Use of Service</h2>
          <p className="text-gray-700">
            You agree to use our website and services only for lawful purposes and in accordance with these Terms. You must not misuse our services or interfere with their normal functioning.
          </p>
        </section>

        <section className="mb-6 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-2">2. Booking & Payments</h2>
          <p className="text-gray-700">
            All bookings are subject to availability and confirmation. Payment must be made at the time of booking. Prices may change due to airline policies or other market factors.
          </p>
        </section>

        <section className="mb-6 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-2">3. Cancellations & Refunds</h2>
          <p className="text-gray-700">
            Cancellation policies vary depending on the airline. Please review your booking details carefully. Refunds are subject to applicable airline policies and may take up to 14 days to process.
          </p>
        </section>

        <section className="mb-6 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-2">4. User Accounts</h2>
          <p className="text-gray-700">
            You may be required to create an account. You are responsible for maintaining the confidentiality of your login information and any activity under your account.
          </p>
        </section>

        <section className="mb-6 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-2">5. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms of Service at any time. Changes will be posted on this page and take effect immediately upon posting.
          </p>
        </section>

        <section className="mb-6 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-2">6. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at <span className="text-amber-600 font-medium">support@flynow.com</span>.
          </p>
        </section>

        <p className="text-sm text-slate-500 mt-8">
          Last updated: August 5, 2025
        </p>
      </div>
      </div>
      <Footer/>
      </div>
  );
}
