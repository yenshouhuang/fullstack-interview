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
    <div>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Sign Your Lease
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500"></p>
      </div>
      <div>
      <SignaturePad
                  canvasProps={{
                    width: 300,
                    height: 75,
                    className: "sigCanvas",
                  }}
                  ref={sigCanvas}
                />
        
      <button onClick={clear}>Clear</button>
      <button onClick={save} >Save</button> 
      </div>
      <div className="mt-4">
        <button onClick={handleNextPage}>Next</button>
        <button onClick={() => setStep(1)}>Back</button>
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
  )
}

export default MockDocuSign
