// Import necessary React and Next.js utilities and components.
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Import types and components specific to the application.
import { HouseProps } from "@/types/index";
import { CustomButton, HouseDetails } from ".";

// Define the props for the HouseCard component.
interface HouseCardProps {
  house: HouseProps;
}

// The HouseCard component displays details about a house.
const HouseCard = ({ house }: HouseCardProps) => {
  // Destructure the house object to extract the properties used in the component.
  const {
    id,
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

  // State to control the visibility of the HouseDetails component.
  const [isOpen, setIsOpen] = useState(false);

  // Calculate the monthly rent, considering any applicable discounts or promotions.
  const houseRent = (pricing.monthlyPricing[1].amount / 11).toFixed(2);

  // useRouter hook to manage navigation within the app.
  const router = useRouter();

  return (
    <div className="house-card group">
      {/* House information section */}
      <div className="house-card__content">
        <div>
          <h2 className="house-card__content-title">{propertyName}</h2>
          <h2 className="house-card__content">{neighborhood}</h2>
        </div>
      </div>

      {/* Image section */}
      <div className="relative w-full h-40 my-3 objext-contain">
        <Image
          src={images[0].url}
          alt="house model"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Pricing section */}
      <div>
        <p className="flex mt-6 text-[32px] font-extrabold">
          <span className="self-start text=[14px] font-semibold">$</span>
          {houseRent}
          <span className="self-end text-[14px] font-semibold-medium">
            /month
          </span>
        </p>
        <p className="self-end text-[14px]">(12-month lease, 1 month free)</p>
      </div>

      {/* Features section (bedrooms, availability, size) */}
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          {/* Bedrooms */}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/bed.png" alt="bed" width={24} height={24} />
            <p className="text-[14px] font-semibold">{bedrooms} Bedrooms</p>
          </div>
          {/* Availability */}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/available2.png"
              alt="availability"
              width={24}
              height={24}
            />
            <p className="text-[14px] font-semibold">{availableDate}</p>
          </div>
          {/* Size */}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/size.png" alt="size" width={24} height={24} />
            <p className="text-[14px] font-semibold">{unitSqft} Sqft</p>
          </div>
        </div>

        {/* Action button to view more details and book */}
        <div className="house-card__btn-container">
          <CustomButton
            title="View More and Book"
            containerStyles="w-full py-[16px] rounded-full bg-yellow-500"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => {
              setIsOpen(true);
              router.push(`/?houseId=${id}`, undefined);
            }}
          />
        </div>
      </div>

      {/* Modal for house details, opened upon clicking the 'View More and Book' button */}
      <HouseDetails
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
          router.push(`/`, undefined);
        }}
        house={house}
      />
    </div>
  );
};

export default HouseCard;
