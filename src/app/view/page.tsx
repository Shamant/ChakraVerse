'use client';

import { useRouter } from "next/navigation";
import ChakraBackgroundWrapper from "../../../components/ChakraBg";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen relative bg-black text-white font-sans overflow-hidden">
      {/* Chakra Background Animation */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ChakraBackgroundWrapper />
      </div>
    </main>
  );
}
