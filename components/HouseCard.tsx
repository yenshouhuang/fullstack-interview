"use client"

import { useState } from 'react';
import Image from 'next/image';
import { HouseProps, CarProps } from '@/types/index';
import { CustomButton, HouseDetails } from '.';

interface HouseCardProps {
    house: HouseProps;

}

const HouseCard = ( {house}: HouseCardProps) => {
  const { id, propertyName, city, bedrooms, image, price, fullAddress, url, address, images, neighborhood, availableDate, unitSqft } = house;
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="house-card group">
      <div className='house-card__content'>
        <div>
          <h2 className='house-card__content-title'>
            {propertyName} 
          </h2>
          <h2 className='house-card__content'>
            {neighborhood}
          </h2>
        </div>
      </div>
      <div className='relative w-full h-40 my-3 objext-contain'>
        <img src={images[0].url} alt='house model' className='object-contain' />
      </div>
      <div>
        <p className='flex mt-6 text-[32px] font-extrabold'>
          <span className='self-start text=[14px] font-semibold'>
              $
          </span>
          1000{/* {houseRent} */}
          <span className='self-end text-[14px] font-semibold-medium'>
              /month
          </span>
        </p>
      </div>
      
      <div className='relative flex w-full mt-2'>
        <div className='flex w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/bed.png' alt='bed' width={24} height={24} />
            <p className='text-[14px] font-semibold'>{bedrooms} Bedrooms</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/available2.png' alt='availability' width={24} height={24} />
            <p className='text-[14px] font-semibold'>{availableDate}</p> 
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/size.png' alt='size' width={24} height={24} />
            <p className='text-[14px] font-semibold'>{unitSqft} Sqft</p>
          </div>
        </div>
        
        <div className='house-card__btn-container'>
          <CustomButton 
            title='View More and Book'
            containerStyles='w-full py-[16px] rounded-full bg-yellow-500'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      
      <HouseDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} house={house} />
    </div>
  )
}

export default HouseCard
