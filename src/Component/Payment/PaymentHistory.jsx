
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';


const PaymentHistory = () => {
    const { user } = useAuth();
    const payment = useLoaderData();
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (payment) {
          setLoading(false);
        }
      }, [payment]);

    // const { data: payments = [] } = useQuery({
    //     queryKey: ['payments', user.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/payments?email=${user.email}`)
    //         return res.data;
    //     }
    // })

    return (
        <div>
            <h2 className="text-3xl flex justify-center my-10">Payment History:(
                {payment.length})
                </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contributor</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Location</th>
                            <th>Paid Time</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td className='flex items-center gap-2 '><img className='size-8 rounded-lg' src={payment.clinte.image} alt="user Image" />{payment.clinte.name}</td>
                                <td>{payment.title}</td>
                                <td>${payment.donete_amount}</td>
                                 <td>{payment.location}</td>
                                <td>{payment.created_at}</td>
                               
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;