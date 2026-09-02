from pathlib import Path
import librosa
import numpy as np
files = Path("./beats").glob("*")
import json
import os


# based on freq taken from my sound samples 
samples = {
    "SNARE": 168.46,
    "TOM-MID": 109.76,
    "CLAP": 904.39,
    "KICK": 52.54,
    "HIHAT-CLOSED": 5703.91,
    "BONGO": 297.48,
    "BASS": 70.42,
    "HIHAT": 6227.49,
    "HIHAT-OPEN": 6698.39,
    "TAMBOURINE": 7681.57,
    "TOM-HIGH": 89.57,
    "TOM-LOW": 87.76,
    "SAMPLE": 752.37,
}

os.makedirs("./metadata", exist_ok=True)

all_data = []

for file in files:
    print(file)
    y, sr = librosa.load(file)
    tempo , beat_frames = librosa.beat.beat_track(
        y=y,
        sr=sr
    )

    beat_timestamps = librosa.frames_to_time(
        beat_frames,
        sr=sr
    )
    onset_frames = librosa.onset.onset_detect(
    y=y,
    sr=sr
    )

    duration = float(librosa.get_duration(
        y=y,
        sr=sr
    ))

    onset_times = librosa.frames_to_time(
        onset_frames,
        sr=sr
    )

    rms = librosa.feature.rms(y=y)

    avg_energy = float(rms.mean())

    print('bpm' , float(tempo[0]))
    print('beat_timestamps' , beat_timestamps)
    print('onset_times' , onset_times)
    print('energy', avg_energy)
    events = []
    
    for onset_time in onset_times:

        onset_sample = int(onset_time * sr)

        window_size = int(0.05 * sr)

        start = max(0, onset_sample - window_size)
        end = min(len(y), onset_sample + window_size)

        segment = y[start:end]

        fft = np.fft.rfft(segment)
        magnitude = np.abs(fft)

        frequencies = np.fft.rfftfreq(
            len(segment),
            1 / sr
        )

        peak_frequency = frequencies[np.argmax(magnitude)]

        closest_sample = min(
            samples,
            key=lambda name: abs(
                samples[name] - peak_frequency
            )
        )

        events.append({
            "time": round(float(onset_time), 3),
            "sample": closest_sample,
            "frequency": round(float(peak_frequency), 2)

        })


    beat_data = {
        "file": file.name,

        "metadata": {
            "bpm": round(tempo[0], 2),
            "duration": round(duration, 3),
            "sample_rate": sr,
            "energy": round(avg_energy, 6)
        },

        "beats": [
            round(float(t), 3)
            for t in beat_timestamps
        ],

        "events": events
    }

    output_file = Path("./metadata") / f"{file.stem}.json"

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as f:
        json.dump(
            beat_data,
            f,
            indent=2
        )

    print(f"Saved: {output_file}")

