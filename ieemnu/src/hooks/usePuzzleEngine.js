import { useState, useEffect, useCallback, useRef } from 'react';
import {
  MAPS, TUTORIAL_MAPS, TUTORIAL_CHALLENGES, TUTORIAL_CUTSCENE_MAP, CUTSCENE_ITEMS,
  SOFTWARE_CHALLENGES, HARDWARE_CHALLENGES, MECHANICAL_CHALLENGES,
  SIDE_CHALLENGES,
} from '../game/gameConfig';
import { audioManager } from '../game/audioManager';

// ── helpers ──────────────────────────────────────────────────────
const generateCode = (length) => {
  let code = '';
  for (let i = 0; i < length; i++) code += Math.floor(Math.random() * 10).toString();
  return code;
};

const parseLayout = (layout) => layout.map(row => row.split(''));

/** Pick a random element from an array without mutating it. */
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Build the main challenge pool for a real-game level.
 * Filters SOFTWARE + HARDWARE + MECHANICAL by the level's difficulty.
 */
const buildPool = (difficulty) => {
  const all = [...SOFTWARE_CHALLENGES, ...HARDWARE_CHALLENGES, ...MECHANICAL_CHALLENGES];
  return all.filter(c => c.difficulty === difficulty);
};

// ── SCORE CONSTANTS ───────────────────────────────────────────────
export const SCORE_MAIN_FIRST  = 150;
export const SCORE_MAIN_SECOND = 100;
export const SCORE_MAIN_LATER  = 50;
export const SCORE_SIDE        = 50;
export const SCORE_SIDE_SPEED  = 25;   // extra if side puzzle solved in <5s

