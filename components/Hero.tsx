"use client";

import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover"); // Get the next section by id, in this case, the discover section - house listings

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, book, and rent a place to stay -- fast and easy
        </h1>
        <p className="hero__subtitle">
          We can help you find what you need and get you settled in no time.
        </p>
        <CustomButton
          title="Explore Now"
          containerStyles="bg-yellow-500 text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/house.jpeg" alt="hero" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
