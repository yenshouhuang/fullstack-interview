"use client";

import { useState, Fragment } from 'react';
import Image from 'next/image'
import { Combobox, Transition } from '@headlessui/react'
import { states } from '@/constants'
import { SearchStatesProps } from '@/types'

import React from 'react'

const SearchStates = ({ state, setState }: SearchStatesProps) => {
    const [query, setQuery] = useState('');
    const filteredStates = query === "" 
            ? states 
            : states.filter((item) => (
                item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')
            
            )))

    return (
        <div className='search-house'>
            <Combobox value={state} onChange={setState}>
                <div className='relative w-full'>
                    <Combobox.Button className='absolute top-[14px]'>
                        <Image
                            src='/states.png'
                            width={20}
                            height={20}
                            className='ml-4'
                            alt='states' 
                        />
                    </Combobox.Button>

                    <Combobox.Input
                        className='search-house__input'
                        placeholder='Which State...?'
                        displayValue={(states:string)=>states}
                        onChange={(e) => setState(e.target.value)}
                    />

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options>
                          {filteredStates.length === 0 && query !== '' ? (
                          <Combobox.Option className='search-house__option' value={query} >
                            Create "{query}"
                          </Combobox.Option>
                        ): (
                            filteredStates.map((item) => (
                                <Combobox.Option
                                    key={item}
                                    className={({active}) => ` relative search-house__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                                    `}
                                    value={item}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                            {item}
                                            </span>

                                            {/* Show an active blue background color if the option is selected */}
                                            {selected ? (
                                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}
                                            ></span>
                                            ) : null}
                                        </>
                                        )}
                                </Combobox.Option>
                            ))
                        )}  
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
      
        </div>
    )
}

export default SearchStates
