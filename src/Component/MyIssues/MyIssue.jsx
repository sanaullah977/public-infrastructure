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

    fetch(`http://localhost:3000/issues?email=${user.email}`,{
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
  }, [user?.email]); // ← dependency added (good practice)

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
    <div className="min-h-screen bg-orange-50/70 px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-800">
          My Reports ({issues.length})
        </h1>

        {issues.length === 0 ? (
          <div className="text-center py-16 md:py-24 text-gray-600 text-lg md:text-xl">
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
                <div className="card bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                  <figure className="bg-gray-50 flex items-center justify-center p-4 md:p-6 h-44 sm:h-48 md:h-52">
                    <img
                      className="object-contain w-full h-full max-h-40 md:max-h-48 transition-transform duration-500 group-hover:scale-105"
                      src={issue.image || "/placeholder.jpg"}
                      alt={issue.title || "Reported issue"}
                      onError={(e) => {
                        e.target.src = "/placeholder.jpg"; // fallback
                      }}
                    />
                  </figure>

                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <h2 className="card-title text-lg md:text-xl font-semibold text-gray-800 line-clamp-2 mb-2">
                      {issue.title}
                    </h2>

                    <p className="text-gray-600 text-sm md:text-base line-clamp-3 mb-3 flex-grow">
                      {issue.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-100">
                      <div className="badge badge-outline text-orange-600 bg-orange-50 px-3 py-1 text-sm font-medium">
                        {issue.category}
                      </div>

                      {issue.location?.address && (
                        <div className="text-sm text-gray-500 line-clamp-1 max-w-[60%] text-right">
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