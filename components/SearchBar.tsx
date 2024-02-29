"use client";

import React from 'react'
import { useState } from 'react';
import SearchStates from './SearchStates';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src={"/magnifying-glass.png"}
        alt={"magnifying glass"}
        width={30}
        height={30}
        className='object-contain'
      />
    </button>
  );


const SearchBar = () => {
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(state === '' && city === '') {
            return alert('Please enter a state and city');
        }

        updateSearchParams(state.toLowerCase(), city.toLowerCase());
    }

    const updateSearchParams = (city: string, state: string) => {
        // Create a new URLSearchParams object using the current URL search parameters
        const searchParams = new URLSearchParams(window.location.search);

        if (city) {
            searchParams.set("city", city);
        } else {
            searchParams.delete("city");
        }


        if (state) {
            searchParams.set("state", state);
        } else {
            searchParams.delete("state");
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathname, { scroll: false });
    }

    return (
        <form className='seachbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchStates
                    state={state}
                    setState={setState}
                />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <div className='searchbar__item'>
                <Image
                src='/city.png'
                width={25}
                height={25}
                className='absolute w-[20px] h-[20px] ml-4'
                alt=''
                />
                <input
                type='text'
                name='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Which City...?'
                className='searchbar__input'
                />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <SearchButton otherClasses='max-sm:hidden' />
        </form>
    )
}

export default SearchBar
