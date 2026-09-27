/**
 * TutorialFlow — orchestrates the full tutorial sequence:
 *   step 'language' → LanguageSelect          (Phase 2 ✓)
 *   step 'intro'    → TutorialIntro cinematic (Phase 3)
 *   step 'rooms'    → GameRoom tutorial mode  (Phase 4)
 *
 * Props:
 *   lang        {string}    'en' | 'ar'
 *   setLang     {fn}        updates the chosen language
 *   onComplete  {fn}        called when all 3 tutorial rooms are finished
 *   isReplay    {boolean}   true when launched from the idle screen replay button
 */

import React, { useState } from 'react';
import LanguageSelect  from './tutorial/LanguageSelect'; // Phase 2 ✓
import TutorialIntro   from './TutorialIntro';           // Phase 3 ✓
import GameRoom        from './GameRoom';                 // Phase 4 ✓



const PIXEL_FONT = { fontFamily: "'Press Start 2P', monospace" };

const TutorialFlow = ({ lang, setLang, onComplete, isReplay = false }) => {
  // The step controls which screen is shown
  // 'language' → 'intro' → 'rooms' → calls onComplete()
  const [step, setStep] = useState('language');

  // ── Placeholder screens for Phase 1 testing ─────────────────────────────

  const PlaceholderScreen = ({ title, subtitle, btnLabel, onNext }) => (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-6 z-[100]"
      style={{ background: '#090e14' }}
    >
      {/* Pixel scanline overlay — same as GameRoom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0px,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 4px)',
        }}
      />

      <div className="relative flex flex-col items-center gap-5 text-center px-6">
        <span
          className="text-[#00ff9f] tracking-widest"
          style={{ ...PIXEL_FONT, fontSize: 'clamp(10px,2.5vw,16px)' }}
        >
          {title}
        </span>
        <span
          className="text-gray-500"
          style={{ ...PIXEL_FONT, fontSize: 'clamp(7px,1.8vw,10px)', lineHeight: 2 }}
        >
          {subtitle}
        </span>

        {/* Step indicator dots */}
        <div className="flex gap-3 mt-2">
          {['language', 'intro', 'rooms'].map((s) => (
            <div
              key={s}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  s === step ? '#00ff9f' : 'rgba(255,255,255,0.15)',
                boxShadow: s === step ? '0 0 6px #00ff9f' : 'none',
              }}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="mt-4 px-6 py-3 transition-all active:translate-y-px"
          style={{
            ...PIXEL_FONT,
            fontSize: 'clamp(8px,1.8vw,11px)',
            color: '#00ff9f',
            background: '#064e3b',
            border: '2px solid #00ff9f',
            boxShadow: '3px 3px 0 #000',
            letterSpacing: '0.05em',
          }}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );

  // ── Step routing ─────────────────────────────────────────────────────────

  if (step === 'language') {
    return (
      <LanguageSelect
        lang={lang}
        setLang={setLang}
        onNext={() => setStep('intro')}
      />
    );
  }

  if (step === 'intro') {
    return (
      <GameRoom
        key="cutscene"
        cutsceneMode={true}
        lang={lang}
        onTutorialComplete={() => setStep('rooms')}
      />
    );
  }

  if (step === 'rooms') {
    return (
      <GameRoom
        key="tutorial"
        tutorialMode={true}
        lang={lang}
        onTutorialComplete={onComplete}
      />
    );
  }

  return null;
};

export default TutorialFlow;
