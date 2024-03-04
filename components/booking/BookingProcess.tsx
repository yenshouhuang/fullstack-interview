import React, { useState } from "react";
import { HouseProps, BookingProcessProps } from "@/types";
import BackgroundInfoForm from "./BackgroundInfoForm";
import RoomDetailsConfirmation from "./RoomDetailsConfirmation";
import MockDocuSign from "./MockDocuSign";
import WelcomeView from "./WelcomeView";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

// The BookingProcess component manages the booking process, switching between different steps based on the user's progress.
function BookingProcess({ house, onComplete, closeBookingProcess }: BookingProcessProps) {
  // State to manage the current step in the booking process.
  const [step, setStep] = useState(1);
  // State to control the visibility of modal dialogs.
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Retrieve the initial booking step from the URL query parameters.
  const initialBookingStep = searchParams.get("bookingStep") || "0";

  // State to manage the current booking step, initializing from the URL query parameter.
  const [bookingStep, setBookingStep] = useState(parseInt(initialBookingStep));

  // State to hold the current booking information across different steps.
  const [bookingState, setBookingState] = useState({
    house: {
      id: house.id,
      propertyName: house.propertyName,
      address: house.address,
      availableDate: house.availableDate,
    },
    background: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      salary: "",
    },
    roomDetails: {
      startDate: "",
      endDate: "",
    },
    confirmed: false,
    documentSigned: false,
  });

  // Function to update the booking step and update the URL query parameter accordingly.
  const handleSetStep = (step: number) => {
    let stepQueryString = "";

    switch(step) {
      case 0:
        stepQueryString = "background";
        break;
      case 1:
        stepQueryString = "roomDetails";
        break;
      case 2:
        stepQueryString = "mockDocuSign";
        break;
      case 3:
        stepQueryString = "welcomeView";
        break;
      default:
        stepQueryString = "";
    }
    if (step === -1) {
      // If step is -1, close the booking process and navigate to the home page.
      setModalOpen(false);
      closeBookingProcess();
      router.push("/");
    } else {
      // Otherwise, update the booking step and the URL query parameter.
      setBookingStep(step);
      router.push(`/?bookingStep=${stepQueryString}`, undefined, { shallow: true }); 
    }  
  }

  // Function to update the booking state with new information from a step.
  const handleSetBookingState = (state: any) => {
    setBookingState(state);
  }
  
  // Function to close the modal dialog.
  const handleCloseModal = () => {
    setModalOpen(false);
  }

  // Function to handle the final submission of the booking process.
  const handleSubmit = () => {
    onComplete(); // Callback to indicate completion of the booking process.
  };

  return (
    <div>
      {/* Conditional rendering based on the current booking step. Each component is responsible for a different part of the booking process. */}
      {bookingStep === 0 && <BackgroundInfoForm isOpen={modalOpen} closeModal={handleCloseModal} house={house} setStep={handleSetStep} bookingState={bookingState} setBookingState={handleSetBookingState} />}
      {bookingStep === 1 && <RoomDetailsConfirmation isOpen={modalOpen} closeModal={handleCloseModal} house={house} setStep={handleSetStep} bookingState={bookingState} setBookingState={handleSetBookingState}/>}
      {bookingStep === 2 && <MockDocuSign isOpen={modalOpen} closeModal={handleCloseModal} house={house} setStep={handleSetStep} bookingState={bookingState} setBookingState={handleSetBookingState}/>}
      {bookingStep === 3 && <WelcomeView isOpen={modalOpen} closeModal={handleCloseModal} house={house} setStep={handleSetStep} bookingState={bookingState} setBookingState={handleSetBookingState}/>}
    </div>
  );
}

export default BookingProcess;
