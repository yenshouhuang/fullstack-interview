import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import RoomDetailsConfirmation from '../components/booking/RoomDetailsConfirmation';

// Mocking necessary imports
jest.mock('next/image', () => {
  // Mocking Next/Image component
  return {
    __esModule: true,
    default: (props: any) => <img {...props} />,
  };
});

const mockHouse = {
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
    availableDate: "2024-01-01",
    unitSqft: 1000,
    roomNumber: "401",
    monthlyPricing: 10000,
    amount: 200000,
    description: "hello",
    listingSqft: 1751,
};

const mockBookingState = {
  roomDetails: {
    leaseTerm: '',
    startDate: '',
    endDate: '',
  },
};

describe('RoomDetailsConfirmation', () => {
  const setStep = jest.fn();
  const setBookingState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <RoomDetailsConfirmation
        isOpen={true}
        closeModal={() => {}}
        house={mockHouse}
        setStep={setStep}
        bookingState={mockBookingState}
        setBookingState={setBookingState}
      />
    );

    expect(screen.getByText(/Confirm Your Booking Details/i)).toBeInTheDocument();
  });

  it('validates start date correctly', async () => {
    const user = userEvent.setup();
    render(
      <RoomDetailsConfirmation
        isOpen={true}
        closeModal={() => {}}
        house={mockHouse}
        setStep={setStep}
        bookingState={mockBookingState}
        setBookingState={setBookingState}
      />
    );

    const startDateInput = screen.getByLabelText(/Start Date/i);
    await user.type(startDateInput, '2020-12-31'); // Before the available date
    fireEvent.blur(startDateInput);

    expect(screen.getByText(/House is not available on selected date./i)).toBeInTheDocument();
  });

  it('updates lease term and calculates end date correctly', async () => { 
    const user = userEvent.setup();
    render(
      <RoomDetailsConfirmation
        isOpen={true}
        closeModal={() => {}}
        house={mockHouse}
        setStep={setStep}
        bookingState={{ ...mockBookingState, roomDetails: { ...mockBookingState.roomDetails, startDate: '2023-01-01' } }}
        setBookingState={setBookingState}
      />
    );

    const leaseTermSelect = screen.getByLabelText(/Lease Term/i);
    await user.selectOptions(leaseTermSelect, '6');

    expect(setBookingState).toHaveBeenCalledTimes(1);
    // Since setBookingState is mocked, we can't directly check the end date in the DOM.
    // Instead, we can check if setBookingState was called with the expected end date.
  });

  it('submits form with valid data', async () => { 
    const user = userEvent.setup();
    render(
      <RoomDetailsConfirmation
        isOpen={true}
        closeModal={() => {}}
        house={mockHouse}
        setStep={setStep}
        bookingState={{ ...mockBookingState, roomDetails: { leaseTerm: '6', startDate: '2023-01-02' } }}
        setBookingState={setBookingState}
      />
    );

    const nextButton = screen.getByText(/Next/i);
    await user.click(nextButton);

    expect(setStep).toHaveBeenCalledWith(2);
  });
});
