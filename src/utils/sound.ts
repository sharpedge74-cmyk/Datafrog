/**
 * Web Audio API Sound Synthesizer for DataFrog Candy Match Game UI
 * Zero external audio files, instant response, battery friendly.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = true; // default OFF as requested by prompt

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('datafrog_sound_muted');
      this.isMuted = saved !== null ? saved === 'true' : true;
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('datafrog_sound_muted', String(this.isMuted));
    }
    if (!this.isMuted) {
      this.playPop();
    }
    return this.isMuted;
  }

  /**
   * Juicy bubble pop sound
   */
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;

      // Frequency glide 260Hz -> 650Hz
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);

      // Volume envelope
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Cheerful 3-note ascending candy arpeggio chime
   */
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        const startTime = now + idx * 0.07;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Sweet fanfare chord
   */
  public playSweet() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const chord = [440, 554.37, 659.25, 880]; // A major bright chime
      const now = this.ctx.currentTime;

      chord.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.52);
      });
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Soft plop for file drops
   */
  public playDrop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;

      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // AudioContext policy fallback
    }
  }
}

export const sound = new SoundController();
