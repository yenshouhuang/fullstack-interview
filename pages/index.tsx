import Image from "next/image";
import { Inter } from "next/font/google";
import { CustomFilter, Footer, Hero, Navbar, SearchBar } from "@/components";
import Head from "next/head";



export default function Home() {
  return (
    <>
      <Head>
          <title>Habyt</title>
          <meta name="description" content="Find, book, and rent easily" />
      </Head>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="house__text-container">
            <h1 className="text-4xl font-extrabold">Home Catalogue</h1>
            <p>Explore the Home you like</p>
          </div>
          <div className="house_filters">
            <SearchBar />

            <div className="house__filter-container">
              {/* <CustomFilter title="city"/>
              <CustomFilter title="price"/> */}
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}

