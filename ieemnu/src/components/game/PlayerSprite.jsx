import React, { useState, useEffect, useRef } from 'react';

const FRAME_COUNT       = 4;
const FRAME_INTERVAL_MS = 120;

/**
 * PlayerSprite
 * @param {string}  direction - 'up' | 'down' | 'left' | 'right'
 * @param {boolean} isMoving  - whether the player is currently walking
 *
 * Bug fix: previously the frame counter was shared across direction changes,
 * causing a stale-frame + new-direction combination that rendered a broken
 * src path (e.g. left3.png loaded while direction just flipped to right).
 *
 * Fix: reset frame to 1 whenever direction changes, and store the frame
 * counter in a ref inside the interval callback so it never reads stale state.
 */
const PlayerSprite = ({ direction = 'down', isMoving = false }) => {
  const [frame, setFrame]   = useState(1);
  const frameRef            = useRef(1);   // source of truth for the interval
  const intervalRef         = useRef(null);
  const prevDirectionRef    = useRef(direction);

  // ── Reset frame to 1 when direction changes ─────────────────────────────
  // This prevents the bug where a leftover frame number (e.g. 3) is combined
  // with the new direction string before the interval has a chance to reset.
  useEffect(() => {
    if (prevDirectionRef.current !== direction) {
      prevDirectionRef.current = direction;
      frameRef.current = 1;
      setFrame(1);
    }
  }, [direction]);

  // ── Manage the frame-cycling interval ────────────────────────────────────
  useEffect(() => {
    clearInterval(intervalRef.current);

    if (isMoving) {
      intervalRef.current = setInterval(() => {
        // Use ref so the callback is never stale
        frameRef.current = (frameRef.current % FRAME_COUNT) + 1;
        setFrame(frameRef.current);
      }, FRAME_INTERVAL_MS);
    } else {
      // Stopped — snap back to idle frame
      frameRef.current = 1;
      setFrame(1);
    }

    return () => clearInterval(intervalRef.current);
  }, [isMoving]);

  const src = `/SpriteSheet/player/${direction}/${direction}${frame}.png`;

  return (
    <img
      src={src}
      alt="player"
      className="w-full h-full object-contain"
      style={{ imageRendering: 'pixelated' }}
      draggable={false}
    />
  );
};

export default PlayerSprite;
