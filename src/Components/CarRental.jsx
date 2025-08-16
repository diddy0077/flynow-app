function CarRental() {
  return (
    <>
      <section className="container mx-auto p-4 space-x-4 flex flex-col md:flex-row items-center">
        <img loading="lazy" className="md:w-2/3" src="https://res.cloudinary.com/diapyzzws/image/upload/v1741360717/rent-vehicle_1_mhkisc.png" alt="A Car" />
        <div className="mb-[4rem] md:mb-[0rem]">
          <h1 className="font-semibold md:text-3xl text-xl text-slate-800">Rent a vehicle with ease</h1>
          <p className="text-slate-500 text-sm my-[1rem]">Enhance your driving experience with the right rental to suit your transportation needs. With a wide range of vehicle models and sizes, our vehicles are reliable and in good condition.</p>
          <a href="/rent-car" className="bg-amber-500 text-white p-2 px-3 rounded font-medium active:scale-[0.95] transition duration-300 text-sm">Rent a Vehicle</a>
        </div>
      </section>
    </>
  )
}

export default CarRental