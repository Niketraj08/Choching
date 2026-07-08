/**
 * Sound effect utilities using the Web Audio API.
 * No external asset file downloads are required.
 */

export function playSuccessSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;

    // We'll play an elegant major chord arpeggio for immediate positive reinforcement
    // C5 (523.25 Hz) -> E5 (659.25 Hz) -> G5 (783.99 Hz) -> C6 (1046.50 Hz)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft triangle wave for a retro, friendly, warm tone
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);

      // Volume envelope to avoid popping and decay nicely
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  } catch (error) {
    console.warn("Web Audio API was blocked or not supported:", error);
  }
}

export function playFailureSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;

    // A gentle downward chime for lower scores
    const notes = [523.25, 392.00];
    
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  } catch (error) {
    console.warn("Web Audio API was blocked or not supported:", error);
  }
}
