import car from '../assets/car.jpg'
import boat from '../assets/boat.jpg'
import food from '../assets/food.jpg'
import todo from '../assets/todo.jpg'
function OtherIssues() {
  const data = [
    {
      image: {
        src: car,
        alt: car
      },
      name: 'Rent a Car',
      description: 'The preservation of human life is the ultimate value, a pillar of ethics and the foundation.'
    },
      {
        image: {
          src: boat,
          alt: boat
      },
      name: 'Cruise Booking',
      description: 'I was always somebody who felt quite sorry for myself, what I had not got compared.'
    },
      {
        image: {
          src: todo,
          alt: todo
      },
      name: 'To Do List',
      description: 'The following article covers a topic that has recently moved to center stage–at least it seems.'
    },
      {
        image: {
          src: food,
          alt: food
        },
        
      name: 'Food Features',
      description: 'There are many kinds of narratives and organizing principles. Science is driven by evidence.'
    }
    
  ]


  return (
    <div> 
      <h2 className='font-secondary font-bold text-3xl text-center px-8 mt-15'>Other issues we can help you with</h2>
      <p className='text-slate-500 text-center my-2 px-8 text-[.9rem]'>We all live in an age that belongs to the young at heart. Life that is.</p>
      <div className='flex md:flex-row flex-col items-center justify-center gap-6 md:gap-8 mt-[4rem]'>
      {data.map((d) => {
        return <div>
          <img className='other-issues-image transition duration-300 cursor-pointer w-full' src={d.image.src} alt={d.image.alt} loading='lazy'/>
          <h3 className='font-semibold text-[1.2rem] my-3'>{d.name}</h3>
          <p className='max-w-[310px] md:max-w-[260px] text-gray-500 text-[.8rem]'>{d.description}</p>
          </div>
      })}
        </div>
    </div>
  )
}

export default OtherIssues