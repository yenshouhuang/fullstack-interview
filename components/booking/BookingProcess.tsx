import React, { useState } from "react";
import { HouseProps, BookingProcessProps } from "@/types";
import BackgroundInfoForm from "./BackgroundInfoForm";
import RoomDetailsConfirmation from "./RoomDetailsConfirmation";
import MockDocuSign from "./MockDocuSign";
import WelcomeView from "./WelcomeView";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

function BookingProcess({ house, onComplete, closeBookingProcess }: BookingProcessProps) {
  const [step, setStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const intialBookingStep = searchParams.get("bookingStep") || "0";

  const [bookingStep, setBookingStep] = useState(parseInt(intialBookingStep));
  console.log("bookingStep", bookingStep);
  const [bookingState, setBookingState] = useState({
    house: {
      id: house.id,
      propertyName: house.propertyName,
      address: house.address,
      availableDate: house.availableDate,
    },
    background : {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      salary: "",

    },
    roomDetails:{
      startDate: "",
      endDate: "",
    },
    confirmed: false,
    docusign:false,
    }
  );

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
    setModalOpen(false);
    closeBookingProcess();
    router.push("/");
  } else {
    setBookingStep(step);
    router.push(`/?bookingStep=${stepQueryString}`, undefined, { shallow: true }); 
	}  
}

const handleSetBookingState = (state: any) => {
  console.log("Setting booking state", state);
  setBookingState(state);
}
  
const handleCloseModal = () => {
    setModalOpen(false);
}
  

  

  const handleSubmit = () => {
    console.log("Booking submitted for", house.propertyName);
    onComplete();
  };


  return (
    <div>

      {bookingStep === 0 && <BackgroundInfoForm isOpen ={modalOpen} closeModal={handleCloseModal} house={house} setStep={handleSetStep} bookingState={bookingState} setBookingState={handleSetBookingState} />}
      {bookingStep === 1 && <RoomDetailsConfirmation isOpen ={modalOpen} closeModal={handleCloseModal} house={house} setStep={handleSetStep} bookingState={bookingState} setBookingState={handleSetBookingState}/>}
      {bookingStep === 2 && <MockDocuSign isOpen ={modalOpen} closeModal={handleCloseModal} house={house} setStep={handleSetStep} bookingState={bookingState} setBookingState={handleSetBookingState}/>}
      {bookingStep === 3 && <WelcomeView isOpen ={modalOpen} closeModal={handleCloseModal} house={house} setStep={handleSetStep} bookingState={bookingState} setBookingState={handleSetBookingState}/>}
    </div>
  );
}

export default BookingProcess;