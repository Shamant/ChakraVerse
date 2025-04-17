'use client';

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";
import router from "next/router";

export default function LandingPage() {
  const chakraSectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  function scrollToChakraSection() {
    chakraSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function getChakraColor(chakra: string) {
    const gradients: Record<string, string> = {
      Root: "linear-gradient(135deg, #0ff0fc, #8a2be2)",
      Sacral: "linear-gradient(135deg, #f72585, #7209b7)",
      Solar: "linear-gradient(135deg, #ffbe0b, #fb5607)",
      Heart: "linear-gradient(135deg, #3a86ff, #8338ec)",
      Throat: "linear-gradient(135deg, #00f5d4, #9b5de5)",
      "Third Eye": "linear-gradient(135deg, #ff006e, #7b2cbf)",
      Crown: "linear-gradient(135deg, #caffbf, #a0c4ff)",
    };
    return gradients[chakra] || "linear-gradient(135deg, #ffffff, #dddddd)";
  }

  const getChakraDescription = (chakra: string) => {
    const descriptions: Record<string, string> = {
      Root: "Stability & grounding. Connect to earth energy & physical strength.",
      Sacral: "Creativity & passion. Enhance emotional flow & sensual energy.",
      Solar: "Personal power & confidence. Ignite your inner fire & willpower.",
      Heart: "Love & compassion. Open to universal connection & healing.",
      Throat: "Communication & expression. Speak your truth with clarity.",
      "Third Eye": "Intuition & wisdom. Awaken inner vision & deep insight.",
      Crown: "Spiritual connection & enlightenment. Access higher consciousness.",
    };
    return descriptions[chakra] || "Immersive sound & visuals aligned with its energy.";
  };

  return (
    <main className="min-h-screen relative bg-black text-white font-sans overflow-hidden py-15">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-7 px-6 z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ChakraVerse
        </motion.h1>

        <motion.p
          className="max-w-xl text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Journey through the sacred energy centers with sound, visuals, and soul.
        </motion.p><br></br>

        <motion.button
          onClick={scrollToChakraSection}
          className="mt-8 px-8 py-3 rounded-2xl text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md hover:shadow-pink-500/50 transition duration-300 transform hover:scale-105 hover:brightness-110 focus:outline-none"
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Begin the Journey
        </motion.button>
      </section>

      {/* About Section */}
      <motion.section
        className="relative flex flex-col max-w-4xl mx-auto px-6 py-10 z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl text-center font-semibold">What is ChakraVerse?</h2>
        <p className="text-gray-300 text-lg text-center mt-4">
          ChakraVerse is a spiritual-visual experiment that blends ancient Indian chakra philosophy with modern sound design and digital art. Each chakra is a portal to an audiovisual meditation space.
        </p>
      </motion.section>

      {/* Chakra Journey Preview */}
      <motion.section
        ref={chakraSectionRef}
        className="relative flex flex-col py-16 px-6 z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-center mb-10">The Chakra Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Root", "Sacral", "Solar", "Heart", "Throat", "Third Eye", "Crown"].map((chakra, i) => (
            <motion.div
              key={chakra}
              onClick={() => router.push(`/chakra/${chakra}`)}
              className="rounded-2xl p-6 text-center transition-transform duration-300 ease-in-out hover:scale-105 relative group"
              style={{
                position: "relative",
                background: "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(6px)",
                borderRadius: "1rem",
                zIndex: 1,
              }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl z-0 pointer-events-none"
                style={{
                  padding: "2px",
                  backgroundImage: getChakraColor(chakra),
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              ></motion.div>

              <h3 className="text-xl font-medium mb-2">{chakra} Chakra</h3>
              <p className="text-sm text-gray-400">{getChakraDescription(chakra)}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why ChakraVerse */}
      <motion.section
        className="py-16 px-6 text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-4">Why ChakraVerse?</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          In a world full of noise, ChakraVerse is a pause — an invitation to reconnect with inner rhythm through India’s spiritual wisdom, remixed through code and creativity.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-500 text-sm relative z-10">
        Made with love & spirit · © {new Date().getFullYear()} ChakraVerse
      </footer>
    </main>
  );
}
