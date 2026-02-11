import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import useAuth from "../../Hooks/useAuth";

const PaymentModal = ({ closeModal, isOpen, issue }) => {
  const { user } = useAuth();
  const { id, category, title, location } = issue || {};

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
      .then((data) => {
        console.log(data, "Successfully added!");
        console.log(paymentInfo);
      })
      .catch((error) => {
        console.log(error);
      });

    // window.location.href = data.url;
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Make Payment
            </DialogTitle>
            <div className="card border my-20 border-orange-200 bg-orange-100 w-full max-w-xl mx-auto shadow-2xl rounded-2xl">
              <div className="card-body p-6 relative">
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="label font-medium">Issue Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                      defaultValue={issue?.title}
                      readOnly
                      placeholder="Enter name"
                    />
                  </div>

                  <div>
                    <label className="label font-medium">Location</label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                      placeholder="Enter Location"
                    />
                  </div>

                  <div className="flex gap-4 flex-3">
                    <div className="w-lg">
                      <label className="label font-medium">Name </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="label font-medium">amount</label>
                      <input
                        type="number"
                        name="donete_amount"
                        required
                        className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                        placeholder="Enter Amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label font-medium"> Email</label>
                    <input
                      type="email"
                      name="payByEmail"
                      required
                      className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                      // placeholder={user?.email}
                      value={user?.email}
                      readOnly
                    />
                  </div>
                  <div className="flex mt-2 justify-around">
                    <button
                      // onClick={handlePayment}
                      type="submit"
                      className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Pay
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
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
