import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion';
import ScrollFloat from '../components/ScrollFloat/ScrollFloat';

// --- DATA ---
const EXHIBITS = [
  {
    id: 'enigma',
    preTitle: 'THE',
    title: 'ENIGMA',
    description: `Welcome to the most anticipated tech event of the year. ENIGMA is where boundaries are pushed and the future of technology is decoded.\n\nCurated by the IEEE MNU Student Branch, this event brings together brilliant minds, visionary innovators, and cutting-edge ideas from across the region.`,
    guestWork: 'GUEST',
    guestWork2: 'WORK',
    guestWorkSub: 'OBRA',
    guestWorkSub2: 'CONVIDADA',
    museum: 'Museu do IEEE – Tech Exhibition',
    donation: 'Donation Sacor',
    image: '/enigmaElements/The Enigma Proposal.png',
    ghostText: 'E n i g m a',
    plaques: [
      { title: 'The Enigma Proposal', desc1: 'Mansoura, 2025', desc2: 'Tech Conference' },
      { title: 'Digital Canvas', desc1: 'React Architecture', desc2: 'Framer Motion Dynamics' }
    ],
    tvContent: 'ACCESSING MAIN.SYS...\n\nDECODING PROTOCOLS...\n\nWELCOME TO ENIGMA.'
  },
  {
    id: 'speaker1',
    preTitle: 'DR.',
    title: 'AHMED HASSAN',
    description: `Dr. Ahmed Hassan is a leading figure in Artificial Intelligence research. His pioneering work explores the intersection of deep learning and cognitive systems, decoding complex patterns that mimic human thought.\n\nJoin his masterclass on neural networks and the future of autonomous intelligence.`,
    guestWork: 'COLLECTION',
    guestWork2: 'II',
    guestWorkSub: 'THE',
    guestWorkSub2: 'MASTERMINDS',
    museum: 'AI Research Lead · Cairo University',
    donation: 'Keynote Speaker Series',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ghostText: 'A Hassan',
    plaques: [
      { title: 'Neural Systems', desc1: 'AI & Machine Learning', desc2: 'Keynote Session' },
      { title: 'Cognitive Web', desc1: 'Future Tech', desc2: '2025 Edition' }
    ],
    tvContent: 'SPEAKER_01 LOADED\n\nSUBJECT: AI\nSTATUS: READY'
  },
  {
    id: 'speaker2',
    preTitle: 'ENG.',
    title: 'SARA KHALIL',
    description: `Eng. Sara Khalil stands at the forefront of digital security. With years of experience protecting critical infrastructures, she unravels the complexities of modern cyber threats.\n\nHer session will dive into ethical hacking, cryptography, and securing the digital frontier.`,
    guestWork: 'COLLECTION',
    guestWork2: 'II',
    guestWorkSub: 'THE',
    guestWorkSub2: 'MASTERMINDS',
    museum: 'Cybersecurity Expert · IEEE Egypt',
    donation: 'Interactive Workshop Series',
    image: 'https://images.unsplash.com/photo-1576769267415-9642010aa962?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ghostText: 'S Khalil',
    plaques: [
      { title: 'Cyber Defense', desc1: 'Security Protocols', desc2: 'Interactive Workshop' },
      { title: 'Ethical Hacking', desc1: 'Zero Day Exploit', desc2: 'Live Demo' }
    ],
    tvContent: 'SECURITY OVERRIDE\n\nACCESS GRANTED'
  },
  {
    id: 'speaker3',
    preTitle: 'PROF.',
    title: 'YOUSSEF OMAR',
    description: `Prof. Youssef Omar bridges the gap between hardware and intelligent software. As a robotics innovator, his designs have revolutionized automation in industrial settings.\n\nExplore the mechanics of movement and the algorithms that give machines autonomy.`,
    guestWork: 'COLLECTION',
    guestWork2: 'II',
    guestWorkSub: 'THE',
    guestWorkSub2: 'MASTERMINDS',
    museum: 'Machine Learning Pioneer · MIT CSAIL',
    donation: 'Hardware Innovation',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ghostText: 'Y Omar',
    plaques: [
      { title: 'Robotics', desc1: 'Hardware Integration', desc2: 'Live Demonstration' },
      { title: 'Automated Systems', desc1: 'Industrial Design', desc2: 'Case Study' }
    ],
    tvContent: 'CALIBRATING MOTORS...\n\nSENSORS ONLINE.'
  },
  {
    id: 'speaker4',
    preTitle: 'DR.',
    title: 'LAILA NOUR',
    description: `Dr. Laila Nour is a visionary in human-computer interaction. She designs interfaces that seamlessly integrate technology into everyday human experiences.\n\nDiscover the psychological principles behind intuitive design and immersive digital environments.`,
    guestWork: 'COLLECTION',
    guestWork2: 'II',
    guestWorkSub: 'THE',
    guestWorkSub2: 'MASTERMINDS',
    museum: 'Robotics Innovator · Tech Valley',
    donation: 'Design Seminar',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ghostText: 'L Nour',
    plaques: [
      { title: 'HCI Systems', desc1: 'User Experience', desc2: 'Design Seminar' },
      { title: 'Psychology of UI', desc1: 'Digital Interaction', desc2: 'Research Paper' }
    ],
    tvContent: 'UI MATRIX ACTIVE\n\nTRACKING GAZE...'
  }
];

