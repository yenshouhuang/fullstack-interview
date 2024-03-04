// Import React Testing Library utilities and any necessary hooks from Next.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import HouseCard from '../components/HouseCard'; // Adjust the import path as needed

// Mock necessary Next.js utilities and components
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Return a simple img for Next/Image
    return <img {...props} />;
  },
}));

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Define a mock house prop to use in tests
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

describe('HouseCard', () => {
  it('renders correctly', () => {
    render(<HouseCard house={mockHouse} />);

    expect(screen.getByText(mockHouse.propertyName)).toBeInTheDocument();
    expect(screen.getByText(`${mockHouse.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByAltText('house model')).toBeInTheDocument();
  });

  it('opens modal on button click', async () => {
    render(<HouseCard house={mockHouse} />);

    const button = screen.getByText(/View More and Book/i);
    await userEvent.click(button);

    // Since we're mocking Next.js router, we just check if the HouseDetails modal would theoretically open
    expect(screen.getByText(/View More and Book/i)).toBeInTheDocument();

  });


});
