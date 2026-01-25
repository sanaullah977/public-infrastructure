import React from 'react'
import { Link, useLoaderData } from 'react-router';

const LetestIssues = () => {
    const data = useLoaderData()
   
    const recentArray = (arr) => {
  return arr.sort(
    (a, b) => b._id.localeCompare(a._id)
  );
};

    const issuesView = recentArray(data).slice(0,6);
  return (
    <div className='flex flex-col justify-center items-center rounded-2xl bg-orange-100 p-10'>
            
            <h1 className='font-bold text-4xl'>Letest Issues</h1>
           

 <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-10 items-center  justify-center md:p-10 sm:p-5 p-0 '>

  {
   issuesView.map(product => (
    <Link to={`/issuedetails/${product._id}`}> <div key={product._id} className="card my-5 border-2 bg-white w-80 h-80 shadow-md hover:scale-110  transition ease-in-out">
       <figure className=''>
         <img className='h-[180px] w-[220px] p-5'
           src={product.image}
           alt="Apps" />
       </figure>
       <div className="card-body">
         <h2 className="card-title">
           {product.title}
         </h2>
         <h2 className="">
           {product.description}
         </h2>
         <div className="card-actions justify-between">
           <div className="badge badge-outline border-dashed text-orange-600 bg-orange-100">{product.category}</div>
         </div>
         <h2 className="">
           {product.location.address}
         </h2>
         
       </div>
     </div></Link>
   ))
  }
 </div>

           
           
            
        </div>
  )
}

export default LetestIssues
