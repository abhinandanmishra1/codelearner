import React from 'react'
import Image from 'next/image'
const Author = ({author}) => {
  return (
    <div className='bg-white text-center mt-20 mb-8 p-12 relative rounded-lg bg-opacity-20 '>
      <div className='absolute right-0 left-0 -top-12'>
        <Image 
          alt={author.name}
          height="80px"
          width="80px"
          unoptimized
          className="align-middle rounded-full"
          src={author.photo.url}
        />
      </div>
      <h3 className='text-xl my-4 font-bold text-white'>{author.name}</h3>
      <p className='text-white text-lg'>{author.bio}</p>
    </div>
  )
}

export default Author