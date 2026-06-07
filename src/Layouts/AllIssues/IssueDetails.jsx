import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import PaymentModal from "../../Component/Model/PaymentModal";
import useRole from "../../Hooks/useRole";

const IssueDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = use(AuthContext);
  const [role] = useRole();

  useEffect(() => {
    fetch(
      `https://public-infrastructure-system-server.vercel.app/issues/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setIssue(data.result);
        setLoading(false);
      });
  }, [user, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-slate-900 text-gray-800 dark:text-white font-medium">
        Loading...
      </div>
    );
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: e.target.title.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      resolve_bugget: e.target.resolve_bugget.value,
    };

    setIsUpdating(true);
    try {
      const res = await fetch(
        `https://public-infrastructure-system-server.vercel.app/issues/${issue?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Issue details have been updated.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setIssue((prev) => ({ ...prev, ...updatedData }));
        setIsEditModalOpen(false);
      } else {
        throw new Error("Failed to update issue.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update issue.",
        icon: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://public-infrastructure-system-server.vercel.app/issues/${issue?._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
          .then((res) => res.json())
          .then(() => {
            navigate("/allissues");

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="bg-orange-100 p-1 dark:bg-slate-800 rounded-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto rounded-3xl px-4 sm:px-6 lg:px-10 py-6 lg:py-10 my-10 bg-orange-50  dark:bg-slate-600 shadow-md dark:shadow-slate-900/40 transition-colors duration-300">
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          
          <img
            className="w-full sm:w-[80%] md:w-[60%] lg:w-[400px] 
                       h-[250px] sm:h-[280px] md:h-[300px] 
                       object-cover rounded-xl shadow-md"
            src={issue?.image}
            alt=""
          />

          <div className="flex flex-col w-full">

            <div className="mb-4 text-center lg:text-left">
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white transition-colors duration-300">
                {issue?.title}
              </h2>
            </div>

            <div className="mb-6 text-center lg:text-left">
              <p className="text-gray-500 dark:text-gray-300 transition-colors duration-300">
                {issue?.description}
              </p>
            </div>

            <div
              className="flex flex-col md:flex-row justify-between 
                          gap-4 mb-6 text-center md:text-left"
            >
              <div className="flex gap-1 justify-center md:justify-start">
                <span className="font-bold text-[18px] text-gray-900 dark:text-gray-200">
                  Category :
                </span>
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                  {issue?.category}
                </span>
              </div>

              <div className="flex justify-center md:justify-start">
                <span className="font-bold text-[18px] text-gray-900 dark:text-gray-200">
                  Resolve Amount : {issue?.resolve_bugget}$
                </span>
              </div>
            </div>

            <div
              className="flex flex-col md:flex-row items-center 
                          justify-between gap-4 mb-6 
                          text-center md:text-left"
            >
              <div>
                <span className="text-gray-500 dark:text-gray-400 block">
                  Provided By : {issue?.repoted_by}
                </span>
                <span className="text-gray-500 dark:text-gray-400 block">
                  Email: {issue?.providerEmail}
                </span>
              </div>

              <div className="w-full md:w-auto">
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 text-white w-full md:w-auto transition-colors duration-300"
                >
                  Pay
                </button>

                <PaymentModal
                  issue={issue}
                  closeModal={closeModal}
                  isOpen={isOpen}
                />
              </div>
            </div>

            {role === "admin" && (
              <div className="flex flex-row sm:flex-row gap-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="btn bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 text-white flex-1 md:flex-none w-full sm:w-auto transition-colors duration-300"
                >
                  Update
                </button>

                <button
                  onClick={handleDelete}
                  className="btn bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 text-white flex-1 md:flex-none w-full sm:w-auto transition-colors duration-300"
                >
                  Resolve
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Edit Issue Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl mx-4 transition-colors overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Update Issue Info</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issue Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={issue?.title || ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={issue?.category || ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                >
                  <option value="Garbage">Garbage</option>
                  <option value="Illigal Construction">Illigal Construction</option>
                  <option value="Road Damage">Road Damage</option>
                  <option value="Broken Public Property">Broken Public Property</option>
                  <option value="Electric Issue">Electric Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={issue?.location?.address || issue?.location || ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={issue?.description || ""}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={issue?.image || ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resolve Budget ($)</label>
                <input
                  type="number"
                  name="resolve_bugget"
                  defaultValue={issue?.resolve_bugget || ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold disabled:opacity-50"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
