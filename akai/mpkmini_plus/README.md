# AKAI PROFESSIONAL MPK mini Plus - Cubase 13 MIDI Remote Script
- Version: 1.0.0
- Author: Tsukasa "FlyingHog" Koizumi
- Created: 2024-05-26

## Installing

1. Download source package as folder name "Akai".
2. Folder "Akai", put into Steinberg/Cubase/MIDI Remote/Driver Scripts/Local/ of user's "Documents" folder.

## Bindings

- Knob 1 - 8
  - Quick control 1 - 8 of selected track.
  - NOTICE: You need to edit configuration of MPK knobs, set "mode" to RELATIVE.
- "<<" and ">>" buttons
  - Selecting track previous and next.
- "STOP", "PLAY" and "REC" buttons
  - Transport stop, start and record.

## Optional
You can customize or adding control binding using Cubase "Mapping Assistant".

- Knob 1 - 8
  - These are binding to MIDI CC 70 - 77.
- Buttons
  - "<<" ... CC 115
  - ">>" ... CC 116
  - STOP ... CC 117
  - PLAY ... CC 118
  - REC ... CC 119
  
- PAD 1 - 8
  - You configure PADs are CC 16 - 23, then you can customize PADs as controller using "Mapping Assistant".
- Joystick X, Y, Pitch bend and Mod-wheel
  - Also, customizable using "Mapping Assistant".
  - Joystick X binded as CC 12
  - Joystick Y binded as CC 2
