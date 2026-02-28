import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // corrected import
import useAuth from "../../Hooks/useAuth";
import { ColorRing } from "react-loader-spinner";

const MyIssue = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);

  console.log(user)

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetch(`https://public-infrastructure-system-server.vercel.app/issues?email=${user.email}`,{
     headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        console.log(data)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load issues:", err);
        setLoading(false);
      });
  }, [user?.email]); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <ColorRing
visible={true}
height="80"
width="80"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50/70 dark:bg-slate-900 px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
  <div className="max-w-7xl mx-auto">

    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-800 dark:text-white transition-colors">
      My Reports ({issues.length})
    </h1>

    {issues.length === 0 ? (
      <div className="text-center py-16 md:py-24 text-gray-600 dark:text-gray-400 text-lg md:text-xl transition-colors">
        You haven't reported any issues yet.
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">

        {issues.map((issue) => (
          <Link
            to={`/issuedetails/${issue._id}`}
            key={issue._id}
            className="block group"
          >
            <div className="card bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">

              <figure className="bg-gray-50 dark:bg-slate-700 flex items-center justify-center p-4 md:p-6 h-44 sm:h-48 md:h-52 transition-colors">
                <img
                  className="object-contain w-full h-full max-h-40 md:max-h-48 transition-transform duration-500 group-hover:scale-105"
                  src={issue.image || "/placeholder.jpg"}
                  alt={issue.title || "Reported issue"}
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </figure>

              <div className="p-4 md:p-5 flex flex-col flex-grow">

                <h2 className="card-title text-lg md:text-xl font-semibold text-gray-800 dark:text-white line-clamp-2 mb-2 transition-colors">
                  {issue.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3 mb-3 flex-grow transition-colors">
                  {issue.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-slate-600 transition-colors">

                  <div className="px-3 py-1 text-sm font-medium rounded-full text-orange-600 dark:text-amber-400 bg-orange-50 dark:bg-slate-700 transition-colors">
                    {issue.category}
                  </div>

                  {issue.location?.address && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 max-w-[60%] text-right transition-colors">
                      {issue.location.address}
                    </div>
                  )}

                </div>

              </div>
            </div>
          </Link>
        ))}

      </div>
    )}

  </div>
</div>
  );
};

export default MyIssue;