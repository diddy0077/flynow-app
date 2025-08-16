import travelwings from '../assets/travelwings.webp'
import kenya from '../assets/kenya.webp'
import onetravel from '../assets/onetravel.webp'
import mytrip from "../assets/mytrip.webp"
import auntbetty from "../assets/auntbetty.webp"
import aw from "../assets/aw.webp"
import newhorizon from '../assets/newhorizon.png'

function InfinityScroll() {
  return (
    <>
    <section class="recognition relative bg-indigo-900 mt-[5rem] pb-12">
    <div class="custom-shape-divider-bottom-1754002040">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill='white' class="shape-fill"></path>
    </svg>
</div>
        <h3 className="text-xl md:text-2xl max-w-[250px] md:max-w-full md:text-3xl text-center mx-auto font-bold text-center my-4 mb-2 tracking-widest text-white">✈️ Trusted by Airlines Worldwide.</h3>
        <p className='text-white text-center tracking-widest'>Some of our Sponsors.</p>
      <ul className="infinity-scroll-content">
        <li className="item item1"><img loading='lazy' src={travelwings} alt="brand-1"/></li>
        <li className="item item2"><img loading='lazy' src={kenya} alt="brand-2"/></li>
        <li className="item item3"><img loading='lazy' src={onetravel} alt="brand-3"/></li>
        <li className="item item5"><img loading='lazy' src={mytrip} alt="brand-5"/></li>
        <li className="item item6"><img loading='lazy' src={auntbetty} alt="brand-6"/></li>
          <li className="item item7"><img loading='lazy' src={aw} alt="brand-7" /></li>
          <li className="item item7"><img loading='lazy' src={newhorizon} alt="brand-7"/></li>
      </ul>
      </section>
         <div class="custom-shape-divider-bottom-1754002184">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill='#312E81' className="shape-fill"></path>
    </svg>
</div>
    </>
  )
}

export default InfinityScroll