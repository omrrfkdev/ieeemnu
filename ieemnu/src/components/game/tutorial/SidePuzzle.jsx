/**
 * SidePuzzle — Bonus Terminal Puzzle
 *
 * Triggered by the 'S' map tile. Optional — no penalty for closing.
 * 15-second countdown. Correct answer within time → +50 pts (+25 speed bonus).
 * Yellow accent to distinguish from main green puzzles.
 */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PIXEL_FONT = { fontFamily: "'Press Start 2P', monospace" };
const TIME_LIMIT = 15; // seconds

const SidePuzzle = ({ challenge, onSolve, onClose }) => {
  const [answer, setAnswer]     = useState('');
  const [hasError, setHasError] = useState(false);
  const [solved, setSolved]     = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const inputRef                = useRef(null);
  const timerRef                = useRef(null);

  // Auto-focus input
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, []);

  // 15-second countdown
  useEffect(() => {
    if (solved || timeLeft <= 0) return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timerRef.current);
  }, [solved, timeLeft]);

  // Handle timeout
  useEffect(() => {
    if (timeLeft === 0 && !solved) {
      const t = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(t);
    }
  }, [timeLeft, solved, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (solved || timeLeft === 0) return;

    if (answer.trim().toLowerCase() === challenge.answer.toString().toLowerCase()) {
      setSolved(true);
      setTimeout(() => onSolve(TIME_LIMIT - timeLeft), 700);
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 600);
    }
  };

  const pct = (timeLeft / TIME_LIMIT) * 100;
  const timerColor = timeLeft > 8 ? '#fbbf24' : timeLeft > 4 ? '#f97316' : '#ef4444';

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-40 p-4"
      style={{ background: 'rgba(0,0,0,0.93)' }}
    >
      <motion.div
        initial={{ scale: 0.87, y: 20, opacity: 0 }}
        animate={solved ? { scale: 1.02, opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.87, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="w-full flex flex-col"
        style={{
          maxWidth: 400,
          background: '#0d1117',
          border: `2px solid ${solved ? '#fbbf24' : 'rgba(251,191,36,0.5)'}`,
          boxShadow: solved
            ? '0 0 0 1px #000,0 0 0 4px #fbbf24,0 0 40px rgba(251,191,36,0.4)'
            : '0 0 0 1px #000,0 0 0 3px rgba(251,191,36,0.3),0 0 20px rgba(251,191,36,0.12)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* ── Title bar ── */}
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{ background: '#161b22', borderBottom: '1px solid rgba(251,191,36,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div style={{ width: 9, height: 9, background: '#ef4444' }} />
              <div style={{ width: 9, height: 9, background: '#fbbf24' }} />
              <div style={{ width: 9, height: 9, background: '#22c55e' }} />
            </div>
            <span style={{ ...PIXEL_FONT, fontSize: '5.5px', color: 'rgba(251,191,36,0.6)', letterSpacing: '0.12em' }}>
              IEEE_BONUS_TERMINAL ⚡
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ ...PIXEL_FONT, fontSize: '7px', color: 'rgba(255,255,255,0.22)', background: 'none', border: 'none', cursor: 'pointer' }}
          >✕</button>
        </div>

        {/* ── Timer bar ── */}
        <div style={{ height: 4, background: '#1e293b', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: 'linear' }}
            style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              background: timerColor,
              boxShadow: `0 0 6px ${timerColor}`,
              transition: 'background 0.3s',
            }}
          />
        </div>

        {/* ── Header ── */}
        <div className="px-4 pt-3 pb-2" style={{ background: '#0a0f18', borderBottom: '1px solid #1e293b' }}>
          <div className="flex items-center justify-between">
            <span style={{ ...PIXEL_FONT, fontSize: '6px', color: '#fbbf24', letterSpacing: '0.08em' }}>
              ⚡ BONUS CHALLENGE
            </span>
            <div className="flex items-center gap-1.5">
              <span style={{ ...PIXEL_FONT, fontSize: '5px', color: 'rgba(255,255,255,0.3)' }}>
                {challenge.category}
              </span>
              <span style={{
                ...PIXEL_FONT, fontSize: '5px',
                color: timeLeft <= 4 ? '#ef4444' : '#fbbf24',
                animation: timeLeft <= 4 ? 'pulse 0.5s infinite' : 'none',
              }}>
                ⏱ {timeLeft}s
              </span>
            </div>
          </div>
          <p style={{ ...PIXEL_FONT, fontSize: '5px', color: 'rgba(255,255,255,0.3)', marginTop: 4, lineHeight: 1.8 }}>
            Answer correctly within {TIME_LIMIT}s to earn +50 PTS
            {' '}<span style={{ color: '#fbbf24' }}>(+25 SPEED BONUS if &lt;5s!)</span>
          </p>
        </div>

        {/* ── Question ── */}
        <div className="px-4 py-3" style={{ background: '#000', borderBottom: '2px solid #1e293b' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: '9px' }}>
            <span style={{ color: '#fbbf24' }}>$</span>
            <span style={{ color: '#64748b', ...PIXEL_FONT, fontSize: '5.5px' }}>bonus_query.sh</span>
          </div>
          <div style={{ borderLeft: '2px solid rgba(251,191,36,0.2)', paddingLeft: 10, marginLeft: 8 }}>
            <p style={{ ...PIXEL_FONT, fontSize: '9px', color: '#fbbf24', lineHeight: 2.2, whiteSpace: 'pre-wrap' }}>
              {challenge.question}
            </p>
          </div>
        </div>

        {/* ── Answer ── */}
        <div className="flex flex-col gap-3 p-4">
          <p style={{ ...PIXEL_FONT, fontSize: '6.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 2 }}>
            What is the answer?
          </p>

          <motion.form
            onSubmit={handleSubmit}
            animate={hasError ? { x: [-5, 5, -5, 4, -2, 2, 0] } : { x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="type answer..."
              disabled={solved || timeLeft === 0}
              autoComplete="off"
              style={{
                ...PIXEL_FONT,
                fontSize: '11px',
                background: '#000',
                color: solved ? '#fbbf24' : '#fff',
                border: `2px solid ${solved ? '#fbbf24' : hasError ? '#ef4444' : 'rgba(251,191,36,0.35)'}`,
                padding: '11px 14px',
                outline: 'none',
                letterSpacing: '0.1em',
                caretColor: '#fbbf24',
                width: '100%',
                boxShadow: hasError
                  ? '0 0 0 2px rgba(239,68,68,0.25)'
                  : solved ? '0 0 0 2px rgba(251,191,36,0.3)' : 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />

            <button
              type="submit"
              disabled={solved || timeLeft === 0}
              className="w-full py-2.5 transition-all active:translate-y-px"
              style={{
                ...PIXEL_FONT,
                fontSize: '8px',
                color: solved ? '#000' : hasError ? '#ef4444' : '#fbbf24',
                background: solved ? '#fbbf24' : hasError ? '#7f1d1d' : '#1a1200',
                border: `2px solid ${solved ? '#fbbf24' : hasError ? '#ef4444' : '#fbbf24'}`,
                boxShadow: '2px 2px 0 #000',
                cursor: solved || timeLeft === 0 ? 'default' : 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              {solved
                ? '✓ CORRECT! +50 PTS'
                : hasError
                  ? '✗ WRONG — TRY AGAIN'
                  : '▸ SUBMIT ANSWER'}
            </button>
          </motion.form>

          {/* Solved message */}
          <AnimatePresence>
            {solved && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ ...PIXEL_FONT, fontSize: '6px', color: '#fbbf24', textAlign: 'center', lineHeight: 2 }}
              >
                ⚡ BONUS TERMINAL SECURED
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SidePuzzle;
