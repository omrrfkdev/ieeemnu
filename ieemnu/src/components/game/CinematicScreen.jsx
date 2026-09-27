import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkipForward } from 'lucide-react';

/**
 * CinematicScreen
 * @param {'intro'|'transition'|'win'} type
 * @param {function} onFinish - called when video ends or user skips
 */
const CinematicScreen = ({ type, onFinish }) => {
  const videoRef = useRef(null);
  const [canSkip, setCanSkip] = useState(type === 'win');

  // Allow skipping after 2s for intro, immediately for transition
  useEffect(() => {
    if (type === 'intro') {
      const t = setTimeout(() => setCanSkip(true), 2000);
      return () => clearTimeout(t);
    }
    if (type === 'transition') {
      setCanSkip(true);
    }
  }, [type]);

  const videoSrc =
    type === 'intro' ? '/SpriteSheet/video/intro.mp4' : '/SpriteSheet/video/leveltranstion.mp4';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {type === 'win' ? (
        /* Win screen — show GIF + message */
        <div className="flex flex-col items-center gap-6 p-8 text-center">
          <img
            src="/SpriteSheet/video/win.gif"
            alt="You Win!"
            className="max-w-xs w-full"
            style={{ imageRendering: 'pixelated' }}
          />
          <h2
            className="text-green-400 text-lg leading-loose"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            MISSION COMPLETE
          </h2>
          <p className="text-gray-400 text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            FACILITY SECURED
          </p>
          <button
            onClick={onFinish}
            className="mt-4 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded pixel-border transition-all"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}
          >
            ▸ PLAY AGAIN
          </button>
        </div>
      ) : (
        /* Video cinematic */
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          onEnded={onFinish}
          className="w-full h-full object-cover"
        />
      )}

      {/* Skip button */}
      {canSkip && type !== 'win' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onFinish}
          className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 bg-black/60 border border-gray-600 rounded text-gray-300 hover:text-white hover:border-gray-400 transition-all"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}
        >
          <SkipForward size={14} /> SKIP
        </motion.button>
      )}
    </motion.div>
  );
};

export default CinematicScreen;
