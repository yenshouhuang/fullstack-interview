import { RoomDetailsConfirmationProps } from "@/types";
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BackgroundInfoFormProps } from "@/types";
import Image from "next/image";

const RoomDetailsConfirmation = ({
  isOpen,
  closeModal,
  house,
  setStep,
  bookingState,
  setBookingState,
}: RoomDetailsConfirmationProps) => {
  const[startDate, setStartDate] = useState(bookingState.roomDetails.startDate);
  const[endDate, setEndDate] = useState(bookingState.roomDetails.endDate);

  const handleNextPage = () => {
    setBookingState({
      ...bookingState,
      confirmed: true,
      roomDetails: {
        // ...bookingState.roomDetails,
        startDate: startDate,
        endDate: endDate,
      },
      house: {
        id: house.id,
        propertyName: house.propertyName,
        address: house.address,
        availableDate: house.availableDate
      }
    });
    
    setStep(2);
  };

  return (
    <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
      <Dialog.Title as="h2" className="text-xl font-bold leading-6 text-gray-900">
        Room Details
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Confirm Your Booking Details
        </p>
      </div>
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
        <div className="flex flex-col">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="date" id="startDate" name="trip-start" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input type="date" id="endDate" name="trip-end" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
        </div>
      </div>

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
