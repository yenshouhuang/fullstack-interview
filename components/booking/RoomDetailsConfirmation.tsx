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
    <div>
      <Dialog.Title
        as="h2"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Room Details
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Confirm Your Booking Details
        </p>
      </div>
      <div>
        <br />
        Property Name: {house.propertyName}
        <br />
        Address: {house.address.fullAddress}
        <br />
        Earliest Available Date: {house.availableDate}
        <br />
        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="start" name="trip-start" onChange={(e) => setStartDate(e.target.value)}/>
        <br />
        <label htmlFor="endDate">End Date</label>
        <input type="date" id="end" name="trip-end" onChange={(e) => setEndDate(e.target.value)}/>
      </div>

      <div className="mt-4">
        <button onClick={handleNextPage}>Next</button>
        <button onClick={() => setStep(0)}>Back</button>
      </div>

      {/* Close Button with Image */}
      <button
        type="button"
        className="absolute top-0 right-0 m-4"
        onClick={closeModal}
      >
        <Image src="/close.svg" alt="close" width={20} height={20} />
      </button>
    </div>
  );
};

export default RoomDetailsConfirmation;
