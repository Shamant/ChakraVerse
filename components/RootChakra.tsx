'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, PlayCircle, PauseCircle } from 'lucide-react';

export default function RootChakra() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [frequency, setFrequency] = useState(396);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setMounted(true);
    const context = new (window.AudioContext || window.AudioContext)();
    audioContextRef.current = context;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(0, context.currentTime);
    gainNode.gain.setValueAtTime(0, context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();

    oscillatorRef.current = oscillator;
    gainRef.current = gainNode;

    return () => {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }, []);

  const togglePlayback = () => {
    if (!audioContextRef.current || !oscillatorRef.current || !gainRef.current) return;

    if (isPlaying) {
      gainRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.1);
    } else {
      oscillatorRef.current.frequency.setValueAtTime(frequency || 396, audioContextRef.current.currentTime);
      gainRef.current.gain.setTargetAtTime(0.5, audioContextRef.current.currentTime, 0.1);
    }

    setIsPlaying(!isPlaying);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(v => v.name.includes("Google US English")) ||
      voices.find(v => v.name.includes("Microsoft Aria")) ||
      voices.find(v => v.lang === "en-US");
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.pitch = 1;
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  };

  const setTimer = (min: number) => {
    setTime(min);
    if (timerRef.current) clearTimeout(timerRef.current);
    speak(`Timer set for ${min} minutes. Let your energy flow.`);
    timerRef.current = setTimeout(() => {
      speak("Your timer has now ended. You may come out of meditation.");
    }, min * 60 * 1000);
  };

  const updateFrequency = (hz: number) => {
    setFrequency(hz);
    if (oscillatorRef.current && isPlaying) {
      oscillatorRef.current.frequency.setValueAtTime(hz, audioContextRef.current!.currentTime);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen w-full flex flex-col items-center text-center px-6 py-12 text-white"
      style={{
        background: 'linear-gradient(135deg, #0ff0fc, #8a2be2)',
        transition: 'background 1s ease',
      }}
    >
      <motion.div className="relative w-full flex items-center justify-center mb-6" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, type: 'spring', stiffness: 70 }}>
        <button onClick={() => router.push('/')} className="absolute left-4 md:left-1/4 lg:left-1/3 text-white hover:text-gray-300 transition">
          <ArrowLeft className="w-7 h-6 md:w-8 md:h-7" />
        </button>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Root Chakra</h1>
      </motion.div>

      <motion.p className="text-lg md:text-xl max-w-2xl text-white/90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
        The Root Chakra grounds you into the physical world. It governs safety, survival, and your connection to the earth.
      </motion.p>

      <motion.div className="mt-10 w-full max-w-4xl bg-white/10 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col items-center gap-9 p-17" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}>
        <div className="relative w-46 h-46 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-orange-500 border-4 border-white shadow-2xl" style={{ animation: `chakraPulse ${Math.max(2, 600 / (frequency || 1))}s ease-in-out infinite` }}>
          <div className="absolute inset-0 rounded-full border-2 border-white/60 opacity-70" style={{ animation: `spin ${Math.max(4, 1000 / (frequency || 1))}s linear infinite` }} />
        </div>

        <button onClick={togglePlayback} className="text-white hover:scale-110 transition">
          {isPlaying ? <PauseCircle size={60} /> : <PlayCircle size={60} />}
        </button>

        <div className="w-full flex flex-col items-center gap-6">
          <input type="range" min={100} max={1000} value={frequency} step={1} onChange={(e) => updateFrequency(parseInt(e.target.value))} className="w-3/4 h-2 bg-[#0ff0fc] rounded-lg appearance-none cursor-pointer accent-[#8a2be2]" />
          <div className="text-white/80 text-sm">Current: {frequency} Hz</div>
        </div>

        <div>
          <span className="flex flex-wrap justify-center items-center gap-5 mt-8">
            {[{ label: '5 min', time: 5 }, { label: '10 min', time: 10 }].map(({ label, time }) => (
              <button key={label} className="relative group px-8 py-3 rounded-3xl border border-white/20 bg-black/30 text-white text-lg font-semibold shadow-xl transition duration-300 ease-in-out hover:scale-105 overflow-hidden" onClick={() => setTimer(time)}>
                <span className="z-10 relative">{label}</span>
                <span className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-10 transition duration-300"></span>
              </button>
            ))}
            <button className="relative group px-8 py-3 rounded-3xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-pink-500/10 text-white text-lg font-semibold shadow-xl transition duration-300 ease-in-out hover:scale-105 flex items-center gap-2 overflow-hidden" onClick={() => {
              let custom = prompt('Enter custom duration in minutes:');
              if (custom) {
                setTimer(Number(custom));
              }
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="z-10 relative">Custom</span>
              <span className="absolute inset-0 bg-white/30 blur-lg opacity-0 group-hover:opacity-10 transition duration-300"></span>
            </button>
          </span>
        </div>
      </motion.div>
    </main>
  );
}