import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const PaymentModal = ({ closeModal, isOpen, issue }) => {
  const { user } = useAuth();
  const { id, category, title, location } = issue || {};
  const navigate = useNavigate();
   const Location = useLocation();
  const from = Location.state || "/issuedetails/:id";

  const handlePayment = async (e) => {
    e.preventDefault();

    const paymentInfo = {
      title,
      name: e.target.name.value,
      category,
      location: e.target.location.value,
      created_at: new Date(),
      donete_amount: e.target.donete_amount.value,
      payByEmail: user.email,

      clinte: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    // const { data } = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/create-checkout-session`,
    //   paymentInfo,
    // );

    await fetch(
      `https://public-infrastructure-system-server.vercel.app/payment/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      },
    )
      .then((res) => res.json())
      navigate(from, { replace: true });
      Swal.fire({
              title: "Well Done!",
              icon: "success",
              draggable: true,
              
            })
            // closeModal=true
      .catch((error) => {
        console.log(error);
      });

    // window.location.href = data.url;
  };

  return (
    <Dialog
  open={isOpen}
  as="div"
  className="relative z-10 focus:outline-none"
  onClose={closeModal}
>
  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4">
      <DialogPanel
        transition
        className="w-full max-w-md bg-white dark:bg-slate-800 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl transition-colors"
      >
        <DialogTitle
          as="h3"
          className="text-lg font-medium text-center leading-6 text-gray-900 dark:text-white transition-colors"
        >
          Make Payment
        </DialogTitle>

        <div className="card border my-20 border-orange-200 dark:border-slate-600 bg-orange-100 dark:bg-slate-700 w-full max-w-xl mx-auto shadow-2xl rounded-2xl transition-colors">
          <div className="card-body p-6 relative">
            <form onSubmit={handlePayment} className="space-y-4">

              <div>
                <label className="label font-medium dark:text-gray-200">
                  Issue Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="input w-full rounded-full bg-white dark:bg-slate-900 dark:text-white focus:border-0 focus:outline-gray-200 dark:focus:outline-slate-600 transition-colors"
                  defaultValue={issue?.title}
                  readOnly
                />
              </div>

              <div>
                <label className="label font-medium dark:text-gray-200">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="input w-full rounded-full bg-white dark:bg-slate-900 dark:text-white focus:border-0 focus:outline-gray-200 dark:focus:outline-slate-600 transition-colors"
                  placeholder="Enter Location"
                />
              </div>

              <div className="flex gap-4 flex-3">
                <div className="w-lg">
                  <label className="label font-medium dark:text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="input w-full rounded-full bg-white dark:bg-slate-900 dark:text-white focus:border-0 focus:outline-gray-200 dark:focus:outline-slate-600 transition-colors"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="label font-medium dark:text-gray-200">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="donete_amount"
                    required
                    className="input w-full rounded-full bg-white dark:bg-slate-900 dark:text-white focus:border-0 focus:outline-gray-200 dark:focus:outline-slate-600 transition-colors"
                    placeholder="Enter Amount"
                  />
                </div>
              </div>

              <div>
                <label className="label font-medium dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  name="payByEmail"
                  required
                  className="input w-full rounded-full bg-white dark:bg-slate-900 dark:text-white focus:border-0 focus:outline-gray-200 dark:focus:outline-slate-600 transition-colors"
                  value={user?.email}
                  readOnly
                />
              </div>

              <div className="flex mt-2 justify-around">

                <button
                  type="submit"
                  className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 dark:bg-green-600 dark:text-white px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 dark:hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-colors"
                >
                  Pay
                </button>

                <button
                  type="button"
                  className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 dark:bg-red-600 dark:text-white px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 dark:hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-colors"
                  onClick={closeModal}
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        </div>
      </DialogPanel>
    </div>
  </div>
</Dialog>
  );
};

export default PaymentModal;
