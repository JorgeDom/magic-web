// The optional "ting" on the logo sparkle. Synthesised, so nothing is downloaded, and only ever
// started from a click on the sound control. No approved brand sound exists yet; when one does,
// replace this with a decoded audio buffer and keep the same function signature.

let context: AudioContext | null = null;

/** Must be called from a user gesture. Returns null where Web Audio is unavailable. */
export function unlockAudio(): AudioContext | null {
  if (typeof AudioContext === "undefined") return null;
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

export function playTing(delaySeconds = 0): void {
  if (!context) return;
  const start = context.currentTime + delaySeconds;
  const partials: ReadonlyArray<readonly [frequency: number, level: number]> = [
    [2093, 0.11],
    [3136, 0.05],
    [4186, 0.025],
  ];
  for (const [frequency, level] of partials) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.9);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.95);
  }
}
