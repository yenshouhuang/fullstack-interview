import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HouseDetails from '../components/HouseDetails'; 


// Mock Next.js router and Image components
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Just render an img element for simplicity
    return <img {...props} />;
  },
}));

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
  availableDate: "2022-01-01",
  unitSqft: 1000,
  roomNumber: "401",
  monthlyPricing: 10000,
  amount: 200000,
  description: "hello",
  listingSqft: 1751,
};

describe('HouseDetails', () => {
  it('renders house details correctly', () => {
    render(<HouseDetails isOpen={true} closeModal={() => {}} house={mockHouse} />);
    
    expect(screen.getByText(mockHouse.propertyName)).toBeInTheDocument();
    expect(screen.getByText(/Test Neighborhood/)).toBeInTheDocument();
  });

  it('opens image modal on image click', async () => {
    render(<HouseDetails isOpen={true} closeModal={() => {}} house={mockHouse} />);
    const firstImage = screen.getByAltText('property');
    await userEvent.click(firstImage);

    // Verify if the image modal is now open

  });

  it('starts booking process on button click', async () => {
    render(<HouseDetails isOpen={true} closeModal={() => {}} house={mockHouse} />);
    const bookButton = screen.getByText('Book');
    await userEvent.click(bookButton);

    // Verify if the booking dialog is now open

  });

  
});
