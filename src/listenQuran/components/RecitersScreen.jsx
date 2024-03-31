import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

const RecitersScreen = ({ reciters, reciterHandler }) => {
  const [activeId, setActiveId] = useState('')

  return (
    <div className='h-screen shadow-lg p-3 overflow-y-auto '>
      <h1 className='text-xl font-bold '>Reciters</h1> <hr />
      {reciters && reciters.length > 0 ? (
        reciters.map((reciter) => (
          <div key={reciter.id}>
            <div
              onClick={(e) => {
                reciterHandler(reciter)
                setActiveId(reciter.id)
              }}
              className={`flex text-left text-sm items-end py-0 cursor-pointer  ${
                reciter.id === activeId ? 'active' : ''
              }`}
            >
              <FaUserCircle className='text-3xl' />
              <span className='pl-3'>{reciter.name}</span> <br />
            </div>
            <hr />
          </div>
        ))
      ) : (
        <div className='text-center'>
          <span className='animate-spin'></span>
        </div>
      )}
    </div>
  )
}

export default RecitersScreen