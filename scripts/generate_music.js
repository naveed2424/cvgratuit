import fs from 'fs';
import { execSync } from 'child_process';

const sampleRate = 44100;
const duration = 78.26; // Exactly 30 bars at 92 BPM (> 70 seconds)
const totalSamples = Math.floor(sampleRate * duration);

const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);

const bpm = 92.0;
const beatSec = 60.0 / bpm;
const barSec = beatSec * 4.0;

const NOTE_FREQS = {
  'C1': 32.70, 'D1': 36.71, 'E1': 41.20, 'F1': 43.65, 'G1': 49.00, 'A1': 55.00, 'B1': 61.74,
  'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98
};

function addPiano(pitch, startSec, noteDur, vel = 0.5, pan = 0.0) {
  const f0 = NOTE_FREQS[pitch] || 440.0;
  const startSamp = Math.floor(startSec * sampleRate);
  const noteSamps = Math.floor(noteDur * sampleRate);
  const endSamp = Math.min(totalSamples, startSamp + noteSamps);
  const lMult = Math.cos((pan + 1.0) * Math.PI / 4.0);
  const rMult = Math.sin((pan + 1.0) * Math.PI / 4.0);

  const harmonics = [
    [1.0, 1.0, 1.4],
    [2.0, 0.45, 1.2],
    [3.0, 0.22, 0.9],
    [4.0, 0.12, 0.7],
    [5.0, 0.06, 0.5],
    [6.0, 0.03, 0.4]
  ];

  for (let s = startSamp; s < endSamp; s++) {
    const t = (s - startSamp) / sampleRate;
    const attack = Math.min(1.0, t / 0.008);
    let sig = 0.0;
    for (const [hNum, hAmp, decayRate] of harmonics) {
      sig += hAmp * Math.sin(2.0 * Math.PI * (f0 * hNum) * t) * Math.exp(-t * (decayRate + 0.3));
    }
    const amp = vel * attack * sig * 0.15;
    left[s] += amp * lMult;
    right[s] += amp * rMult;
  }
}

function addPad(pitch, startSec, padDur, vel = 0.22, pan = 0.0) {
  const f0 = NOTE_FREQS[pitch] || 440.0;
  const startSamp = Math.floor(startSec * sampleRate);
  const noteSamps = Math.floor(padDur * sampleRate);
  const endSamp = Math.min(totalSamples, startSamp + noteSamps);
  const lMult = Math.cos((pan + 1.0) * Math.PI / 4.0);
  const rMult = Math.sin((pan + 1.0) * Math.PI / 4.0);

  const attackSec = 0.35;
  const releaseSec = 0.45;

  for (let s = startSamp; s < endSamp; s++) {
    const t = (s - startSamp) / sampleRate;
    const tRem = (endSamp - s) / sampleRate;
    const env = Math.min(1.0, t / attackSec) * Math.min(1.0, tRem / releaseSec);
    const sig = Math.sin(2.0 * Math.PI * f0 * t) +
                0.7 * Math.sin(2.0 * Math.PI * (f0 * 1.002) * t) +
                0.3 * Math.sin(2.0 * Math.PI * (f0 * 2.0) * t);
    const amp = vel * env * sig * 0.11;
    left[s] += amp * lMult;
    right[s] += amp * rMult;
  }
}

function addBell(pitch, startSec, vel = 0.2, pan = 0.0) {
  const f0 = NOTE_FREQS[pitch] || 880.0;
  const startSamp = Math.floor(startSec * sampleRate);
  const noteSamps = Math.floor(2.5 * sampleRate);
  const endSamp = Math.min(totalSamples, startSamp + noteSamps);
  const lMult = Math.cos((pan + 1.0) * Math.PI / 4.0);
  const rMult = Math.sin((pan + 1.0) * Math.PI / 4.0);

  for (let s = startSamp; s < endSamp; s++) {
    const t = (s - startSamp) / sampleRate;
    const decay = Math.exp(-t * 2.7);
    const sig = Math.sin(2.0 * Math.PI * f0 * t) +
                0.5 * Math.sin(2.0 * Math.PI * f0 * 2.756 * t) +
                0.25 * Math.sin(2.0 * Math.PI * f0 * 5.404 * t);
    const amp = vel * decay * sig * 0.12;
    left[s] += amp * lMult;
    right[s] += amp * rMult;
  }
}

function addKick(startSec, vel = 0.42) {
  const startSamp = Math.floor(startSec * sampleRate);
  const kickSamps = Math.floor(0.22 * sampleRate);
  const endSamp = Math.min(totalSamples, startSamp + kickSamps);
  for (let s = startSamp; s < endSamp; s++) {
    const t = (s - startSamp) / sampleRate;
    const freq = 48.0 + 64.0 * Math.exp(-t * 32.0);
    const phase = 2.0 * Math.PI * (48.0 * t - (64.0 / 32.0) * Math.exp(-t * 32.0));
    const env = Math.exp(-t * 14.0);
    const amp = vel * env * Math.sin(phase) * 0.35;
    left[s] += amp;
    right[s] += amp;
  }
}

function addSnap(startSec, vel = 0.26) {
  const startSamp = Math.floor(startSec * sampleRate);
  const snapSamps = Math.floor(0.08 * sampleRate);
  const endSamp = Math.min(totalSamples, startSamp + snapSamps);
  for (let s = startSamp; s < endSamp; s++) {
    const t = (s - startSamp) / sampleRate;
    const env = Math.exp(-t * 45.0);
    const noise = (Math.random() * 2.0 - 1.0) * 0.35;
    const tone = Math.sin(2.0 * Math.PI * 1250.0 * t) * 0.65;
    const amp = vel * env * (noise + tone) * 0.16;
    left[s] += amp * 0.9;
    right[s] += amp * 1.1;
  }
}

