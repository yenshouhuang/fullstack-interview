import { Fragment, useState, useEffect, forwardRef, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { Dialog, Transition } from "@headlessui/react";
import { HouseProps, HouseDetailsProps } from "@/types";
import { CustomButton } from ".";

import BookingProcess from "./booking/BookingProcess";



function camelCaseToSpaces(s: string) {
  // Insert a space before all caps and uppercase the first character
  return s
    .replace(/([A-Z])/g, " $1") // Puts a space before each uppercase letter
    .replace(/^./, function (str: string) {
      return str.toUpperCase();
    }); // Capitalizes the first letter
}

const HouseDetails = ({ isOpen, closeModal: closeParentModal, house }: HouseDetailsProps) => {
  const {
    id,
    description,
    propertyName,
    city,
    bedrooms,
    image,
    pricing,
    fullAddress,
    url,
    address,
    images,
    neighborhood,
    availableDate,
    unitSqft,
    monthlyPricing,
    amount,
  } = house;
  const router = useRouter();
  const searchParams = useSearchParams();
  const panelRef = useRef(null);
  let MyDialogPanel = forwardRef(function (props, ref) {
	return <Dialog.Panel className="…" ref={panelRef} {...props} />
  })
  

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
//   const startBookingProcess = () => setBookingStep(1);
  const startBookingProcess = () => {
	setIsBookingDialogOpen(true)
	if (!searchParams.get("bookingStep")) {
	router.push("/?bookingStep=background", undefined, { shallow: true }); // Update the URL without a page refresh
	}  
};

const closeBookingProcess = () => setIsBookingDialogOpen(false);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const openImageModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
	router.push(`/?image=${encodeURIComponent(imageUrl)}`, undefined, { shallow: true });
  };
  const closeModal = () => {
    closeParentModal(); // Call the original closeModal function passed as a prop
    setIsImageModalOpen(false); // Also close the image modal
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModal}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-80 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={images[0].url}
                        alt="property"
                        fill
                        priority
                        className="object-contain"
                        onClick={() => openImageModal(images[0].url)}
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-40 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={images[1].url}
                          alt="property"
                          fill
                          priority
                          className="object-contain"
                          onClick={() => openImageModal(images[1].url)}
                        />
                      </div>
                      <div className="flex-1 relative w-full h-40 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={images[2].url}
                          alt="property"
                          fill
                          priority
                          className="object-contain"
                          onClick={() => openImageModal(images[2].url)}
                        />
                      </div>
                      <div className="flex-1 relative w-full h-40 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={images[3].url}
                          alt="property"
                          fill
                          priority
                          className="object-contain"
                          onClick={() => openImageModal(images[3].url)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {house.propertyName} {house.address.roomNumber}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(house).map(([key, value]) => {
                        // Skip properties of type 'any' and unwanted properties
                        if (
                          [
                            "address",
                            "images",
                            "pricing",
                            "fees",
                            "currencyCode",
                            "propertyId",
                            "marketingName",
                          ].includes(key)
                        ) {
                          return null; // Skip this iteration
                        }
                        let displayValue: string;
                        if (Array.isArray(value)) {
                          // Join array elements with a separator, e.g., comma and space
                          displayValue = value.join(", ");
                        } else {
                          // For non-array values, convert to string to ensure consistent handling
                          displayValue = String(value);
                        }
                        let displayName = key;
                        // Check if the key is 'neighborhoodDescription' to change its display name
                        if (key === "neighborhoodDescription") {
                          displayName = "neighborhood";
                        }
                        return (
                          <div
                            className="flex justify-between items-start gap-5 w-full text-left"
                            key={key}
                          >
                            <h4 className="text-gray-500 capitalize min-w-[150px]">
                              {camelCaseToSpaces(displayName)}:
                            </h4>
                            <p className="text-black font-semibold text-left flex-1">
                              {displayValue}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <h2 className="text-gray-500 capitalize min-w-[150px]">
                      Pricing Options:
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {house.pricing.monthlyPricing.map(
                        (pricingOption: any, index: number) => (
                          <div
                            key={index}
                            className="my-4 p-4 bg-gray-100 rounded-lg"
                          >
                            <h3 className="text-xl font-bold mb-2">
                              {pricingOption.name}
                            </h3>
                            <p className="mb-4">
                              {pricingOption.concessionsApplied.length > 0
                                ? pricingOption.concessionsApplied.join(", ")
                                : "No concessions applied"}
                            </p>
                            {Object.entries(pricingOption).map(
                              ([key, value]) => {
                                if (
                                  key === "name" ||
                                  key === "months" ||
                                  key === "concessionsApplied"
                                ) {
                                  // Skip "name", "months", and "concessionsApplied" keys
                                  return null;
                                }

                                let displayValue: string;
                                if (key === "amount") {
                                  // Prefix "Amount" with "Total"
                                  displayValue = `Total: $${(
                                    value as number
                                  ).toLocaleString()}`; // Use type assertion to specify the type of 'value'
                                } else {
                                  // For other keys, convert value to string directly
                                  displayValue = String(value);
                                }

                                return (
                                  <div
                                    className="flex justify-between gap-5 w-full text-left"
                                    key={key}
                                  >
                                    <h4 className="text-grey capitalize">
                                      {key === "amount"
                                        ? ""
                                        : camelCaseToSpaces(key)}{" "}
                                      {/* Only show key name if it's not 'amount' */}
                                    </h4>
                                    <p className="text-black-100 font-semibold">
                                      {displayValue}
                                    </p>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )
                      )}
                    </div>

                    <CustomButton
                      title="Book"
                      handleClick={startBookingProcess}
                      containerStyles="bg-yellow-500 font-semibold rounded-full text-white py-6 my-6"
                    />

					{/* Media Open */}
                    {isImageModalOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-200 p-4">
                          <img src={selectedImageUrl} alt="Selected" />
                          <button
                            onClick={() => {
								setIsImageModalOpen(false)
								router.push(`/?houseId=${id}`, undefined);
								}}
                            className="bg-yellow-500 text-white rounded-lg py-2 my-4 px-8"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

					{/* Booking Dialog */}
					{isBookingDialogOpen && (
						<Transition appear show={isBookingDialogOpen} as={Fragment}>
							<Dialog as="div" className="relative z-20" onClose={() => setIsBookingDialogOpen(false)}>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-black bg-opacity-50" />
							</Transition.Child>
							<div className="fixed inset-0 overflow-y-auto">
								<div className="flex min-h-full items-center justify-center p-4 text-center">
									<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<BookingProcess
										house={house}
										onComplete={() => {
										setIsBookingDialogOpen(false);
										}}
										closeBookingProcess={closeBookingProcess}
									/>
									</Dialog.Panel>
								</div>
							</div>
							</Dialog>
						</Transition>
						)}


                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HouseDetails;
