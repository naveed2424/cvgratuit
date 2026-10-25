import wave
import math
import struct
import random

def generate_music(output_path="/tmp/ugc_music.wav", duration=78.0, sample_rate=44100):
    bpm = 92.0
    beat_sec = 60.0 / bpm
    bar_sec = beat_sec * 4.0
    total_samples = int(duration * sample_rate)
    
    # Left and right buffer
    left = [0.0] * total_samples
    right = [0.0] * total_samples
    
    # Frequencies for notes
    NOTE_FREQS = {
        'C1': 32.70, 'D1': 36.71, 'E1': 41.20, 'F1': 43.65, 'G1': 49.00, 'A1': 55.00, 'B1': 61.74,
        'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
        'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
        'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98
    }

    # Helper: add piano note
    def add_piano(pitch, start_sec, note_duration, velocity=0.5, pan=0.0):
        f0 = NOTE_FREQS.get(pitch, 440.0)
        start_samp = int(start_sec * sample_rate)
        note_samps = int(note_duration * sample_rate)
        end_samp = min(total_samples, start_samp + note_samps)
        
        # Pan: -1 (left) to 1 (right)
        l_mult = math.cos((pan + 1.0) * math.pi / 4.0)
        r_mult = math.sin((pan + 1.0) * math.pi / 4.0)

        harmonics = [
            (1.0, 1.0, 1.4),
            (2.0, 0.45, 1.1),
            (3.0, 0.22, 0.8),
            (4.0, 0.12, 0.6),
            (5.0, 0.06, 0.4),
            (6.0, 0.03, 0.3)
        ]
        
        for s in range(start_samp, end_samp):
            t = (s - start_samp) / sample_rate
            attack = min(1.0, t / 0.008)
            sig = 0.0
            for h_num, h_amp, decay_rate in harmonics:
                freq = f0 * h_num
                sig += h_amp * math.sin(2.0 * math.pi * freq * t) * math.exp(-t * (decay_rate + 0.3))
            
            amp = velocity * attack * sig * 0.15
            left[s] += amp * l_mult
            right[s] += amp * r_mult

    # Helper: add warm synth pad note
    def add_pad(pitch, start_sec, pad_duration, velocity=0.25, pan=0.0):
        f0 = NOTE_FREQS.get(pitch, 440.0)
        start_samp = int(start_sec * sample_rate)
        note_samps = int(pad_duration * sample_rate)
        end_samp = min(total_samples, start_samp + note_samps)
        
        l_mult = math.cos((pan + 1.0) * math.pi / 4.0)
        r_mult = math.sin((pan + 1.0) * math.pi / 4.0)
        
        attack_sec = 0.35
        release_sec = 0.45
        
        for s in range(start_samp, end_samp):
            t = (s - start_samp) / sample_rate
            t_rem = (end_samp - s) / sample_rate
            env = min(1.0, t / attack_sec) * min(1.0, t_rem / release_sec)
            
            # Detuned oscillators for lush warmth
            sig = (math.sin(2.0 * math.pi * f0 * t) +
                   0.7 * math.sin(2.0 * math.pi * (f0 * 1.002) * t) +
                   0.3 * math.sin(2.0 * math.pi * (f0 * 2.0) * t))
            
            amp = velocity * env * sig * 0.12
            left[s] += amp * l_mult
            right[s] += amp * r_mult

    # Helper: add bell / chime pluck
    def add_bell(pitch, start_sec, velocity=0.2, pan=0.0):
        f0 = NOTE_FREQS.get(pitch, 880.0)
        start_samp = int(start_sec * sample_rate)
        note_samps = int(2.5 * sample_rate)
        end_samp = min(total_samples, start_samp + note_samps)
        
        l_mult = math.cos((pan + 1.0) * math.pi / 4.0)
        r_mult = math.sin((pan + 1.0) * math.pi / 4.0)
        
        for s in range(start_samp, end_samp):
            t = (s - start_samp) / sample_rate
            decay = math.exp(-t * 2.8)
            # Glassy harmonic spectrum
            sig = (math.sin(2.0 * math.pi * f0 * t) +
                   0.5 * math.sin(2.0 * math.pi * f0 * 2.756 * t) +
                   0.25 * math.sin(2.0 * math.pi * f0 * 5.404 * t))
            amp = velocity * decay * sig * 0.12
            left[s] += amp * l_mult
            right[s] += amp * r_mult

    # Helper: add soft kick
    def add_kick(start_sec, velocity=0.45):
        start_samp = int(start_sec * sample_rate)
        kick_samps = int(0.22 * sample_rate)
        end_samp = min(total_samples, start_samp + kick_samps)
        for s in range(start_samp, end_samp):
            t = (s - start_samp) / sample_rate
            # Pitch drop 110Hz -> 48Hz
            freq = 48.0 + 62.0 * math.exp(-t * 32.0)
            phase = 2.0 * math.pi * (48.0 * t - (62.0 / 32.0) * math.exp(-t * 32.0))
            env = math.exp(-t * 14.0)
            amp = velocity * env * math.sin(phase) * 0.35
            left[s] += amp
            right[s] += amp

    # Helper: add soft rim click / snap
    def add_snap(start_sec, velocity=0.25):
        start_samp = int(start_sec * sample_rate)
        snap_samps = int(0.08 * sample_rate)
        end_samp = min(total_samples, start_samp + snap_samps)
        random.seed(int(start_sec * 1000))
        for s in range(start_samp, end_samp):
            t = (s - start_samp) / sample_rate
            env = math.exp(-t * 45.0)
            noise = (random.random() * 2.0 - 1.0) * 0.4
            tone = math.sin(2.0 * math.pi * 1250.0 * t) * 0.6
            amp = velocity * env * (noise + tone) * 0.15
            left[s] += amp * 0.9
            right[s] += amp * 1.1

    # Chords defined: (Root bass, Piano chord notes, Pad chord notes)
    CHORDS = [
        # C major 9
        ('C2', ['C3', 'G3', 'C4', 'E4', 'G4', 'B4'], ['C4', 'E4', 'G4']),
        # G / B
        ('B1', ['B2', 'G3', 'D4', 'G4', 'D5'], ['G3', 'D4', 'G4']),
        # Am7
        ('A1', ['A2', 'E3', 'A3', 'C4', 'E4', 'G4'], ['A3', 'C4', 'E4']),
        # Fmaj7
        ('F1', ['F2', 'C3', 'F3', 'A3', 'C4', 'E4'], ['F3', 'A3', 'C4', 'E4'])
    ]

    # Melodic bell arpeggios that rotate
    MELODIES = [
        ['E5', 'G5', 'C6', 'G5'],
        ['D5', 'G5', 'B5', 'D6'],
        ['C5', 'E5', 'A5', 'E5'],
        ['A4', 'C5', 'E5', 'G5'],
        ['G5', 'E5', 'D5', 'C5'],
        ['B5', 'G5', 'A5', 'G5'],
        ['E5', 'C5', 'D5', 'E5'],
        ['C5', 'G4', 'A4', 'C5']
    ]

    total_bars = int(duration / bar_sec) + 1
    print(f"Composing {total_bars} bars over {duration}s...")

    for bar in range(total_bars):
        bar_start = bar * bar_sec
        if bar_start >= duration:
            break
            
        chord_idx = bar % len(CHORDS)
        root_bass, piano_notes, pad_notes = CHORDS[chord_idx]
        
        # 1. Warm Bass on beat 1 and beat 3
        bass_dur = beat_sec * 1.8
        add_piano(root_bass, bar_start, bass_dur, velocity=0.6, pan=0.0)
        add_piano(root_bass, bar_start + beat_sec * 2.0, bass_dur, velocity=0.45, pan=0.0)
        
        # 2. Pad chords (ambient bed)
        for p_note in pad_notes:
            add_pad(p_note, bar_start, bar_sec * 1.05, velocity=0.22, pan=-0.2)
            
        # 3. Piano chord strum (arpeggiated humanized attack on beats 1, 2, 3, 4)
        for i, note in enumerate(piano_notes):
            strum_delay = i * 0.025
            add_piano(note, bar_start + strum_delay, beat_sec * 2.0, velocity=0.38, pan=(i % 2 * 0.4 - 0.2))
        
        # Gentle piano response on beat 2.5 and beat 4
        if bar > 1:
            add_piano(piano_notes[len(piano_notes)//2], bar_start + beat_sec * 2.5, beat_sec * 1.2, velocity=0.25, pan=0.15)
            add_piano(piano_notes[-1], bar_start + beat_sec * 3.5, beat_sec * 1.0, velocity=0.22, pan=-0.15)
        
        # 4. Melodic Bell Plucks
        mel = MELODIES[bar % len(MELODIES)]
        for m_idx, m_note in enumerate(mel):
            t_note = bar_start + m_idx * beat_sec
            add_bell(m_note, t_note, velocity=0.20, pan=((m_idx - 1.5) * 0.3))
            
        # 5. Classy Lo-fi Drums (start after bar 1)
        if bar >= 1 and bar < total_bars - 2:
            # Kick on beat 1 and beat 2.75
            add_kick(bar_start, velocity=0.38)
            add_kick(bar_start + beat_sec * 2.5, velocity=0.30)
            
            # Snap / Rim on beat 2 and beat 4
            add_snap(bar_start + beat_sec * 1.0, velocity=0.28)
            add_snap(bar_start + beat_sec * 3.0, velocity=0.32)

    # Apply master fade-in (1.5s) and fade-out (3.5s)
    fade_in_samps = int(1.5 * sample_rate)
    fade_out_samps = int(3.5 * sample_rate)
    
    for i in range(total_samples):
        # Fade in
        if i < fade_in_samps:
            factor = i / fade_in_samps
            left[i] *= factor
            right[i] *= factor
        # Fade out
        elif i > total_samples - fade_out_samps:
            factor = (total_samples - i) / fade_out_samps
            left[i] *= factor
            right[i] *= factor

    # Master Soft Clamping / Normalization
    max_peak = 0.001
    for i in range(total_samples):
        if abs(left[i]) > max_peak:
            max_peak = abs(left[i])
        if abs(right[i]) > max_peak:
            max_peak = abs(right[i])
            
    norm_factor = 28000.0 / max_peak if max_peak > 0 else 1.0
    print(f"Normalizing audio (peak={max_peak:.3f}, factor={norm_factor:.1f})...")
    
    with wave.open(output_path, 'w') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        
        chunk_size = 8192
        for start_idx in range(0, total_samples, chunk_size):
            end_idx = min(total_samples, start_idx + chunk_size)
            chunk_frames = bytearray()
            for s in range(start_idx, end_idx):
                l_val = int(max(-32767, min(32767, left[s] * norm_factor)))
                r_val = int(max(-32767, min(32767, right[s] * norm_factor)))
                chunk_frames += struct.pack('<hh', l_val, r_val)
            wav_file.writeframes(chunk_frames)
            
    print(f"Music audio written to {output_path}")

if __name__ == "__main__":
    generate_music()
