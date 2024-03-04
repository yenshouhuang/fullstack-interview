import { Fragment, useState, useEffect, forwardRef, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { HouseProps, HouseDetailsProps } from "@/types";
import { CustomButton } from ".";
import BookingProcess from "./booking/BookingProcess";


// Converts camelCase strings to space-separated strings with the first letter capitalized.
function camelCaseToSpaces(s: string) {
  // Insert a space before all caps and uppercase the first character
  return s
    .replace(/([A-Z])/g, " $1") // Puts a space before each uppercase letter
    .replace(/^./, function (str: string) {
      return str.toUpperCase();
    }); // Capitalizes the first letter
}

// Renders the details of a house by iterating over its properties.
function renderHouseDetails(house: any) {
  return Object.entries(house).map(([key, value]) => {
    // Exclude specific keys from being rendered.
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
      return null;
    }
    let displayValue = Array.isArray(value) ? value.join(", ") : String(value);
    let displayName = key === "neighborhoodDescription" ? "neighborhood" : key;

    // Display the property name and its value.
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
  });
}

// Renders pricing options for the house.
function renderPricingOptions(pricingOptions: any) {
  return pricingOptions.map((pricingOption: any, index: number) => ( // Add the index as the key, 
    <div key={index} className="my-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold mb-2">{pricingOption.name}</h3>
      <p className="mb-4">
        {pricingOption.concessionsApplied.length > 0
          ? pricingOption.concessionsApplied.join(", ")
          : "No concessions applied"}
      </p>

      {/* Display pricing details, excluding certain keys. */}
      {Object.entries(pricingOption)
        .filter(
          ([key]) => !["name", "months", "concessionsApplied"].includes(key) 
        )
        .map(([key, value]) => ( 
          <div
            className="flex justify-between gap-5 w-full text-left"
            key={key}
          >
            <h4 className="text-grey capitalize">
              {key === "amount" ? "" : camelCaseToSpaces(key)}
            </h4>
            <p className="text-black-100 font-semibold">
              {key === "amount"
                ? `Total: $${(value as number).toLocaleString()}`
                : String(value)}
            </p>
          </div>
        ))}
    </div>
  ));
}

const HouseDetails = ({
  isOpen,
  closeModal: closeParentModal,
  house,
}: HouseDetailsProps) => {
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
    return <Dialog.Panel className="…" ref={panelRef} {...props} />;
  });

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const startBookingProcess = () => {
    setIsBookingDialogOpen(true);
    // Trigger URL update without a page refresh to indicate the booking step.
    if (!searchParams.get("bookingStep")) {
      router.push("/?bookingStep=background", undefined, { shallow: true }); 
    }
  };

  const closeBookingProcess = () => setIsBookingDialogOpen(false);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const openImageModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
    // Update the URL to reflect the selected image without refreshing the page.
    router.push(`/?image=${encodeURIComponent(imageUrl)}`, undefined, { 
      shallow: true,
    });
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

                  {/* Display the house images and details. */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-80 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={images[0].url} // Use the first image as the main image
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

                  {/* Display the property name, details, and pricing options. */}
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {house.propertyName} {house.address.roomNumber}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {renderHouseDetails(house)}
                    </div>
                    <h2 className="text-gray-500 capitalize min-w-[150px]">
                      Pricing Options:
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {renderPricingOptions(house.pricing?.monthlyPricing)}
                    </div>

                    <CustomButton
                      title="Book"
                      handleClick={startBookingProcess}
                      containerStyles="bg-yellow-500 font-semibold rounded-full text-white py-6 my-6"
                    />

                    {/* Displays the selected image in a modal. */}
                    {isImageModalOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-200 p-4">
                          <img src={selectedImageUrl} alt="Selected" />
                          <button
                            onClick={() => {
                              setIsImageModalOpen(false);
                              router.push(`/?houseId=${id}`, undefined);
                            }}
                            className="bg-yellow-500 text-white rounded-lg py-2 my-4 px-8"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Booking dialog for the booking process. */}
                    {isBookingDialogOpen && (
                      <Transition
                        appear
                        show={isBookingDialogOpen}
                        as={Fragment}
                      >
                        <Dialog
                          as="div"
                          className="relative z-20"
                          onClose={() => setIsBookingDialogOpen(false)}
                        >
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
                              <Dialog.Panel className="relative w-full max-w-3xl h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
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
