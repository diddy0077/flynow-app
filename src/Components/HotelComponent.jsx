import hotel1 from '../assets/hotels/hotel1.jpg';
import hotel2 from '../assets/hotels/hotel2.jpg';
import hotel3 from '../assets/hotels/hotel3.jpg';

function HotelComponent() {
  const featuredHotels = [
   {
       "id": 1,
       "name": "Grand Indigo Hotel",
       "city": "Lagos",
       "price": 120,
       "rating": 4.5,
       "image": hotel1,
       "amenities": ["Free WiFi", "Pool", "Airport Shuttle"]
     },
     {
       "id": 2,
       "name": "Amber Luxury Suites",
       "city": "London",
       "price": 210,
       "rating": 4.8,
       "image": hotel2,
       "amenities": ["Breakfast Included", "Gym", "Spa"]
     },
     {
       "id": 3,
       "name": "Seaside View Resort",
       "city": "Dubai",
       "price": 180,
       "rating": 4.3,
       "image": hotel3,
       "amenities": ["Beach Access", "Free WiFi", "Restaurant"]
     }
 ]




  return (
    <div>
      {/* 2. Featured Hotels */}
<section className="py-10 bg-gray-50">
  <h2 className="md:text-3xl text-[1.6rem] font-bold text-center text-indigo-900 mb-6">🌟 Featured Hotels</h2>
  <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto px-4">
    {featuredHotels.map((hotel) => (
      <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition">
        <img src={hotel.image} loading='lazy' alt={hotel.name} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg text-indigo-900">{hotel.name}</h3>
          <p className="text-gray-600">From ${hotel.price}/night · {hotel.rating}⭐</p>
        </div>
      </div>
    ))}
  </div>
</section>

{/* 5. Customer Reviews */}
<section className="py-10 bg-white">
  <h2 className="md:text-3xl text-[1.6rem] font-bold text-center text-indigo-900 mb-6">💬 What Our Guests Say</h2>
  <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto px-4">
    {[
      { name: "Sarah L.", text: "Absolutely loved my stay! Beautiful rooms and amazing service." },
      { name: "James T.", text: "The location was perfect, and the breakfast buffet was fantastic!" },
      { name: "Olivia M.", text: "Highly recommend! Great value for the price." },
    ].map((review, i) => (
      <div key={i} className="bg-gray-50 rounded-xl p-6 shadow-md">
        <p className="text-gray-700 italic">"{review.text}"</p>
        <p className="mt-4 font-semibold text-indigo-900">- {review.name}</p>
      </div>
    ))}
  </div>
</section>

{/* 6. Nearby Attractions */}
<section className="py-10 bg-gray-50">
  <h2 className="md:text-3xl text-[1.6rem] font-bold text-center text-indigo-900 mb-6 px-2">📍 Nearby Attractions</h2>

  {/* Carousel wrapper for mobile */}
  <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:grid md:grid-cols-4 md:overflow-visible md:snap-none max-w-6xl mx-auto text-center scrollbar-hide">
    {[
      { icon: "🏖️", name: "Beach", desc: "5 mins walk" },
      { icon: "🛍️", name: "Shopping", desc: "10 mins drive" },
      { icon: "🍽️", name: "Fine Dining", desc: "Nearby restaurants" },
      { icon: "🎭", name: "Theater", desc: "15 mins walk" },
    ].map((place, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition snap-center flex-shrink-0 w-64 md:w-auto"
      >
        <div className="text-4xl mb-2">{place.icon}</div>
        <h3 className="font-semibold text-indigo-900">{place.name}</h3>
        <p className="text-gray-600">{place.desc}</p>
      </div>
    ))}
  </div>
</section>


{/* 7. Newsletter Signup */}
{/* <section className="py-12 bg-indigo-900 text-white text-center">
  <h2 className="text-3xl font-bold mb-4">📩 Stay Updated on Hotel Deals</h2>
  <p className="mb-6 text-amber-400">Get exclusive discounts straight to your inbox</p>
  <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
    <input
      type="email"
      placeholder="Enter your email"
      className="px-4 py-2 rounded w-full md:w-2/3 text-gray-800 focus:outline-none"
    />
    <button className="bg-amber-400 text-indigo-900 font-semibold px-6 py-2 rounded hover:bg-amber-300 transition">
      Subscribe
    </button>
  </form>
</section> */}

    </div>
  )
}

export default HotelComponent