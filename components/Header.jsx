import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return <div className='container mx-auto px-10 mb-8'>
    <div className='border-b w-full inline-block border-white py-8'>
      <div className='md:float-left block'>
          <Link href="/">
              <span className='cursor-pointer text-3xl font-bold text-white'>
                codelearner
              </span>
          </Link>
      </div>
      <div className='md:float-left md:contents hidden'>
          {
            categories.map((category,index)=>(
              <Link key={index} href={`/category/${category.slug}`} >
                <span className='md:float-right mt-2 ml-4 align-middle text-white font-bold cursor-pointer'>
                  {category.name}
                </span>
              </Link>
            ))
          }
      </div>
    </div>
  </div>;
};

export default Header;
