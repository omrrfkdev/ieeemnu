import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameRoom from '../components/game/GameRoom';
import TutorialFlow from '../components/game/TutorialFlow';
import { useTutorial } from '../hooks/useTutorial';

/**
 * MiniGame — the page that hosts the game.
 *
 * Logic:
 *   • On FIRST visit  → TutorialFlow is shown (mandatory, full-screen, no dismiss)
 *   • On RETURN visit → GameRoom loads directly (tutorial already done)
 *
 * The page header (title + description) is hidden during the tutorial so the
 * full-screen tutorial overlay fills the viewport cleanly.
 */
const MiniGame = () => {
  const { isTutorialDone, markTutorialDone, lang, setLang } = useTutorial();
  // showReplay: player chose to replay tutorial from the idle screen
  const [showReplay, setShowReplay] = useState(false);

  // Show tutorial if: first visit OR player pressed replay
  const showTutorial = !isTutorialDone || showReplay;

  const handleTutorialComplete = () => {
    if (!isTutorialDone) markTutorialDone(); // only write localStorage on first completion
    setShowReplay(false);
  };

  return (
    <>
      {/* ── Google Pixel Font (shared with GameRoom) ─────────────── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />

      {/* ── Tutorial Flow (first visit mandatory, or replay) ──────── */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            key="tutorial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[150]"
          >
            <TutorialFlow
              lang={lang}
              setLang={setLang}
              onComplete={handleTutorialComplete}
              isReplay={showReplay}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Real Game (shown once tutorial is done) ──────────────── */}
      {isTutorialDone && !showReplay && (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Escape the Server Room
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A retro pixel art mini-game. Navigate the grid, collect all the Data Keys,
                and reach the exit node before the firewall locks you out!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Pass lang so the game can display AR/EN UI if needed later */}
              <GameRoom lang={lang} onReplayTutorial={() => setShowReplay(true)} />
            </motion.div>

          </div>
        </div>
      )}


    </>
  );
};

export default MiniGame;
