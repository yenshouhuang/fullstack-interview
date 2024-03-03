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
        className="object contain"
      />
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome to Habyt!</h1>
        <p className="mb-4">
          You've taken the first step to join our vibrant community. We're
          thrilled to have you with us.
        </p>
        <p>
          Your lease details will be sent to your email shortly. Keep an eye on
          your inbox for more information and next steps.
        </p>
      </div>
    </div>
  );
};

export default WelcomeView;
