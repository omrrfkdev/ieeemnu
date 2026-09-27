import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePuzzleEngine } from '../../hooks/usePuzzleEngine';
import { renderCell } from './GameAssets';
import CinematicScreen from './CinematicScreen';
import {
  PixelDialog, PixelCodeBlock, PixelInput, PixelButton, PixelHint
} from './PixelDialog';
import SoftwarePuzzle from './tutorial/SoftwarePuzzle'; // Phase 5 ✓
import ArduinoPuzzle  from './tutorial/ArduinoPuzzle';  // Phase 6 ✓
import Mass3dPuzzle   from './tutorial/Mass3dPuzzle';   // Phase 7 ✓
import SidePuzzle     from './tutorial/SidePuzzle';
import CutsceneItemModal from './tutorial/CutsceneItemModal';
import { audioManager } from '../../game/audioManager';

// lucide-react icons — no more emojis
import {
  Timer, ClipboardList, KeyRound, Monitor, Package,
  Play, RotateCcw, ChevronRight, Trophy, Skull, ShieldCheck,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
} from 'lucide-react';

// ─────────────────────────────────────────────
//  Press Start 2P font import (pixel font)
// ─────────────────────────────────────────────
const PIXEL_FONT = { fontFamily: "'Press Start 2P', monospace" };

