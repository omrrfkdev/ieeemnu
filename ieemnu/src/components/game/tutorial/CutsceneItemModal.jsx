import React from 'react';
import { motion } from 'framer-motion';

const PIXEL_FONT = { fontFamily: "'Press Start 2P', monospace" };

const CutsceneItemModal = ({ item, onContinue }) => {
  if (!item) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="w-full max-w-md flex flex-col"
        style={{
          background: '#0d1117',
          border: '2px solid #00ff9f',
          boxShadow: '0 0 0 1px #000, 0 0 0 4px rgba(0,255,159,0.3)',
        }}
      >
        {/* Title Bar */}
        <div className="px-3 py-2 border-b flex justify-between items-center" style={{ background: '#161b22', borderColor: 'rgba(0,255,159,0.2)' }}>
          <div className="flex gap-1.5">
            <div style={{ width: 9, height: 9, background: '#ef4444' }} />
            <div style={{ width: 9, height: 9, background: '#fbbf24' }} />
            <div style={{ width: 9, height: 9, background: '#22c55e' }} />
          </div>
          <span style={{ ...PIXEL_FONT, fontSize: '8px', color: '#00ff9f' }}>DATA RECOVERED</span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-4">
          <div className="w-full aspect-video bg-black overflow-hidden border" style={{ borderColor: 'rgba(0,255,159,0.2)' }}>
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          
          <h3 style={{ ...PIXEL_FONT, fontSize: '10px', color: '#fff', letterSpacing: '0.1em' }}>{item.title}</h3>
          
          <p style={{ ...PIXEL_FONT, fontSize: '8px', color: '#94a3b8', lineHeight: 1.8 }}>
            {item.text}
          </p>
          
          <button
            onClick={onContinue}
            className="mt-2 py-3 w-full transition-all active:translate-y-px"
            style={{
              ...PIXEL_FONT,
              fontSize: '8px',
              color: '#000',
              background: '#00ff9f',
              border: '2px solid #00ff9f',
              boxShadow: '3px 3px 0 #000',
              letterSpacing: '0.05em',
            }}
          >
            ▸ COLLECT DATA
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CutsceneItemModal;
