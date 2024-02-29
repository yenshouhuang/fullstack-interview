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

export interface SearchStatesProps {
    state: string;
    setState: (states: string) => void;
}

export interface HouseProps {
    id: number;
    propertyName: string;
    city: string;
    bedrooms: number;
    image: string;
    pricing: any;
    fullAddress: string;
    url: string;
    address: any;
    images: any;
    neighborhood: string;
    availableDate: string;
    unitSqft: number;
    roomNumber: string;
    monthlyPricing: any;
    amount: number;
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

export interface FilterProps {
    state: string;
    city: string;
} 

export interface OptionProps {
    title: string;
    value: string;
}
export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}