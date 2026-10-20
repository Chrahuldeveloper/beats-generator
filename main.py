import os
import uuid
from pathlib import Path

import numpy as np
import soundfile as sf
import torch

from scipy.signal import resample_poly
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


def generate_audio(beat):
    return beat


@app.get("/get-beats")
def generate_beats():
    x = torch.tensor([
        [13230.0, 13235.89, 250.0, 0.12332411]
    ])

    with torch.no_grad():
        output = model(x)
        beat = (torch.sigmoid(output) >= 0.5).int()

    beat = beat[0].cpu().numpy()

    audio_path = generate_audio(beat)

    file_name = f"{uuid.uuid4()}.wav"

    with open(audio_path, "rb") as file:
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