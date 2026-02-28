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
  className="flex flex-col justify-center items-center rounded-2xl 
             bg-orange-100 dark:bg-slate-800
             px-4 sm:px-6 lg:px-10 
             transition-colors duration-300"
>
  <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl 
                 text-center mb-8
                 text-gray-800 dark:text-white
                 transition-colors">
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
          className="card my-5 
                     border-2 border-orange-200 dark:border-slate-600
                     bg-white dark:bg-slate-800
                     w-full max-w-[320px] 
                     h-[380px] 
                     shadow-md 
                     hover:scale-110  
                     transition-all duration-300"
        >
          <figure className="bg-gray-50 dark:bg-slate-700">
            <img
              className="h-[180px] w-full object-cover 
                         rounded-2xl p-5"
              src={product.image}
              alt={product.title || "Issue image"}
            />
          </figure>
          

          <div className="card-body">

            <h2 className="card-title text-gray-800 dark:text-white transition-colors">
              {product.title}
            </h2>

            <h2 className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3 mb-3 transition-colors">
              {product.description}
            </h2>
            <div className="border border-gray-200 dark:border-slate-600"></div>

            <div className="card-actions justify-between">
              

              <div className="badge badge-outline border-dashed 
                              text-orange-600 dark:text-amber-400
                              bg-orange-100 dark:bg-slate-700
                              dark:border-slate-500
                              transition-colors">
                {product.category}
              </div>
              

              {product.status && (
                <div
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                    product.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : product.status === "In Progress"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      : product.status === "Resolved"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300"
                  }`}
                >
                  {product.status}
                </div>
              )}
            </div>

            <h2 className="text-gray-700 dark:text-gray-400 text-sm mt-2 transition-colors">
              {product.location.address}
            </h2>

          </div>
        </div>
      </Link>
    ))}
  </div>
</div>
  );
};

export default LetestIssues;