// --- COMPONENTS ---

const BlurImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`${className} transition-all duration-[2000ms] ease-out ${loaded ? 'blur-0 opacity-100 scale-100' : 'blur-2xl opacity-0 scale-105'}`}
      onError={(e) => { e.target.style.display = 'none'; }}
    />
  );
};

const GoldenFrame = ({ children, className = '' }) => (
  <div
    className={`relative ${className} p-[18px] md:p-[24px] m-6 md:m-8`}
    style={{
      background: 'linear-gradient(135deg, #1f1a14 0%, #0a0805 100%)',
      boxShadow: [
        'inset 0 0 0 1px #4a3000',      // Inner dark lip
        'inset 0 0 0 2px #d4af70',      // Inner gold highlight
        'inset 0 0 20px rgba(0,0,0,0.9)', // Intense inner shadow on the matting
        '0 0 0 4px #523719',            // Dark wood outline
        '0 0 0 8px #c5a059',            // Gold molding layer 1
        '0 0 0 12px #a28040',           // Gold molding layer 2
        '0 0 0 18px #d4af70',           // Bright gold main frame layer
        '0 0 0 26px #3a1d0b',           // Outer dark mahogany wood edge
        '0 40px 80px rgba(0,0,0,0.85)', // Deep ambient drop shadow
        '0 15px 25px rgba(0,0,0,0.6)',  // Sharp contact drop shadow
      ].join(', '),
    }}
  >
    <div className="relative w-full h-full border-[2px] border-[#050505]">
      {children}
    </div>
  </div>
);

// Specifically designed massive frame for the Hero Artwork (Carved Wood finish)
const MasterpieceFrame = ({ children, className = '' }) => (
  <div
    className={`relative ${className} p-[20px] md:p-[32px] m-10 md:m-12`}
    style={{
      backgroundColor: '#4a2511',
      backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%), repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 10px), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='woodgrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05 0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23woodgrain)' opacity='0.15'/%3E%3C/svg%3E")`,
      boxShadow: [
        'inset 0 0 0 1px #2a1205',
        'inset 0 0 0 3px #d4af70',
        'inset 0 0 30px rgba(0,0,0,0.95)',
        '0 0 0 6px #3a1a08',
        '0 0 0 12px #6b3415',
        '0 0 0 18px #4a2511',
        '0 0 0 26px #824019',
        '0 0 0 34px #5c2c12',
        '0 0 0 46px #2a1205',
        '0 60px 100px rgba(0,0,0,0.95)',
        '0 20px 40px rgba(0,0,0,0.8)',
      ].join(', '),
    }}
  >
    <div className="relative w-full h-full border-[3px] border-[#1a0a03] shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]">
      {children}
    </div>
  </div>
);

