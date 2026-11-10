// Synthesized Audio & Latin American Spanish Voiceover Engine for Jabalí 21

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isCrackling = false;
    this.crackleNodes = [];
    this.currentUtterance = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a cinematic low boom / impact sound
  playCinematicImpact() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Start or toggle realistic grill & embers crackling sound
  toggleGrillSizzle(shouldPlay) {
    try {
      this.initContext();
      if (!this.ctx) return;

      if (!shouldPlay || this.isCrackling) {
        this.stopGrillSizzle();
        if (!shouldPlay) return;
      }

      this.isCrackling = true;
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Pink noise + random pops simulation
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        let pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        
        // Random ember sparks / crackle impulses
        if (Math.random() < 0.003) {
          pink += (Math.random() - 0.5) * 4;
        }

        output[i] = pink * 0.11;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      whiteNoise.start(0);
      this.crackleNodes = [whiteNoise, filter, gainNode];
    } catch (e) {
      console.warn("Sizzle audio error:", e);
    }
  }

  stopGrillSizzle() {
    try {
      this.crackleNodes.forEach(node => {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      });
      this.crackleNodes = [];
      this.isCrackling = false;
    } catch (e) {
      console.warn("Stop sizzle error:", e);
    }
  }

  // Latin American Spanish Voiceover TTS engine
  speakLatinAmericanSpanish(text, onStart, onEnd) {
    if (!('speechSynthesis' in window)) {
      alert("Tu navegador no soporta síntesis de voz (Web Speech API).");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Prefer Latin American Spanish voices (Mexico, Latin America, Colombia, etc.)
    const latamVoice = voices.find(v => 
      v.lang.includes('es-MX') || 
      v.lang.includes('es-419') || 
      v.lang.includes('es-US') || 
      v.lang.includes('es-CO') ||
      v.lang.includes('es-AR')
    ) || voices.find(v => v.lang.startsWith('es'));

    if (latamVoice) {
      utterance.voice = latamVoice;
    }

    utterance.lang = latamVoice ? latamVoice.lang : 'es-MX';
    utterance.rate = 0.95; // Slightly slower, cinematic cadence
    utterance.pitch = 0.88; // Warm, deep, masculine/radiophonic rustic tone

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  stopVoiceover() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEngine = new SoundEngine();
