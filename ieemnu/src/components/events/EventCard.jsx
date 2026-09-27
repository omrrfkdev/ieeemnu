/**
 * EventCard Component — Premium Redesign
 * Cinematic depth, CSS variable theming, micro-interactions, GSAP entrance
 */

import { useState, useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { getEventImagePath } from '../../utils/imageLoader';
import { getRegistrationStatus } from '../../utils/registrationStatus';

// ── Type colour tokens ─────────────────────────────────────────────────────────
const TYPE_TOKENS = {
  techtalk:    { from: '#6366f1', to: '#8b5cf6', glow: 'rgba(99,102,241,0.35)',   label: 'Tech Talk'    },
  workshop:    { from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.35)',   label: 'Workshop'     },
  competition: { from: '#f97316', to: '#ef4444', glow: 'rgba(249,115,22,0.35)',   label: 'Competition'  },
  events:      { from: '#ec4899', to: '#f43f5e', glow: 'rgba(236,72,153,0.35)',   label: 'Event'        },
  awards:      { from: '#f59e0b', to: '#d97706', glow: 'rgba(245,158,11,0.35)',   label: 'Awards'       },
  partnership: { from: '#6366f1', to: '#4f46e5', glow: 'rgba(99,102,241,0.35)',   label: 'Partnership'  },
};

const getToken = (type) => TYPE_TOKENS[type] || TYPE_TOKENS.techtalk;

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// ── Inline CSS ─────────────────────────────────────────────────────────────────
const CARD_STYLES = `
  .ec-card {
    --ec-bg: #ffffff;
    --ec-bg2: #f8fafc;
    --ec-border: rgba(0,0,0,0.08);
    --ec-title: #0f172a;
    --ec-body: #475569;
    --ec-meta: #64748b;
    --ec-badge-bg: rgba(0,0,0,0.06);
    --ec-divider: rgba(0,0,0,0.07);
    --ec-disabled-bg: #e2e8f0;
    --ec-disabled-text: #94a3b8;
  }

  html.dark .ec-card {
    --ec-bg: #111827;
    --ec-bg2: #1f2937;
    --ec-border: rgba(255,255,255,0.08);
    --ec-title: #f1f5f9;
    --ec-body: #94a3b8;
    --ec-meta: #64748b;
    --ec-badge-bg: rgba(255,255,255,0.08);
    --ec-divider: rgba(255,255,255,0.07);
    --ec-disabled-bg: #1e293b;
    --ec-disabled-text: #475569;
  }

  @keyframes ec-shine {
    0%   { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(220%)  skewX(-15deg); }
  }
  .ec-shine::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
    transform: translateX(-100%) skewX(-15deg);
  }
  .ec-card:hover .ec-shine::after {
    animation: ec-shine 0.65s ease forwards;
  }

  @keyframes ec-reveal {
    from { opacity: 0; transform: translateY(36px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  .ec-revealed { animation: ec-reveal 0.6s cubic-bezier(0.22,1,0.36,1) both; }

  @media (prefers-reduced-motion: reduce) {
    .ec-revealed { animation: none !important; opacity: 1 !important; }
    .ec-card:hover .ec-shine::after { animation: none !important; }
  }
`;

// ── Component ──────────────────────────────────────────────────────────────────
const EventCard = memo(({ event, index }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const imagePath = getEventImagePath(event.type, event.imageName);
  const token = getToken(event.type);
  const isClickable = event.hasEventPage !== false;

  // ── Entrance animation (IntersectionObserver) ─────────────────────────────
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.animationDelay = `${index * 0.08}s`;
        el.classList.add('ec-revealed');
        io.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '40px' });
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  // ── Lazy image load ───────────────────────────────────────────────────────
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (imageRef.current) imageRef.current.src = imagePath;
      setImageLoaded(true);
    };
    img.onerror = () => setImageLoaded(true);
    img.src = imagePath;
  }, [imagePath]);

  const handleCardClick = () => {
    if (isClickable) navigate(`/events/${event.id}`);
  };

  const regStatus = event.hasForm ? getRegistrationStatus(event) : null;

  return (
    <>
      {/* inject styles once */}
      <style>{CARD_STYLES}</style>

      <div
        ref={cardRef}
        onClick={handleCardClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`ec-card group relative flex flex-col rounded-2xl overflow-hidden h-full will-change-transform opacity-0 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
        style={{
          background: 'var(--ec-bg)',
          border: '1px solid var(--ec-border)',
          boxShadow: hovered
            ? `0 24px 48px -8px ${token.glow}, 0 8px 16px -4px rgba(0,0,0,0.12)`
            : '0 4px 16px -4px rgba(0,0,0,0.1)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={isClickable ? `View details for ${event.title}` : event.title}
        onKeyDown={e => e.key === 'Enter' && handleCardClick()}
      >
        {/* ── Top accent bar ───────────────────────────────────────────── */}
        <div
          className="h-[3px] w-full flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${token.from}, ${token.to})` }}
        />

        {/* ── Image area ───────────────────────────────────────────────── */}
        <div className="relative h-56 sm:h-60 flex-shrink-0 overflow-hidden" style={{ background: 'var(--ec-bg2)' }}>

          {/* Blur bg wash */}
          {imageLoaded && (
            <img
              src={imagePath}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40 pointer-events-none"
            />
          )}

          {/* Skeleton pulse */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse" style={{ background: 'linear-gradient(135deg, var(--ec-bg2), var(--ec-border))' }} />
          )}

          {/* Main image */}
          <img
            ref={imageRef}
            alt={event.title}
            className="ec-shine relative w-full h-full object-contain object-center z-10 transition-transform duration-500"
            style={{ opacity: imageLoaded ? 1 : 0, transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
            loading="lazy"
          />

          {/* Hover gradient veil */}
          <div
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-400"
            style={{
              background: `linear-gradient(to top, ${token.from}55 0%, transparent 60%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Type badge */}
          <div className="absolute top-3 left-3 z-30">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold text-white tracking-wider uppercase shadow-lg backdrop-blur-sm"
              style={{ background: `linear-gradient(135deg, ${token.from}, ${token.to})`, boxShadow: `0 4px 12px ${token.glow}` }}
            >
              {event.category || token.label}
            </span>
          </div>

          {/* Arrow icon on hover */}
          {isClickable && (
            <div
              className="absolute bottom-3 right-3 z-30 transition-all duration-300"
              style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translate(0,0)' : 'translate(4px,4px)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{ background: `linear-gradient(135deg, ${token.from}, ${token.to})` }}
              >
                <ArrowRight size={14} className="text-white" />
              </div>
            </div>
          )}
        </div>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-grow p-5">

          {/* Title */}
          <h3
            className="font-bold text-base sm:text-lg leading-snug mb-2 line-clamp-2 transition-colors duration-300"
            style={{ color: hovered ? token.from : 'var(--ec-title)', fontFamily: '"Inter", system-ui, sans-serif' }}
          >
            {event.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2 flex-grow"
            style={{ color: 'var(--ec-body)' }}
          >
            {event.description}
          </p>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: 'var(--ec-divider)' }} />

          {/* Meta details */}
          <div className="space-y-1.5 mb-5">
            {event.date && (
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--ec-meta)' }}>
                <Calendar size={13} style={{ color: token.from, flexShrink: 0 }} />
                <span>{formatDate(event.date)}</span>
              </div>
            )}
            {event.time && (
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--ec-meta)' }}>
                <Clock size={13} style={{ color: token.from, flexShrink: 0 }} />
                <span>{event.time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--ec-meta)' }}>
                <MapPin size={13} style={{ color: token.from, flexShrink: 0, marginTop: 1 }} />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>

          {/* CTA area */}
          {event.hasForm ? (
            regStatus?.isOpen && isClickable ? (
              <button
                onClick={e => { e.stopPropagation(); navigate(`/events/${event.id}/registration`); }}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${token.from}, ${token.to})`, boxShadow: `0 4px 16px ${token.glow}` }}
              >
                {regStatus.message}
              </button>
            ) : (
              <button
                disabled
                className="w-full py-2.5 rounded-xl text-sm font-bold cursor-not-allowed opacity-50"
                style={{ background: 'var(--ec-disabled-bg)', color: 'var(--ec-disabled-text)' }}
              >
                {regStatus?.message || 'Registration Closed'}
              </button>
            )
          ) : (
            /* Social links */
            <div className="flex gap-2 mt-auto">
              {event.facebook && (
                <a
                  href={event.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  aria-label="Facebook page"
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ background: '#1877F2' }}
                >
                  <Facebook size={15} />
                </a>
              )}
              {event.instagram && (
                <a
                  href={event.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  aria-label="Instagram page"
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)' }}
                >
                  <Instagram size={15} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

EventCard.displayName = 'EventCard';
export default EventCard;
