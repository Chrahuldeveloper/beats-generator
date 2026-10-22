import pygame
import time
from train import BeatGenerator
import torch
import random
import sys



def shuffel(sounds:list):
    for i in range(len(sounds) -1,0,-1):
        j = random.randint(0,i)
        sounds[i], sounds[j] = sounds[j], sounds[i]
    return sounds








def main():


    print(sys.argv)

    if len(sys.argv) < 3:
        print("Error: Missing arguments.", file=sys.stderr)
        print(f"Usage: playbeats  {sys.argv[0]} bpm energy")
        sys.exit(1)


    bpm = float(sys.argv[1])
    energy = float(sys.argv[2])
    duration = float(random.randint(100,1000))

    model = BeatGenerator()

    state_dict = torch.load(
            "../beat_generator.pth",
            map_location="cpu",
            weights_only=True
        )

    model.load_state_dict(state_dict)
    model.eval()

    x = torch.tensor([[bpm, duration, 44100, energy]])

    with torch.no_grad():
            output = model(x)
            beat = (torch.sigmoid(output) >= 0.5).int()

    pygame.mixer.init()

    kick = pygame.mixer.Sound("../sounds/KICK.wav")
    snare = pygame.mixer.Sound("../sounds/SNARE.wav")
    sample = pygame.mixer.Sound("../sounds/SAMPLE.wav")
    hihat = pygame.mixer.Sound("../sounds/HIHAT.wav")
    bass = pygame.mixer.Sound("../sounds/bass.wav")
    tom_mid = pygame.mixer.Sound("../sounds/tom-mid.wav")
    tom_high = pygame.mixer.Sound("../sounds/tom-high.wav")
    tom_low = pygame.mixer.Sound("../sounds/tom-low.wav")
    closed_hithat = pygame.mixer.Sound("../sounds/closed-hihat.wav")
    open_hihat = pygame.mixer.Sound("../sounds/openhihat.wav")
    tambourine = pygame.mixer.Sound("../sounds/tambourine.wav")
    bongo = pygame.mixer.Sound("../sounds/bongo.wav")
    clap = pygame.mixer.Sound("../sounds/clap.wav")

    instruments = [
        bass,          
        snare,        
        tom_mid,      
        clap,          
        kick,          
        open_hihat,    
        closed_hithat, 
        tom_high,      
        hihat,         
        tambourine,    
        tom_low,        
        sample,    
        bongo,        
    ]

    bpm = 120
    beat_time = 60 / bpm

    try:
        while True:
            for i in range(64):
                for j in range(13):
                    if beat[0][i][j].item() == 1:
                        instruments = shuffel(instruments)
                        instruments[j].play()
                time.sleep(beat_time)

    except KeyboardInterrupt:
        print("Beat playback stopped.")

    finally:
        pygame.mixer.quit()

if __name__ == "__main__":
    main()
