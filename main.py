import pygame
import time
from train import BeatGenerator
import torch


model = BeatGenerator()

state_dict = torch.load(
        "./beat_generator.pth",
        map_location="cpu",
        weights_only=True
    )

model.load_state_dict(state_dict)
model.eval()

x = torch.tensor([[80.0, 120, 44100, 0.4]])

with torch.no_grad():
        output = model(x)
        beat = (torch.sigmoid(output) >= 0.5).int()

pygame.mixer.init()

kick = pygame.mixer.Sound("sounds/KICK.wav")
snare = pygame.mixer.Sound("sounds/SNARE.wav")
sample = pygame.mixer.Sound("sounds/SAMPLE.wav")
hihat = pygame.mixer.Sound("sounds/HIHAT.wav")
bass = pygame.mixer.Sound("sounds/bass.wav")
tom_mid = pygame.mixer.Sound("sounds/tom-mid.wav")
tom_high = pygame.mixer.Sound("sounds/tom-high.wav")
tom_low = pygame.mixer.Sound("sounds/tom-low.wav")
closed_hithat = pygame.mixer.Sound("sounds/closed-hihat.wav")
open_hihat = pygame.mixer.Sound("sounds/openhihat.wav")
tambourine = pygame.mixer.Sound("sounds/tambourine.wav")
bongo = pygame.mixer.Sound("sounds/bongo.wav")
clap = pygame.mixer.Sound("sounds/clap.wav")

instruments = [
    snare,        
    tom_mid,      
    clap,          
    kick,          
    closed_hithat, 
    bongo,        
    bass,          
    hihat,         
    open_hihat,    
    tambourine,    
    tom_high,      
    tom_low,        
    sample        
]

bpm = 120
beat_time = 60 / bpm

try:
    while True:
        for i in range(64):
            for j in range(13):
                if beat[0][i][j].item() == 1:
                    instruments[j].play()
            time.sleep(beat_time)

except KeyboardInterrupt:
    print("Beat playback stopped.")

finally:
    pygame.mixer.quit()





