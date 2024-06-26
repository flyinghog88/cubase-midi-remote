# Cubase 13 MIDI Remote Script for AKAI PROFESSIONAL MPK mini Plus
- Version: 1.0.2
- Author: Tsukasa "FlyingHog" Koizumi
- Created: 2024-05-26

## Installing
1. Download the source package.
2. Place the “Akai” folder into "Steinberg/Cubase/MIDI Remote/Driver Scripts/Local/" in the user’s “Documents” folder.

## Bindings
- Knob 1 - 8
  - Quick control 1 - 8 of the selected track.
  - NOTICE: You need to edit the configuration of MPK knobs, setting the “mode” to RELATIVE.
- ”<<” and “>>” buttons
  - Select previous and next track.
- “STOP”, “PLAY”, and “REC” buttons
  - Transport stop, start, and record.

## Optional
You can customize or add control bindings using Cubase’s “Mapping Assistant”.

- Knob 1 - 8
  - These are bound to MIDI CC 70 - 77.
- Buttons
  - "<<" ... CC 115
  - ">>" ... CC 116
  - STOP ... CC 117
  - PLAY ... CC 118
  - REC ... CC 119
  
- PAD 1 - 8
  - Configure PADs as CC 16 - 23, then customize PADs as controllers using the “Mapping Assistant”.
- Joystick X, Y, Pitch bend and Mod-wheel
  - Also customizable using the “Mapping Assistant”.
  - Joystick X bound as CC 12
  - Joystick Y bound as CC 2
