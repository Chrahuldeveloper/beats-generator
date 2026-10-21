import os
import uuid
import numpy as np
import soundfile as sf
import torch

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv

from train import BeatGenerator

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = BeatGenerator()

state_dict = torch.load(
    "./beat_generator.pth",
    map_location="cpu",
    weights_only=True,
)

model.load_state_dict(state_dict)
model.eval()

supabase = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

sound_paths = [
    "sounds/SNARE.wav",
    "sounds/tom-mid.wav",
    "sounds/clap.wav",
    "sounds/KICK.wav",
    "sounds/closed-hihat.wav",
    "sounds/bongo.wav",
    "sounds/bass.wav",
    "sounds/HIHAT.wav",
    "sounds/openhihat.wav",
    "sounds/tambourine.wav",
    "sounds/tom-high.wav",
    "sounds/tom-low.wav",
    "sounds/SAMPLE.wav",
]

OUTPUT_FILE = "generated_beat.wav"
SAMPLE_RATE = 44100
BPM = 120


def generate_audio(beats):
   
    print(beats)

    step_time = 60 / BPM / 4

    sounds = [sf.read(sound,dtype="float32"[0]) for sound in sound_paths]

    sounds = [sound.mean(axis=0) if sound.ndim==2 else sound for sound in sounds]

    output = np.zeros(
        int(len(beats) * step_time * SAMPLE_RATE),
        dtype=np.float32
    )

    for step, instruments in enumerate(beats):
        start = int(step * step_time * SAMPLE_RATE)
        for i, active in enumerate(instruments):
            if active:
                sound = sounds[i]
                end = min(start + len(sound), len(output))
                output[start:end] += sound[:end - start]

        peak = np.max(np.abs(output))
        if peak > 1:
            output  = output / peak * 0.95
            
        sf.write("generated_beat.wav", output, SAMPLE_RATE)
        
        return "generated_beat.wav"



@app.post("/get-beats")
def generate_beats(prompt:str):
    
    x = torch.tensor([
        [13230.0, 13235.89, 250.0, 0.12332411]
    ])

    with torch.no_grad():
        output = model(x)
        beat = (torch.sigmoid(output) >= 0.5).int()

    beat = beat[0].cpu().numpy()

    audio = generate_audio(beat)

    file_name = f"{uuid.uuid4()}.wav"

    with open(audio, "rb") as file:
        supabase.storage.from_("beats").upload(
            path=file_name,
            file=file,
            file_options={
                "content-type": "audio/wav",
            },
        )

    audio_url = (
        supabase.storage
        .from_("beats")
        .get_public_url(file_name)
    )

    return {
        "success": True,
        "audio_url": audio_url,
        "beat": beat.tolist(),
    }