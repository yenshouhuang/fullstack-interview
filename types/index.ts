import { MouseEventHandler } from "react";


export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: 'button' | 'submit';
}

export interface SearchLocationProps {
    location: string;
    setLocation: (location: string) => void;
}