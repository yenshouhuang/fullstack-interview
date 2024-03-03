import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BackgroundInfoFormProps } from "@/types";
import Image from "next/image";

const BackgroundInfoForm = ({
  isOpen,
  closeModal,
  house,
  setStep,
  bookingState,
  setBookingState,
}: BackgroundInfoFormProps) => {
  const [firstName, setFirstName] = useState(bookingState.background.firstName);
  const [lastName, setLastName] = useState(bookingState.background.lastName);
  const [email, setEmail] = useState(bookingState.background.email);
  const [phone, setPhone] = useState(bookingState.background.phone);
  const [salary, setSalary] = useState(bookingState.background.salary);

  const handleNextPage = () => {
    setBookingState({
      ...bookingState,
      background: {
        firstName,
        lastName,
        email,
        phone,
        salary,
      },
    });

    setStep(1);
  };

  return (
    <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
      <Dialog.Title
        as="h2"
        className="text-xl font-bold leading-6 text-gray-900" 
      >
        Background Information
      </Dialog.Title>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <p className="text-sm text-gray-500">Please fill in your background information.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary per year</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(-1)}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Back
        </button>
        <button
          onClick={handleNextPage}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </div>

      {/* Close Button with Image */}
      <button
        type="button"
        className="absolute top-0 right-0 m-4"
        onClick={() => setStep(-1)}
      >
        <Image src="/close.svg" alt="close" width={20} height={20} />
      </button>
    </div>
  );
};

export default BackgroundInfoForm;

// <Transition appear show={true}>
//   <Dialog as="div" className="relative z-10" onClose={closeModal}>
//     <Transition.Child
//       as={Fragment}
//       enter="ease-out duration-300"
//       enterFrom="opacity-0"
//       enterTo="opacity-100"
//       leave="ease-in duration-200"
//       leaveFrom="opacity-100"
//       leaveTo="opacity-0"
//     >
//       <div className="fixed inset-0 bg-black bg-opacity-25" />
//     </Transition.Child>

//     <div className="fixed inset-0 overflow-y-auto">
//       <div className="flex min-h-full items-center justify-center p-4 text-center">
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100 scale-100"
//           leaveTo="opacity-0 scale-95"
//         >

//             <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//               Background Information
//             </Dialog.Title>
// <div className="mt-2">
//   <p className="text-sm text-gray-500">
//     Your content here. This is where you place any content inside the dialog.
//   </p>
// </div>

// <div className="mt-4">
//   <button
//     type="button"
//     className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//     onClick={closeModal}
//   >
//     Close
//   </button>
// </div>

// {/* Close Button with Image */}
// <button
//   type="button"
//   className="absolute top-0 right-0 m-4"
//   onClick={closeModal}
// >
//   <Image
//     src="/close.svg"
//     alt="close"
//     width={20}
//     height={20}
//   />
// </button>
//         </Transition.Child>
//       </div>
//     </div>
//   </Dialog>
// </Transition>
