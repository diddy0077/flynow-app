import logo from '../assets/flynow-logo.png'
import logo2 from '../assets/flynow-logo-blue.png'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LanguageDropdown from './LanguageDropdown'
import { useLocation, useNavigate } from "react-router-dom";


function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  
  function closeNav() {
   setIsNavOpen(false)
 }
 
  const location = useLocation();
  const navigate = useNavigate();

  function handleBookNow() {
    if (location.pathname === "/") {
      // Already on homepage → scroll to form
      document.getElementById("search-form")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // On another page → redirect with a query param
      navigate("/?scrollToForm=true");
    }
  }
  
  function handleClick() {
     setIsNavOpen(prev => !prev)
  }
  return (
    <header className="flex items-center justify-between p-4 px-6 text-white bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.25)] md:bg-indigo-900 md:min-h-[70px]">
      <a href="/" className='hidden md:block'>
        <img className='w-[50px] md:w-[45px] h-[auto] rounded-full hidden md:block' src={logo} alt="logo" loading="lazy"/>
      </a>
      <a href="/" className='md:hidden'>
        <img className='w-[50px] md:w-[45px] h-[auto] rounded-full md:hidden' src={logo2} alt="logo" loading="lazy"/>
      </a>
      <nav className={`h-[100%] w-[250px] bg-indigo-900 fixed bottom-0 top-0 left-0 ${isNavOpen ? 'translate-x-0' : 'translate-x-[-100%]'} md:translate-x-[0%] md:text-white md:static md:h-full md:w-full transition duration-500 md:p-0 space-y-4 md:space-y-0 z-40`}>
        <ul className='flex items-start space-x-2 flex-col md:flex-row md:justify-center text-[1rem] md:text-[.9rem] font-[600] space-y-3 md:space-y-0 mt-8 md:mt-0'>
          <div className='flex items-center justify-center md:justify-start w-full md:w-auto'>
            <NavLink to="/" onClick={closeNav} className="text-[.8rem] md:text-[.9rem] hover:text-amber-400 cursor-pointer border-b-1 w-full p-4 pb-2 md:border-b-0 md:w-1/18 relative inline-block md:before:content-[''] md:before:absolute md:before:-bottom-0 md:before:left-4 md:before:w-[0] md:before:h-[2px] md:before:bg-amber-400 md:before:transition-all md:before:duration-300 md:hover:before:w-full">HOME</NavLink>
          </div>
          <div className='flex items-center justify-center md:justify-start w-full md:w-auto'>
            <NavLink to="/about" onClick={closeNav} className="text-[.8rem] md:text-[.9rem] hover:text-amber-400 cursor-pointer border-b-1 w-full p-4 pb-2 md:border-b-0 md:w-1/18 relative inline-block md:before:content-[''] md:before:absolute md:before:-bottom-0 md:before:left-4 md:before:w-[0] md:before:h-[2px] md:before:bg-amber-400 md:before:transition-all md:before:duration-300 md:hover:before:w-full">ABOUT</NavLink>
          </div>
          
          <div className='flex items-center justify-center md:justify-start w-full md:w-auto'>
            <NavLink to="/hotels" onClick={closeNav} className="text-[.8rem] md:text-[.9rem] hover:text-amber-400 cursor-pointer border-b-1 w-full p-4 pb-2 md:border-b-0 md:w-1/18 whitespace-nowrap relative inline-block before:content-[''] before:absolute md:before:content-[''] md:before:absolute md:before:-bottom-0 md:before:left-4 md:before:w-[0] md:before:h-[2px] md:before:bg-amber-400 md:before:transition-all md:before:duration-300 md:hover:before:w-full">HOTELS</NavLink>
          </div>
          <div className='flex items-center justify-center md:justify-start w-full md:w-auto'>
            <NavLink to="/deals" onClick={closeNav} className="text-[.8rem] md:text-[.9rem] hover:text-amber-400 cursor-pointer border-b-1 w-full p-4 pb-2 md:border-b-0 md:w-1/18 relative inline-block before:content-[''] md:before:content-[''] md:before:absolute md:before:-bottom-0 md:before:left-4 md:before:w-[0] md:before:h-[2px] md:before:bg-amber-400 md:before:transition-all md:before:duration-300 md:hover:before:w-full">DEALS</NavLink>
          </div>
          <div className='flex items-center justify-center md:justify-start w-full md:w-auto'>
            <NavLink to="/rent-car" onClick={closeNav} className="text-[.8rem] md:text-[.9rem] hover:text-amber-400 cursor-pointer border-b-1 w-full p-4 pb-2 md:border-b-0 md:w-1/18 whitespace-nowrap relative inline-block md:before:content-[''] md:before:absolute md:before:-bottom-0 md:before:left-4 md:before:w-[0] md:before:h-[2px] md:before:bg-amber-400 md:before:transition-all md:before:duration-300 md:hover:before:w-full">RENT A CAR</NavLink>
          </div>
          <div className='flex items-center justify-center md:justify-start w-full md:w-auto'>  
            <NavLink to="/contact" onClick={closeNav} className="text-[.8rem] md:text-[.9rem] hover:text-amber-400 cursor-pointer border-b-1 w-full p-4 pb-2 md:border-b-0 md:w-1/18 relative inline-block md:before:content-[''] md:before:absolute md:before:-bottom-0 md:before:left-4 md:before:w-[0] md:before:h-[2px] md:before:bg-amber-400 md:before:transition-all md:before:duration-300 md:hover:before:w-full">CONTACT</NavLink>
          </div>
        </ul>
        <button
  className='whitespace-nowrap font-[600] font-primary border border-amber-400 border-[2px] text-[.7rem] p-2 rounded-full px-4 cursor-pointer md:hidden hover:bg-amber-400 md:hover:text-indigo-900 ml-4 md:ml-0 mt-2 md:mt-0 transition duration-300'
  onClick={handleBookNow}
>
  Book now
</button>
        <a href="/" className='md:hidden'>
          <img className='w-[50px] md:w-[50px] m-4 h-[auto] rounded-full md:hidden absolute bottom-0' loading="lazy" src={logo} alt="logo"/>
        </a>
      </nav>
      <div onClick={handleClick} className={`hamburger w-[35px] flex flex-col space-y-1 cursor-pointer z-50 ${isNavOpen ? "active" : "not-active"}`}>
        <span className='bg-indigo-800 h-[4px] rounded-full w-[100%] transition duration-300'></span>
        <span className='bg-indigo-800 h-[4px] rounded-full w-[100%] transition duration-300'></span>
        <span className='bg-indigo-800 h-[4px] rounded-full w-[100%] transition duration-300'></span>
      </div>
     
      <button
  className='whitespace-nowrap font-[600] font-primary border border-amber-400 border-[2px] text-[.7rem] p-2 rounded-full px-4 cursor-pointer hidden md:flex hover:bg-amber-400 md:hover:text-indigo-900 transition duration-300'
  onClick={handleBookNow}
>
  Book now
</button>
    </header>
  )
}

export default Header