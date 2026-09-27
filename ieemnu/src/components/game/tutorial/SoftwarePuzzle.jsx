/**
 * SoftwarePuzzle — Phase 5
 *
 * Terminal chrome showing a code snippet.
 * Player reads and thinks — types the expected output directly.
 * No RUN button. Mental reasoning only.
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PIXEL_FONT = { fontFamily: "'Press Start 2P', monospace" };

const STR = {
  en: {
    question:    'What does this code print?',
    placeholder: 'type the output...',
    submitBtn:   '▸ SUBMIT',
    hintLabel:   '💡 HINT:',
    wrongMsg:    'WRONG — TRY AGAIN',
    correct:     '✓ CORRECT!',
  },
  ar: {
    question:    'ماذا يطبع هذا الكود؟',
    placeholder: '...اكتب الناتج',
    submitBtn:   '▸ إرسال',
    hintLabel:   '💡 تلميح:',
    wrongMsg:    'خطأ — حاول مرة أخرى',
    correct:     '✓ صحيح!',
  },
};

const Cursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.65, repeat: Infinity }}
    style={{ color: '#00ff9f' }}
  >▌</motion.span>
);

const SoftwarePuzzle = ({ challenge, lang = 'en', onSolve, onClose }) => {
  const [answer, setAnswer]     = useState('');
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved]     = useState(false);
  const inputRef                = useRef(null);

  const s     = STR[lang] || STR.en;
  const isRTL = lang === 'ar';

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (solved) return;
    if (answer.trim().toLowerCase() === challenge.answer.toLowerCase()) {
      setSolved(true);
      setTimeout(() => onSolve(), 700);
    } else {
      setHasError(true);
      setAttempts(a => a + 1);
      setTimeout(() => setHasError(false), 650);
    }
  };

  const codeLines = challenge.code.split('\n');
  const showHint  = attempts >= 2;
  const hintText  = lang === 'ar' ? (challenge.hintAr || challenge.hint) : challenge.hint;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-40 p-4"
      style={{ background: 'rgba(0,0,0,0.93)' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial={{ scale: 0.87, y: 20, opacity: 0 }}
        animate={solved ? { scale: 1.02, opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.87, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="w-full flex flex-col"
        style={{
          maxWidth: 440,
          background: '#0d1117',
          border: `2px solid ${solved ? '#00ff9f' : 'rgba(0,255,159,0.5)'}`,
          boxShadow: solved
            ? '0 0 0 1px #000,0 0 0 4px #00ff9f,0 0 40px rgba(0,255,159,0.5)'
            : '0 0 0 1px #000,0 0 0 3px rgba(0,255,159,0.35),0 0 24px rgba(0,255,159,0.18)',
          imageRendering: 'pixelated',
          transition: 'border-color 0.3s,box-shadow 0.3s',
        }}
      >

        {/* ── Title bar ── */}
        <div className="flex items-center justify-between px-3 py-2"
          style={{ background:'#161b22', borderBottom:'1px solid rgba(0,255,159,0.2)' }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div style={{ width:9,height:9,background:'#ef4444' }}/>
              <div style={{ width:9,height:9,background:'#fbbf24' }}/>
              <div style={{ width:9,height:9,background:'#22c55e' }}/>
            </div>
            <span style={{ ...PIXEL_FONT,fontSize:'5.5px',
              color:'rgba(0,255,159,0.5)',letterSpacing:'0.12em' }}>
              IEEE_TRAINING_ENV — puzzle.py
            </span>
          </div>
          <button onClick={onClose}
            style={{ ...PIXEL_FONT,fontSize:'7px',color:'rgba(255,255,255,0.22)',
              background:'none',border:'none',cursor:'pointer' }}>✕</button>
        </div>

        {/* ── Code block ── */}
        <div className="p-4 flex flex-col gap-1.5"
          style={{ background:'#000',borderBottom:'2px solid #1e293b',
            fontFamily:"'Press Start 2P', monospace" }}>

          <div className="flex gap-2 mb-2" style={{ fontSize:'9px' }}>
            <span style={{ color:'#fbbf24' }}>$</span>
            <span style={{ color:'#64748b' }}>cat puzzle.py</span>
          </div>

          <div style={{ borderLeft:'2px solid rgba(0,255,159,0.15)',paddingLeft:10,marginLeft:8 }}>
            {codeLines.map((line, i) => (
              <div key={i} className="flex gap-3" style={{ fontSize:'9px',lineHeight:2.1 }}>
                <span style={{ color:'#374151',minWidth:12,textAlign:'right',flexShrink:0 }}>
                  {i + 1}
                </span>
                <code style={{ color:'#00ff9f',whiteSpace:'pre' }}>{line}</code>
              </div>
            ))}
          </div>

          <div className="mt-2 flex gap-2" style={{ fontSize:'9px' }}>
            <span style={{ color:'#fbbf24' }}>$</span>
            <Cursor />
          </div>
        </div>

        {/* ── Answer section ── */}
        <div className="flex flex-col gap-3 p-4">

          <p style={{ ...PIXEL_FONT,fontSize:'7px',
            color:'rgba(255,255,255,0.5)',lineHeight:2.3,
            direction: isRTL ? 'rtl' : 'ltr' }}>
            {s.question}
          </p>

          <AnimatePresence>
            {showHint && (
              <motion.div key="hint"
                initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:'auto' }}
                exit={{ opacity:0,height:0 }}
                className="p-2.5 overflow-hidden"
                style={{ background:'#1c1a00',border:'2px solid #854d0e' }}>
                <p style={{ ...PIXEL_FONT,fontSize:'7px',color:'#fde68a',lineHeight:2.2 }}>
                  {s.hintLabel} {hintText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form onSubmit={handleSubmit}
            animate={hasError ? { x:[-5,5,-5,4,-2,2,0] } : { x:0 }}
            transition={{ duration:0.3 }}
            className="flex flex-col gap-2">

            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder={s.placeholder}
              disabled={solved}
              autoComplete="off"
              style={{
                ...PIXEL_FONT,
                fontSize:'11px',
                background:'#000',
                color: solved ? '#00ff9f' : '#fff',
                border:`2px solid ${solved ? '#00ff9f' : hasError ? '#ef4444' : 'rgba(0,255,159,0.35)'}`,
                padding:'11px 14px',
                outline:'none',
                letterSpacing:'0.1em',
                caretColor:'#00ff9f',
                width:'100%',
                direction: isRTL ? 'rtl' : 'ltr',
                boxShadow: hasError ? '0 0 0 2px rgba(239,68,68,0.25)'
                  : solved ? '0 0 0 2px rgba(0,255,159,0.3)' : 'none',
                transition:'border-color 0.2s,box-shadow 0.2s',
              }}
            />

            <button type="submit" disabled={solved}
              className="w-full py-2.5 transition-all active:translate-y-px"
              style={{
                ...PIXEL_FONT,
                fontSize:'8px',
                color:       solved ? '#fff'    : hasError ? '#ef4444' : '#00ff9f',
                background:  solved ? '#064e3b' : hasError ? '#7f1d1d' : '#041a0e',
                border:`2px solid ${solved ? '#00ff9f' : hasError ? '#ef4444' : '#00ff9f'}`,
                boxShadow:'2px 2px 0 #000',
                cursor: solved ? 'default' : 'pointer',
                letterSpacing:'0.05em',
              }}>
              {solved ? s.correct : hasError ? `✗  ${s.wrongMsg}` : s.submitBtn}
            </button>

          </motion.form>
        </div>

      </motion.div>
    </div>
  );
};

export default SoftwarePuzzle;