const CHORDS = [
  ['C2', ['C3', 'G3', 'C4', 'E4', 'G4', 'B4'], ['C4', 'E4', 'G4']],
  ['B1', ['B2', 'G3', 'D4', 'G4', 'D5'], ['G3', 'D4', 'G4']],
  ['A1', ['A2', 'E3', 'A3', 'C4', 'E4', 'G4'], ['A3', 'C4', 'E4']],
  ['F1', ['F2', 'C3', 'F3', 'A3', 'C4', 'E4'], ['F3', 'A3', 'C4', 'E4']]
];

const MELODIES = [
  ['E5', 'G5', 'C6', 'G5'],
  ['D5', 'G5', 'B5', 'D6'],
  ['C5', 'E5', 'A5', 'E5'],
  ['A4', 'C5', 'E5', 'G5'],
  ['G5', 'E5', 'D5', 'C5'],
  ['B5', 'G5', 'A5', 'G5'],
  ['E5', 'C5', 'D5', 'E5'],
  ['C5', 'G4', 'A4', 'C5']
];

const totalBars = Math.floor(duration / barSec) + 1;
console.log(`Synthesizing music for ${totalBars} bars (${duration}s)...`);

for (let bar = 0; bar < totalBars; bar++) {
  const barStart = bar * barSec;
  if (barStart >= duration) break;

  const chordIdx = bar % CHORDS.length;
  const [rootBass, pianoNotes, padNotes] = CHORDS[chordIdx];

  // Warm Bass
  addPiano(rootBass, barStart, beatSec * 1.8, 0.62, 0.0);
  addPiano(rootBass, barStart + beatSec * 2.0, beatSec * 1.8, 0.48, 0.0);

  // Warm Pad Bed
  for (const pNote of padNotes) {
    addPad(pNote, barStart, barSec * 1.05, 0.22, -0.2);
  }

  // Piano Strum
  for (let i = 0; i < pianoNotes.length; i++) {
    const delay = i * 0.024;
    addPiano(pianoNotes[i], barStart + delay, beatSec * 2.0, 0.38, (i % 2 === 0 ? -0.2 : 0.2));
  }

  if (bar > 1) {
    addPiano(pianoNotes[Math.floor(pianoNotes.length / 2)], barStart + beatSec * 2.5, beatSec * 1.2, 0.24, 0.15);
    addPiano(pianoNotes[pianoNotes.length - 1], barStart + beatSec * 3.5, beatSec * 1.0, 0.22, -0.15);
  }

  // Bell Melodies
  const mel = MELODIES[bar % MELODIES.length];
  for (let m = 0; m < mel.length; m++) {
    addBell(mel[m], barStart + m * beatSec, 0.18, (m - 1.5) * 0.3);
  }

  // Drum Groove
  if (bar >= 1 && bar < totalBars - 1) {
    addKick(barStart, 0.40);
    addKick(barStart + beatSec * 2.5, 0.32);
    addSnap(barStart + beatSec * 1.0, 0.28);
    addSnap(barStart + beatSec * 3.0, 0.32);
  }
}

// Fade in and Fade out
const fadeInSamps = Math.floor(1.5 * sampleRate);
const fadeOutSamps = Math.floor(3.5 * sampleRate);

for (let i = 0; i < totalSamples; i++) {
  if (i < fadeInSamps) {
    const f = i / fadeInSamps;
    left[i] *= f;
    right[i] *= f;
  } else if (i > totalSamples - fadeOutSamps) {
    const f = (totalSamples - i) / fadeOutSamps;
    left[i] *= f;
    right[i] *= f;
  }
}

// Find peak and normalize
let maxPeak = 0.0001;
for (let i = 0; i < totalSamples; i++) {
  const al = Math.abs(left[i]);
  const ar = Math.abs(right[i]);
  if (al > maxPeak) maxPeak = al;
  if (ar > maxPeak) maxPeak = ar;
}

const normFactor = 28500.0 / maxPeak;
console.log(`Peak: ${maxPeak.toFixed(3)}, Normalizing with factor ${normFactor.toFixed(1)}`);

// Write WAV buffer
const headerSize = 44;
const dataSize = totalSamples * 4;
const buffer = Buffer.alloc(headerSize + dataSize);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // subchunk1 size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // PCM format = 1
buffer.writeUInt16LE(2, 22);  // Channels = 2
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 4, 28); // byte rate
buffer.writeUInt16LE(4, 32);  // block align
buffer.writeUInt16LE(16, 34); // bits per sample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const lVal = Math.max(-32767, Math.min(32767, Math.floor(left[i] * normFactor)));
  const rVal = Math.max(-32767, Math.min(32767, Math.floor(right[i] * normFactor)));
  buffer.writeInt16LE(lVal, offset);
  buffer.writeInt16LE(rVal, offset + 2);
  offset += 4;
}

fs.writeFileSync('/tmp/ugc_music_raw.wav', buffer);
console.log('Raw audio generated at /tmp/ugc_music_raw.wav');

// Master audio with reverb and subtle warmth using ffmpeg
console.log('Mastering audio with stereo reverb and spatial acoustic enhancement...');
execSync('ffmpeg -y -i /tmp/ugc_music_raw.wav -af "aecho=0.8:0.88:35|70:0.35|0.2,volume=1.15" /tmp/ugc_music_mastered.wav');
console.log('Mastered audio generated at /tmp/ugc_music_mastered.wav');
