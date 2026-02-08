import React, { use, useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import PaymentModal from '../../Component/Model/PaymentModal';

const IssueDetails = () => {

   const navigate = useNavigate();
  const { id } = useParams();
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen , setIsOpen] = useState(false)
  const { user } = use(AuthContext);
  const [refetch, setRefecth] = useState(false);

  //   const issue = useLoaderData();
  // const { _id } = useParams();
  // const details = issue?.result;
  // console.log(issue);

   useEffect(() => {
    fetch(`http://localhost:3000/issues/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIssue(data.result);
        console.log(" Api called!")
        console.log(data);
        setLoading(false);
      });
  }, [user, id, refetch]);

  const closeModal = () => {
    setIsOpen(false)
  }


  // const nevigate = useNavigate()

   const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/issues/${details?._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
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
      <div className="items-center md:w-[1000px] w-[448px]   rounded-3xl p-10  my-10 justify-center mx-auto">
        <div className="flex md:flex-row flex-col mx-auto md:w-[1400px] w-[448px] p-5 gap-5 justify-center items-center m-5">
          <img className="h-[300px] rounded-4xl shadow-md " src={issue?.image} alt="" />
          <div className=" flex flex-col">
            <div className=" md:w-[1020px] w-[448px] m-10 mb-5">
              <div className="flex items-center-safe gap-3">
                <h2 className="font-bold text-4xl">{issue?.title}</h2>
                {/* <div className="flex  py-8 gap-1 items-center">
                  <img className="h-[20px]" src={star} alt="" />
                  <span>{issue?.rating}</span>
                </div> */}
              </div>
              {/* <span className="text-gray-600 flex">
                $<span className=" text-3xl"> {issue?.resoleve_bugget}</span>
              </span> */}
            </div>
            <div className="m-10 mb-5">
              <p className=" text-gray-400 w-xl">{issue?.description}</p>
            </div>

            <div className="flex   flex-col">
              <div className="flex gap-50 m-10 mb-5">
                <div className="flex gap-1 items-center">
                  <span className="font-bold text-[18px]">Category : </span>
                  <span className="font-semibold text-gray-500">
                    {issue?.category}
                  </span>
                </div>

                <div className="flex gap-1  items-center">
                  <span className="font-bold text-[18px]">
                    Resolve Amount : {issue?.resolve_bugget}$
                  </span>
                  <span className="font-semibold text-gray-500">
                    {}
                  </span>
                </div>
              </div>
              <div className="flex  items-center w-xl justify-between m-10 mb-5 ">
                <div className="flex   flex-col">
                  <span className="text-gray-400">
                    Provided By : {issue?.repoted_by}
                  </span>
                  <span className="text-gray-400">
                    Email: {issue?.providerEmail}
                  </span>
                </div>

                <Link to={''}>
                <button
                onClick={() => setIsOpen(true)}
                  className="btn bg-amber-400  text-white"
                >
                 pay
                </button>
                <PaymentModal
            Issue={issue}
            closeModal={closeModal}
            isOpen={isOpen}
          />
                </Link>
              </div>

             <div>
               {/* <Link to={`/updatadb/${_id}`}> */}
               <button className="btn bg-amber-400 ml-10 mx-auto text-white"> Update </button>
               {/* </Link> */}
               {/* <hr className='my-6' /> */}
               
                <button 
                onClick={handleDelete} 
                className="btn bg-amber-400 ml-10 mx-auto text-white"> Resolve </button>

                
             </div>
             
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default IssueDetails