const GameRoom = ({ lang = 'en', onReplayTutorial, tutorialMode = false, cutsceneMode = false, onTutorialComplete }) => {
  const {
    grid,
    currentLevel,
    currentLevelName,
    currentLevelShader,
    collectedCodeParts,
    totalPuzzles,
    hasKey,
    timeLeft,
    gameState,
    cinematic,
    direction,
    isMoving,
    playerPos,
    activeChallenge,
    activeChestInteraction,
    activeSideChallenge,
    activeCutsceneItem,
    score,
    lastScoreDelta,
    inventory,
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
  } = usePuzzleEngine({ tutorialMode, cutsceneMode, onTutorialComplete });

  const [challengeInput, setChallengeInput] = useState('');
  const [challengeError, setChallengeError] = useState(false);
  const [chestInput, setChestInput]         = useState('');
  const [chestError, setChestError]         = useState(false);

  // Board scaling for mobile — no scroll
  const containerRef  = useRef(null);
  const [scale, setScale] = useState(1);

  // Swipe handling
  const touchStart = useRef(null);
  
  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    // Threshold to distinguish swipe from tap
    if (Math.max(absDx, absDy) > 30) {
      if (absDx > absDy) {
        movePlayer(dx > 0 ? 1 : -1, 0);
      } else {
        movePlayer(0, dy > 0 ? 1 : -1);
      }
    }
    touchStart.current = null;
  };

  useEffect(() => {
    if (!tutorialMode && gameState === 'idle') {
      // If we aren't in tutorial mode and just loaded, play start
      audioManager.play('start', { forceRestart: true });
    }
  }, [tutorialMode, gameState]);

  useEffect(() => {
    const CELL = 64;
    const update = () => {
      if (!containerRef.current || !grid.length) return;
      const cols = grid[0].length;
      const rows = grid.length;
      const boardW = cols * CELL + 12;
      const boardH = rows * CELL + 12;
      const avW = containerRef.current.clientWidth - 16;
      // Reserve 160px for HUD + D-pad so board takes maximum space
      const avH = window.innerHeight - 160;
      const s = Math.min(1.4, avW / boardW, avH / boardH);
      setScale(Math.max(0.35, s));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [grid]);

  const handleChallengeSubmit = (e) => {
    e.preventDefault();
    audioManager.play('confirm', { forceRestart: true });
    if (submitChallengeAnswer(challengeInput)) {
      setChallengeInput('');
      setChallengeError(false);
    } else {
      setChallengeError(true);
      setTimeout(() => setChallengeError(false), 600);
    }
  };

  const handleChestSubmit = (e) => {
    e.preventDefault();
    audioManager.play('confirm', { forceRestart: true });
    if (submitChestCode(chestInput)) {
      setChestInput('');
      setChestError(false);
    } else {
      setChestError(true);
      setTimeout(() => setChestError(false), 600);
    }
  };

  const timerDanger = timeLeft <= 10;

  return (
    <>
      {/* ── Google Font ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />

      {/* ── Cinematics ── */}
      <AnimatePresence>
        {cinematic && (
          <CinematicScreen type={cinematic} onFinish={onCinematicFinish} />
        )}
      </AnimatePresence>

      {/* ── Main Game Container ── */}
      <div
        className="flex flex-col w-full mx-auto select-none"
        style={{
          maxWidth: '100vw',
          height: '100dvh',
          overflow: 'hidden',
          background: '#090e14',
          touchAction: 'none',
        }}
      >
        {/* ══ HUD ══════════════════════════════════════════════ */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0 gap-4"
          style={{ borderBottom: '2px solid #1e293b', background: '#0d1117' }}
        >
          {/* Level label */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-600" style={{ ...PIXEL_FONT, fontSize: '8px' }}>LEVEL</span>
            <span className="text-white" style={{ ...PIXEL_FONT, fontSize: '14px' }}>
              {currentLevel}
            </span>
          </div>

          {/* Level name — hidden on very small screens */}
          <span
            className="hidden sm:block text-gray-500 truncate"
            style={{ ...PIXEL_FONT, fontSize: '8px' }}
          >
            {currentLevelName}
          </span>

          {/* Timer — hidden in tutorial (∞ timer) */}
          <div className="flex items-center gap-2">
            <Timer size={20} className={tutorialMode ? 'text-purple-400' : timerDanger ? 'text-red-500 animate-pulse' : 'text-cyan-400'} />
            <span
              className={tutorialMode ? 'text-purple-400' : timerDanger ? 'text-red-500 animate-pulse' : 'text-cyan-400'}
              style={{ ...PIXEL_FONT, fontSize: '14px' }}
            >
              {tutorialMode ? '∞' : `${String(timeLeft).padStart(2, '0')}s`}
            </span>
          </div>

          {/* Code fragments or Inventory */}
          {!cutsceneMode ? (
            <div className="flex items-center gap-2">
              <ClipboardList size={20} className="text-green-400" />
              <span className="text-green-400" style={{ ...PIXEL_FONT, fontSize: '14px', letterSpacing: '0.35em' }}>
                {Array.from({ length: totalPuzzles }).map((_, i) =>
                  collectedCodeParts[i] ?? '_'
                ).join('')}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Package size={20} className="text-yellow-400" />
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                    {inventory[i] ? (
                      <img src={inventory[i].image} className="w-full h-full object-cover" alt="item" />
                    ) : (
                      <span style={{ ...PIXEL_FONT, fontSize: '6px', color: '#334155' }}>?</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key */}
          <div className="flex items-center">
            <KeyRound
              size={28}
              className="transition-all duration-500"
              style={{
                color: hasKey ? '#fbbf24' : '#374151',
                filter: hasKey ? 'drop-shadow(0 0 8px rgba(251,191,36,0.9))' : 'none',
              }}
            />
          </div>

          {/* Score */}
          {!tutorialMode && (
            <div className="hidden sm:flex flex-col items-end gap-1 ml-auto border-l-2 border-slate-700 pl-4">
              <span className="text-gray-500" style={{ ...PIXEL_FONT, fontSize: '6px' }}>SCORE</span>
              <span className="text-yellow-400" style={{ ...PIXEL_FONT, fontSize: '14px' }}>
                {score.toString().padStart(4, '0')}
              </span>
            </div>
          )}
        </div>

        {/* ══ GAME BOARD ═══════════════════════════════════════ */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center overflow-hidden touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              // CSS shader effects
              filter: `${currentLevelShader} saturate(1.1)`,
            }}
          >
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 4px)',
                mixBlendMode: 'multiply',
              }}
            />
            {/* Dynamic Spotlight (Fog of War) - Cutscene Only */}
            {cutsceneMode ? (
              <div
                className="absolute inset-0 pointer-events-none z-20 transition-all duration-300 ease-out"
                style={{
                  background: `radial-gradient(circle 300px at ${playerPos.x * 64 + 32}px ${playerPos.y * 64 + 32}px, transparent 15%, rgba(0,0,0,0.95) 100%)`,
                }}
              />
            ) : (
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
                }}
              />
            )}

            {/* Grid */}
            {grid.length > 0 && (
              <div
                className="grid relative"
                style={{
                  gridTemplateColumns: `repeat(${grid[0].length}, 64px)`,
                  border: '3px solid #1e293b',
                }}
              >
                {grid.map((row, y) =>
                  row.map((cell, x) => (
                    <div key={`${x}-${y}`} className="w-[64px] h-[64px]">
                      {renderCell(cell, direction, isMoving)}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Score Float Animation */}
            <AnimatePresence>
              {lastScoreDelta && (
                <motion.div
                  key={lastScoreDelta.id}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -40, scale: 1 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute pointer-events-none z-50 flex justify-center"
                  style={{
                    left: lastScoreDelta.x * 64,
                    top: lastScoreDelta.y * 64,
                    width: 64,
                  }}
                >
                  <span style={{ ...PIXEL_FONT, fontSize: '12px', color: '#fbbf24', textShadow: '2px 2px 0 #000' }}>
                    +{lastScoreDelta.pts}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Side Challenge Modal ── */}
            <AnimatePresence>
              {activeSideChallenge && (
                <SidePuzzle
                  challenge={activeSideChallenge}
                  onSolve={(elapsed) => submitSideChallengeAnswer(activeSideChallenge.answer)}
                  onClose={closeSideChallenge}
                />
              )}
            </AnimatePresence>

            {/* ── Cutscene Item Modal ── */}
            <AnimatePresence>
              {activeCutsceneItem && (
                <CutsceneItemModal
                  item={activeCutsceneItem}
                  onContinue={submitCutsceneItem}
                />
              )}
            </AnimatePresence>

            {/* ── Challenge Modal — routes to custom puzzle or standard dialog ── */}
            {activeChallenge?.type === 'software' ? (
              <SoftwarePuzzle
                challenge={activeChallenge}
                lang={lang}
                onSolve={() => submitChallengeAnswer(activeChallenge.answer)}
                onClose={() => closeChallenge()}
              />
            ) : activeChallenge?.type === 'arduino' ? (
              <ArduinoPuzzle
                challenge={activeChallenge}
                lang={lang}
                onSolve={() => submitChallengeAnswer(activeChallenge.answer)}
                onClose={() => closeChallenge()}
              />
            ) : activeChallenge?.type === 'mass3d' ? (
              <Mass3dPuzzle
                challenge={activeChallenge}
                lang={lang}
                onSolve={() => submitChallengeAnswer(activeChallenge.answer)}
                onClose={() => closeChallenge()}
              />
            ) : (
              // Standard PixelDialog for real game challenges
              <PixelDialog
                isOpen={!!activeChallenge}
                title="TERMINAL ACCESS"
                icon={<Monitor size={14} />}
                badge={activeChallenge?.discipline}
                onClose={() => { closeChallenge(); setChallengeInput(''); }}
                accentColor="green"
              >
                <PixelCodeBlock>{activeChallenge?.question}</PixelCodeBlock>

                {activeChallenge?.failedAttempts >= 3 && (
                  <PixelHint hint={activeChallenge.hint} />
                )}

                <form onSubmit={handleChallengeSubmit} className="flex flex-col gap-3">
                  <PixelInput
                    value={challengeInput}
                    onChange={e => setChallengeInput(e.target.value)}
                    placeholder="enter output..."
                    hasError={challengeError}
                  />
                  <PixelButton type="submit" color={challengeError ? 'red' : 'green'}>
                    ▸ EXECUTE
                  </PixelButton>
                </form>
              </PixelDialog>
            )}

            {/* ── Chest Modal (Pixel Dialog) ── */}
            <PixelDialog
              isOpen={!!activeChestInteraction}
              title="SECURE STORAGE"
              icon={<Package size={14} />}
              onClose={() => { closeChestInteraction(); setChestInput(''); }}
              accentColor="yellow"
            >
              <p className="text-gray-400" style={{ ...PIXEL_FONT, fontSize: '7px', lineHeight: '2' }}>
                Enter the {totalPuzzles}-digit code from the terminals to retrieve the MASTER KEY.
              </p>
              <form onSubmit={handleChestSubmit} className="flex flex-col gap-3 items-center">
                <PixelInput
                  value={chestInput}
                  onChange={e => setChestInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder={'_'.repeat(totalPuzzles)}
                  hasError={chestError}
                  maxLength={totalPuzzles}
                  center
                />
                <PixelButton type="submit" color={chestError ? 'red' : 'yellow'}>
                  ▸ UNLOCK CHEST
                </PixelButton>
              </form>
            </PixelDialog>

            {/* ── Game State Overlays ── */}
            <AnimatePresence>
              {gameState !== 'playing' && !cinematic && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-40"
                  style={{ background: 'rgba(0,0,0,0.92)' }}
                >
                  <div className="flex flex-col items-center gap-5 p-6 text-center">

                    {gameState === 'idle' && cutsceneMode && (
                      <>
                        <ShieldCheck size={56} className="text-cyan-400" />
                        <h2 style={{ ...PIXEL_FONT, fontSize: '18px', color: '#22d3ee', lineHeight: 1.8, textShadow: '0 0 10px rgba(34,211,238,0.5)' }}>
                          PROJECT ENIGMA
                        </h2>
                        <div className="flex flex-col gap-4 text-left max-w-sm mb-2" style={{ ...PIXEL_FONT, fontSize: '8px', color: '#94a3b8', lineHeight: '2.2' }}>
                          <p className="text-white text-center mb-2" style={{ fontSize: '9px' }}>
                            Welcome to the ultimate cyber-physical escape room.
                          </p>
                          <div className="flex gap-2">
                            <span className="text-cyan-400">▸</span>
                            <p>Solve <span className="text-yellow-400">Technical</span> & <span className="text-green-400">Non-Tech</span> puzzles to survive.</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-cyan-400">▸</span>
                            <p>You have <span className="text-red-400">limited time</span> to escape each sector before the system locks down.</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-cyan-400">▸</span>
                            <p>Explore this archive room to learn the basics before your real timer begins.</p>
                          </div>
                        </div>
                        <PixelButton onClick={resetGame} color="cyan">
                          ▸ ENTER ARCHIVES
                        </PixelButton>
                      </>
                    )}

                    {gameState === 'idle' && !cutsceneMode && (
                      <>
                        <Play size={56} className="text-green-400" />
                        <h2 style={{ ...PIXEL_FONT, fontSize: '16px', color: '#00ff9f', lineHeight: 2 }}>
                          ENGINEERING<br />PROTOCOL
                        </h2>
                        <div className="flex flex-col gap-3" style={{ ...PIXEL_FONT, fontSize: '10px', color: '#94a3b8', lineHeight: '2.4' }}>
                          <p>▸ FIND ALL TERMINALS</p>
                          <p>▸ SOLVE EACH PUZZLE</p>
                          <p>▸ UNLOCK THE CHEST</p>
                          <p>▸ ESCAPE THROUGH THE DOOR</p>
                        </div>
                        <PixelButton onClick={resetGame} color="green">
                          ▸ START MISSION
                        </PixelButton>
                        {/* Replay Tutorial — only shown on return visits */}
                        {onReplayTutorial && (
                          <div className="mt-2 w-full max-w-[200px]">
                            <PixelButton onClick={onReplayTutorial} color="cyan">
                              ▸ {lang === 'ar' ? 'إعادة التدريب' : 'REPLAY TUTORIAL'}
                            </PixelButton>
                          </div>
                        )}
                      </>
                    )}

                    {gameState === 'level_complete' && (
                      <>
                        <ShieldCheck size={56} className="text-green-400" />
                        <h2 style={{ ...PIXEL_FONT, fontSize: '16px', color: '#00ff9f' }}>
                          NODE SECURED
                        </h2>
                        <p style={{ ...PIXEL_FONT, fontSize: '10px', color: '#94a3b8' }}>
                          PROCEED TO NEXT SECTOR
                        </p>
                        <PixelButton onClick={nextLevel} color="green">
                          ▸ NEXT LEVEL
                        </PixelButton>
                      </>
                    )}

                    {gameState === 'won' && (
                      <>
                        <Trophy size={56} className="text-yellow-400" />
                        <h2 style={{ ...PIXEL_FONT, fontSize: '16px', color: '#fbbf24' }}>
                          MASTER ENGINEER
                        </h2>
                        <p style={{ ...PIXEL_FONT, fontSize: '10px', color: '#94a3b8' }}>
                          FACILITY SECURED
                        </p>
                        <PixelButton onClick={resetGame} color="yellow">
                          ▸ PLAY AGAIN
                        </PixelButton>
                      </>
                    )}

                    {gameState === 'lost' && (
                      <>
                        <Skull size={56} className="text-red-500" />
                        <h2 style={{ ...PIXEL_FONT, fontSize: '16px', color: '#ef4444' }}>
                          SYSTEM LOCKED
                        </h2>
                        <p style={{ ...PIXEL_FONT, fontSize: '10px', color: '#94a3b8' }}>
                          TIMER EXPIRED — LVL {currentLevel}
                        </p>
                        <div className="flex gap-4">
                          <PixelButton onClick={restartCurrentLevel} color="green">
                            ▸ RETRY
                          </PixelButton>
                          <PixelButton onClick={resetGame} color="red">
                            RESTART
                          </PixelButton>
                        </div>
                      </>
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ══ MOBILE D-PAD ════════════════════════════════════ */}
        <div
          className="shrink-0 flex justify-center items-center py-3"
          style={{ borderTop: '2px solid #1e293b' }}
        >
          {/* Keyboard hint — desktop only */}
          <div className="hidden md:flex gap-3 items-center" style={{ ...PIXEL_FONT, fontSize: '10px', color: '#374151' }}>
            <span>[W][A][S][D]</span>
            <span>or</span>
            <span>[ARROW KEYS]</span>
          </div>

          {/* D-Pad — visible on mobile */}
          <div className="grid gap-2 md:hidden" style={{ gridTemplateRows: 'repeat(3, 68px)', gridTemplateColumns: 'repeat(3, 68px)' }}>
            <div />
            <button
              onPointerDown={() => movePlayer(0, -1)}
              className="flex items-center justify-center rounded-lg active:scale-90 transition-transform"
              style={{ background: '#0d1117', border: '2px solid #1e3a4a', boxShadow: '0 4px 0 #0a2030' }}
            >
              <ArrowUp size={28} className="text-cyan-400" />
            </button>
            <div />
            <button
              onPointerDown={() => movePlayer(-1, 0)}
              className="flex items-center justify-center rounded-lg active:scale-90 transition-transform"
              style={{ background: '#0d1117', border: '2px solid #1e3a4a', boxShadow: '0 4px 0 #0a2030' }}
            >
              <ArrowLeft size={28} className="text-cyan-400" />
            </button>
            <button
              onPointerDown={() => movePlayer(0, 1)}
              className="flex items-center justify-center rounded-lg active:scale-90 transition-transform"
              style={{ background: '#0d1117', border: '2px solid #1e3a4a', boxShadow: '0 4px 0 #0a2030' }}
            >
              <ArrowDown size={28} className="text-cyan-400" />
            </button>
            <button
              onPointerDown={() => movePlayer(1, 0)}
              className="flex items-center justify-center rounded-lg active:scale-90 transition-transform"
              style={{ background: '#0d1117', border: '2px solid #1e3a4a', boxShadow: '0 4px 0 #0a2030' }}
            >
              <ArrowRight size={28} className="text-cyan-400" />
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default GameRoom;
