import React from "react";
import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BackgroundInfoFormProps, WelcomeViewProps } from "@/types";
import Image from "next/image";

const WelcomeView = ({
  closeModal,
  house,
  setStep,
  bookingState,
  setBookingState,
}: WelcomeViewProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
  <Image
    src="/welcome_view.png"
    alt="Welcome"
    width={400}
    height={400}
    className="object-contain"
  />
  <div className="bg-white p-8 rounded-lg shadow-lg mt-6">
    <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Habyt!</h1>
    <p className="mb-4 text-gray-600">
      You've taken the first step to join our vibrant community. We're thrilled to have you with us.
    </p>
    <p className="text-gray-600">
      Your lease details will be sent to your email shortly. Keep an eye on your inbox for more information and next steps.
    </p>
  </div>
  <button
    onClick={() => setStep(-1)}
    className="mt-6 py-2 px-6 bg-yellow-500 text-white rounded-lg shadow-lg"
  >
    Close
  </button>
</div>

  );
};

export default WelcomeView;
