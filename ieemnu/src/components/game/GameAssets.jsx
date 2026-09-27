import React from 'react';
import PlayerSprite from './PlayerSprite';

const SPRITE_DIR = '/SpriteSheet';

/**
 * Pixel-perfect image tile
 */
const Tile = ({ src, alt, contain }) => (
  <img
    src={src}
    alt={alt}
    className={`w-full h-full ${contain ? 'object-contain' : 'object-cover'}`}
    style={{ imageRendering: 'pixelated', display: 'block' }}
    draggable={false}
  />
);

const FLOOR   = <Tile src={`${SPRITE_DIR}/floor.png`}       alt="floor" />;
const WALL    = <Tile src={`${SPRITE_DIR}/barrier.png`}     alt="wall" />;
const EMPTY   = <div className="w-full h-full bg-black" />;

// Entity assets (rendered on top of floor)
const ENTITY_ASSETS = {
  D: <Tile src={`${SPRITE_DIR}/closeddoor.png`}  alt="door"       contain />,
  O: <Tile src={`${SPRITE_DIR}/opendoor.png`}    alt="open door"  contain />,
  T: <img src={`${SPRITE_DIR}/laptop.png`}        alt="terminal"
          className="w-full h-full object-contain animate-pulse"
          style={{ imageRendering: 'pixelated' }} draggable={false} />,
  S: <img src={`${SPRITE_DIR}/laptop.png`}        alt="bonus terminal"
          className="w-full h-full object-contain animate-pulse"
          style={{ imageRendering: 'pixelated', filter: 'hue-rotate(60deg) drop-shadow(0 0 8px yellow)' }} draggable={false} />,
  C: <Tile src={`${SPRITE_DIR}/closedchest.png`} alt="chest"      contain />,
  K: <Tile src={`${SPRITE_DIR}/openchest.png`}   alt="open chest" contain />,
  B: <Tile src={`${SPRITE_DIR}/closedchest.png`} alt="box"        contain />,
};

/**
 * renderCell — renders a single map cell character
 * @param {string} char - single character from the grid
 * @param {string} direction - player facing direction
 * @param {boolean} isMoving - player animation state
 */
export const renderCell = (char, direction = 'down', isMoving = false) => {
  if (char === '#') return WALL;
  if (char === '.') return FLOOR;

  if (char === 'P') {
    return (
      <div className="w-full h-full relative">
        <div className="absolute inset-0">{FLOOR}</div>
        <div className="absolute inset-0">
          <PlayerSprite direction={direction} isMoving={isMoving} />
        </div>
      </div>
    );
  }

  const entity = ENTITY_ASSETS[char];
  if (!entity) return EMPTY;

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0">{FLOOR}</div>
      <div className="absolute inset-0">{entity}</div>
    </div>
  );
};
