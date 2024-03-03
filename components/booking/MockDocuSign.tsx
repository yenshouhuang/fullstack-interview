import { MockDocuSignProps, RoomDetailsConfirmationProps } from "@/types";
import React from "react";
import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BackgroundInfoFormProps } from "@/types";
import Image from "next/image";
import SignaturePad from "react-signature-canvas";
import LeaseAgreement from "./LeaseAgreement";

const MockDocuSign = ({
  isOpen,
  closeModal,
  house,
  setStep,
  bookingState,
  setBookingState,
}: MockDocuSignProps) => {
  const handleNextPage = () => {
    setBookingState({
      ...bookingState,
      confirmed: true,
      ...house,
    });

    setStep(3);
  };
  const sigCanvas = useRef<SignaturePad>(null);
  const clear = () => sigCanvas.current?.clear();
  const save = () => {
    const image = sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png");
    // Handle the saved image here. For example, you could save it to state, send it to a server, etc.
    console.log(image);
  };

  return (
    <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
      <Dialog.Title
        as="h3"
        className="text-xl font-bold leading-6 text-gray-900" 
      >
        Sign Your Lease
      </Dialog.Title>
      <div id="lease">
        <head>
          <title>Lease Agreement</title>
        </head>
        <body className="bg-gray-50 p-8">
          <head>
            <title>Lease Agreement</title>
          </head>
          <body className="bg-white font-sans leading-normal tracking-normal">
            <div className="container mx-auto my-8">
              <div className="w-full text-center mb-8">
                <h1 className="text-3xl font-bold">LEASE AGREEMENT</h1>
              </div>

              <p>
                This Lease Agreement (this “Agreement”) made by and between:
              </p>

              <div className="my-4">
                <p>
                  <strong>Landlord: Habyt, Inc</strong>
                  (“Landlord”) AND
                </p>
                <p>
                  <strong>Tenant(s):
                  {" "}{bookingState.background.firstName}{" "}{bookingState.background.lastName}</strong>
                  (“Tenant”).
                </p>
                <p>
                  In the event there is more than one Tenant, each reference to
                  “Tenant” shall apply to each of them, jointly and severally.
                  Each tenant is jointly and severally liable to the landlord
                  for payment of rent and performance in accordance with all
                  other terms of this Agreement. Each Landlord and Tenant may be
                  referred to individually as a “Party” and collectively as the
                  “Parties.”
                </p>
              </div>

              <p>
                <strong>1. Premises.</strong> The premises leased is an
                apartment located at <strong>{bookingState.house.address.fullAddress}</strong> (“Premises”).
              </p>

              <p>
                <strong>2. Agreement to Lease.</strong> Landlord agrees to lease
                to Tenant and Tenant agrees to lease from Landlord, subject to
                the terms and conditions set forth herein, the Premises.
              </p>

              <p>
                <strong>3. Term.</strong> This Agreement shall commence on:
                (check one)
              </p>
              <p>
                ☐ Fixed Lease. This Agreement will be for a term beginning on
                <strong>{" "}{bookingState.roomDetails.startDate}</strong> and ending on _____________ (the “Term”).
              </p>

              <p>
                <strong>4. Rent.</strong> Tenant will pay Landlord a monthly
                rent of $__________ for the Term. Rent will be payable in
                advance and due on the first day of each month during the Term.
                The first rent payment is payable to Landlord when Tenant signs
                this Agreement.
              </p>

              <div className="flex justify-center my-8">
                <div className="mr-8">
                  <p>
                    <strong>Landlord Signature</strong>
                  </p>
                  <p>Habyt, Inc</p>
                  <p>
                    <strong>Landlord Full Name</strong>
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Tenant Signature</strong>
                  </p>
                  <p>________________________</p>
                  <p>
                    <strong>Tenant Full Name</strong>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </body>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Please confirm your lease agreement and sign below.
        </p>
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
        <button
          onClick={clear}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Clear
        </button>
        <button
          onClick={save}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setStep(1)}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Back
        </button>
        <button
          onClick={handleNextPage}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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

export default MockDocuSign;

// import { MockDocuSignProps } from "@/types";
// import React, { Fragment, useState, useEffect, useRef } from "react";
// import { Dialog } from "@headlessui/react";
// import Image from "next/image";
// import SignaturePad from "react-signature-canvas";

// const MockDocuSign = ({
//   isOpen,
//   closeModal,
//   house,
//   setStep,
//   bookingState,
//   setBookingState,
// }: MockDocuSignProps) => {
//   const sigCanvas = useRef<SignaturePad>(null);

//   // Initialize the signature pad with the saved signature (if exists)
//   useEffect(() => {
//     if (bookingState.signatureData && sigCanvas.current) {
//       const canvas = sigCanvas.current.getCanvas();
//       const ctx = canvas.getContext('2d');
//       const image = new Image(); // Fix: Add the required argument to the constructor
//       image.onload = () => {
//         ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
//       };
//       image.src = bookingState.signatureData;
//     }
//   }, [bookingState.signatureData]);

//   const clear = () => sigCanvas.current?.clear();

//   const save = () => {
//     const image = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
//     setBookingState({
//       ...bookingState,
//       signatureData: image,
//     });
//     console.log(image);
//   };

//   const handleNextPage = () => {
//     setBookingState({
//       ...bookingState,
//       confirmed: true,
//       ...house,
//     });
//     setStep(3);
//   };

//   return (
//     <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
//       <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//         Sign Your Lease
//       </Dialog.Title>
//       <div className="mt-2">
//         <p className="text-sm text-gray-500">Please sign below to confirm your lease agreement.</p>
//       </div>
//       <div className="mt-4 p-4 rounded-lg flex justify-center items-center">
//         <SignaturePad
//           canvasProps={{
//             width: 500,
//             height: 200,
//             className: "sigCanvas bg-white rounded-md border-2 border-gray-300",
//           }}
//           ref={sigCanvas}
//         />
//       </div>
//       <div className="flex justify-center gap-4 mt-4">
//         <button onClick={clear} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
//           Clear
//         </button>
//         <button onClick={save} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//           Save
//         </button>
//       </div>
//       <div className="flex justify-between mt-4">
//         <button onClick={() => setStep(1)} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
//           Back
//         </button>
//         <button onClick={handleNextPage} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
//           Next
//         </button>
//       </div>

//       {/* Close Button with Image */}
//       <button type="button" className="absolute top-0 right-0 m-4" onClick={() => setStep(-1)}>
//         <Image src="/close.svg" alt="close" width={20} height={20} />
//       </button>
//     </div>
//   );
// };

// export default MockDocuSign;
