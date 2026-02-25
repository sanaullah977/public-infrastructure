import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import LoadingSpinner from '../Dashboard/Common/LoadingSpinner';

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

     if (loading) return 
  <LoadingSpinner />

    
    return (
        <div className="px-4 sm:px-6 lg:px-10 py-6">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-center my-6">
        Payment History: ({payment.length})
      </h2>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table table-zebra w-full text-sm sm:text-base">
          {/* Head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Contributor</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Location</th>
              <th>Paid Time</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {payment.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>

                <td className="flex items-center gap-2 min-w-[180px]">
                  <img
                    className="size-8 rounded-lg object-cover"
                    src={payment.clinte.image}
                    alt="user"
                  />
                  <span className="truncate">{payment.clinte.name}</span>
                </td>

                <td className="min-w-[150px] truncate">{payment.title}</td>

                <td>{payment.category}</td>

                <td className="font-semibold">${payment.donete_amount}</td>

                <td>{payment.location}</td>

                <td className="min-w-[140px]">{payment.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyPayment;