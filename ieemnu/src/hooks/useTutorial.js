/**
 * useTutorial — manages tutorial state via localStorage
 *
 * localStorage keys:
 *   'ieee_tutorial_done'  → 'true' when tutorial has been completed
 *   'ieee_tutorial_lang'  → 'en' | 'ar' (player's chosen language)
 *
 * Returns:
 *   isTutorialDone    {boolean}  — true if the player has already done the tutorial
 *   markTutorialDone  {fn}       — call this when the tutorial is finished
 *   lang              {string}   — 'en' | 'ar'
 *   setLang           {fn}       — updates lang in state AND localStorage
 */

import { useState, useCallback } from 'react';

const STORAGE_KEY_DONE = 'ieee_tutorial_done';
const STORAGE_KEY_LANG = 'ieee_tutorial_lang';

export function useTutorial() {
  // Read initial values synchronously from localStorage (runs once on mount)
  const [isTutorialDone, setIsTutorialDone] = useState(
    () => localStorage.getItem(STORAGE_KEY_DONE) === 'true'
  );

  const [lang, setLangState] = useState(
    () => localStorage.getItem(STORAGE_KEY_LANG) || 'en'
  );

  /**
   * setLang — update the chosen language in both state and localStorage
   * @param {'en'|'ar'} l
   */
  const setLang = useCallback((l) => {
    localStorage.setItem(STORAGE_KEY_LANG, l);
    setLangState(l);
  }, []);

  /**
   * markTutorialDone — called when the player finishes all tutorial rooms.
   * Writes the 'done' flag to localStorage so future visits skip the tutorial.
   */
  const markTutorialDone = useCallback(() => {
    localStorage.setItem(STORAGE_KEY_DONE, 'true');
    setIsTutorialDone(true);
  }, []);

  /**
   * resetTutorial — DEV ONLY helper to clear the tutorial flag.
   * Call this from the browser console: window.__resetTutorial?.()
   */
  const resetTutorial = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_DONE);
    localStorage.removeItem(STORAGE_KEY_LANG);
    setIsTutorialDone(false);
    setLangState('en');
    window.location.reload();
  }, []);

  // Expose the dev helper globally so it's easy to test
  if (typeof window !== 'undefined') {
    window.__resetTutorial = resetTutorial;
  }

  return {
    isTutorialDone,
    markTutorialDone,
    lang,
    setLang,
  };
}
