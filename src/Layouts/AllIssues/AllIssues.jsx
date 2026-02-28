import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router";
import LoadingSpinner from "../../Component/Dashboard/Common/LoadingSpinner";

const AllIssues = () => {
  const [loading, setLoading] = useState(true);
  const data = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // category filter logic
  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((issue) => issue.category === selectedCategory);

  return (
   <div className="min-h-screen bg-orange-50/70 dark:bg-slate-900 px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
  <div className="max-w-7xl mx-auto">

    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-gray-800 dark:text-white transition-colors">
      All Issues ({filteredData.length})
    </h1>

    {/* Category Buttons */}
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {[
        "All",
        "Road Damage",
        "Broken Public Property",
        "Garbage",
        "Electric Issue",
        "Illigal Construction",
      ].map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${
              selectedCategory === cat
                ? "bg-orange-500 dark:bg-amber-500 text-white"
                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600 hover:bg-orange-50 dark:hover:bg-slate-700"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* ISSUE CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
      {filteredData.map((product) => (
        <Link
          to={`/issuedetails/${product._id}`}
          key={product._id}
          className="block group"
        >
          <div className="card bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">

            <figure className="bg-gray-50 dark:bg-slate-700 flex items-center justify-center p-4 md:p-6 h-44 sm:h-48 md:h-52 transition-colors">
              <img
                className="object-contain w-full h-full max-h-40 md:max-h-48 transition-transform duration-500 rounded-2xl group-hover:scale-105"
                src={product.image}
                alt={product.title || "Issue image"}
              />
            </figure>

            <div className="p-4 md:p-5 flex flex-col flex-grow">

              <h2 className="card-title text-lg md:text-xl font-semibold text-gray-800 dark:text-white line-clamp-2 mb-2 transition-colors">
                {product.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3 mb-3 flex-grow transition-colors">
                {product.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-slate-600 transition-colors">

                {/* Category Badge */}
                <div className="px-3 py-1 text-sm font-medium rounded-full text-orange-600 dark:text-amber-400 bg-orange-50 dark:bg-slate-700 transition-colors">
                  {product.category}
                </div>

                {/* Status Badge */}
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

                {/* Location */}
                {product.location?.address && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 max-w-[60%] text-right transition-colors">
                    {product.location.address}
                  </div>
                )}
              </div>

            </div>
          </div>
        </Link>
      ))}
    </div>

    {filteredData.length === 0 && (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg transition-colors">
        No issues found.
      </div>
    )}

  </div>
</div>
  );
};

export default AllIssues;
