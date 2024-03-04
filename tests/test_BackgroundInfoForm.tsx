// BackgroundInfoForm.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BackgroundInfoForm from  '../components/booking/BackgroundInfoForm'; 
import { BackgroundInfoFormProps } from '@/types'; 

// Mocking the closeModal, setStep, and setBookingState functions
const mockedCloseModal = jest.fn();
const mockedSetStep = jest.fn();
const mockedSetBookingState = jest.fn();

const initialProps: BackgroundInfoFormProps = {
  isOpen: true,
  closeModal: mockedCloseModal,
  house: {
    id: 101,
    propertyName: "Icon",
    city: "Salt Lake City",
    bedrooms: 2,
    image: 'example-image.jpg',
    pricing: 10000,
    fullAddress: '123 Example St, Example City',
    url: 'https://example.com',
    address: '123 Example St, Example City',
    images: ['image1.jpg', 'image2.jpg'],
    neighborhood: "Downtown",
    availableDate: "2022-01-01",
    unitSqft: 1000,
    roomNumber: "401",
    monthlyPricing: 10000,
    amount: 200000,
    description: "hello",
    listingSqft: 1751,
  }, 
  setStep: mockedSetStep,
  bookingState: { background: { firstName: '', lastName: '', email: '', phone: '', salary: '' } },
  setBookingState: mockedSetBookingState,
};

describe('BackgroundInfoForm', () => {
  test('renders correctly', () => {
    render(<BackgroundInfoForm {...initialProps} />);
    
    expect(screen.getByText(/Background Information/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    // Continue for all initial UI elements
  });

  test('handles user input', () => {
    render(<BackgroundInfoForm {...initialProps} />);
    
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    expect(mockedSetBookingState).toHaveBeenCalled();
    // You might need to adjust expectations based on how setBookingState is implemented
  });

  test('validates form before proceeding to the next page', () => {
    render(<BackgroundInfoForm {...initialProps} />);
    
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    expect(mockedSetStep).not.toHaveBeenCalled();
    expect(screen.getByText(/Please fill in all fields to proceed./i)).toBeInTheDocument();
  });

  test('navigates to the next page on valid input', () => {
    const validProps = {
      ...initialProps,
      bookingState: { 
        background: { 
          firstName: 'John', 
          lastName: 'Doe', 
          email: 'john.doe@example.com', 
          phone: '1234567890', 
          salary: '50000' 
        } 
      },
    };
    render(<BackgroundInfoForm {...validProps} />);

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    expect(mockedSetStep).toHaveBeenCalledWith(1); // Assuming setStep(1) is the correct action for moving to the next page
  });


});

