import Header from "../Components/Header"
import Marque from "../Components/Marque"
import Footer from "../Components/Footer"


function PrivacyPolicy() {
  return (
    <div>
      <Marque/>
      <Header/>
        <div className="bg-white text-gray-800 min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-indigo-900 border-b pb-4">Privacy Policy</h1>

        <section className="space-y-4">
          <p className="text-[.9rem]">
            At <span className="font-semibold text-amber-600 text-xl">FlyNow</span>, your privacy is extremely important to us.
            This Privacy Policy outlines how we collect, use, and protect your information when you use our website or services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-indigo-900">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1 text-[.9rem]">
            <li>Full Name, Email Address, Phone Number</li>
            <li>Flight Preferences (Origin, Destination, Dates, Seat Class)</li>
            <li>Payment and Billing Information</li>
            <li>Technical data such as IP address, device info, browser type</li>
          </ul>
        </section>

        <section className="space-y-2 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-900">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Book flights and process transactions</li>
            <li>Send booking confirmations and travel updates</li>
            <li>Improve our services and customer experience</li>
            <li>Communicate with you about promotions or updates (only if you opt-in)</li>
          </ul>
        </section>

        <section className="space-y-2 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-900">3. Data Protection</h2>
          <p>
            Your data is securely stored and encrypted. We never share or sell your personal information to third parties,
            except when legally required or when working with secure third-party partners (e.g., payment processors).
          </p>
        </section>

        <section className="space-y-2 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-900">4. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience. You can control cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-2 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-900">5. Your Rights</h2>
          <p>You can:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access or correct your personal data</li>
            <li>Request deletion of your account</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="space-y-2 text-[.9rem]">
          <h2 className="text-2xl font-semibold text-indigo-900">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <span className="text-amber-600 font-medium">support@flynow.com</span>
          </p>
        </section>
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default PrivacyPolicy