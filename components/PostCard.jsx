import React from 'react';
import moment from 'moment';
import Link from 'next/link';
const PostCard = ({post}) => {
    console.log(post)
  return <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb'>
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img src={post .featuredImage.url} 
        alt={post.title}
        className="object-top absolute h-100 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1 className='transition duration-700 text-center mb-8 cursor-pointer
      hover:text-blue-800 text-3xl font-semibold text-black'>
        <Link href={`/post/${post.slug}`}>
          {post.title}
        </Link>
      </h1>
      <div className='text-black block lg:flex text-center items-center justify-center mb-8 w-full'>
          <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8' >
            <img src={post.author.photo.url}
             alt={post.author.name}
             height="20px"
             width="30px"
             className='align-midlle rounded-full' 
             />
             <p className=' align-middle text-gray-700 ml-2 text-lg'>{post.author.name}</p>
          </div>
      </div>
  </div>
};

export default PostCard;
