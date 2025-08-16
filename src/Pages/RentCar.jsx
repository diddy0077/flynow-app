import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { useState } from "react"
import Marque from "../Components/Marque"

import "aos/dist/aos.css";


function RentCar() {
  const [selections, setSelections] = useState({
  city: "",
  carModel: "",
  category: ""
});
const [isSubmit, setIsSubmit] = useState(false)
const [price, setPrice] = useState(0);
const handleChange = (e) => {
  const { name, type, value, checked } = e.target;
    setSelections(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  
  // Recalculate price
  calculatePrice({ ...selections, [name]: value });
};
const calculatePrice = ({ city, carModel, category }) => {
  let base = 0;

  // Sample base by car
  switch (carModel) {
    case "gac-gs3":
      base = 15000;
      break;
    case "camry":
      base = 14000;
      break;
    case "corolla":
      base = 16000;
      break;
    case "prado":
      base = 18000;
      break;
    case "sienna":
      base = 13000;
      break;
    case "mercedes-benz":
      base = 30000;
      break;
    default:
      base = 0;
  }

  // Modify by category
  if (category === "daily") base *= 2;
  else if (category === "hourly") base = Math.floor(base / 5);
  else if (category === "airport") base += 3000;

  // Modify by city (optional)
  if (city === "lagos" || city === "abuja") base += 5000;

  setPrice(base);
};

 function handleSubmit(e) {
  e.preventDefault();

  // ✅ Required fields list (adjust based on your form)
  const requiredFields = ["city", "carModel", "category"];

  // ✅ Check if all fields are filled
  const allFilled = requiredFields.every(
    field => selections[field] && selections[field].toString().trim() !== ""
  );

  if (allFilled) {
    setIsSubmit(true);
    
  } else {
    setIsSubmit(false);
    return;
  }
}

  


  return (
    <div>
      <Marque/>
      <Header />
      <div>
      <section className="flex flex-col md:flex-row container mx-auto items-center justify-between px-8 gap-[4rem] animate-fade-in" >
        <form action="https://formspree.io/f/xdkdloyq" method="POST" className="flex-1 flex flex-col w-full border border-gray-400 mt-[4rem]">
          <div className="bg-indigo-900 text-white flex justify-between p-6">
            <div>
              <h1 className="font-semibold text-lg">Rent a vehicle</h1>
              <p className="text-[.8rem] max-w-3/5 md:max-w-full">Fill out the form below and we'll reach out.</p>
            </div>
            <div>
              <svg width="33" height="35" viewBox="0 0 33 35" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M3.33333 7.33854H6.66667V12.3385H23.3333V7.33854H26.6667V15.6719H30V7.33854C30 5.50521 28.5 4.00521 26.6667 4.00521H19.7C19 2.07187 17.1667 0.671875 15 0.671875C12.8333 0.671875 11 2.07187 10.3 4.00521H3.33333C1.5 4.00521 0 5.50521 0 7.33854V30.6719C0 32.5052 1.5 34.0052 3.33333 34.0052H13.3333V30.6719H3.33333V7.33854ZM15 4.00521C15.9167 4.00521 16.6667 4.75521 16.6667 5.67188C16.6667 6.58854 15.9167 7.33854 15 7.33854C14.0833 7.33854 13.3333 6.58854 13.3333 5.67188C13.3333 4.75521 14.0833 4.00521 15 4.00521Z" fill="currentColor"></path><path d="M29.9987 18.1719L20.8487 27.3385L15.832 22.3385L13.332 24.8385L20.8487 32.3385L32.4987 20.6719L29.9987 18.1719Z" fill="white"></path>
              </svg>
            </div>
          </div>
            <article className="w-full p-8 flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex w-full flex-col text-slate-800 text-sm md:flex-1">
                  <label htmlFor="city" className="text-slate-500 text-[.7rem]">City</label>
                  <select onChange={handleChange} name="city" id="city" className="border-b border-gray-400" required>
                    <option value="" disabled selected>Select City</option>
                    <option value="abia">Abia</option>
                    <option value="portharcout">Port Harcourt</option>
                    <option value="abuja">Abuja</option>
                    <option value="asaba">Asaba</option>
                    <option value="awka">Awka</option>
                    <option value="lagos">Lagos</option>
                  </select>
                </div>
                <div className="flex w-full flex-col text-slate-800 text-sm md:flex-1">
                <label htmlFor="carModel" className="text-slate-500 text-[.7rem]">Car Model</label>
                <select onChange={handleChange} name="carModel" id="car-model" className="border-b border-gray-400" required>
                    <option value="" disabled selected>Select Vehicle</option>
                    <option value="gac-gs3">GAC GS3</option>
                    <option value="camry">CAMRY</option>
                    <option value="corolla">COROLLA</option>
                    <option value="prado">PRADO</option>
                    <option value="sienna">SIENNA</option>
                    <option value="mercedes-benz">MERCEDES BENZ</option>
                </select>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col text-slate-800 text-sm w-full md:flex-1">
                <label htmlFor="category" className="text-slate-500 text-[.7rem]">Category</label>
                <select onChange={handleChange} name="category" id="car-model" className="border-b border-gray-400" required>
                    <option value="" disabled selected>Select Category</option>
                    <option value="hourly">HOURLY</option>
                    <option value="airport">AIRPORT</option>
                    <option value="daily">DAILY</option>
                </select>
              </div>
              
              <div className="flex flex-col text-slate-800 text-sm w-full md:flex-1">
                <label htmlFor="pickup-date" className="text-slate-500 text-[.7rem]">Pickup Date</label>
                 <input type="date" name="date" id="pickup-date" value='2025-08-09' className="border-b border-gray-400" required/>
                </div>
            </div>
          </article>
          
       {price > 0 ? (
  <p className="text-center p-2 px-4 rounded-[1rem] text-[.7rem] md:text-[.8rem] text-slate-600 bg-gray-200 md:mx-auto max-w-[90%] tracking-widest mx-[2rem]">
    Estimated Price: ₦{price.toLocaleString()}
  </p>
) : (
  <p className="text-center p-2 px-4 rounded-[1rem] text-[.7rem] md:text-[.8rem] text-slate-600 bg-gray-200 md:mx-auto max-w-[90%] tracking-widest mx-[2rem]">
    Select city, car model and category to show price
  </p>
)}
          <div className="flex flex-col md:flex-row p-6 gap-6 items-center justify-between">
            <div className="md:flex-1 w-full">
               <label htmlFor="firstName" className="text-slate-500 text-[.7rem]">First Name</label>
              <input onChange={handleChange} type="text" name="firstName" id="firstName"  className="border-b border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" required/>
            </div>
            <div className="md:flex-1 w-full">
               <label htmlFor="lastName" className="text-slate-500 text-[.7rem]">Last Name</label>
              <input onChange={handleChange} type="text" name="lastName" id="lastName" className="border-b border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" required/>
            </div>
          </div>

          <div className="flex flex-col md:flex-row p-6 gap-6 items-center justify-between">
            <div className="md:flex-1 w-full">
               <label htmlFor="email" className="text-slate-500 text-[.7rem]">Email</label>
              <input onChange={handleChange} type="email" name="email" id="email"  className="border-b border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" required/>
            </div>
            <div className="md:flex-1 w-full">
               <label htmlFor="phone" className="text-slate-500 text-[.7rem]">Phone</label>
              <input onChange={handleChange} type="number" name="phone" id="phone" className="border-b border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" required/>
            </div>
          </div>

          <div className="flex flex-row md:flex-row p-6 gap-6 items-center justify-between">
            <input onChange={handleChange} type="checkbox" name="policy" id="policy" required/>
            <p className="text-[.7rem] text-slate-700">By proceeding, I acknowledge that I have read and agreed to Flynow's terms & conditions</p>
          </div>
          <button type="submit" className="bg-amber-500 font-semibold cursor-pointer active:scale-[0.95] transition duration-300 text-white m-6 p-3 rounded-[.5rem]">Submit</button>
          {isSubmit && <p className="m-6 text-sm text-amber-500">Sent Successfully</p> }
        </form>

        <section className="md:p-4 space-x-4 flex flex-col items-center flex-1">
        <img className="md:w-full" src="https://res.cloudinary.com/diapyzzws/image/upload/v1741360717/rent-vehicle_1_mhkisc.png" alt="A Car" />
        <div className="mb-[4rem] md:mb-[0rem] md:max-w-[80%]">
          <h1 className="font-semibold md:text-3xl text-xl text-slate-800">Rent a vehicle with ease</h1>
          <p className="text-slate-500 text-sm my-[1rem]">Enhance your driving experience with the right rental to suit your transportation needs. With a wide range of vehicle models and sizes, our vehicles are reliable and in good condition.</p>
        </div>
      </section>
      </section>

      <section className="container mx-auto my-[3rem] grid grid-cols-2 place-items-center gap-4 md:flex md:items-center md:justify-center md:space-x-[6rem] md:my-[8rem]">
        <img src="https://res.cloudinary.com/diapyzzws/image/upload/v1682565809/Website%20Images/iataLogoColoured.svg" alt="IATA" />
        <img src="https://res.cloudinary.com/diapyzzws/image/upload/v1682565809/Website%20Images/paystackLogoColoured.svg" alt="Paystack" />
        <img src="https://res.cloudinary.com/diapyzzws/image/upload/v1682565809/Website%20Images/flutterwaveLogoColoured.svg" alt="flutterwave" />
        <img src="https://res.cloudinary.com/diapyzzws/image/upload/v1682565809/Website%20Images/InterswitchLogoColoured.svg" alt="interswitch" />
        </section>
        </div>
      <Footer/>
    </div>
  )
}

export default RentCar