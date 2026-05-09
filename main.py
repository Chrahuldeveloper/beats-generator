import pygame
import time

pygame.mixer.init()

kick = pygame.mixer.Sound("sounds/KICK.wav")
snare = pygame.mixer.Sound("sounds/SNARE.wav")
sample = pygame.mixer.Sound("sounds/SAMPLE.wav")
hihat = pygame.mixer.Sound("sounds/HIHAT.wav")
bass = pygame.mixer.Sound("sounds/bass.wav")

kick_pattern =  [1, 0, 0, 1, 0, 1, 0, 0]
snare_pattern = [0, 0, 1, 0, 0, 0, 1, 0]
sample_pattern = [0, 0, 0, 1, 0, 1, 0, 1]
hihat_pattern = [1, 1, 1, 1, 1, 1, 1, 1]
bass_pattern = [1, 1, 1, 1, 1, 1, 1, 1]

bpm = 120
beat_time = 60 / bpm 


while True:
    for i in range(8):
        if kick_pattern[i]:
            kick.play()
        if snare_pattern[i]:
            snare.play()
        if sample_pattern[i]:
             sample.play()
        if hihat_pattern[i]:
            hihat.play()
        if bass_pattern[i]:
            bass.play()
        time.sleep(beat_time)                

# take user input add ml according to that to predict patters for the beats 
