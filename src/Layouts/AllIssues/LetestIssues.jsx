import React from "react";
import { Link, useLoaderData } from "react-router";

const LetestIssues = () => {
  const data = useLoaderData();

  const recentArray = (arr) => {
    return arr.sort((a, b) => b._id.localeCompare(a._id));
  };

  const issuesView = recentArray(data).slice(0, 6);

  return (
    <div
      className="flex flex-col justify-center items-center rounded-2xl bg-orange-100 
                    px-4 sm:px-6 lg:px-10 py-10"
    >
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center mb-8">
        Letest Issues
      </h1>

      <div
        className="grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-3 
                        gap-6 sm:gap-8 lg:gap-10 
                        w-full 
                        max-w-7xl 
                        justify-items-center"
      >
        {issuesView.map((product) => (
          <Link
            key={product._id}
            to={`/issuedetails/${product._id}`}
            className="w-full flex justify-center"
          >
            <div
              className="card my-5 border-2 bg-white 
                                w-full max-w-[320px] 
                                h-[380px] 
                                shadow-md 
                                hover:scale-110  
                                transition ease-in-out duration-300"
            >
              <figure>
                <img
                  className="h-[180px] w-full object-cover p-5"
                  src={product.image}
                  alt="Apps"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>

                <h2 className="text-gray-600 text-sm md:text-base line-clamp-3 mb-3">
                  {product.description}
                </h2>

                <div className="card-actions justify-between">
                  <div className="badge badge-outline border-dashed text-orange-600 bg-orange-100">
                    {product.category}
                  </div>

                  {product.status && (
                    <div
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        product.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : product.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : product.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.status}
                    </div>
                  )}
                </div>

                <h2>{product.location.address}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LetestIssues;
