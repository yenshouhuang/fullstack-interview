"use client";

import React from 'react'
import { useState } from 'react';
import SearchLocation from './SearchLocation';

const SearchBar = () => {
    const [location, setLocation] = useState('')
    const handleSearch = () => {}
    return (
        <form className='seachbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchLocation 
                    location={location}
                    setLocation={setLocation}
                />
            </div>
        </form>
    )
}

export default SearchBar
