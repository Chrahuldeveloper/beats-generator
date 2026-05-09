import pygame
import time

pygame.mixer.init()

kick = pygame.mixer.Sound("sounds/KICK.wav")
snare = pygame.mixer.Sound("sounds/SNARE.wav")
hihat = pygame.mixer.Sound("sounds/HIHAT.wav")

kick_pattern =  [1, 0, 0, 1, 0, 1, 0, 0]
snare_pattern = [0, 0, 1, 0, 0, 0, 1, 0]
hihat_pattern = [1, 1, 1, 1, 1, 1, 1, 1]

bpm = 120
beat_time = 60 / bpm 


while True:
    for i in range(8):
        if kick_pattern[i]:
            kick.play()
        if snare_pattern[i]:
            snare.play()
        if hihat_pattern[i]:
            hihat.play()
        time.sleep(beat_time)                