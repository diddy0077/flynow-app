// import paris from '../assets/pari.jpg'
// import tokyo from '../assets/tokyo.jpg'
// import newyork from '../assets/newyork.jpg'
// import capetown from '../assets/capetown.jpg'
// import dubai from '../assets/dubai.jpg'
// import london from '../assets/london.jpg'
// import { href } from 'react-router-dom'

export default function PopularDestinations() {
  const destinations = [
    {
      city: "Paris",
      country: "France",
      image: 'https://i.ibb.co/7dj6hMT9/pari.jpg',
      description: "Romantic evenings, world-class art, and timeless charm.",
      href: '/deals'
    },
    {
      city: "Tokyo",
      country: "Japan",
      image: 'https://i.ibb.co/JRZYtjjH/tokyo.jpg',
      description: "A futuristic city blending tech, food, and tradition.",
      href: '/hotels'
    },
    {
      city: "New York",
      country: "USA",
      image: 'https://i.ibb.co/N6nJgrSx/newyork.jpg',
      description: "The city that never sleeps. Skyscrapers and Broadway dreams.",
      href: '/deals'
    },
    {
      city: "Cape Town",
      country: "South Africa",
      image: 'https://i.ibb.co/6JFFtvkC/capetown.jpg',
      description: "Stunning coastlines and mountain views meet rich culture.",
      href: '/hotels'
    },
    {
      city: "Dubai",
      country: "UAE",
      image: 'https://i.ibb.co/ZRFng1mx/dubai.jpg',
      description: "Luxury, innovation, and desert adventures in one place.",
      href: '/deals'
    },
    {
      city: "London",
      country: "UK",
      image: 'https://i.ibb.co/KjCj5Lbc/london.jpg',
      description: "Historic landmarks, royal charm, and vibrant nightlife.",
      href: '/hotels'
    },
  ];

  return (
    <section className="py-16 px-6 bg-slate-50 text-slate-800">
      <h2 className="text-3xl font-bold text-center mb-2">Popular Destinations</h2>
      <p className='text-slate-700 text-[.9rem] text-center mb-20'>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, day.</p>

      {/* Carousel on mobile, grid on md+ */}
      <div className="carousel flex gap-6 overflow-x-auto scroll-smooth md:grid md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto scrollbar-hide">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="min-w-[80%] md:min-w-0 bg-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition inline-block"
          >
            <img
              loading="lazy"
              src={dest.image}
              alt={dest.city}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                {dest.city},{" "}
                <span className="text-sm text-gray-500">{dest.country}</span>
              </h3>
              <p className="text-sm text-gray-600 mt-2">{dest.description}</p>
              <a href={dest.href} className="cursor-pointer mt-4 inline-block px-2 text-[.9rem] py-2 text-white bg-indigo-900 rounded hover:bg-amber-400 transition">
                View Deals
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
