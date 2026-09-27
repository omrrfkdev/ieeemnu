/**
 * EventDetails — Premium Page Redesign
 * Consistent with the Board/EventCard design system.
 * Features: CSS vars for light/dark, cinematic hero, structured data,
 * meta tags, full accessibility, agenda, social share, gallery, related events.
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Calendar, MapPin, Clock, Share2,
  CheckCircle2, Users, ExternalLink, Facebook,
  Instagram, Link2, ChevronRight, Ticket
} from 'lucide-react';
import { EVENTS, getEventById } from '../constants/events';
import { getEventImagePath } from '../utils/imageLoader';
import RegistrationCard from '../components/events/RegistrationCard';
import PeopleSection from '../components/events/PeopleSection';
import DynamicPhotoGallery from '../components/events/DynamicPhotoGallery';
import PhotoLightbox from '../components/events/PhotoLightbox';
import OptimizedImage from '../components/common/OptimizedImage';
import { getRegistrationStatus } from '../utils/registrationStatus';

// ── Type tokens (shared with EventCard) ───────────────────────────────────────
const TYPE_TOKENS = {
  techtalk:    { from: '#6366f1', to: '#8b5cf6', glow: 'rgba(99,102,241,0.3)'  },
  workshop:    { from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.3)'  },
  competition: { from: '#f97316', to: '#ef4444', glow: 'rgba(249,115,22,0.3)'  },
  events:      { from: '#ec4899', to: '#f43f5e', glow: 'rgba(236,72,153,0.3)'  },
  awards:      { from: '#f59e0b', to: '#d97706', glow: 'rgba(245,158,11,0.3)'  },
  partnership: { from: '#6366f1', to: '#4f46e5', glow: 'rgba(99,102,241,0.3)'  },
};
const getToken = (t) => TYPE_TOKENS[t] || TYPE_TOKENS.techtalk;

const fmtDate = (d, opts) => new Date(d).toLocaleDateString('en-US', opts || { month: 'long', day: 'numeric', year: 'numeric' });
const fmtDateFull = (d) => fmtDate(d, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// ── Inline CSS ─────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  :root {
    --ed-bg:        #f8fafc;
    --ed-surface:   #ffffff;
    --ed-surface2:  #f1f5f9;
    --ed-border:    rgba(0,0,0,0.08);
    --ed-title:     #0f172a;
    --ed-body:      #475569;
    --ed-muted:     #94a3b8;
    --ed-shadow:    rgba(0,0,0,0.10);
    --ed-divider:   rgba(0,0,0,0.07);
  }
  html.dark {
    --ed-bg:        #0b0f1a;
    --ed-surface:   #111827;
    --ed-surface2:  #1f2937;
    --ed-border:    rgba(255,255,255,0.08);
    --ed-title:     #f1f5f9;
    --ed-body:      #94a3b8;
    --ed-muted:     #64748b;
    --ed-shadow:    rgba(0,0,0,0.4);
    --ed-divider:   rgba(255,255,255,0.07);
  }

  .ed-page { background: transparent; font-family: 'Inter', system-ui, sans-serif; }
  .ed-card {
    background: var(--ed-surface);
    border: 1px solid var(--ed-border);
    border-radius: 1.25rem;
    box-shadow: 0 4px 24px var(--ed-shadow);
  }
  .ed-title { color: var(--ed-title); }
  .ed-body  { color: var(--ed-body);  }
  .ed-muted { color: var(--ed-muted); }
  .ed-surface2 { background: var(--ed-surface2); }
  .ed-divider  { border-color: var(--ed-divider); }
  .ed-border   { border-color: var(--ed-border);  }

  @keyframes ed-reveal {
    from { opacity:0; transform: translateY(30px) scale(0.98); }
    to   { opacity:1; transform: translateY(0)    scale(1);    }
  }
  .ed-reveal { animation: ed-reveal 0.65s cubic-bezier(0.22,1,0.36,1) both; }

  @media (prefers-reduced-motion: reduce) {
    .ed-reveal { animation: none !important; opacity: 1 !important; }
  }
`;

// ── Copy-link toast ────────────────────────────────────────────────────────────
const CopyToast = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-2xl"
        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
      >
        ✓ Link copied to clipboard
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Meta pill ─────────────────────────────────────────────────────────────────
const MetaPill = ({ icon: Icon, label, value, token }) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${token.from}22, ${token.to}33)` }}>
      <Icon size={18} style={{ color: token.from }} />
    </div>
    <div>
      <p className="text-[11px] font-semibold tracking-widest uppercase ed-muted">{label}</p>
      <p className="text-sm font-semibold ed-title leading-snug">{value}</p>
    </div>
  </div>
);

// ── Schedule row ──────────────────────────────────────────────────────────────
const ScheduleRow = ({ item, index, token }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06 }}
    className="flex items-start gap-4 p-4 rounded-xl ed-surface2"
  >
    <span className="text-xs font-bold flex-shrink-0 mt-0.5 px-2.5 py-1 rounded-lg"
      style={{ background: `${token.from}22`, color: token.from }}>
      {item.time}
    </span>
    <span className="text-sm ed-body font-medium">{item.title}</span>
  </motion.div>
);

// ── Related event card ────────────────────────────────────────────────────────
const RelatedCard = ({ event }) => {
  const token = getToken(event.type);
  const img = getEventImagePath(event.type, event.imageName);
  return (
    <Link to={`/events/${event.id}`}
      className="group flex items-center gap-3 p-3 rounded-xl ed-surface2 ed-border border transition-all duration-300 hover:shadow-md"
      style={{ transition: 'box-shadow 0.3s ease' }}
    >
      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
        <img src={img} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold tracking-wide uppercase mb-0.5" style={{ color: token.from }}>{event.category}</p>
        <p className="text-sm font-semibold ed-title line-clamp-2 leading-snug">{event.title}</p>
        {event.date && <p className="text-[11px] ed-muted mt-0.5">{fmtDate(event.date)}</p>}
      </div>
      <ChevronRight size={14} className="ed-muted flex-shrink-0" />
    </Link>
  );
};

// ── Not Found ─────────────────────────────────────────────────────────────────
const NotFound = ({ navigate }) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 ed-page">
    <style>{STYLES}</style>
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
      <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#6366f133,#8b5cf633)' }}>
        <Calendar size={32} style={{ color: '#6366f1' }} />
      </div>
      <h2 className="text-3xl font-black ed-title mb-3">Event Not Found</h2>
      <p className="ed-body mb-8">The event you're looking for doesn't exist or may have been removed.</p>
      <button onClick={() => navigate('/events')}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
        <ArrowLeft size={16} /> Back to Events
      </button>
    </motion.div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  const [imgOrientation, setImgOrientation] = useState('landscape');
  const imgRef = useRef(null);

  const event = getEventById(id);
  const token = event ? getToken(event.type) : getToken('techtalk');
  const imagePath = event ? getEventImagePath(event.type, event.imageName) : '';
  const regStatus = event?.hasForm ? getRegistrationStatus(event) : null;

  // detect image orientation
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !event) return;
    const check = () => setImgOrientation(img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait');
    img.complete ? check() : img.addEventListener('load', check);
    return () => img.removeEventListener('load', check);
  }, [event?.imageName]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: event.title, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // related events (same type, exclude current, max 3)
  const related = EVENTS
    .filter(e => e.id !== id && e.type === event?.type)
    .slice(0, 3);

  if (!event) return <NotFound navigate={navigate} />;

  // SEO: update title + inject JSON-LD
  useEffect(() => {
    if (!event) return;
    const prev = document.title;
    document.title = `${event.title} | IEEE MNU Events`;

    const sd = document.createElement('script');
    sd.type = 'application/ld+json';
    sd.id = 'event-structured-data';
    sd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.title,
      description: event.description,
      startDate: event.date,
      location: { '@type': 'Place', name: event.location || 'IEEE MNU Student Branch' },
      organizer: { '@type': 'Organization', name: 'IEEE MNU Student Branch' },
      image: `${window.location.origin}${imagePath}`,
      url: window.location.href,
    });
    document.head.appendChild(sd);

    return () => {
      document.title = prev;
      document.getElementById('event-structured-data')?.remove();
    };
  }, [event?.id]);

  return (
    <>
      <style>{STYLES}</style>
      <CopyToast visible={copied} />

      <div className="ed-page min-h-screen pb-24">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className={`relative w-full overflow-hidden ${imgOrientation === 'portrait' ? 'h-[55vh] md:h-[65vh]' : 'h-[45vh] md:h-[58vh]'}`}>

          {/* Blurred BG wash */}
          <img src={imagePath} alt="" aria-hidden="true" loading="lazy"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50 pointer-events-none" />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />

          {/* Type accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 z-20"
            style={{ background: `linear-gradient(90deg, ${token.from}, ${token.to})` }} />

          {/* Main image */}
          <OptimizedImage
            ref={imgRef}
            src={imagePath} alt={event.title}
            priority width={1920} height={1080} sizes="100vw"
            className={`absolute inset-0 w-full h-full z-10 ${imgOrientation === 'portrait' ? 'object-contain py-8' : 'object-cover'}`}
          />

          {/* Hero content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10">
            {/* Back nav */}
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Link to="/events"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <ArrowLeft size={15} /> Back to Events
              </Link>
            </motion.div>

            {/* Title area */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest mb-4 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${token.from}, ${token.to})` }}>
                {event.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl max-w-4xl">
                {event.title}
              </h1>
              {/* Quick meta strip */}
              <div className="flex flex-wrap gap-4 mt-4">
                {event.date && (
                  <span className="flex items-center gap-1.5 text-white/80 text-sm backdrop-blur-sm">
                    <Calendar size={14} /> {fmtDate(event.date)}
                  </span>
                )}
                {event.time && (
                  <span className="flex items-center gap-1.5 text-white/80 text-sm">
                    <Clock size={14} /> {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-1.5 text-white/80 text-sm">
                    <MapPin size={14} /> {event.location}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* ── LEFT / MAIN ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* About */}
              <div className="ed-card p-7 ed-reveal" style={{ animationDelay: '0.05s' }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${token.from}, ${token.to})` }} />
                  <h2 className="text-xl font-black ed-title">About This Event</h2>
                </div>
                <p className="ed-body text-[15px] leading-relaxed whitespace-pre-wrap">{event.description}</p>

                {event.highlights?.length > 0 && (
                  <div className="mt-7 pt-7 border-t ed-divider">
                    <h3 className="font-bold ed-title mb-4 text-sm uppercase tracking-wider">What to Expect</h3>
                    <ul className="space-y-2.5">
                      {event.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm ed-body">
                          <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: token.from }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* People sections */}
              {event.speakers?.length > 0 && <PeopleSection people={event.speakers} type="speakers" />}
              {event.guests?.length > 0 && <PeopleSection people={event.guests} type="guests" />}
              {event.instructors?.length > 0 && <PeopleSection people={event.instructors} type="instructors" />}
              {event.vipGuests?.length > 0 && <PeopleSection people={event.vipGuests} type="vipGuests" />}
              {event.hosts?.length > 0 && <PeopleSection people={event.hosts} type="hosts" />}

              {/* Photo gallery */}
              {event.photos?.length > 0 && (
                <div className="ed-reveal" style={{ animationDelay: '0.15s' }}>
                  <DynamicPhotoGallery
                    photos={event.photos}
                    settings={event.gallerySettings}
                    onPhotoClick={(photo) => {
                      if (event.gallerySettings?.enableLightbox) {
                        setLightboxIndex(event.photos.findIndex(p => p.id === photo.id));
                      }
                    }}
                  />
                </div>
              )}
            </div>

            {/* ── RIGHT / SIDEBAR ─────────────────────────────────────── */}
            <div className="space-y-5">

              {/* Registration card */}
              {event.hasForm && (
                <div className="ed-reveal" style={{ animationDelay: '0.1s' }}>
                  <RegistrationCard eventId={event.id} />
                </div>
              )}

              {/* CTA if no form but clickable */}
              {!event.hasForm && event.hasEventPage !== false && (
                <div className="ed-card p-6 text-center ed-reveal" style={{ animationDelay: '0.1s' }}>
                  <Ticket size={28} className="mx-auto mb-3" style={{ color: token.from }} />
                  <p className="font-bold ed-title mb-1 text-sm">Free Admission</p>
                  <p className="text-xs ed-muted">This event is open for everyone to attend.</p>
                </div>
              )}

              {/* Event details card */}
              <div className="ed-card p-6 space-y-5 ed-reveal" style={{ animationDelay: '0.15s' }}>
                <h3 className="font-black ed-title text-base">Event Details</h3>
                {event.date && <MetaPill icon={Calendar} label="Date" value={fmtDateFull(event.date)} token={token} />}
                {event.time && <MetaPill icon={Clock} label="Time" value={event.time} token={token} />}
                {event.location && <MetaPill icon={MapPin} label="Location" value={event.location} token={token} />}
                {event.capacity && <MetaPill icon={Users} label="Capacity" value={`${event.capacity} attendees`} token={token} />}

                {/* Map link if location given */}
                {event.location && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: `${token.from}18`, color: token.from, border: `1px solid ${token.from}33` }}
                  >
                    <ExternalLink size={13} /> View on Maps
                  </a>
                )}

                <div className="h-px ed-divider" />

                {/* Share */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest ed-muted mb-3">Share Event</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={handleShare}
                      className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl text-sm font-semibold ed-surface2 ed-title border ed-border hover:shadow-md transition-all duration-200">
                      <Link2 size={14} /> Copy Link
                    </button>
                    {event.facebook && (
                      <a href={event.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110"
                        style={{ background: '#1877F2' }}>
                        <Facebook size={15} />
                      </a>
                    )}
                    {event.instagram && (
                      <a href={event.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110"
                        style={{ background: 'linear-gradient(135deg,#833AB4,#FD1D1D,#F77737)' }}>
                        <Instagram size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Schedule */}
              {event.schedule?.length > 0 && (
                <div className="ed-card p-6 ed-reveal" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 rounded-full" style={{ background: `linear-gradient(to bottom, ${token.from}, ${token.to})` }} />
                    <h3 className="font-black ed-title text-base">Schedule</h3>
                  </div>
                  <div className="space-y-2">
                    {event.schedule.map((item, i) => (
                      <ScheduleRow key={i} item={item} index={i} token={token} />
                    ))}
                  </div>
                </div>
              )}

              {/* Related events */}
              {related.length > 0 && (
                <div className="ed-card p-6 ed-reveal" style={{ animationDelay: '0.25s' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 rounded-full" style={{ background: `linear-gradient(to bottom, ${token.from}, ${token.to})` }} />
                    <h3 className="font-black ed-title text-base">Similar Events</h3>
                  </div>
                  <div className="space-y-2.5">
                    {related.map(e => <RelatedCard key={e.id} event={e} />)}
                  </div>
                  <Link to="/events"
                    className="flex items-center justify-center gap-1.5 mt-4 text-xs font-semibold ed-muted hover:ed-title transition-colors">
                    View all events <ChevronRight size={13} />
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && event.photos?.length > 0 && (
        <PhotoLightbox
          photos={event.photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
};

export default EventDetails;
