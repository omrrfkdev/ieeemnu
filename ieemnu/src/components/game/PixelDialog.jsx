import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';
import { audioManager } from '../../game/audioManager';

/**
 * PixelDialog — Retro RPG-style modal for game interactions
 *
 * Props:
 *   isOpen       {boolean}
 *   title        {string}
 *   icon         {ReactNode}  — lucide icon
 *   badge        {string}     — small tag (e.g. discipline name)
 *   children     {ReactNode}  — body content
 *   onClose      {function}
 *   accentColor  {string}     — CSS color for border/accent ('green'|'yellow'|...)
 */
export const PixelDialog = ({
  isOpen,
  title,
  icon,
  badge,
  children,
  onClose,
  accentColor = 'green',
}) => {
  const accentMap = {
    green:  { border: '#00ff9f', glow: 'rgba(0,255,159,0.3)', text: '#00ff9f' },
    yellow: { border: '#fbbf24', glow: 'rgba(251,191,36,0.3)',  text: '#fbbf24' },
    red:    { border: '#ef4444', glow: 'rgba(239,68,68,0.3)',   text: '#ef4444' },
    blue:   { border: '#38bdf8', glow: 'rgba(56,189,248,0.3)',  text: '#38bdf8' },
  };
  const accent = accentMap[accentColor] ?? accentMap.green;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-30 p-4"
          style={{ background: 'rgba(0,0,0,0.88)' }}
        >
          <motion.div
            initial={{ scale: 0.85, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 24 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-full max-w-sm flex flex-col"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              background: '#0d1117',
              border: `3px solid ${accent.border}`,
              boxShadow: `
                0 0 0 1px #000,
                0 0 0 4px ${accent.border},
                0 0 0 5px #000,
                0 0 24px ${accent.glow}
              `,
              imageRendering: 'pixelated',
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: `2px solid ${accent.border}`, background: '#0a0f16' }}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span style={{ color: accent.text }}>{icon}</span>
                <span
                  className="text-white truncate"
                  style={{ fontSize: '8px', letterSpacing: '0.05em' }}
                >
                  {title}
                </span>
                {badge && (
                  <span
                    className="px-1 py-0.5 ml-1 shrink-0"
                    style={{
                      fontSize: '6px',
                      color: accent.text,
                      border: `1px solid ${accent.border}`,
                      background: '#0d1117',
                    }}
                  >
                    {badge}
                  </span>
                )}
              </div>
              {onClose && (
                <button
                  onClick={() => { audioManager.play('confirm', { forceRestart: true }); onClose(); }}
                  className="ml-2 shrink-0 text-gray-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* ── Body ── */}
            <div className="p-4 flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * PixelCodeBlock — monospace code display inside a PixelDialog
 */
export const PixelCodeBlock = ({ children }) => (
  <div
    className="w-full p-4 overflow-x-auto"
    style={{
      background: '#000',
      border: '2px solid #1e293b',
      fontFamily: "'Press Start 2P', monospace",
    }}
  >
    <code className="text-green-400 whitespace-pre-wrap leading-loose" style={{ fontSize: '11px' }}>
      {children}
    </code>
  </div>
);

/**
 * PixelInput — styled text input matching the pixel theme
 */
export const PixelInput = ({ value, onChange, placeholder, hasError, maxLength, center }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    maxLength={maxLength}
    autoFocus
    className="w-full bg-black text-white placeholder-gray-700 outline-none px-3 py-3"
    style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '12px',
      letterSpacing: center ? '0.4em' : '0.05em',
      textAlign: center ? 'center' : 'left',
      border: `2px solid ${hasError ? '#ef4444' : '#1e4d2b'}`,
      boxShadow: hasError ? '0 0 0 2px rgba(239,68,68,0.3)' : '0 0 0 2px rgba(0,255,159,0.1)',
      caretColor: '#00ff9f',
    }}
  />
);

/**
 * PixelButton — pixel-themed action button
 */
export const PixelButton = ({ onClick, type = 'button', children, color = 'green', disabled }) => {
  const colorMap = {
    green:  { bg: '#064e3b', hover: '#065f46', border: '#00ff9f', text: '#00ff9f' },
    yellow: { bg: '#78350f', hover: '#92400e', border: '#fbbf24', text: '#fbbf24' },
    red:    { bg: '#7f1d1d', hover: '#991b1b', border: '#ef4444', text: '#ef4444' },
    cyan:   { bg: '#083344', hover: '#164e63', border: '#22d3ee', text: '#22d3ee' },
  };
  const c = colorMap[color] ?? colorMap.green;

  return (
    <button
      type={type}
      onClick={(e) => { audioManager.play('confirm', { forceRestart: true }); onClick(e); }}
      disabled={disabled}
      className="w-full py-3 px-4 transition-all active:translate-y-px disabled:opacity-40"
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '11px',
        color: c.text,
        background: c.bg,
        border: `2px solid ${c.border}`,
        boxShadow: `3px 3px 0 #000`,
        letterSpacing: '0.05em',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
};

/**
 * PixelHint — expandable hint block
 */
export const PixelHint = ({ hint }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    className="flex items-start gap-2 p-3"
    style={{ background: '#1c1a00', border: '2px solid #854d0e' }}
  >
    <Lightbulb size={14} className="shrink-0 text-yellow-400 mt-0.5" />
    <p className="text-yellow-300" style={{ fontSize: '9px', lineHeight: '2', fontFamily: "'Press Start 2P', monospace" }}>
      {hint}
    </p>
  </motion.div>
);
