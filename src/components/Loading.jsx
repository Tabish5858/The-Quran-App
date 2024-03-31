import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <img src="loading.png" alt="loading.png" width={40} height={40}
      className='animate-spin'
      />
    </div>
  )
}

export default Loading
