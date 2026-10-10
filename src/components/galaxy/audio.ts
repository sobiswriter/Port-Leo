export class CosmicAudioSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;
  private music: HTMLAudioElement | null = null;
  private wantsMusic = true;
  private musicReady = false;
  private listeners = new Set<(muted: boolean) => void>();

  public init(): void {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
    } catch {
      // AudioContext not supported or blocked
    }
  }

  public prepareBackgroundMusic(): void {
    if (this.music) return;
    this.music = new Audio(new URL('audio/organ-variation.mp3', document.baseURI).href);
    this.music.preload = 'auto';
    this.music.loop = true;
    this.music.volume = 0.32;
    this.music.hidden = true;
    this.music.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.music);
    this.music.addEventListener('playing', () => this.publishMuted(false));
    this.music.addEventListener('pause', () => this.publishMuted(true));
    this.music.addEventListener('error', () => this.publishMuted(true));
  }

  private publishMuted(muted: boolean): void {
    this.isMuted = muted;
    this.listeners.forEach(listener => listener(muted));
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isMuted);
    return () => { this.listeners.delete(listener); };
  }

  private attemptMusic = (): void => {
    if (!this.musicReady || !this.wantsMusic || !this.music) return;
    // A rejected autoplay stays quiet until a real user gesture permits playback.
    void this.music.play().catch(() => {});
  };

  private unlockAudio = (event?: Event): void => {
    if (event?.target instanceof Element && event.target.closest('[data-sound-control]')) return;
    if (!this.musicReady || !this.wantsMusic) return;
    this.init();
    if (this.ctx?.state === 'suspended') void this.ctx.resume().catch(() => {});
    if (this.music?.paused) this.attemptMusic();
  };

  public startBackgroundMusic(): void {
    this.prepareBackgroundMusic();
    this.musicReady = true;
    window.addEventListener('pointerdown', this.unlockAudio);
    window.addEventListener('touchend', this.unlockAudio, { passive: true });
    window.addEventListener('keydown', this.unlockAudio);
    this.attemptMusic();
  }

  public stopBackgroundMusic(): void {
    this.musicReady = false;
    this.music?.pause();
    window.removeEventListener('pointerdown', this.unlockAudio);
    window.removeEventListener('touchend', this.unlockAudio);
    window.removeEventListener('keydown', this.unlockAudio);
  }

  public toggleMute(): boolean {
    this.wantsMusic = this.isMuted;
    if (this.wantsMusic) {
      this.unlockAudio();
    } else {
      this.music?.pause();
      this.publishMuted(true);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playHoverChime(colorHex?: string): void {
    if (this.isMuted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Slightly vary pitch based on color hash
      let baseFreq = 520;
      if (colorHex) {
        baseFreq = 440 + (parseInt(colorHex.replace('#', '').slice(0, 2), 16) % 300);
      }

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.18);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Audio play suppressed
    }
  }

  public playTravelWhoosh(): void {
    if (this.isMuted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.2);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 1.2);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.6);
    } catch {
      // Audio play suppressed
    }
  }
}

export const cosmicAudio = new CosmicAudioSystem();
