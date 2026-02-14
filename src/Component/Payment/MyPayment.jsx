import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const MyPayment = () => {

  

  
   const { user } = useAuth();
   console.log(user)
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState([]);

   useEffect(() => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
  // http://localhost:3000/payment
      fetch(`https://public-infrastructure-system-server.vercel.app/payment?email=${user.email}`,{
       headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPayment(data);
          console.log(data)
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load issues:", err);
          setLoading(false);
        });
    }, [user?.email]);
    return (
        <div className="flex flex-col justify-center items-center h-full bg-gray-100 p-10">
      <h2 className="text-4xl font-bold p-3">My Payments({payment.length})</h2>
      
      <div className="flex justify-between w-[1400px] items-center">
        <h3 className="text-2xl font-bold">
            
             Payment List</h3>
        <select value='none' 
        // onChange={e=> setList(e.target.value)}
        >
            <option value="none">Sort by Price</option>
            <option value="price-asc">Low-High</option>
            <option value="price-desc">High-Low</option>
          </select>
      </div>
      

        {
          payment.map(p =>(
          <div
           kay={p.id} 
           className="flex justify-between w-[1400px] bg-white rounded-2xl items-center my-2">
            <div className="flex items-center gap-3 p-5">
          <img className="h-12 rounded-b-lg " src=
          {p.clinte.image} 
          alt="" />
          <div>
            <h4>
                {p.title}
                </h4>
            <div className="flex gap-3">
              <span className="flex gap-1">
                <img className="h-5 " src=''
                // {arrow} 
                alt="" />
                {p.downloads}
              </span>
              <span className="flex gap-1">
                <img className="h-5 " src=""
                // {tara} 
                alt="" />
                {p.ratingAvg}
              </span>
              <span>
                {p.donete_amount}
                $</span>
            </div>
          </div>
        </div>
        <button
        //  onClick={ () => handleRemove (p.id) }
          className="btn bg-orange-400 mr-3 text-white">Delete</button>
        
        </div>
          )
            
          )
        }
        
      
    </div>
    );
};

export default MyPayment;