const RopeBarrier = () => (
  <div className="flex w-[80%] max-w-[800px] items-end justify-between relative mx-auto h-[100px]">
    {/* Left Post */}
    <div className="flex flex-col items-center z-10 relative">
      <div className="w-5 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-sm" />
      <div className="w-[10px] h-24 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 shadow-2xl" />
      <div className="w-10 h-3 bg-gradient-to-r from-gray-500 to-gray-400 rounded-sm shadow-xl" />
      <div className="absolute -bottom-4 w-16 h-4 bg-black/40 blur-md rounded-full" />
    </div>

    {/* Cord SVG */}
    <svg className="absolute top-[8px] left-[15px] w-[calc(100%-30px)] h-20 pointer-events-none drop-shadow-xl z-0" preserveAspectRatio="none">
      <path d="M 0 0 Q 50% 120% 100% 0" fill="transparent" stroke="#a0a0a0" strokeWidth="2.5" />
      <path d="M 0 0 Q 50% 120% 100% 0" fill="transparent" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="6 3" />
    </svg>

    {/* Right Post */}
    <div className="flex flex-col items-center z-10 relative">
      <div className="w-5 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-sm" />
      <div className="w-[10px] h-24 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 shadow-2xl" />
      <div className="w-10 h-3 bg-gradient-to-r from-gray-500 to-gray-400 rounded-sm shadow-xl" />
      <div className="absolute -bottom-4 w-16 h-4 bg-black/40 blur-md rounded-full" />
    </div>
  </div>
);

