import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    getCategories().then(newCategories=>setCategories(newCategories))
  },[])
  console.log(categories);
  return <div className='bg-white text-black shadow-lg rounded-lg p-8 mb-8'>
  <h3 className='text-black text-xl mb-8 font-semibold border-b pb-4'>
    Categories
  </h3>
  {categories.map((category)=>(
    <div>
      <Link className="text-black bg-green-50" href={`/category/${category.slug}`}>
      <span className='text-black cursor-pointer block pb-3 mb-3'>
        {category.name}
      </span>
    </Link>
    </div>
  ))}
  </div>
};

export default Categories;
