import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Crown, Star, Users, Sparkles, ChevronDown } from 'lucide-react';
import { LazyImage } from '../components/gallery';
import { OLD_BOARD_MEMBERS, BOARD_MEMBERS, FLOATING_MEMBERS, OLD_FLOATING_MEMBERS } from '../constants';
import MemberContactModal from '../components/common/MemberContactModal';
import Toast from '../components/common/Toast';

// ─── Theme Tokens ──────────────────────────────────────────────────────────────
const THEME = {
  gold:   { from: '#f7d76b', to: '#c9922a', glow: 'rgba(247,215,107,0.45)' },
  blue:   { from: '#60a5fa', to: '#1d4ed8', glow: 'rgba(96,165,250,0.4)'  },
  purple: { from: '#c084fc', to: '#7c3aed', glow: 'rgba(192,132,252,0.4)' },
  cyan:   { from: '#67e8f9', to: '#0e7490', glow: 'rgba(103,232,249,0.4)' },
  teal:   { from: '#5eead4', to: '#0f766e', glow: 'rgba(94,234,212,0.35)' },
};

const ROLE_THEME = {
  universityHead: THEME.gold,
  advisors:       THEME.teal,
  executive:      THEME.blue,
  heads:          THEME.purple,
  vices:          THEME.cyan,
};

