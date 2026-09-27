/**
 * LanguageSelect — Tutorial Phase 2
 *
 * The very first screen the player sees when entering tutorial mode.
 * Full-screen dark overlay matching the game's aesthetic.
 * Player picks Arabic or English — choice persists via useTutorial hook.
 *
 * Props:
 *   lang    {string}   currently selected lang ('en' | 'ar')
 *   setLang {fn}       updates lang state + localStorage
 *   onNext  {fn}       advances TutorialFlow to the 'intro' step
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerSprite from '../PlayerSprite';

const PIXEL_FONT = { fontFamily: "'Press Start 2P', monospace" };

// ── Pixel particle — decorative floating dot ──────────────────────────────
const FloatingPixel = ({ style }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-none"
    style={{ background: 'rgba(0,255,159,0.3)', ...style }}
    animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
    transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// ── Language Button ───────────────────────────────────────────────────────
const LangButton = ({ label, sublabel, onClick, accentColor = '#00ff9f' }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.95, y: 2 }}
      className="relative w-full max-w-[260px] py-4 px-6 flex flex-col items-center gap-2 overflow-hidden"
      style={{
        background: hovered ? 'rgba(0,255,159,0.08)' : '#0d1117',
        border: `2px solid ${hovered ? accentColor : 'rgba(0,255,159,0.25)'}`,
        boxShadow: hovered
          ? `3px 3px 0 #000, 0 0 18px rgba(0,255,159,0.2)`
          : '3px 3px 0 #000',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
      }}
    >
      {/* Hover shimmer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg,transparent,rgba(0,255,159,0.15),transparent)',
              width: '50%',
            }}
          />
        )}
      </AnimatePresence>

      {/* Arrow prefix */}
      <span
        className="text-[#00ff9f]"
        style={{ ...PIXEL_FONT, fontSize: 'clamp(8px, 2vw, 11px)' }}
      >
        ▸ {label}
      </span>

      {/* Sublabel */}
      <span
        style={{
          ...PIXEL_FONT,
          fontSize: 'clamp(6px, 1.5vw, 8px)',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.1em',
        }}
      >
        {sublabel}
      </span>
    </motion.button>
  );
};

// ── Main Component ────────────────────────────────────────────────────────
const LanguageSelect = ({ lang, setLang, onNext }) => {
  // Animate in on mount
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (l) => {
    setLang(l);
    // brief delay so the button press registers visually before advancing
    setTimeout(() => onNext(), 320);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#090e14' }}
    >
      {/* ── Scanline overlay (matches GameRoom) ────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0px,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 4px)',
        }}
      />

      {/* ── Vignette ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* ── Floating pixel particles ───────────────────────────── */}
      {[...Array(18)].map((_, i) => (
        <FloatingPixel
          key={i}
          style={{
            left: `${5 + i * 5.5}%`,
            top: `${10 + ((i * 37) % 80)}%`,
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}

      {/* ── Content card ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex flex-col items-center gap-6 px-6 w-full max-w-md"
      >
        {/* ── IEEE badge ── */}
        <div
          className="flex items-center gap-2 mb-2"
          style={{ ...PIXEL_FONT, fontSize: 'clamp(6px, 1.4vw, 8px)', color: 'rgba(0,255,159,0.5)', letterSpacing: '0.25em' }}
        >
          <span>IEEE MNU</span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <span>ENGINEERING FACILITY</span>
        </div>

        {/* ── Player sprite — bobbing ── */}
        <motion.div
          className="w-16 h-16 relative"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* glow under sprite */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full blur-sm"
            style={{ background: 'rgba(0,255,159,0.2)' }}
          />
          <PlayerSprite direction="down" isMoving={false} />
        </motion.div>

        {/* ── Title ── */}
        <div className="flex flex-col items-center gap-3 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            style={{
              ...PIXEL_FONT,
              fontSize: 'clamp(10px, 2.8vw, 15px)',
              color: '#fff',
              lineHeight: 1.8,
              letterSpacing: '0.05em',
            }}
          >
            SYSTEM INITIALIZATION
          </motion.span>
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="w-full max-w-[200px] h-px origin-center"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,159,0.4),transparent)' }}
        />

        {/* ── Language buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <LangButton
            label="GET STARTED"
            sublabel="Begin Tutorial"
            onClick={() => handleSelect('en')}
          />
        </motion.div>

        {/* ── Bottom hint ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{
            ...PIXEL_FONT,
            fontSize: 'clamp(5px, 1.2vw, 7px)',
            color: 'rgba(255,255,255,0.2)',
            textAlign: 'center',
            lineHeight: 2.2,
          }}
        >
          Accessing central mainframe protocols...
        </motion.p>
      </motion.div>

      {/* ── Bottom step dots ─────────────────────────────────── */}
      <div className="absolute bottom-8 flex gap-3 z-20">
        {['language', 'intro', 'rooms'].map((s, i) => (
          <div
            key={s}
            className="w-2 h-2"
            style={{
              background: i === 0 ? '#00ff9f' : 'rgba(255,255,255,0.15)',
              boxShadow: i === 0 ? '0 0 6px #00ff9f' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
