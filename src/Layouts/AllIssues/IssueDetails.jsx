import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import PaymentModal from "../../Component/Model/PaymentModal";

const IssueDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = use(AuthContext);
  const [refetch, setRefecth] = useState(false);

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
  }, [user, id, refetch]);

  const closeModal = () => {
    setIsOpen(false);
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
          .then((data) => {
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
    <div className="bg-orange-100 rounded-3xl">
      <div className="max-w-7xl mx-auto rounded-3xl px-4 sm:px-6 lg:px-10 py-6 lg:py-10 my-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <img
            className="w-full sm:w-[80%] md:w-[60%] lg:w-[400px] 
                     h-[250px] sm:h-[280px] md:h-[300px] 
                     object-cover rounded-4xl shadow-md"
            src={issue?.image}
            alt=""
          />

          <div className="flex flex-col w-full">
            <div className="mb-4 text-center lg:text-left">
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
                {issue?.title}
              </h2>
            </div>

            <div className="mb-6 text-center lg:text-left">
              <p className="text-gray-400">{issue?.description}</p>
            </div>

            <div
              className="flex flex-col md:flex-row justify-between 
                          gap-4 mb-6 text-center md:text-left"
            >
              <div className="flex gap-1 justify-center md:justify-start">
                <span className="font-bold text-[18px]">Category :</span>
                <span className="font-semibold text-gray-500">
                  {issue?.category}
                </span>
              </div>

              <div className="flex justify-center md:justify-start">
                <span className="font-bold text-[18px]">
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
                <span className="text-gray-400 block">
                  Provided By : {issue?.repoted_by}
                </span>
                <span className="text-gray-400 block">
                  Email: {issue?.providerEmail}
                </span>
              </div>

              <Link to={""} className="w-full md:w-auto">
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn bg-amber-400 text-white w-full md:w-auto"
                >
                  pay
                </button>

                <PaymentModal
                  issue={issue}
                  closeModal={closeModal}
                  isOpen={isOpen}
                />
              </Link>
            </div>

            <div className="flex flex-row sm:flex-row gap-4">
              <button className="btn bg-amber-400 text-white flex-1 md:flex-none w-full sm:w-auto">
                Update
              </button>

              <button
                onClick={handleDelete}
                className="btn bg-amber-400 text-white flex-1 md:flex-none w-full sm:w-auto"
              >
                Resolve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