// ─── Inline CSS ────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

  /* ── CSS variable tokens for light / dark ── */
  :root {
    --board-bg: radial-gradient(ellipse at 30% 20%, #0f1d3a 0%, #060b1a 55%, #0a0e1f 100%);
    --board-hero-bg: linear-gradient(160deg, #0f1d3a 0%, #060b1a 100%);
    --board-section-alt: rgba(255,255,255,0.03);
    --board-text-primary: #ffffff;
    --board-text-secondary: rgba(255,255,255,0.6);
    --board-card-bg: rgba(255,255,255,0.04);
    --board-card-border: rgba(255,255,255,0.1);
    --board-card-hover-bg: rgba(255,255,255,0.08);
    --board-tab-bar: rgba(6,11,26,0.95);
    --board-tab-inactive: rgba(255,255,255,0.06);
    --board-tab-inactive-text: rgba(255,255,255,0.55);
    --board-tab-inactive-border: rgba(255,255,255,0.1);
    --board-wave: rgba(6,11,26,1);
    --board-connector: rgba(247,215,107,0.2);
    --board-footer-border: rgba(247,215,107,0.12);
    --board-footer-text: rgba(255,255,255,0.3);
    --board-particle-color: rgba(255,255,255,0.3);
    --board-float-border: rgba(255,255,255,0.3);
    --board-shadow: rgba(0,0,0,0.5);
  }

  /* Light mode overrides — activate when html/body has .light or no .dark class */
  html:not(.dark) {
    --board-bg: radial-gradient(ellipse at 30% 10%, #e8f0fe 0%, #f0f4ff 45%, #f8faff 100%);
    --board-hero-bg: linear-gradient(160deg, #dde8fb 0%, #eef3ff 100%);
    --board-section-alt: rgba(0,0,0,0.02);
    --board-text-primary: #0f172a;
    --board-text-secondary: rgba(15,23,42,0.65);
    --board-card-bg: rgba(255,255,255,0.85);
    --board-card-border: rgba(0,0,0,0.08);
    --board-card-hover-bg: rgba(255,255,255,1);
    --board-tab-bar: rgba(240,244,255,0.97);
    --board-tab-inactive: rgba(0,0,0,0.05);
    --board-tab-inactive-text: rgba(15,23,42,0.55);
    --board-tab-inactive-border: rgba(0,0,0,0.1);
    --board-wave: #f0f4ff;
    --board-connector: rgba(29,78,216,0.25);
    --board-footer-border: rgba(29,78,216,0.15);
    --board-footer-text: rgba(15,23,42,0.4);
    --board-particle-color: rgba(29,78,216,0.18);
    --board-float-border: rgba(29,78,216,0.35);
    --board-shadow: rgba(0,0,0,0.15);
  }

  .board-bg { background: var(--board-bg); }
  .board-text-primary  { color: var(--board-text-primary); }
  .board-text-secondary { color: var(--board-text-secondary); }

  @keyframes board-float {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-18px) rotate(1.5deg); }
  }
  @keyframes board-glow-pulse {
    0%,100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  @keyframes board-shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes board-reveal-up {
    from { opacity:0; transform: translateY(50px) scale(0.95); }
    to   { opacity:1; transform: translateY(0)    scale(1);    }
  }
  @keyframes board-line-grow {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes board-particle {
    0%   { transform: translateY(0)   translateX(0)   scale(0); opacity:0; }
    20%  { opacity: 1; }
    80%  { opacity: 0.6; }
    100% { transform: translateY(-120px) translateX(var(--dx)) scale(1.2); opacity:0; }
  }
  @keyframes board-tab-slide {
    from { opacity:0; transform: translateX(30px); }
    to   { opacity:1; transform: translateX(0); }
  }
  .board-animate { animation: board-reveal-up 0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .board-line-anim { transform-origin: top; animation: board-line-grow 0.8s ease-out both; }
  .board-shimmer-text {
    background: linear-gradient(90deg, #f7d76b 0%, #fff9d6 40%, #f7d76b 60%, #c9922a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: board-shimmer 4s linear infinite;
  }
  .board-card:hover .board-card-glow { opacity: 1 !important; }
  .board-section-enter { animation: board-tab-slide 0.5s cubic-bezier(0.22,1,0.36,1) both; }

  @media (prefers-reduced-motion: reduce) {
    .board-animate, .board-line-anim, .board-shimmer-text,
    .board-float, [style*="board-float"], [style*="board-particle"] {
      animation: none !important; transition: none !important;
    }
  }
`;

// ─── Particle Background ───────────────────────────────────────────────────────
const ParticleBg = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    dur:   `${6 + Math.random() * 6}s`,
    dx:    `${(Math.random() - 0.5) * 80}px`,
    size:  Math.random() > 0.5 ? 2 : 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: p.size, height: p.size,
            background: 'var(--board-particle-color)',
            '--dx': p.dx,
            animation: `board-particle ${p.dur} ease-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Hierarchy Connector ───────────────────────────────────────────────────────
const Connector = () => (
  <div className="flex flex-col items-center py-4 relative z-10">
    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#f7d76b] to-[#60a5fa] shadow-lg shadow-yellow-400/40 animate-pulse" />
    <div
      className="board-line-anim w-px h-16"
      style={{ background: 'linear-gradient(to bottom, #f7d76b44, #60a5fa44)' }}
    />
    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#c084fc] shadow-lg shadow-blue-400/40 animate-pulse" />
  </div>
);

// ─── Section Badge + Title ─────────────────────────────────────────────────────
const SectionHeader = ({ label, title, theme, icon: Icon }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('board-animate'); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center mb-10 opacity-0" style={{ animationDelay: '0.05s' }}>
      <div
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-4"
        style={{
          background: `linear-gradient(135deg, ${theme.from}22, ${theme.to}44)`,
          border: `1px solid ${theme.from}55`,
          color: theme.from,
        }}
      >
        <Icon size={13} />
        <span>{label}</span>
      </div>
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide board-text-primary"
        style={{ fontFamily: '"Cinzel", serif' }}
      >
        {title}
      </h2>
      <div
        className="mx-auto mt-4 h-[2px] w-24 rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${theme.from}, transparent)` }}
      />
    </div>
  );
};

// ─── Member Card ───────────────────────────────────────────────────────────────
const MemberCard = memo(({ member, index, isChairman, showCrown = true, theme, onClick }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.animationDelay = `${index * 0.08}s`;
        el.classList.add('board-animate');
        io.disconnect();
      }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  const imgSize = isChairman ? 'w-28 h-28 sm:w-36 sm:h-36' : 'w-20 h-20 sm:w-24 sm:h-24';

  return (
    <div
      ref={ref}
      className={`board-card flex flex-col items-center group opacity-0 ${onClick ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick && onClick(member)}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `View ${member.name}'s contact info` : member.name}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => e.key === 'Enter' && onClick && onClick(member)}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Image */}
      <div className="relative">
        {/* Glow ring */}
        <div
          className="board-card-glow absolute -inset-3 rounded-full blur-xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${theme.glow}, transparent 70%)`,
            opacity: hovered ? 0.9 : 0.25,
          }}
        />
        {/* Crown — only shown when explicitly enabled */}
        {isChairman && showCrown && (
          <Crown
            className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 drop-shadow-lg"
            size={20}
            style={{ color: theme.from, filter: `drop-shadow(0 0 6px ${theme.glow})` }}
          />
        )}
        {/* Photo */}
        <div
          className={`${imgSize} relative rounded-full overflow-hidden z-10`}
          style={{
            border: `3px solid ${hovered ? theme.from : theme.from + '66'}`,
            boxShadow: hovered ? `0 0 24px ${theme.glow}` : `0 4px 20px var(--board-shadow)`,
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease',
          }}
        >
          {!imgErr ? (
            <LazyImage
              src={member.image} alt={member.name}
              className="w-full h-full object-cover"
              wrapperClassName="w-full h-full"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-xl font-black"
              style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, color: '#fff' }}
            >
              {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div
        className="mt-4 text-center px-2 max-w-[150px] sm:max-w-[170px]"
        style={{
          background: hovered ? `linear-gradient(135deg, ${theme.from}18, ${theme.to}10)` : 'var(--board-card-bg)',
          borderRadius: '12px',
          border: hovered ? `1px solid ${theme.from}44` : '1px solid var(--board-card-border)',
          padding: '10px 12px',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.35s ease',
        }}
      >
        <h3
          className={`font-bold board-text-primary ${isChairman ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} leading-snug`}
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          {member.name}
        </h3>
        <p
          className="text-[11px] mt-1 font-medium tracking-wide"
          style={{ color: theme.from }}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
});
MemberCard.displayName = 'MemberCard';

// ─── Floating Side Photo ───────────────────────────────────────────────────────
const FloatingPhoto = memo(({ member, index, isTransitioning }) => (
  <div
    className={`absolute z-10 hidden lg:block transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
    style={{
      top: member.top,
      [member.side]: '3%',
      width: member.size === 'lg' ? 80 : member.size === 'md' ? 60 : 48,
      height: member.size === 'lg' ? 80 : member.size === 'md' ? 60 : 48,
      animation: `board-float ${4 + index * 0.5}s ease-in-out ${member.delay}s infinite`,
      willChange: 'transform',
    }}
  >
    <div
      className="w-full h-full rounded-full overflow-hidden"
      style={{ border: '2px solid var(--board-float-border)', boxShadow: '0 8px 24px var(--board-shadow)' }}
    >
      <LazyImage src={member.image} alt="" className="w-full h-full object-cover" wrapperClassName="w-full h-full" />
    </div>
  </div>
));
FloatingPhoto.displayName = 'FloatingPhoto';

// ─── Role Section ──────────────────────────────────────────────────────────────
const RoleSection = ({ title, label, icon, theme, members, isChairFirst, showCrown = true, uniformSize = false, onClick, gridCols, withConnector, id }) => {
  const [first, ...rest] = members;
  return (
    <>
      <section id={id} className="py-14 sm:py-20 board-section-enter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader title={title} label={label} theme={theme} icon={icon} />
          {isChairFirst ? (
            <div className="flex flex-col items-center gap-10">
              <MemberCard member={first} index={0} isChairman showCrown={showCrown} theme={theme} onClick={onClick} />
              {rest.length > 0 && (
                <>
                  <Connector />
                  <div className={`grid ${gridCols} gap-8 justify-items-center w-full`}>
                    {rest.map((m, i) => (
                      <MemberCard key={m.id} member={m} index={i + 1} isChairman={false} showCrown={false} theme={theme} onClick={onClick} />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={`grid ${gridCols} gap-8 justify-items-center`}>
              {members.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} isChairman={!uniformSize && i === 0} showCrown={!uniformSize && showCrown && i === 0} theme={theme} onClick={onClick} />
              ))}
            </div>
          )}
        </div>
      </section>
      {withConnector && <div className="flex justify-center"><Connector /></div>}
    </>
  );
};

// ─── Board Page ────────────────────────────────────────────────────────────────
const Board = () => {
  const heroRef = useRef(null);
  const [activeTab, setActiveTab] = useState('current');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleMemberClick = useCallback((m) => { setSelectedMember(m); setIsModalOpen(true); }, []);
  const handleCloseModal = useCallback(() => { setIsModalOpen(false); setTimeout(() => setSelectedMember(null), 300); }, []);

  useEffect(() => {
    if (!localStorage.getItem('hasSeenMemberToast_v2')) {
      const t = setTimeout(() => { setShowToast(true); localStorage.setItem('hasSeenMemberToast_v2', 'true'); }, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => { setActiveTab(tab); setTimeout(() => setIsTransitioning(false), 80); }, 320);
  };

  const B = activeTab === 'current' ? BOARD_MEMBERS : OLD_BOARD_MEMBERS;
  const F = activeTab === 'current' ? FLOATING_MEMBERS : OLD_FLOATING_MEMBERS;

  // Animate hero on load
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.querySelectorAll('.hero-el').forEach((child, i) => {
      child.style.animationDelay = `${i * 0.15}s`;
      child.classList.add('board-animate');
    });
  }, []);

  return (
    <div className="board-page min-h-screen board-bg">
      <style>{STYLES}</style>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden px-4 text-center"
      >
        <ParticleBg />

        {/* Floating side portraits */}
        {F.map((m, i) => <FloatingPhoto key={m.id} member={m} index={i} isTransitioning={isTransitioning} />)}

        {/* Concentric decorative rings */}
        {[600, 420, 260].map((s, i) => (
          <div
            key={s}
            className="absolute rounded-[50%] border pointer-events-none"
            style={{ width: `min(${s}px, ${s / 8}vw + 40px)`, height: `min(${s / 2}px, ${s / 16}vw + 20px)`, opacity: 0.6 - i * 0.15, borderColor: 'var(--board-connector)' }}
          />
        ))}

        {/* Top micro badge */}
        <div className="hero-el opacity-0 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.3em] uppercase font-bold"
          style={{ background: 'linear-gradient(135deg, #f7d76b22, #1d4ed822)', border: '1px solid #f7d76b44', color: '#f7d76b' }}>
          <Sparkles size={11} /> IEEE MNU Student Branch
        </div>

        {/* Main heading */}
        <h1 className="hero-el opacity-0 board-shimmer-text text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-none mb-4"
          style={{ fontFamily: '"Cinzel", serif', letterSpacing: '0.06em' }}>
          {activeTab === 'current' ? '2025 – Present' : '2023 – 2025'}
        </h1>
        {activeTab === 'old' && (
          <p className="hero-el opacity-0 text-lg sm:text-xl font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ color: '#f7d76b99', fontFamily: '"Cinzel", serif' }}>
            #Founders
          </p>
        )}

        <p className="hero-el opacity-0 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed board-text-secondary"
          style={{ fontFamily: '"Crimson Text", serif', fontSize: '1.1rem' }}>
          The dedicated architects behind IEEE MNU — driving innovation, leadership and community forward.
        </p>

        <a href="#advisors"
          className="hero-el opacity-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #f7d76b, #c9922a)', color: '#0a0e1f', boxShadow: '0 0 30px rgba(247,215,107,0.35)' }}>
          Explore Team <ChevronDown size={16} />
        </a>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L360 45C720 10 1080 45 1440 60V80H0Z" fill="var(--board-bg-solid, var(--board-wave))" />
          </svg>
        </div>
      </section>

      {/* ── Tab Bar ───────────────────────────────────────────────── */}
      <div className="sticky top-16 md:top-20 z-40" style={{ background: 'var(--board-tab-bar)', borderBottom: '1px solid var(--board-connector)', backdropFilter: 'blur(12px)' }}>
        <div className="container mx-auto px-4 flex justify-center gap-4 py-3">
          {[{ key: 'current', label: '2025 – Present' }, { key: 'old', label: '2023 – 2025 #Founders' }].map(({ key, label }) => (
            <button key={key} onClick={() => switchTab(key)}
              className="px-5 py-2.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300"
              style={activeTab === key
                ? { background: 'linear-gradient(135deg, #f7d76b, #c9922a)', color: '#0a0e1f', boxShadow: '0 0 20px rgba(247,215,107,0.3)' }
                : { background: 'var(--board-tab-inactive)', color: 'var(--board-tab-inactive-text)', border: '1px solid var(--board-tab-inactive-border)' }}
              aria-pressed={activeTab === key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sections ──────────────────────────────────────────────── */}
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

        {/* University Head */}
        <RoleSection
          id="university-head"
          title="University Leadership"
          label="Institutional Lead"
          icon={Crown}
          theme={ROLE_THEME.universityHead}
          members={B.universityHead.members}
          isChairFirst={false}
          gridCols="grid-cols-1"
          onClick={activeTab === 'old' ? handleMemberClick : undefined}
          withConnector
        />

        {/* Advisors */}
        <RoleSection
          id="advisors"
          title="Advisors"
          label="Guidance & Mentorship"
          icon={Sparkles}
          theme={ROLE_THEME.advisors}
          members={B.advisors.members}
          isChairFirst={false}
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          onClick={activeTab === 'old' ? handleMemberClick : undefined}
          withConnector
        />

        {/* Executive Board */}
        <RoleSection
          id="executive"
          title="Executive Board"
          label="Leadership"
          icon={Crown}
          theme={ROLE_THEME.executive}
          members={B.executive.members}
          isChairFirst
          gridCols="grid-cols-2 sm:grid-cols-3"
          onClick={handleMemberClick}
          withConnector
        />

        {/* Committee Heads — no crown */}
        <RoleSection
          id="heads"
          title={activeTab === 'current' ? 'Committee Heads' : 'Previous Committee Heads'}
          label="Department Leaders"
          icon={Star}
          theme={ROLE_THEME.heads}
          members={B.heads.members}
          isChairFirst={false}
          showCrown={false}
          uniformSize
          gridCols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          onClick={handleMemberClick}
          withConnector={activeTab === 'current'}
        />

        {/* Vice Heads — current only, no crown */}
        {activeTab === 'current' && (
          <RoleSection
            id="vices"
            title="Vice Heads"
            label="Supporting Leaders"
            icon={Users}
            theme={ROLE_THEME.vices}
            members={BOARD_MEMBERS.vices.members}
            isChairFirst={false}
            showCrown={false}
            uniformSize
            gridCols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            onClick={handleMemberClick}
            withConnector={false}
          />
        )}

        {/* Footer band */}
        <div className="py-10 text-center" style={{ borderTop: '1px solid var(--board-footer-border)' }}>
          <p className="board-text-secondary text-xs tracking-[0.3em] uppercase" style={{ fontFamily: '"Cinzel", serif' }}>
            IEEE MNU Student Branch · Mansoura University
          </p>
        </div>
      </div>

      {/* Modal & Toast */}
      <MemberContactModal member={selectedMember} isOpen={isModalOpen} onClose={handleCloseModal} />
      <Toast message="Click on any member card to view their contact info" isVisible={showToast} onDismiss={() => setShowToast(false)} />
    </div>
  );
};

export default Board;
