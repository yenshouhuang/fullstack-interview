"use client";

import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'

const Hero = () => {
    
    const handleScroll = () => {
        const nextSection = document.getElementById("discover");
    
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      };
    return (
        <div className='hero'>
            <div className='flex-1 pt-36 padding-x'>
                <h1 className='hero__title'>
                    Find, book, or rent a place to stay -- fast and easy
                </h1>
                <p className='hero__subtitle'>
                    Whether you’re looking for a place to stay or have a place to rent, we can help you find what you need.
                </p>
            <CustomButton 
                title='Explore Now' 
                containerStyles='bg-yellow-500 text-white rounded-full mt-10'
                handleClick={handleScroll}
            /> 
            </div>
            <div className='hero__image-container'>
                <div className='hero__image'>
                    <Image src="/house.jpeg" alt="hero" fill className='object-contain' />
                </div>
            </div>
        </div>
  )
}

export default Hero
