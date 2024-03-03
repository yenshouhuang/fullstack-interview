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
  const [signatureURL, setSignatureURL] = useState<string | null>(null);
  const clear = () => sigCanvas.current?.clear();
  const save = () => {
    const image = sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png");
    setSignatureURL(image || null);
  };

  return (
    <div className="relative w-full overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
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
        <body className="p-8">
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
                  <strong>
                    Tenant(s): {bookingState.background.firstName}{" "}
                    {bookingState.background.lastName}
                  </strong>
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
                apartment located at{" "}
                <strong>{bookingState.house.address.fullAddress}</strong>{" "}
                (“Premises”).
              </p>

              <p>
                <strong>2. Agreement to Lease.</strong> Landlord agrees to lease
                to Tenant and Tenant agrees to lease from Landlord, subject to
                the terms and conditions set forth herein, the Premises.
              </p>

              <p>
                <strong>3. Term.</strong> This Agreement shall commence on:
              </p>
              <p>
                Fixed Lease. This Agreement will be for a term beginning on
                <strong> {bookingState.roomDetails.startDate}</strong> and
                ending on _____________ (the “Term”).
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
                  <div className="mb-12"></div>
                  <p>________________________</p>
                  <p>
                    <strong>Landlord Full Name</strong>
                  </p>
                  <p>Habyt, Inc</p>
                </div>

                <div>
                  <p>
                    <strong>Tenant Signature</strong>
                  </p>
                  {signatureURL ? (
                    <img
                      src={signatureURL}
                      alt="Signature"
                      className="w-32 h-auto"
                    />
                  ) : (
                    <div className="mb-12"></div>
                  )}
                  <p>________________________</p>
                  <p>
                    <strong>Tenant Full Name</strong>
                  </p>
                  <p>
                    {bookingState.background.firstName}{" "}
                    {bookingState.background.lastName}
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
