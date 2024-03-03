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


// Remove the getServerSideProps function because loading time from the server is too long and want to improve the user experience

// export const getServerSideProps = async () => {
//   const data = await fetchData();
//   return data;
// };

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleFetchListing = async () => {
    setLoading(true); 
    const data = await fetchData();
    setListings(data.props.data);
    setLoading(false); 
  };

  useEffect(() => {
    handleFetchListing();
  }, []);


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
          
          {loading ? ( 
            <div className="flex justify-center items-center h-screen">
              <Image src="/loading.gif" alt="loading" width={600} height={600} />
            </div>
          ) : !isDataEmpty ? (
            <section>
              <div className="home__house-wrapper">
                {listings?.map((house: HouseProps) => (
                  <HouseCard key={house.id} house={house} />
                ))}
              </div>
            </section>
          ) : (
            <div className="home-error-container">
              <h2 className="text-black text-x1 font-bold">Oops, no results</h2>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}