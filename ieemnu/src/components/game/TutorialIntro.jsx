/**
 * TutorialIntro — Phase 3
 * 8-slide JRPG-style typewriter cinematic.
 * Tap / [SPACE] / [Enter] → complete line, then advance slide.
 * isReplay=true → shows "▸ SKIP INTRO" button.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerSprite from './PlayerSprite';
import { audioManager } from '../../game/audioManager';

const PIXEL_FONT = { fontFamily: "'Press Start 2P', monospace" };
const CHAR_DELAY  = 32; // ms per character

// ── Slide data ────────────────────────────────────────────────────────────
const SLIDES = [
  { key:'welcome',  walkin:true,
    en:"WELCOME, RECRUIT.\nYOU HAVE BEEN SELECTED FOR TRAINING.",
    ar:"أهلاً بك، مجند.\nلقد تم اختيارك للتدريب." },
  { key:'facility',
    en:"THIS IS THE IEEE ENGINEERING FACILITY.\nA PLACE WHERE ENGINEERS ARE FORGED.",
    ar:"هذا هو مرفق IEEE الهندسي.\nالمكان الذي يُصنع فيه المهندسون." },
  { key:'doors',
    en:"BEHIND EACH DOOR —\nA DISCIPLINE TERMINAL AWAITS.",
    ar:"وراء كل باب —\nطرفية تخصص تنتظرك." },
  { key:'terminal',
    en:"APPROACH A TERMINAL.\nPRESS [↵] OR TAP TO INTERACT.",
    ar:"اقترب من الطرفية.\nاضغط [↵] أو انقر للتفاعل." },
  { key:'chest',
    en:"SOLVE ALL PUZZLES —\nTHEN UNLOCK THE CHEST.",
    ar:"حل جميع الألغاز —\nثم افتح الصندوق." },
  { key:'exitdoor',
    en:"THE CHEST HOLDS THE KEY.\nUSE IT TO OPEN THE EXIT DOOR.",
    ar:"الصندوق يحمل المفتاح.\nاستخدمه لفتح باب الخروج." },
  { key:'skills',
    en:"SKILLS NEEDED:\nCODE · CIRCUITS · MECHANICS",
    ar:"المهارات المطلوبة:\nكود · دوائر · ميكانيكا" },
  { key:'start',
    en:"COMPLETE 3 TRAINING ROOMS.\nGOOD LUCK, RECRUIT.",
    ar:"أكمل 3 غرف تدريب.\nحظاً موفقاً، مجند." },
];

// ── Pixel SVG Scenes ──────────────────────────────────────────────────────
const Floor = () => (
  <>
    {[...Array(18)].map((_,i) => (
      <rect key={i} x={i*18} y={118} width={18} height={22}
        fill={i%2===0?'#1a2332':'#1e293b'} />
    ))}
    {[...Array(18)].map((_,i) => (
      <rect key={i} x={i*18} y={100} width={18} height={18}
        fill={i%2===0?'#141b27':'#192030'} />
    ))}
  </>
);

const SCENES = {
  welcome: (
    <svg viewBox="0 0 320 140" style={{imageRendering:'pixelated',width:'100%',height:'100%'}}>
      <rect width="320" height="140" fill="#090e14"/>
      <rect x="0" y="0" width="320" height="14" fill="#0d1117"/>
      <Floor/>
      {/* Door opening left */}
      <rect x="0" y="38" width="28" height="80" fill="#0a1520"/>
      <rect x="0" y="38" width="8"  height="80" fill="rgba(0,255,159,0.08)"/>
      <rect x="28" y="33" width="5" height="87" fill="#374151"/>
      <rect x="0"  y="33" width="33" height="5" fill="#374151"/>
      {/* Floating data bits */}
      {[[60,30],[120,55],[200,40],[260,65],[150,22]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width={2} height={8} fill="rgba(0,255,159,0.45)">
          <animate attributeName="opacity" values="0.45;0;0.45"
            dur={`${1.5+i*0.4}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
        </rect>
      ))}
    </svg>
  ),
  facility: (
    <svg viewBox="0 0 320 140" style={{imageRendering:'pixelated',width:'100%',height:'100%'}}>
      <rect width="320" height="140" fill="#090e14"/>
      <rect x="0" y="0" width="320" height="14" fill="#0d1117"/>
      <Floor/>
      {/* Back wall with windows/screens */}
      <rect x="30" y="14" width="260" height="86" fill="#0d1117"/>
      {/* IEEE sign */}
      <rect x="100" y="24" width="120" height="28" fill="#111827" stroke="rgba(0,255,159,0.3)" strokeWidth="1"/>
      <text x="160" y="43" textAnchor="middle" fill="rgba(0,255,159,0.7)"
        fontSize="10" fontFamily="monospace">IEEE FACILITY</text>
      {/* Left corridor opening */}
      <rect x="30" y="50" width="22" height="50" fill="#090e14"/>
      {/* Right corridor opening */}
      <rect x="268" y="50" width="22" height="50" fill="#090e14"/>
      {/* Terminal glow on back wall */}
      {[70,170,250].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="65" width="18" height="22" fill="#0d1117" stroke="rgba(0,255,159,0.4)" strokeWidth="1"/>
          <rect x={x+2} y="67" width="14" height="14" fill="rgba(0,255,159,0.1)">
            <animate attributeName="opacity" values="0.1;0.3;0.1"
              dur="2s" begin={`${i*0.6}s`} repeatCount="indefinite"/>
          </rect>
        </g>
      ))}
    </svg>
  ),
  doors: (
    <svg viewBox="0 0 320 140" style={{imageRendering:'pixelated',width:'100%',height:'100%'}}>
      <rect width="320" height="140" fill="#090e14"/>
      <rect x="0" y="0" width="320" height="14" fill="#0d1117"/>
      <Floor/>
      {/* Three discipline doors */}
      {[
        {x:30, label:'SW', color:'#00ff9f'},
        {x:130,label:'EE', color:'#38bdf8'},
        {x:230,label:'ME', color:'#f59e0b'},
      ].map(({x,label,color})=>(
        <g key={label}>
          <rect x={x} y="26" width="60" height="92" fill="#0d1117"
            stroke={color} strokeWidth="2"/>
          <rect x={x+4} y="30" width="52" height="84" fill="#090e14"/>
          {/* Door knob */}
          <circle cx={x+48} cy="74" r="3" fill={color} opacity="0.8"/>
          {/* Label */}
          <rect x={x+10} y="38" width="40" height="18" fill="#111827"
            stroke={color} strokeWidth="1"/>
          <text x={x+30} y="51" textAnchor="middle" fill={color}
            fontSize="8" fontFamily="monospace">{label}</text>
          {/* Door glow */}
          <rect x={x} y="26" width="60" height="92" fill="none"
            stroke={color} strokeWidth="1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.7;0.3"
              dur="2.5s" repeatCount="indefinite"/>
          </rect>
        </g>
      ))}
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 320 140" style={{imageRendering:'pixelated',width:'100%',height:'100%'}}>
      <rect width="320" height="140" fill="#090e14"/>
      <rect x="0" y="0" width="320" height="14" fill="#0d1117"/>
      <Floor/>
      {/* Terminal tile — centered */}
      <rect x="126" y="30" width="68" height="68" fill="#0d1117" stroke="#1e293b" strokeWidth="2"/>
      {/* Monitor body */}
      <rect x="134" y="38" width="52" height="40" fill="#000" stroke="#00ff9f" strokeWidth="1.5"/>
      {/* Screen content */}
      <rect x="138" y="42" width="44" height="32" fill="#001a0d">
        <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite"/>
      </rect>
      <text x="160" y="60" textAnchor="middle" fill="#00ff9f" fontSize="7" fontFamily="monospace">_</text>
      {/* Monitor stand */}
      <rect x="152" y="78" width="16" height="6" fill="#1e293b"/>
      <rect x="146" y="84" width="28" height="4" fill="#374151"/>
      {/* Glow ring */}
      <rect x="118" y="22" width="84" height="84" fill="none"
        stroke="rgba(0,255,159,0.25)" strokeWidth="3">
        <animate attributeName="stroke-opacity" values="0.25;0.6;0.25"
          dur="1.5s" repeatCount="indefinite"/>
      </rect>
      {/* Arrow */}
      <text x="230" y="72" fill="rgba(0,255,159,0.7)" fontSize="14" fontFamily="monospace">←</text>
    </svg>
  ),
  chest: (
    <svg viewBox="0 0 320 140" style={{imageRendering:'pixelated',width:'100%',height:'100%'}}>
      <rect width="320" height="140" fill="#090e14"/>
      <rect x="0" y="0" width="320" height="14" fill="#0d1117"/>
      <Floor/>
      {/* Chest */}
      <rect x="120" y="60" width="80" height="50" fill="#78350f" stroke="#fbbf24" strokeWidth="2"/>
      <rect x="120" y="60" width="80" height="20" fill="#92400e" stroke="#fbbf24" strokeWidth="2"/>
      {/* Latch */}
      <rect x="152" y="72" width="16" height="16" fill="#0d1117" stroke="#fbbf24" strokeWidth="1.5"/>
      <rect x="156" y="76" width="8"  height="8"  fill="#fbbf24" opacity="0.8"/>
      {/* Stars / sparkles */}
      {[[150,44],[175,36],[196,46],[165,50]].map(([x,y],i)=>(
        <text key={i} x={x} y={y} fill="#fbbf24" fontSize="10" fontFamily="sans-serif">✦</text>
      ))}
      {/* Glow */}
      <rect x="112" y="52" width="96" height="66" fill="none"
        stroke="rgba(251,191,36,0.3)" strokeWidth="2">
        <animate attributeName="stroke-opacity" values="0.3;0.7;0.3"
          dur="1.8s" repeatCount="indefinite"/>
      </rect>
    </svg>
  ),
  exitdoor: (
    <svg viewBox="0 0 320 140" style={{imageRendering:'pixelated',width:'100%',height:'100%'}}>
      <rect width="320" height="140" fill="#090e14"/>
      <rect x="0" y="0" width="320" height="14" fill="#0d1117"/>
      <Floor/>
      {/* Exit door */}
      <rect x="200" y="26" width="70" height="92" fill="#0d1117"
        stroke="#fbbf24" strokeWidth="2"/>
      <rect x="204" y="30" width="62" height="84" fill="#090e14"/>
      <circle cx="244" cy="76" r="4" fill="#fbbf24" opacity="0.9"/>
      <text x="235" y="50" fill="rgba(251,191,36,0.6)" fontSize="7" fontFamily="monospace">EXIT</text>
      {/* Key */}
      <g transform="translate(60,60)">
        <circle cx="20" cy="16" r="12" fill="none" stroke="#fbbf24" strokeWidth="3"/>
        <circle cx="20" cy="16" r="6"  fill="none" stroke="#fbbf24" strokeWidth="2"/>
        <rect x="28" y="13" width="30" height="6"  fill="#fbbf24"/>
        <rect x="48" y="19" width="6"  height="8"  fill="#fbbf24"/>
        <rect x="40" y="19" width="6"  height="6"  fill="#fbbf24"/>
        <animateTransform attributeName="transform" type="translate"
          values="60,60;80,58;60,60" dur="2s" repeatCount="indefinite"/>
      </g>
      {/* Arrow key→door */}
      <text x="130" y="76" fill="rgba(251,191,36,0.5)" fontSize="14" fontFamily="monospace">→</text>
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 320 140" style={{imageRendering:'pixelated',width:'100%',height:'100%'}}>
      <rect width="320" height="140" fill="#090e14"/>
      {/* Three skill icons */}
      {[
        {x:30,  color:'#00ff9f', label:'{ }',   sub:'SOFTWARE'},
        {x:130, color:'#38bdf8', label:'⚡',     sub:'ELECTRICAL'},
        {x:230, color:'#f59e0b', label:'⚙',      sub:'MECHANICAL'},
      ].map(({x,color,label,sub})=>(
        <g key={sub}>
          <rect x={x} y="30" width="60" height="70" rx="0" fill="#0d1117"
            stroke={color} strokeWidth="1.5"/>
          <text x={x+30} y="68" textAnchor="middle" fill={color}
            fontSize="22" fontFamily="monospace">{label}</text>
          <text x={x+30} y="88" textAnchor="middle" fill={color}
            fontSize="5.5" fontFamily="monospace" opacity="0.7">{sub}</text>
          <rect x={x} y="30" width="60" height="70" fill="none"
            stroke={color} strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2"
              dur="2s" begin={`${[0,0.5,1.0].indexOf([0,0.5,1.0].find((_,i)=>i===([30,130,230].indexOf(x))))}s`}
              repeatCount="indefinite"/>
          </rect>
        </g>
      ))}
    </svg>
  ),
  start: (
    <svg viewBox="0 0 320 140" style={{imageRendering:'pixelated',width:'100%',height:'100%'}}>
      <rect width="320" height="140" fill="#090e14"/>
      {/* Corner decorations */}
      {[[0,0],[308,0],[0,128],[308,128]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="12" height="12" fill="rgba(0,255,159,0.35)"/>
      ))}
      <rect x="0"   y="0"   width="320" height="2" fill="rgba(0,255,159,0.2)"/>
      <rect x="0"   y="138" width="320" height="2" fill="rgba(0,255,159,0.2)"/>
      {/* Title */}
      <text x="160" y="55" textAnchor="middle" fill="#00ff9f"
        fontSize="18" fontFamily="monospace" fontWeight="bold">LET&apos;S TRAIN!</text>
      <text x="160" y="78" textAnchor="middle" fill="rgba(255,255,255,0.4)"
        fontSize="7" fontFamily="monospace">IEEE ENGINEERING PROTOCOL v1.0</text>
      {/* Decorative line */}
      <rect x="60" y="88" width="200" height="1" fill="rgba(0,255,159,0.3)"/>
      {/* Blinking star rects */}
      {[[50,38],[268,38],[50,84],[268,84]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="8" height="8" fill="rgba(0,255,159,0.6)">
          <animate attributeName="opacity" values="1;0.2;1"
            dur="1.4s" begin={`${i*0.35}s`} repeatCount="indefinite"/>
        </rect>
      ))}
    </svg>
  ),
};

// ── Main Component ────────────────────────────────────────────────────────
const TutorialIntro = ({ lang = 'en', onNext, isReplay = false }) => {
  const [slideIndex, setSlideIndex]     = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping]         = useState(false);
  const [walkInDone, setWalkInDone]     = useState(false);
  const stateRef = useRef({});

  // Keep ref in sync for stale-closure-safe handlers
  stateRef.current = { slideIndex, displayedText, isTyping };

  // Start typing whenever slide changes
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    audioManager.play('dialog', { forceRestart: true });
    if (slideIndex === 0) setWalkInDone(false);
  }, [slideIndex, lang]);

  // Typewriter interval
  useEffect(() => {
    if (!isTyping) {
      audioManager.stop('dialog');
      return;
    }
    const full = SLIDES[slideIndex][lang];
    const id = setInterval(() => {
      setDisplayedText(prev => {
        const next = full.slice(0, prev.length + 1);
        if (next.length >= full.length) { 
          clearInterval(id); 
          setIsTyping(false); 
          audioManager.stop('dialog');
        }
        return next;
      });
    }, CHAR_DELAY);
    return () => {
      clearInterval(id);
      audioManager.stop('dialog');
    };
  }, [isTyping, slideIndex, lang]);

  const handleAdvance = useCallback(() => {
    const { slideIndex: si, isTyping: it, displayedText: dt } = stateRef.current;
    const full = SLIDES[si][lang];
    audioManager.play('confirm', { forceRestart: true });
    if (it || dt.length < full.length) {
      setDisplayedText(full);
      setIsTyping(false);
      audioManager.stop('dialog');
    } else if (si < SLIDES.length - 1) {
      setSlideIndex(si + 1);
    } else {
      audioManager.play('start', { forceRestart: true });
      onNext();
    }
  }, [lang, onNext]);

  // Keyboard listener
  useEffect(() => {
    const onKey = e => {
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); handleAdvance(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleAdvance]);

  const slide    = SLIDES[slideIndex];
  const fullText = slide[lang];
  const done     = !isTyping && displayedText.length >= fullText.length;
  const isRTL    = lang === 'ar';
  const isLast   = slideIndex === SLIDES.length - 1;

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden select-none"
      style={{ background: '#090e14', touchAction: 'none' }}
      onClick={handleAdvance}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ backgroundImage:'repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0px,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 4px)' }}/>
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background:'radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.65) 100%)' }}/>

      {/* Skip button — replay only */}
      {isReplay && (
        <button
          onClick={e => { e.stopPropagation(); audioManager.play('start'); audioManager.stop('dialog'); onNext(); }}
          className="absolute top-4 right-4 z-50 px-3 py-2 transition-all hover:opacity-80"
          style={{ ...PIXEL_FONT, fontSize:'7px', color:'rgba(255,255,255,0.4)',
            border:'1px solid rgba(255,255,255,0.15)', background:'rgba(0,0,0,0.5)' }}
        >
          ▸ SKIP INTRO
        </button>
      )}

      {/* ── SCENE (top ~45%) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-20"
          style={{ height: '42%', flexShrink: 0 }}
        >
          {SCENES[slide.key]}
        </motion.div>
      </AnimatePresence>

      {/* ── DIALOG (bottom ~58%) ── */}
      <div className="relative z-30 flex-1 flex items-start gap-0 px-3 pt-2 pb-4"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

        {/* Player sprite */}
        <div className="shrink-0 flex flex-col items-center" style={{ width:52, marginTop:6 }}>
          <AnimatePresence>
            {slide.walkin && !walkInDone ? (
              <motion.div
                key="walkin"
                initial={{ x: -140, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                onAnimationComplete={() => setWalkInDone(true)}
                style={{ width:48, height:48 }}
              >
                <PlayerSprite direction="right" isMoving={true}/>
              </motion.div>
            ) : (
              <motion.div
                key="bob"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width:48, height:48 }}
              >
                <PlayerSprite direction="down" isMoving={false}/>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Shadow under sprite */}
          <div style={{ width:28, height:5, background:'rgba(0,0,0,0.4)',
            borderRadius:'50%', filter:'blur(2px)', marginTop:2 }}/>
        </div>

        {/* Dialog box */}
        <div
          className="flex-1 flex flex-col gap-2 ml-3"
          style={{
            background:'#0d1117',
            border:'2px solid #00ff9f',
            boxShadow:'0 0 0 1px #000, 0 0 0 4px #00ff9f, 0 0 0 5px #000, 0 0 20px rgba(0,255,159,0.25)',
            padding:'10px 12px 8px',
          }}
        >
          {/* Slide label */}
          <div className="flex items-center justify-between mb-1">
            <span style={{ ...PIXEL_FONT, fontSize:'6px', color:'rgba(0,255,159,0.5)',
              letterSpacing:'0.2em' }}>
              IEEE TRAINING SYSTEM
            </span>
            {/* Slide dots */}
            <div className="flex gap-1.5">
              {SLIDES.map((_,i) => (
                <div key={i} style={{
                  width:5, height:5,
                  background: i === slideIndex ? '#00ff9f'
                    : i < slideIndex ? 'rgba(0,255,159,0.3)' : 'rgba(255,255,255,0.1)',
                  boxShadow: i === slideIndex ? '0 0 4px #00ff9f' : 'none',
                  transition:'all 0.3s',
                }}/>
              ))}
            </div>
          </div>

          {/* Typewriter text */}
          <p
            style={{
              ...PIXEL_FONT,
              fontSize:'clamp(7px,1.8vw,9px)',
              color:'#e2e8f0',
              lineHeight: 2.2,
              minHeight: 42,
              whiteSpace: 'pre-wrap',
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          >
            {displayedText}
            {/* Blinking cursor while typing */}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1,0,1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ color:'#00ff9f' }}
              >▌</motion.span>
            )}
          </p>

          {/* Continue hint */}
          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 0.4 }}
              className="self-end"
            >
              <span style={{ ...PIXEL_FONT, fontSize:'6px',
                color: isLast ? '#fbbf24' : 'rgba(0,255,159,0.55)' }}>
                {isLast
                  ? (isRTL ? 'ابدأ التدريب ▸' : 'START TRAINING ▸')
                  : (isRTL ? 'انقر للمتابعة ▸' : 'TAP TO CONTINUE ▸')
                }
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialIntro;