const ExhibitPanel = ({ exhibit, scrollProgress, index, total }) => {
  const panelRef = useRef(null);

  // Parallax calculations based on global scroll progress
  const start = (index - 0.5) / total;
  const end = (index + 1.5) / total;

  // Staggered parallax effects
  const yImage = useTransform(scrollProgress, [start, end], [40, -40]);
  const yTextLeft = useTransform(scrollProgress, [start, end], [80, -80]);
  const yTextRight = useTransform(scrollProgress, [start, end], [-50, 50]);
  const xGhost = useTransform(scrollProgress, [start, end], [-150, 150]);

  const isInView = useInView(panelRef, { margin: "-10%", once: true });

  return (
    <div ref={panelRef} className="w-screen h-[85vh] flex flex-col md:flex-row items-center justify-between relative px-8 md:px-16 shrink-0">
      {/* Dynamic Background Spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[900px] md:h-[900px] bg-[#ff4a4a]/20 rounded-full blur-[140px] md:blur-[180px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-300/10 rounded-full blur-[120px]" />
      </div>

      {/* LEFT COLUMN: Title & Description */}
      {exhibit.id !== 'enigma' && (
        <motion.div
          style={{ y: yTextLeft }}
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full md:w-[26%] flex flex-col justify-center z-20 h-full max-w-[90vw] md:max-w-md mt-[5vh] md:mt-0"
        >
          <h3 className="text-white text-[clamp(1rem,2vw,1.5rem)] font-serif tracking-[0.2em] uppercase mb-[1vh] drop-shadow-md" style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}>
            {exhibit.preTitle}
          </h3>
          <h2 className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-serif font-black uppercase leading-[1.1] tracking-wide mb-[3vh] drop-shadow-xl" style={{ fontFamily: '"Cinzel Decorative", "Playfair Display", serif', textShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
            {exhibit.title}
          </h2>
          <div className="text-white/90 text-[clamp(0.85rem,1.2vw,1.1rem)] leading-relaxed md:columns-2 gap-[2vw] space-y-[1.5vh] md:space-y-0" style={{ fontFamily: '"Crimson Text", serif' }}>
            {exhibit.description.split('\n\n').map((para, i) => (
              <p key={i} className="mb-[1.5vh] text-justify" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{para}</p>
            ))}
          </div>
        </motion.div>
      )}

      {/* CENTER COLUMN: Artwork & Stanchions */}
      <div className="flex-1 flex flex-col items-center justify-center z-30 h-full relative w-full md:w-auto my-[10vh] md:my-0" style={{ perspective: '1200px' }}>
        <motion.div
          style={{ y: yImage, transformOrigin: 'top center', willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0.8, rotateX: 15, rotateZ: -5 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateX: 0, rotateZ: 0 } : { opacity: 0, scale: 0.8, rotateX: 15, rotateZ: -5 }}
          transition={{ 
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 1.2, ease: "easeOut" },
            rotateX: { type: "spring", stiffness: 50, damping: 10, mass: 2.5, delay: 0.1 },
            rotateZ: { type: "spring", stiffness: 35, damping: 8, mass: 3, delay: 0.2 }
          }}
          className="relative flex flex-col items-center drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Header Label matching the reference image */}
          {exhibit.id !== 'enigma' && (
            <div className="absolute -top-24 md:-top-32 text-center w-[150%] font-sans drop-shadow-lg">
              <div className="flex items-center justify-center gap-6 text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                <div className="text-right leading-tight">
                  <div>{exhibit.guestWork}</div>
                  <div className="text-white/60">{exhibit.guestWork2}</div>
                </div>
                <div className="text-white/40 font-light text-3xl leading-none font-serif">⌝</div>
                <div className="text-left leading-tight">
                  <div>{exhibit.guestWorkSub}</div>
                  <div className="text-white/60">{exhibit.guestWorkSub2}</div>
                </div>
              </div>
              <p className="text-white text-[12px] md:text-[14px] mt-4 font-serif italic tracking-wide font-bold">
                {exhibit.museum}
              </p>
              <p className="text-white/60 text-[9px] tracking-widest uppercase mt-1">{exhibit.donation}</p>
            </div>
          )}

          {exhibit.id === 'enigma' ? (
            <MasterpieceFrame className="w-[85vw] md:w-auto md:min-w-[60vw] xl:min-w-[55vw]">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#000] flex flex-col items-center justify-center group" style={{ aspectRatio: '16/9', maxHeight: '55vh' }}>
                {/* Surface Texture */}
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

                {/* Dynamic Lighting */}
                <div className="absolute top-0 left-1/4 w-[60%] h-[60%] bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/10 transition-colors duration-1000" />
                <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-[#d91115]/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#d91115]/20 transition-colors duration-1000" />

                {/* Event Title and Details in Theme Fonts */}
                <motion.div
                  className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 text-center h-full w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h3 className="text-[#c49a52] text-[clamp(0.8rem,1.5vw,1.25rem)] tracking-[0.4em] uppercase mb-[1.5vh] opacity-90 drop-shadow-md" style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}>
                    {exhibit.preTitle}
                  </h3>
                  <h1 className="text-[#e6c387] text-[clamp(3.5rem,8vw,6.5rem)] font-black tracking-[0.1em] uppercase mb-[2.5vh] drop-shadow-2xl leading-[1.1]" style={{ fontFamily: '"Cinzel Decorative", "Playfair Display", serif', textShadow: '0 10px 20px rgba(0,0,0,0.8)' }}>
                    {exhibit.title}
                  </h1>
                  <div className="w-[15vw] max-w-[120px] h-[2px] bg-gradient-to-r from-transparent via-[#c49a52]/60 to-transparent mb-[3vh]" />
                  <div className="text-[#e0e0e0] text-[clamp(0.85rem,1.3vw,1.1rem)] leading-relaxed max-w-[90%] md:max-w-[75%] opacity-90 drop-shadow-md" style={{ fontFamily: '"Crimson Text", serif', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {exhibit.description.split('\n\n').map((para, i) => (
                      <p key={i} className="mb-[1.5vh]">{para}</p>
                    ))}
                  </div>
                </motion.div>

                {/* Cinematic Borders */}
                <div className="absolute inset-4 border border-[#c49a52]/20 rounded-sm pointer-events-none opacity-50" />
                <div className="absolute inset-6 border border-[#c49a52]/10 rounded-sm pointer-events-none opacity-30" />
              </div>
            </MasterpieceFrame>
          ) : (
            <GoldenFrame className="w-[75vw] md:w-auto md:max-w-[50vw] xl:max-w-[45vw]">
              <div className="relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#1a1a1a]" style={{ aspectRatio: '3/4', maxHeight: '55vh' }}>
                <BlurImage src={exhibit.image} alt={exhibit.title} className="w-full h-full object-cover" />
              </div>
            </GoldenFrame>
          )}
        </motion.div>
      </div>

      {/* RIGHT COLUMN: Extra details, plaques, ghost text */}
      {exhibit.id !== 'enigma' && (
        <motion.div
          style={{ y: yTextRight }}
          className="hidden md:flex w-[26%] flex-col justify-center items-start z-20 h-full relative pl-12"
        >
          {/* Giant Ghost Text */}
          <motion.div
            style={{ x: xGhost }}
            className="absolute top-[-10%] right-[-30%] text-[12vw] xl:text-[16vw] font-serif italic text-black/20 mix-blend-overlay whitespace-nowrap pointer-events-none select-none drop-shadow-2xl"
          >
            {exhibit.ghostText}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-10 mt-32 w-full"
          >
            <div className="flex gap-8">
              {exhibit.plaques.map((plaque, i) => (
                <div key={i} className="text-white/80 text-[11px] leading-relaxed font-serif" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  <p className="font-bold text-white mb-2 tracking-wide text-[13px]">{plaque.title}</p>
                  <p>{plaque.desc1}</p>
                  <p>{plaque.desc2}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};


const Enigma = () => {
  const scrollRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Custom Smooth Horizontal Scroll (Lerp physics)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let targetX = el.scrollLeft;
    let currentX = el.scrollLeft;
    let isWheeling = false;
    let wheelTimeout;

    const onWheel = (e) => {
      // Native scroll on mobile for better touch support
      if (window.innerWidth < 768) return;

      e.preventDefault();
      isWheeling = true;
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => { isWheeling = false; }, 100);

      // Multiplier for cinematic scroll speed
      targetX += (e.deltaY + e.deltaX) * 2.8;
      targetX = Math.max(0, Math.min(targetX, el.scrollWidth - el.clientWidth));
    };

    const loop = () => {
      if (isWheeling) {
        currentX += (targetX - currentX) * 0.08;
        el.scrollLeft = currentX;
      } else {
        targetX = el.scrollLeft;
        currentX = el.scrollLeft;
      }
      requestAnimationFrame(loop);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    const rafId = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const { scrollXProgress } = useScroll({ container: scrollRef });
  const smoothProgress = useSpring(scrollXProgress, { damping: 25, stiffness: 80 });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div className="w-full h-screen overflow-hidden bg-[#C81015] relative flex flex-col font-sans selection:bg-white/30 selection:text-black text-white">
      {/* Global Museum Red Wall Background */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#d91115] via-[#a80b10] to-[#6b0205]" />

      {/* Ambient Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px' }} />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .parquet-pattern {
          background-color: #4a210d;
          background-image: 
            linear-gradient(45deg, rgba(0,0,0,0.4) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.4)),
            linear-gradient(45deg, rgba(0,0,0,0.4) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.4)),
            repeating-linear-gradient(to right, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(to bottom, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 200px);
          background-size: 100px 100px, 100px 100px, 100% 100%, 100% 100%;
          background-position: 0 0, 50px 50px, 0 0, 0 0;
        }
      `}</style>

      {/* Main Exhibition Area (Cinematic Camera Wrapper) */}
      <motion.div 
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex-1 flex flex-col z-10 w-full h-full origin-center"
      >

        {/* Horizontal Scroll Container (The Wall) */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto overflow-y-auto md:overflow-y-hidden flex no-scrollbar relative z-10 scroll-smooth snap-x snap-mandatory md:snap-none"
        >
          <div className="flex h-full w-max">
            {EXHIBITS.map((exhibit, idx) => (
              <div key={exhibit.id} className="snap-center md:snap-align-none relative">
                <ExhibitPanel exhibit={exhibit} scrollProgress={smoothProgress} index={idx} total={EXHIBITS.length} />

                {/* Subtle Wall Seam */}
                {idx < EXHIBITS.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                )}
              </div>
            ))}

            {/* Sponsors Panel */}
            <div className="w-screen h-[85vh] flex flex-col items-center justify-center relative shrink-0 snap-center md:snap-align-none">
              <ScrollFloat
                scrollContainerRef={scrollRef}
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="left center"
                scrollEnd="center center"
                stagger={0.03}
                containerClassName="mb-16 !overflow-visible opacity-80"
                textClassName="!text-xl md:!text-3xl !font-serif tracking-[0.3em] !uppercase !text-[#c49a52]"
              >
                THE PATRONS
              </ScrollFloat>

              <div className="flex flex-wrap gap-12 md:gap-24 items-center justify-center px-12 z-20">
                {/* Sponsor 1 */}
                <div className="group relative w-48 h-24 border border-white/20 rounded flex items-center justify-center font-bold text-xl tracking-widest bg-white/5 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer hover:border-[#c49a52]/80 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  TECHCORP
                </div>
                {/* Sponsor 2 */}
                <div className="group relative w-48 h-24 border border-white/20 rounded flex items-center justify-center font-bold text-xl tracking-widest bg-white/5 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer hover:border-[#c49a52]/80 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  DATASYS
                </div>
                {/* Sponsor 3 */}
                <div className="group relative w-48 h-24 border border-white/20 rounded flex items-center justify-center font-bold text-xl tracking-widest bg-white/5 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer hover:border-[#c49a52]/80 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  INNOVEX
                </div>
              </div>

              <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Final Call to Action Panel */}
            <div className="w-screen h-[85vh] flex flex-col items-center justify-center relative shrink-0 snap-center md:snap-align-none">
              <ScrollFloat
                scrollContainerRef={scrollRef}
                animationDuration={1.2}
                ease="back.inOut(2)"
                scrollStart="left center+=10%"
                scrollEnd="center center"
                stagger={0.04}
                containerClassName="mb-4 !overflow-visible"
                textClassName="!text-5xl md:!text-7xl !font-black !text-white !font-serif"
              >
                THE MYSTERY
              </ScrollFloat>
              <ScrollFloat
                scrollContainerRef={scrollRef}
                animationDuration={1.2}
                ease="back.inOut(2)"
                scrollStart="left center"
                scrollEnd="center center-=5%"
                stagger={0.05}
                containerClassName="mb-10 !overflow-visible opacity-50"
                textClassName="!text-5xl md:!text-7xl !font-black !text-white !font-serif"
              >
                AWAITS
              </ScrollFloat>

              <div className="w-24 h-[1px] bg-white/30 my-8" />

              <button className="px-14 py-5 border-2 border-white/80 text-white uppercase tracking-[0.3em] text-xs font-bold hover:bg-white hover:text-[#a80b10] transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                Acquire Passes
              </button>
            </div>
          </div>
        </div>

        {/* The Museum Floor (Fixed at bottom) */}
        <div className="h-[15vh] w-full relative shrink-0 bg-[#2a1105] overflow-hidden z-0 border-t-[3px] border-[#200000]">
          {/* 3D Perspective Floor Texture */}
          <div className="absolute inset-0" style={{ perspective: '800px' }}>
            <div className="absolute inset-[-100%] parquet-pattern origin-top" style={{ transform: 'rotateX(75deg)' }} />
          </div>

          {/* Wall Reflection on the polished floor */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#d91115]/30 to-transparent mix-blend-overlay pointer-events-none" />

          {/* Floor Polish/Lighting Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/90 pointer-events-none" />

          {/* Deep Contact Shadow near the wall seam */}
          <div className="absolute inset-0 shadow-[inset_0_30px_60px_rgba(0,0,0,0.95)] pointer-events-none" />

          {/* The continuous rope barrier resting on the floor */}
          <div className="absolute -top-[5.5rem] w-[100vw] overflow-hidden pointer-events-none">
            <div className="flex w-[500vw] justify-start">
              {/* Render repeating stanchions across the floor */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-[50vw] md:w-[33vw] xl:w-[25vw]">
                  <RopeBarrier />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Global Navigation / Progress */}
      <div className="fixed bottom-5 left-0 w-full px-8 md:px-16 z-50 flex items-center justify-between pointer-events-none">
        <p className="text-[10px] tracking-widest font-sans font-bold text-white/50 uppercase drop-shadow-md">IEEE MNU Museum</p>

        {/* Progress Bar */}
        <div className="w-48 md:w-96 h-[3px] bg-black/40 relative rounded-full overflow-hidden shadow-inner hidden sm:block">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white/90 origin-left"
            style={{ scaleX }}
          />
        </div>

        <p className="text-[10px] tracking-widest font-sans font-bold text-white/50 uppercase drop-shadow-md">Collection 2025</p>
      </div>

    </div>
  );
};

class EnigmaErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Enigma Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#111] text-white">
          <h1 className="text-3xl font-serif text-[#e6c387] mb-4">The exhibition is temporarily closed.</h1>
          <p className="text-white/60">An anomaly occurred in the gallery. Please refresh the page to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function EnigmaWithBoundary(props) {
  return (
    <EnigmaErrorBoundary>
      <Enigma {...props} />
    </EnigmaErrorBoundary>
  );
}
