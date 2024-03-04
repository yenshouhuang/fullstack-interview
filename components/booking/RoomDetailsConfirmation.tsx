import { RoomDetailsConfirmationProps } from "@/types";
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BackgroundInfoFormProps, PricingType } from "@/types";
import Image from "next/image";

const RoomDetailsConfirmation = ({
  isOpen,
  closeModal,
  house,
  setStep,
  bookingState,
  setBookingState,
}: RoomDetailsConfirmationProps) => {

  // State hooks for validation and form submission
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  
  // Effect hooks for validation
  useEffect(() => {
    if (bookingState.startDate && house?.availableDate) {
      setIsStartDateValid(new Date(bookingState.startDate) >= new Date(house.availableDate));
    }
  }, [bookingState.startDate, house?.availableDate]);

  // Effect hook to calculate the end date based on the start date and lease term
  useEffect(() => {
    if (bookingState.roomDetails.startDate && house?.availableDate) {
      setIsStartDateValid(new Date(bookingState.roomDetails.startDate) >= new Date(house.availableDate));
    }
  }, [bookingState.roomDetails.startDate, house?.availableDate]);

  useEffect(() => {
    if (bookingState.roomDetails.startDate && bookingState.roomDetails.leaseTerm) {
      const startDateObj = new Date(bookingState.roomDetails.startDate);
      startDateObj.setMonth(startDateObj.getMonth() + parseInt(bookingState.roomDetails.leaseTerm));
      const endDateStr = startDateObj.toISOString().split('T')[0]; // Format YYYY-MM-DD
      setBookingState({
        ...bookingState,
        roomDetails: {
          ...bookingState.roomDetails,
          endDate: endDateStr,
        },
      });
    }
  }, [bookingState.roomDetails.startDate, bookingState.roomDetails.leaseTerm, setBookingState]);
  
  // Function to handle input changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setBookingState({
      ...bookingState,
      roomDetails: {
        ...bookingState.roomDetails,
        [name]: value,
      },
    });
  };
  
  // Function to handle the next page
  const handleNextPage = () => {
    if (isStartDateValid && isFormValid()) {
      setBookingState({
        ...bookingState,
        confirmed: true,
      });
      setStep(2);
    } else {
      setAttemptedSubmit(true); 
    }
  };

  // Function to calculate the monthly price
  const calculateMonthlyPrice = () => {
    const termPrice = house.pricing.monthlyPricing.find((term:any)=>{

        return term.months === parseInt(bookingState.roomDetails.leaseTerm)
    })

    if (!termPrice) {
      return "not available";
    } else {
      return `$${(termPrice.amount / termPrice.months).toFixed(2)}`;
    }

  }

  // Function to check if the form is valid
  const isFormValid = () => {
    
    const {leaseTerm, startDate} = bookingState.roomDetails;
    return bookingState.roomDetails.leaseTerm && bookingState.roomDetails.startDate;
  }

  return (
    <div className="relative w-full  overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
      <Dialog.Title as="h2" className="text-xl font-bold leading-6 text-gray-900">
        Room Details
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Confirm Your Booking Details
        </p>
      </div>
      {/* Form fields for lease term, start date, end date, and property details */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div>
          Property Name: <span className="font-semibold">{house.propertyName}</span>
        </div>
        <div>
          Address: <span className="font-semibold">{house.address.fullAddress}</span>
        </div>
        <div>
          Earliest Available Date: <span className="font-semibold">{house.availableDate}</span>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="leaseTerm" className="block text-sm font-medium text-gray-700">Lease Term</label>
          <select
            id="leaseTerm"
            name="leaseTerm"
            value={bookingState.roomDetails.leaseTerm}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Lease Term</option>
            {house.pricing.monthlyPricing.map((pricing:PricingType , index:any) => (
              <option key={index} value={pricing.months}>
                {pricing.months} Months
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="date" id="startDate" name="startDate" value={bookingState.roomDetails.startDate} onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <span className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50">
            {bookingState.roomDetails.endDate || 'Select start date and lease term'}
          </span>
        </div>
      </div>

      <div>
        {/* Price calculation */}
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Monthly Rent:</label>
        {calculateMonthlyPrice()}
      </div>

      {!isStartDateValid && (
        <div className="text-red-500 p-3 bg-red-100 rounded-lg">
          House is not available on selected date.
        </div>
      )}
      {/* Alert message */}
      {attemptedSubmit && !isFormValid() && (
        <div className="text-red-500 p-3 bg-red-100 rounded-lg">
          Please fill in all fields to proceed.
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button onClick={() => setStep(0)} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Back
        </button>
        <button onClick={handleNextPage} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Next
        </button>
      </div>

      {/* Close Button with Image */}
      <button type="button" className="absolute top-0 right-0 m-4" onClick={() => setStep(-1)}>
        <Image src="/close.svg" alt="close" width={20} height={20} />
      </button>
    </div>
  );
};

export default RoomDetailsConfirmation;
