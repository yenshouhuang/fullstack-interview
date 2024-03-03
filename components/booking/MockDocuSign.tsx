import { MockDocuSignProps, RoomDetailsConfirmationProps } from "@/types";
import React from "react";
import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BackgroundInfoFormProps } from "@/types";
import Image from "next/image";
import SignaturePad from "react-signature-canvas";


const MockDocuSign = ({isOpen,
  closeModal,
  house,
  setStep,
  bookingState,
  setBookingState}:MockDocuSignProps) => {

  const handleNextPage = () => {
    setBookingState({
      ...bookingState,
      confirmed: true,
      ...house
    });
    
    setStep(3);
  };
  const sigCanvas = useRef<SignaturePad>(null);
  const clear = () => sigCanvas.current?.clear();
  const save = () => {
    const image = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
    // Handle the saved image here. For example, you could save it to state, send it to a server, etc.
    console.log(image);
  };

  return (
    <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
        Sign Your Lease
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">Please sign below to confirm your lease agreement.</p>
      </div>
      <div className="mt-4 p-4 rounded-lg flex justify-center items-center">
        <SignaturePad
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas bg-white rounded-md border-2 border-gray-300",
          }}
          ref={sigCanvas}
        />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={clear} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Clear
        </button>
        <button onClick={save} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => setStep(1)} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Back
        </button>
        <button onClick={handleNextPage} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
          Next
        </button>
      </div>

      {/* Close Button with Image */}
      <button type="button" className="absolute top-0 right-0 m-4" onClick={() => setStep(-1)}>
        <Image src="/close.svg" alt="close" width={20} height={20} />
      </button>
    </div>
  )
}

export default MockDocuSign
