'use client';

import { useEffect, useState } from "react";
import { use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Chakra data (colors, descriptions, etc.)
const chakraData: Record<string, {
  title: string;
  gradient: string;
  description: string;
}> = {
  Root: {
    title: "Root Chakra",
    gradient: "linear-gradient(135deg, #0ff0fc, #8a2be2)",
    description: "The Root Chakra grounds you into the physical world. It governs safety, survival, and your connection to the earth. A balanced root chakra brings stability, security, and presence in the body.",
  },
  Sacral: {
    title: "Sacral Chakra",
    gradient: "linear-gradient(135deg, #f72585, #7209b7)",
    description: "The Sacral Chakra is the seat of creativity, emotion, and sensuality. It flows with passion, intimacy, and pleasure. When balanced, it fuels fluid movement in body and life.",
  },
  Solar: {
    title: "Solar Plexus Chakra",
    gradient: "linear-gradient(135deg, #ffbe0b, #fb5607)",
    description: "The Solar Plexus Chakra is your power center — it governs confidence, willpower, and self-identity. When awakened, it sparks ambition and inner strength.",
  },
  Heart: {
    title: "Heart Chakra",
    gradient: "linear-gradient(135deg, #3a86ff, #8338ec)",
    description: "The Heart Chakra is the bridge between the physical and spiritual. It radiates compassion, love, and empathy. Balanced, it opens you to deep connection with others and self.",
  },
  Throat: {
    title: "Throat Chakra",
    gradient: "linear-gradient(135deg, #00f5d4, #9b5de5)",
    description: "The Throat Chakra enables expression and communication. It allows you to speak your truth with clarity and creativity. When aligned, your voice feels natural and authentic.",
  },
  "Third Eye": {
    title: "Third Eye Chakra",
    gradient: "linear-gradient(135deg, #ff006e, #7b2cbf)",
    description: "The Third Eye Chakra governs intuition, foresight, and spiritual awareness. It awakens inner wisdom and helps you see beyond illusion. A clear third eye enhances insight and imagination.",
  },
  Crown: {
    title: "Crown Chakra",
    gradient: "linear-gradient(135deg, #caffbf, #a0c4ff)",
    description: "The Crown Chakra is your gateway to divine consciousness. It connects you to universal energy, purpose, and transcendence. When open, it brings serenity, bliss, and unity with all.",
  }
};

export default function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = use(params);
  const chakraInfo = chakraData[page] || {
    title: "Unknown Chakra",
    gradient: "linear-gradient(135deg, #8338ec, #ff006e)",
    description: "No information available.",
  };

  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main
      className="min-h-screen text-white flex flex-col items-center justify-start text-center px-6 pt-12 pb-16"
      style={{ background: chakraInfo.gradient, transition: 'background 1s ease' }}
    >

      {/* Back button */}

      <motion.div
  className="relative w-full flex items-center justify-center mb-6"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, type: "spring", stiffness: 70 }}
>
  <button
    onClick={() => router.push("/")}
    className="absolute left-4 md:left-1/4 lg:left-1/3 text-white hover:text-gray-300 transition duration-300"
  >
    <ArrowLeft className="w-6 h-6" />
  </button>

  <h1 className="text-4xl md:text-5xl font-bold">
    {chakraInfo.title}
  </h1>
</motion.div>




      <motion.p
        className="text-lg md:text-xl max-w-2xl text-white/90"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 60 }}
      >
        {chakraInfo.description}
      </motion.p>

      <motion.div
        className="mt-10 w-full max-w-3xl h-[300px] bg-black/20 rounded-xl shadow-xl backdrop-blur-md flex items-center justify-center text-white text-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 1, type: "spring", bounce: 0.25 }}
      >
        Chakra meditative space loading...
      </motion.div>
    </main>
  );
}