export const usePuzzleEngine = ({ tutorialMode = false, cutsceneMode = false, onTutorialComplete } = {}) => {
  const MAP_SET = cutsceneMode ? [TUTORIAL_CUTSCENE_MAP] : tutorialMode ? TUTORIAL_MAPS : MAPS;

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [grid, setGrid]           = useState(() => parseLayout(MAP_SET[0].layout));
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [direction, setDirection] = useState('down');
  const [isMoving, setIsMoving]   = useState(false);
  const [timeLeft, setTimeLeft]   = useState(MAP_SET[0].timeLimit);

  // game states: idle | playing | level_complete | won | lost
  const [gameState, setGameState] = useState('idle');

  // Cinematic states: null | 'intro' | 'transition' | 'win'
  const [cinematic, setCinematic] = useState('intro');

  // Level logic
  const [levelCode, setLevelCode]                   = useState('');
  const [collectedCodeParts, setCollectedCodeParts] = useState([]);
  const [hasKey, setHasKey]                         = useState(false);

  // Active modals
  const [activeChallenge, setActiveChallenge]               = useState(null);
  const [activeChestInteraction, setActiveChestInteraction] = useState(null);
  const [activeSideChallenge, setActiveSideChallenge]       = useState(null);
  const [activeCutsceneItem, setActiveCutsceneItem]         = useState(null);

  // Score & Inventory system
  const [score, setScore]           = useState(0);
  const [lastScoreDelta, setLastScoreDelta] = useState(null); // { pts, x, y } for float anim
  const [inventory, setInventory]   = useState([]); // Collected cutscene items

  // Challenge pools
  const [availableChallenges, setAvailableChallenges] = useState(
    tutorialMode ? [...TUTORIAL_CHALLENGES] : buildPool(MAP_SET[0].difficulty ?? 'easy')
  );
  const [availableSideChallenges, setAvailableSideChallenges] = useState([...SIDE_CHALLENGES]);

  // Used S-tile coordinates (to mark them solved without changing grid char on re-entry)
  const [usedSideTiles, setUsedSideTiles] = useState(new Set());

  const movingTimeout = useRef(null);

  // ── LOAD LEVEL ───────────────────────────────────────────────
  const loadLevel = useCallback((levelIndex) => {
    const levelData = MAP_SET[levelIndex];
    const newGrid   = parseLayout(levelData.layout);
    let startX = 1, startY = 1;
    newGrid.forEach((row, y) => row.forEach((cell, x) => {
      if (cell === 'P') { startX = x; startY = y; }
    }));

    setCurrentLevelIndex(levelIndex);
    setGrid(newGrid);
    setPlayerPos({ x: startX, y: startY });
    setTimeLeft(levelData.timeLimit);
    setGameState('playing');
    setActiveChallenge(null);
    setActiveChestInteraction(null);
    setActiveSideChallenge(null);
    setActiveCutsceneItem(null);
    setLevelCode(generateCode(levelData.totalPuzzles));
    setCollectedCodeParts([]);
    setHasKey(false);
    setDirection('down');
    setIsMoving(false);
    setUsedSideTiles(new Set());

    if (!tutorialMode) {
      const diff = levelData.difficulty ?? 'easy';
      setAvailableChallenges(buildPool(diff));
      setAvailableSideChallenges([...SIDE_CHALLENGES]);
    }
  }, [MAP_SET, tutorialMode]);

  const resetGame = useCallback(() => {
    setScore(0);
    setLastScoreDelta(null);
    loadLevel(0);
  }, [loadLevel]);

  const restartCurrentLevel = useCallback(() => {
    loadLevel(currentLevelIndex);
  }, [currentLevelIndex, loadLevel]);

  const nextLevel = () => {
    if (currentLevelIndex + 1 < MAP_SET.length) {
      setCinematic('transition');
    } else {
      setCinematic('win');
    }
  };

  const onCinematicFinish = () => {
    if (cinematic === 'intro') {
      setCinematic(null);
    } else if (cinematic === 'transition') {
      setCinematic(null);
      loadLevel(currentLevelIndex + 1);
    } else if (cinematic === 'win') {
      setCinematic(null);
      setScore(0);
      loadLevel(0);
      setGameState('idle');
    }
  };

  // ── TIMER ────────────────────────────────────────────────────
  useEffect(() => {
    if (tutorialMode) return;
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 4) audioManager.play('countdown');
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('lost');
      audioManager.play('gameover');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, tutorialMode]);

  // ── ADD SCORE HELPER ─────────────────────────────────────────
  const addScore = useCallback((pts, tileX, tileY) => {
    setScore(prev => prev + pts);
    setLastScoreDelta({ pts, x: tileX, y: tileY, id: Date.now() });
    setTimeout(() => setLastScoreDelta(null), 1500);
  }, []);

  // ── MOVE PLAYER ──────────────────────────────────────────────
  const movePlayer = useCallback((dx, dy) => {
    if (
      gameState !== 'playing' ||
      activeChallenge ||
      activeChestInteraction ||
      activeSideChallenge
    ) return;

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    if (newY < 0 || newY >= grid.length || newX < 0 || newX >= grid[0].length) return;

    const targetCell = grid[newY][newX];
    if (targetCell === '#') {
      if (dy === -1) setDirection('up');
      else if (dy === 1) setDirection('down');
      else if (dx === -1) setDirection('left');
      else if (dx === 1) setDirection('right');
      return;
    }

    if (dy === -1) setDirection('up');
    else if (dy === 1) setDirection('down');
    else if (dx === -1) setDirection('left');
    else if (dx === 1) setDirection('right');

    setIsMoving(true);
    clearTimeout(movingTimeout.current);
    movingTimeout.current = setTimeout(() => setIsMoving(false), 350);

    // ── DOOR ──────────────────────────────────────────────────
    if (targetCell === 'D') {
      if (hasKey) {
        const newGrid = grid.map(row => [...row]);
        newGrid[newY][newX] = 'O';
        setGrid(newGrid);
        setTimeout(() => {
          if (currentLevelIndex === MAP_SET.length - 1) {
            if ((tutorialMode || cutsceneMode) && onTutorialComplete) {
              onTutorialComplete();
            } else {
              // Time bonus
              addScore(Math.max(0, timeLeft), newX, newY);
              setGameState('won');
              setCinematic('win');
            }
          } else {
            addScore(Math.max(0, timeLeft), newX, newY);
            setGameState('level_complete');
          }
        }, 400);
      }
      return;
    }

    // ── MAIN TERMINAL ─────────────────────────────────────────
    if (targetCell === 'T') {
      if (availableChallenges.length > 0) {
        if (tutorialMode) {
          const roomType = MAP_SET[currentLevelIndex].tutorialPuzzleType;
          const challenge = TUTORIAL_CHALLENGES.find(c => c.type === roomType) || availableChallenges[0];
          setActiveChallenge({ ...challenge, x: newX, y: newY, originalIndex: 0, failedAttempts: 0 });
        } else {
          const idx = Math.floor(Math.random() * availableChallenges.length);
          setActiveChallenge({ ...availableChallenges[idx], x: newX, y: newY, originalIndex: idx, failedAttempts: 0 });
        }
      }
      return;
    }

    // ── SIDE TERMINAL ─────────────────────────────────────────
    if (targetCell === 'S') {
      const tileKey = `${newX},${newY}`;
      if (!usedSideTiles.has(tileKey) && availableSideChallenges.length > 0) {
        const idx = Math.floor(Math.random() * availableSideChallenges.length);
        setActiveSideChallenge({
          ...availableSideChallenges[idx],
          x: newX, y: newY,
          originalIndex: idx,
          startTime: Date.now(),
        });
        return;
      }
      
      // If it's already used or no challenges left, treat it as floor
      const newGrid = grid.map(row => [...row]);
      newGrid[playerPos.y][playerPos.x] = '.';
      newGrid[newY][newX] = 'P';
      setGrid(newGrid);
      setPlayerPos({ x: newX, y: newY });
      return;
    }

    // ── BOX (CUTSCENE ITEM) ──────────────────────────────────
    if (targetCell === 'B') {
      const tileKey = `${newX},${newY}`;
      if (!usedSideTiles.has(tileKey)) {
        // Pick sequentially
        const itemIndex = inventory.length % CUTSCENE_ITEMS.length;
        setActiveCutsceneItem({
          ...CUTSCENE_ITEMS[itemIndex],
          x: newX,
          y: newY,
        });
      } else {
        // If already used, treat as floor
        const newGrid = grid.map(row => [...row]);
        newGrid[playerPos.y][playerPos.x] = '.';
        newGrid[newY][newX] = 'P';
        setGrid(newGrid);
        setPlayerPos({ x: newX, y: newY });
      }
      return;
    }

    // ── CHEST ────────────────────────────────────────────────
    if (targetCell === 'C') {
      setActiveChestInteraction({ x: newX, y: newY });
      return;
    }

    // ── NORMAL MOVE ──────────────────────────────────────────
    const newGrid = grid.map(row => [...row]);
    newGrid[playerPos.y][playerPos.x] = '.';
    newGrid[newY][newX] = 'P';
    setGrid(newGrid);
    setPlayerPos({ x: newX, y: newY });

  }, [
    playerPos, grid, gameState,
    activeChallenge, activeChestInteraction, activeSideChallenge,
    hasKey, availableChallenges, availableSideChallenges,
    currentLevelIndex, MAP_SET, tutorialMode,
    onTutorialComplete, usedSideTiles, timeLeft, addScore,
  ]);

  // ── SUBMIT MAIN CHALLENGE ─────────────────────────────────────
  const submitChallengeAnswer = useCallback((userAnswer) => {
    if (!activeChallenge) return false;

    if (userAnswer.trim().toLowerCase() === activeChallenge.answer.toLowerCase()) {
      const codeDigit = levelCode[collectedCodeParts.length] || '0';
      setCollectedCodeParts(prev => [...prev, codeDigit]);

      const newGrid = grid.map(row => [...row]);
      newGrid[playerPos.y][playerPos.x] = '.';
      newGrid[activeChallenge.y][activeChallenge.x] = 'P';
      setGrid(newGrid);
      setPlayerPos({ x: activeChallenge.x, y: activeChallenge.y });

      const newAvail = [...availableChallenges];
      newAvail.splice(activeChallenge.originalIndex, 1);
      setAvailableChallenges(newAvail);

      // Score by attempt count
      const attempts = (activeChallenge.failedAttempts ?? 0);
      const pts = attempts === 0 ? SCORE_MAIN_FIRST : attempts === 1 ? SCORE_MAIN_SECOND : SCORE_MAIN_LATER;
      addScore(pts, activeChallenge.x, activeChallenge.y);

      setActiveChallenge(null);
      audioManager.play('puzzlecorrectsolve');
      return true;
    } else {
      setActiveChallenge(prev => ({ ...prev, failedAttempts: (prev.failedAttempts ?? 0) + 1 }));
      return false;
    }
  }, [activeChallenge, levelCode, collectedCodeParts, grid, playerPos, availableChallenges, addScore]);

  // ── SUBMIT SIDE CHALLENGE ─────────────────────────────────────
  const submitSideChallengeAnswer = useCallback((userAnswer) => {
    if (!activeSideChallenge) return false;

    if (userAnswer.trim().toLowerCase() === activeSideChallenge.answer.toLowerCase()) {
      const elapsed = (Date.now() - activeSideChallenge.startTime) / 1000;
      const speedBonus = elapsed < 5 ? SCORE_SIDE_SPEED : 0;
      addScore(SCORE_SIDE + speedBonus, activeSideChallenge.x, activeSideChallenge.y);

      // Move player onto the tile
      const newGrid = grid.map(row => [...row]);
      newGrid[playerPos.y][playerPos.x] = '.';
      newGrid[activeSideChallenge.y][activeSideChallenge.x] = 'P';
      setGrid(newGrid);
      setPlayerPos({ x: activeSideChallenge.x, y: activeSideChallenge.y });

      // Mark tile as used
      const tileKey = `${activeSideChallenge.x},${activeSideChallenge.y}`;
      setUsedSideTiles(prev => new Set([...prev, tileKey]));

      // Remove from side pool
      const newPool = [...availableSideChallenges];
      newPool.splice(activeSideChallenge.originalIndex, 1);
      setAvailableSideChallenges(newPool);

      setActiveSideChallenge(null);
      audioManager.play('puzzlecorrectsolve');
      return true;
    }
    return false;
  }, [activeSideChallenge, availableSideChallenges, addScore]);

  // ── SUBMIT CHEST CODE ─────────────────────────────────────────
  const submitChestCode = useCallback((userInput) => {
    if (!activeChestInteraction) return false;
    if (userInput.trim() === levelCode) {
      setHasKey(true);
      const newGrid = grid.map(row => [...row]);
      newGrid[activeChestInteraction.y][activeChestInteraction.x] = 'K';
      setGrid(newGrid);
      setActiveChestInteraction(null);
      audioManager.play('puzzlecorrectsolve');
      return true;
    }
    return false;
  }, [activeChestInteraction, levelCode, grid]);

  // ── SUBMIT CUTSCENE ITEM ──────────────────────────────────────
  const submitCutsceneItem = useCallback(() => {
    if (!activeCutsceneItem) return;
    
    setInventory(prev => {
      const newInv = [...prev, activeCutsceneItem];
      // If all items collected, grant key
      if (newInv.length >= CUTSCENE_ITEMS.length) {
        setHasKey(true);
      }
      return newInv;
    });
    
    const tileKey = `${activeCutsceneItem.x},${activeCutsceneItem.y}`;
    setUsedSideTiles(prev => new Set([...prev, tileKey]));

    const newGrid = grid.map(row => [...row]);
    newGrid[playerPos.y][playerPos.x] = '.';
    newGrid[activeCutsceneItem.y][activeCutsceneItem.x] = 'P';
    setGrid(newGrid);
    setPlayerPos({ x: activeCutsceneItem.x, y: activeCutsceneItem.y });

    setActiveCutsceneItem(null);
    audioManager.play('puzzlecorrectsolve');
  }, [activeCutsceneItem, grid, playerPos]);

  const closeChallenge = () => setActiveChallenge(null);
  const closeChestInteraction = () => setActiveChestInteraction(null);
  const closeSideChallenge = useCallback(() => {
    // Mark tile used even on timeout/close (so it doesn't re-trigger)
    if (activeSideChallenge) {
      const tileKey = `${activeSideChallenge.x},${activeSideChallenge.y}`;
      setUsedSideTiles(prev => new Set([...prev, tileKey]));
      
      // Clear it from the grid so it stops acting like a wall
      setGrid(prev => {
        const newGrid = prev.map(row => [...row]);
        newGrid[activeSideChallenge.y][activeSideChallenge.x] = '.';
        return newGrid;
      });
    }
    setActiveSideChallenge(null);
  }, [activeSideChallenge]);

  // ── KEYBOARD CONTROLS ─────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key) && gameState === 'playing') {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp':    case 'w': case 'W': movePlayer(0, -1); break;
        case 'ArrowDown':  case 's': case 'S': movePlayer(0,  1); break;
        case 'ArrowLeft':  case 'a': case 'A': movePlayer(-1, 0); break;
        case 'ArrowRight': case 'd': case 'D': movePlayer(1,  0); break;
        case 'Escape':
          if (activeChallenge) closeChallenge();
          if (activeChestInteraction) closeChestInteraction();
          if (activeSideChallenge) closeSideChallenge();
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, gameState, activeChallenge, activeChestInteraction, activeSideChallenge, closeSideChallenge]);

  return {
    grid,
    currentLevel: currentLevelIndex + 1,
    currentLevelName: MAP_SET[currentLevelIndex]?.name ?? '',
    currentLevelShader: MAP_SET[currentLevelIndex]?.shaderTint ?? '',
    currentLevelDifficulty: MAP_SET[currentLevelIndex]?.difficulty ?? '',
    collectedCodeParts,
    totalPuzzles: MAP_SET[currentLevelIndex]?.totalPuzzles ?? 1,
    hasKey,
    timeLeft,
    gameState,
    cinematic,
    direction,
    isMoving,
    playerPos,
    activeCutsceneItem,
    inventory,
    score,
    lastScoreDelta,
    activeChallenge,
    activeChestInteraction,
    activeSideChallenge,
    resetGame,
    restartCurrentLevel,
    nextLevel,
    onCinematicFinish,
    movePlayer,
    submitChallengeAnswer,
    submitSideChallengeAnswer,
    submitChestCode,
    submitCutsceneItem,
    closeChallenge,
    closeChestInteraction,
    closeSideChallenge,
  };
};
