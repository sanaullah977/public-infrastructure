import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import LoadingSpinner from "../Dashboard/Common/LoadingSpinner";

const PaymentHistory = () => {
  const payment = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (payment) {
      setLoading(false);
    }
  }, [payment]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center my-6">
        Payment History: ({payment.length})
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table table-zebra w-full text-sm sm:text-base">
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

export default PaymentHistory;
