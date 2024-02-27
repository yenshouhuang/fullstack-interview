import Image from "next/image";
import { Inter } from "next/font/google";
import { Hero } from "@/components";



export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
    </main>
  );
}