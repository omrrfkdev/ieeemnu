class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = true; // Global toggle if we want to add a mute button later
    this.basePath = '/sfx/';

    const sfxList = [
      { name: 'confirm', volume: 0.6 },
      { name: 'countdown', volume: 0.7 },
      { name: 'dialog', volume: 0.4, loop: true },
      { name: 'footstepunused', volume: 0.3 }, // Will handle custom loop via throttling
      { name: 'gameover', volume: 0.8 },
      { name: 'puzzlecorrectsolve', volume: 0.7 },
      { name: 'start', volume: 0.8 },
    ];

    if (typeof window !== 'undefined') {
      sfxList.forEach(sfx => {
        const audio = new Audio(`${this.basePath}${sfx.name}.mp3`);
        audio.volume = sfx.volume;
        if (sfx.loop) audio.loop = true;
        this.sounds[sfx.name] = audio;
      });
    }

    // Special logic for footstep throttling
    this.lastFootstepTime = 0;
  }

  play(name, options = {}) {
    if (!this.enabled || !this.sounds[name]) return;
    
    try {
      const audio = this.sounds[name];
      
      // If forceRestart is true, reset to 0 even if playing
      if (options.forceRestart || audio.paused) {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.warn(`Audio play failed for ${name}:`, e);
          });
        }
      }
    } catch (e) {
      console.warn(`Error playing ${name}`, e);
    }
  }

  stop(name) {
    if (!this.sounds[name]) return;
    try {
      const audio = this.sounds[name];
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
  }

  // Called continuously while player moves. Throttles to match step animation.
  playFootstep() {
    if (!this.enabled || !this.sounds['footstepunused']) return;
    
    const now = performance.now();
    // Assuming a step every ~350ms based on pixel art walk cycle
    if (now - this.lastFootstepTime > 350) {
      this.lastFootstepTime = now;
      this.sounds['footstepunused'].currentTime = 0;
      this.sounds['footstepunused'].play().catch(e => {});
    }
  }
}

export const audioManager = new AudioManager();
