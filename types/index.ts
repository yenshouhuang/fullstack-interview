import { MouseEventHandler } from "react";


export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: 'button' | 'submit';
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchLocationProps {
    location: string;
    setLocation: (location: string) => void;
}

export interface HouseProps {
    id: number;
    propertyName: string;
    city: string;
    bedrooms: number;
    image: string;
    price: string;
    fullAddress: string;
    url: string;
    address: any;
    images: any;
    neighborhood: string;
    availableDate: string;
    unitSqft: number;
}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
  }