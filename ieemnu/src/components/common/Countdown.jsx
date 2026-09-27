import { useState, useEffect, useRef } from 'react';
import Countdown from 'react-countdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrnateDivider = ({ className = "" }) => (
  <svg
    className={`w-full max-w-[300px] md:max-w-[500px] h-auto drop-shadow-lg ${className}`}
    viewBox="0 0 500 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M250 5C260 20 275 22 290 22L470 22C485 22 495 24 500 25C495 26 485 28 470 28L290 28C275 28 260 30 250 45C240 30 225 28 210 28L30 28C15 28 5 26 0 25C5 24 15 22 30 22L210 22C225 22 240 20 250 5Z" fill="#DEB887" />
    <path d="M250 0C255 12 265 18 280 18L470 18C480 18 490 20 500 25C490 30 480 32 470 32L280 32C265 32 255 38 250 50C245 38 235 32 220 32L30 32C20 32 10 30 0 25C10 20 20 18 30 18L220 18C235 18 245 12 250 0Z" fill="#C59B5F" opacity="0.6" />
    <circle cx="250" cy="25" r="5" fill="#DEB887" />
    <circle cx="220" cy="25" r="3" fill="#DEB887" />
    <circle cx="280" cy="25" r="3" fill="#DEB887" />
    <path d="M250 15 L255 25 L250 35 L245 25 Z" fill="#FFF8E7" opacity="0.8" />
  </svg>
);

const CountdownTimer = () => {
  const [mounted, setMounted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const countdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setIsComplete(true);
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="text-center py-12"
        >
          <h2 className="text-4xl md:text-6xl text-[#DEB887] mb-4" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
            THE ENIGMA HAS BEGUN
          </h2>
          <p className="text-xl md:text-2xl text-white/80 tracking-[0.3em]" style={{ fontFamily: "'Cinzel', serif" }}>
            WELCOME TO THE FUTURE
          </p>
        </motion.div>
      );
    }

    const timeUnits = [
      { value: days, label: 'Days' },
      { value: hours, label: 'Hours' },
      { value: minutes, label: 'Minutes' },
      { value: seconds, label: 'Seconds' },
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="w-full max-w-4xl mx-auto mt-12 mb-8 z-10 relative"
      >
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1.5 + index * 0.2,
                ease: "easeOut"
              }}
              className="flex flex-col items-center"
            >
              <div
                className="text-5xl md:text-7xl lg:text-8xl text-[#DEB887] drop-shadow-[0_0_15px_rgba(222,184,135,0.4)]"
                style={{ fontFamily: "'Cinzel', serif", fontWeight: 500 }}
              >
                {String(unit.value).padStart(2, '0')}
              </div>
              <div
                className="text-xs md:text-sm text-white/70 tracking-[0.3em] uppercase mt-4"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="relative min-h-[80vh] md:min-h-screen flex flex-col justify-between py-8 px-6 md:px-12 overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #5A1616 0%, #300A0A 60%, #150202 100%)",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)"
      }}
    >
      {/* Cinematic noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}>
      </div>

      {/* Top Header Row */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full flex justify-between items-start z-10 relative"
      >
        <div className="w-32 md:w-48">
          {/* Logo placeholder - using IEEE styling */}
          <div className="text-white/90 text-sm md:text-base font-bold tracking-wider flex items-center gap-2">
            <span className="bg-white text-[#5A1616] px-2 py-0.5 rounded-sm text-xs">IEEE</span>
            <span style={{ fontFamily: "'Cinzel', serif" }}>MNU BRANCH</span>
          </div>
        </div>
        <div
          className="text-white/80 text-xs md:text-sm tracking-[0.2em]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          6TH MAY 2026
        </div>
      </motion.div>

      {/* Main Content Center */}
      <div className="flex-grow flex flex-col items-center justify-center z-10 relative w-full my-12">
        <motion.div
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center w-full"
        >
          <OrnateDivider className="mb-8 md:mb-12" />

          <h1
            className="text-6xl md:text-8xl lg:text-[9rem] text-[#DEB887] leading-none text-center drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 40px rgba(222,184,135,0.3)"
            }}
          >
            THE ENIGMA
          </h1>



          <Countdown
            ref={countdownRef}
            date={new Date('2026-05-06T00:00:00')}
            renderer={renderer}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
            className="mt-16 md:mt-24 z-20"
          >

          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Footer Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
        className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-6 z-10 relative"
      >
        <div
          className="text-white/80 text-xs md:text-sm tracking-[0.2em] leading-relaxed text-center md:text-left max-w-xs"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          NEVER PLANNED,<br />ALWAYS MEANT TO BE
        </div>

        <div className="hidden md:block">
          <OrnateDivider className="w-48 opacity-70" />
        </div>

        <div
          className="text-white/80 text-xs md:text-sm tracking-[0.2em]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ALL RIGHTS RESERVED
        </div>
      </motion.div>

      {/* Mobile bottom divider */}
      <div className="md:hidden mt-8 w-full flex justify-center z-10 relative">
        <OrnateDivider className="w-32 opacity-50" />
      </div>
    </div>
  );
};

export default CountdownTimer;