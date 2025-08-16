import logo from '../assets/flynow-logo.png'
export default function Footer() {
  return (
    <footer className="bg-indigo-950 text-white pt-12 pb-6 px-6 md:px-20">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <img className='w-[50px] h-[auto] rounded-full mb-4' src={logo} alt="logo" loading='lazy' />
          <h2 className="text-2xl font-bold mb-4">✈️ Flynow</h2>
          <p className="text-sm text-gray-300">
            Discover and book the best flights across the globe. Fast, reliable, and affordable.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-amber-400">Home</a></li>
            <li><a href="/rent-car" className="hover:text-amber-400">Rent a Car</a></li>
            <li><a href="/deals" className="hover:text-amber-400">Deals</a></li>
            <li><a href="/contact" className="hover:text-amber-400">Contact Us</a></li>
            <li><a href="/privacy-policy" className="hover:text-amber-400">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-amber-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>Email: support@flynow.com</li>
            <li>Phone: +234 904 894 7208</li>
            <li>Location: Lagos, Nigeria</li>
          </ul>
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="#"><i className="fab fa-facebook hover:text-amber-400"></i></a>
            <a href="#"><i className="fab fa-twitter hover:text-amber-400"></i></a>
            <a href="#"><i className="fab fa-instagram hover:text-amber-400"></i></a>
            <a href="#"><i className="fab fa-linkedin hover:text-amber-400"></i></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-300 mb-3">Stay updated with our latest deals and updates.</p>
          <form action='https://formspree.io/f/xdkdloyq' method='POST' className="flex flex-col space-y-3">
            <input
              type="email"
              name='email'
              placeholder="Your email"
              className="p-2 rounded bg-indigo-800 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-semibold transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

   

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} FlyNow. All rights reserved.
      </div>
    </footer>
  );
}
