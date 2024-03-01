import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';


import { Dialog,  Transition } from '@headlessui/react';
import { HouseProps } from '@/types';
import { CustomButton } from '.';
import BackgroundInfoForm from './booking/BackgroundInfoForm';


interface HouseDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    house: HouseProps;
}

function camelCaseToSpaces(s: string) {
    // Insert a space before all caps and uppercase the first character
    return s.replace(/([A-Z])/g, ' $1') // Puts a space before each uppercase letter
            .replace(/^./, function(str: string){ return str.toUpperCase(); }); // Capitalizes the first letter
  }

const HouseDetails = ( {isOpen, closeModal, house }: HouseDetailsProps) => {
  const { id, description, propertyName, city, bedrooms, image, pricing, fullAddress, url, address, images, neighborhood, availableDate, unitSqft, monthlyPricing, amount } = house;
  
const [bookingStep, setBookingStep] = useState(0);
const startBookingProcess = () => setBookingStep(1);
const handleSeeDetails = (pricingOption: any) => {
    const detailsWindow = window.open('', '_blank');
    if (detailsWindow) {
        detailsWindow.document.write('<html><head><title>Pricing Option Details</title></head><body>');
        detailsWindow.document.write('<h1>Pricing Option Details</h1>');
        Object.entries(pricingOption).forEach(([key, value]) => {
            if (key !== 'months') { // Assuming we still want to exclude 'months' from the detail view
                let displayValue = Array.isArray(value) && value.length === 0 ? 'None' : (value as any[]).join(', ');
                detailsWindow.document.write(`<p><strong>${camelCaseToSpaces(key)}:</strong> ${displayValue}</p>`);
            }
        });
        detailsWindow.document.write('</body></html>');
        detailsWindow.document.close();
    }
};
    
    //   house.pricing.monthlyPricing.forEach((pricingOption:any, index:number) => {
    //     console.log(`Pricing Option ${index + 1}:`);
    //     Object.entries(pricingOption).forEach(([key, value]) => {
    //       console.log(`${key}: ${value}`);
    //     });
    //   });
    


  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-out duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative w-full max-w-3xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                <button
                  type='button'
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  onClick={closeModal}
                >
                  <Image
                    src='/close.svg'
                    alt='close'
                    width={20}
                    height={20}
                    className='object-contain'
                  />
                </button>

                <div className='flex-1 flex flex-col gap-3'>
                  <div className='relative w-full h-80 bg-pattern bg-cover bg-center rounded-lg'>
                    <Image src={images[0].url} alt='property' fill priority className='object-contain' />
                  </div>

                  <div className='flex gap-3'>
                    <div className='flex-1 relative w-full h-40 bg-primary-blue-100 rounded-lg'>
                        <Image src={images[1].url} alt='property' fill priority className='object-contain' />
                    </div>
                    <div className='flex-1 relative w-full h-40 bg-primary-blue-100 rounded-lg'>
                      <Image src={images[2].url} alt='property' fill priority className='object-contain' />
                    </div>
                    <div className='flex-1 relative w-full h-40 bg-primary-blue-100 rounded-lg'>
                      <Image  src={images[3].url} alt='property' fill priority className='object-contain' />
                    </div>
                  </div>
                </div>

                <div className='flex-1 flex flex-col gap-2'>
                  <h2 className='font-semibold text-xl capitalize'>
                    {house.propertyName} {house.address.roomNumber}
                  </h2>

                  <div className='mt-3 flex flex-wrap gap-4'>
                  {Object.entries(house).map(([key, value]) => {
                    // Skip properties of type 'any' and unwanted properties
                    if (key === 'address' || key === 'images' || key === 'pricing' || key === 'fees' || key === 'currencyCode' || key === 'propertyId' || key === 'marketingName') {
                        return null; // Skip this iteration
                    }
                    let displayValue: string;
                    if (Array.isArray(value)) {
                    // Join array elements with a separator, e.g., comma and space
                    displayValue = value.join(', ');
                    } else {
                    // For non-array values, convert to string to ensure consistent handling
                    // This is safe for string, number, and similar primitive types
                    displayValue = String(value);
                    }

                    return (
                        <div className='flex justify-between gap-5 w-full text-left' key={key}>
                        <h4 className='text-grey capitalize'>
                            {camelCaseToSpaces(key)} 
                        </h4>
                        <p className='text-black-100 font-semibold'>
                            {displayValue}
                        </p>
                        </div>
                    );
                    })}
                    


                   {/* {house.pricing.monthlyPricing.map((pricingOption: any, index: number) => (
                    <div key={index} className='my-4'>
                        <h3 className='text-xl font-bold mb-2'>{pricingOption.name}</h3>
                        {Object.entries(pricingOption).map(([key, value]) => {
                        if (key === 'name' || key === 'months') {
                            // Skip "name" and "months" keys
                            return null;
                        }

                        let displayValue: string;
                        if (key === 'concessionsApplied' && (value as any[]).length === 0) {
                            // Handle empty "concessionsApplied"
                            displayValue = 'None';
                        } else if (Array.isArray(value)) {
                            // Join array elements with a separator for non-empty arrays
                            displayValue = value.join(', ');
                        } else {
                            // For non-array values, convert to string
                            displayValue = String(value);
                        }

                        return (
                            <div className='flex justify-between gap-5 w-full text-left' key={key}>
                            <h4 className='text-grey capitalize'>
                                {camelCaseToSpaces(key)}:
                            </h4>
                            <p className='text-black-100 font-semibold'>
                                {displayValue}
                            </p>
                            </div>
                        );
                        })}
                    </div>
                    
                    ))}  */}


{house.pricing.monthlyPricing.map((pricingOption: any, index: number) => (
      <div key={index} className='my-4 p-4 bg-gray-200' style={{backgroundColor: '#f0f0f0'}}>
        <h3 className='text-xl font-bold mb-2'>{pricingOption.name}</h3>
        {pricingOption.concessionsApplied && pricingOption.concessionsApplied.length > 0 && (
          <p className='mb-2'>{pricingOption.concessionsApplied.join(', ')}</p>
        )}
        {Object.entries(pricingOption).map(([key, value]) => {
          if (key === 'name' || key === 'months' || key === 'concessionsApplied') {
            // Skip "name", "months", and "concessionsApplied" keys
            return null;
          }

          let displayValue: string;
          if (Array.isArray(value)) {
            // Join array elements with a separator for arrays
            displayValue = value.join(', ');
          } else {
            // For non-array values, convert to string
            displayValue = String(value);
          }

          // Prefix "Total" before "amount"
          let label = key === 'amount' ? 'Total Amount' : camelCaseToSpaces(key);

          return (
            <div className='flex justify-between items-center gap-5 w-full text-left' key={key}>
              <h4 className='text-grey capitalize'>
                {label}:
              </h4>
              <p className='text-black-100 font-semibold'>
                {displayValue}
              </p>
            </div>
          );
        })}
      </div>
    ))}


                 

                  </div>

                  <CustomButton 
                    title='Request Booking' 
                    // onClick={startBookingProcess}
                    containerStyles='bg-yellow-500 font-semibold rounded-full text-white py-6 my-6' 
                  />
                
                  {/* {bookingStep === 1 && <BackgroundInfoForm setBookingStep={setBookingStep} />} */}

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
  )
}

export default HouseDetails
