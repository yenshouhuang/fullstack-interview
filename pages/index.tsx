import Image from "next/image";
import { Inter } from "next/font/google";
import {
  CustomFilter,
  Footer,
  Hero,
  HouseCard,
  Navbar,
  SearchBar,
} from "@/components";
import Head from "next/head";
import { fetchData } from "../utils/index";
import React, { useState, useEffect } from "react";
import { HouseProps } from "@/types";
import { bedrooms } from "@/constants";

// export const getServerSideProps = async () => {
//   const data = await fetchData();
//   return data;
// };

export default function Home() {
  // console.log(props);
  const [listings, setListings] = useState([]);
  const handleCreateNewBooking = async (listing: any) => {
    const res = await fetch("/api/createBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listing }),
    });
    const bookingDetails = await res.json();
    console.log(bookingDetails);
  };

  const hadleFetchListing = async () => {
    const data = await fetchData();
    setListings(data.props.data);
  }

  useEffect(() => {
    hadleFetchListing();
  }, []);

  // const renderListings = () => {
  //   return props.data.map((listing: any) => {
  //     return (
  //       <div key={listing.id}>
  //         <h1>{listing.address.fullAddress}</h1>
  //         <p>{listing.price}</p>
  //         <div>
  //           <img src={listing.images[0].url} alt={listing.name} width={300} height={200} />
  //         </div>
  //         <button onClick={()=> handleCreateNewBooking(listing)}>Book</button>
  //       </div>
  //     )
  //   })
  // }

  const isDataEmpty =
    !Array.isArray(listings) || listings.length < 0 || !listings;

  return (
    <>
      <Head>
        <title>Habyt</title>
        <meta name="description" content="Find, book, and rent easily" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="house__text-container">
            <h1 className="text-4xl font-extrabold">Home Listings</h1>
          </div>
          {/* <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <CustomFilter title="bedrooms" options={bedrooms} />
            </div>
          </div> */}
          {!isDataEmpty ? (
            <section>
              <div className="home__house-wrapper">
                {listings?.map((house: HouseProps) => (
                  <HouseCard house={house} />
                ))}
              </div>
            </section>
          ) : (
            <div className="home-error-container">
              <h2 className="text-black text-x1 font-bold">Oops, no results</h2>
              {/* <p>{props.data?.message}</p> */}
            </div>
          )}
        </div>
      </main>
      {/* {renderListings()} */}
      <Footer />
    </>
  );
}
