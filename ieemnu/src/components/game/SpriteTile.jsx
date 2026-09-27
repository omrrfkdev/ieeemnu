import React from 'react';

/**
 * SpriteTile Component
 * Renders a specific 16x16 tile from a sprite sheet.
 * Uses a scaled img tag inside an overflow-hidden container for precise "cropping".
 * 
 * @param {string} sheet - The name of the sprite sheet file (without extension)
 * @param {number} row - The row index of the tile (0-based)
 * @param {number} col - The column index of the tile (0-based)
 * @param {number} scale - Scaling factor (default: 3 for 48x48px tiles)
 */
const SpriteTile = ({ sheet, row, col, scale = 3, className = '' }) => {
  const tileSize = 16;
  const displaySize = tileSize * scale;

  return (
    <div
      className={`inline-block overflow-hidden relative ${className}`}
      style={{
        width: `${displaySize}px`,
        height: `${displaySize}px`,
        minWidth: `${displaySize}px`,
        minHeight: `${displaySize}px`,
      }}
    >
      <img
        src={`/Top-Down_Retro_Interior/${sheet}.png`}
        alt=""
        style={{
          position: 'absolute',
          left: `-${col * displaySize}px`,
          top: `-${row * displaySize}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          imageRendering: 'pixelated',
          maxWidth: 'none', // Prevent Tailwind's default max-w-full
        }}
      />
    </div>
  );
};

export default SpriteTile;
