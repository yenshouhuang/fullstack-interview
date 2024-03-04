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

  // State to track if a submit attempt was made without all fields being valid
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Function to check the validity of the form by ensuring all required fields are filled
  const isFormValid = () => {
    const { firstName, lastName, email, phone, salary } = bookingState.background;
    return firstName && lastName && email && phone && salary;
  };
  
  // Handles input changes by updating the bookingState with new values
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setBookingState({
      ...bookingState,
      background: {
        ...bookingState.background,
        [name]: value,
      },
    });
  };

  // Function to handle moving to the next page; if form is valid, proceed, otherwise indicate submission attempt
  const handleNextPage = () => {
    if (isFormValid()) {
      setStep(1);
    } else {
      setAttemptedSubmit(true); 
    }
  };


  return (
    <div className="relative w-full overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
      <Dialog.Title
        as="h2"
        className="text-xl font-bold leading-6 text-gray-900"
      >
        Background Information
      </Dialog.Title>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <p className="text-sm text-gray-500">
          Please fill in your background information.
        </p>
      </div>

      {/* Input fields for background information */}
      {/* Each input field updates its respective part of the bookingState on change */}
      {/* The form includes basic validation and styling for focus */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={bookingState.background.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={bookingState.background.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={bookingState.background.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingState.background.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-700"
          >
            Salary per year
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={bookingState.background.salary}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3 text-gray-700"
          />
        </div>
      </div>
      
      {/* Alert message */}
      {attemptedSubmit && !isFormValid() && (
        <div className="text-red-500 p-3 bg-red-100 rounded-lg">
          Please fill in all fields to proceed.
        </div>
      )}

      {/* Navigation buttons */}
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
