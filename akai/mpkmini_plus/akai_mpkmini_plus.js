//-----------------------------------------------------------------------------
// 1. DRIVER SETUP - create driver object, midi ports and detection information
//-----------------------------------------------------------------------------

// get the api's entry point
var midiremote_api = require('midiremote_api_v1')

// create the device driver main object
var deviceDriver = midiremote_api.makeDeviceDriver('Akai', 'MPK mini Plus', 'Tsukasa "FlyingHog" Koizumi')

// create objects representing the hardware's MIDI ports
var midiInput = deviceDriver.mPorts.makeMidiInput()
var midiOutput = deviceDriver.mPorts.makeMidiOutput()

// SySEx-ID-Response determined
// F0 7E 7F 06 02 *47* *54 00* *19 00* 01 01 03 00 00 00 00 00 45 38 32 33 30 38 32 35 38 30 35 38 32 39 30 00 F7

// Detection for macOS and Windows
deviceDriver.makeDetectionUnit().detectPortPair(midiInput, midiOutput)
    .expectSysexIdentityResponse('47', '5400', '1900')

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------
var surface = deviceDriver.mSurface

function makeKnobStrip(knobIndex, x, y, ccNr) {
    var knobStrip = {}
    
    knobStrip.knob = surface.makeKnob(x * knobIndex + 28, y, 2, 2.3)
    knobStrip.knob.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToControlChange(0, ccNr).setTypeRelativeTwosComplement()

    return knobStrip
}

function makeTriggerPads(padIndex, x, y, ccNr) {
    var triggerPads = {}
    
    triggerPads.pad = surface.makeTriggerPad(x * padIndex + 8.5, y, 2.7, 2.7)
    triggerPads.pad.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToControlChange(0, ccNr)

    return triggerPads
}

function makeButtons(buttonIndex, x, y, ccNr) {
    var buttons = {}

    buttons.button = surface.makeButton(x * buttonIndex + 28, y, 1.3, 1)
    buttons.button.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToControlChange(0, ccNr)

    return buttons
}

function makeSurfaceElements() {
    var surfaceElements = {}

    surfaceElements.numStrips = 8
    surfaceElements.numButtons = 5

    var x = 2.3
    var y = 0
    surfaceElements.knobStrips = {}
    for(var i = 0; i < surfaceElements.numStrips; ++i) {
        var knobIndex = i
        if (i > 3) {
            knobIndex = i - 4
            y = 2.15
        } 
        var ccNr = i + 70
        
        surfaceElements.knobStrips[i] = makeKnobStrip(knobIndex, x, y, ccNr) 
    }

    x = 3
    y = 3
    surfaceElements.triggerPads = {}
    for(var i = 0; i < surfaceElements.numStrips; ++i) {
        var padIndex = i
        if (i > 3) {
            padIndex = i - 4
            y = 0
        } 
        var ccNr = i + 16
        
        surfaceElements.triggerPads[i] = makeTriggerPads(padIndex, x, y, ccNr)
    }

    x = 1.5
    y = 4.7
    surfaceElements.buttons = {}
    for (var i = 0; i < surfaceElements.numButtons; ++i) {
        surfaceElements.buttons[i] = makeButtons(i, x, y, i + 115)
    }

    // Piano Key
    surface.makePianoKeys(0, 7.1, 37, 6, 0, 36)

    // PitchBend
    surfaceElements.pitchBend = surface.makePitchBend(1, 1.75, 1.3, 4)
    surfaceElements.pitchBend.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToPitchBend(0)

    // ModWheel
    surfaceElements.modWheel = surface.makeModWheel(3, 1.75, 1.3, 4)
    surfaceElements.modWheel.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToControlChange(0, 1)

    // JoyStick
    var joyStickXY = surface.makeJoyStickXY(5.35, 0, 2, 2)
	joyStickXY.mX.mMidiBinding.setInputPort(midiInput).setIsConsuming(false).bindToControlChange(0, 12);
	joyStickXY.mY.mMidiBinding.setInputPort(midiInput).setIsConsuming(false).bindToControlChange(0, 2);
    surfaceElements.joyStickXY = joyStickXY

    // Lefthand Buttons
    surface.makeBlindPanel(5, 2.5, 1.3, 1)
    surface.makeBlindPanel(6.4, 2.5, 1.3, 1)
    surface.makeBlindPanel(5, 3.6, 1.3, 1)
    surface.makeBlindPanel(6.4, 3.6, 1.3, 1)
    surface.makeBlindPanel(5, 4.7, 1.3, 1)
    surface.makeBlindPanel(6.4, 4.7, 1.3, 1)

    // LED
    surface.makeBlindPanel(21.3, 0, 2.7, 1.5)
    surface.makeBlindPanel(25, 0, 1.7, 1.7).setShapeCircle()

    // Pad Controls
    surface.makeBlindPanel(21.5, 3, 1.3, 1)
    surface.makeBlindPanel(23.25, 3, 1.3, 1)
    surface.makeBlindPanel(25, 3, 1.3, 1)
    surface.makeBlindPanel(21.5, 4.7, 1.3, 1)
    surface.makeBlindPanel(23.25, 4.7, 1.3, 1)
    surface.makeBlindPanel(25, 4.7, 1.3, 1)

    // Seq
    surface.makeBlindPanel(35.5, 4.7, 1.3, 1)

    return surfaceElements
}

var surfaceElements = makeSurfaceElements()

//----------------------------------------------------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//----------------------------------------------------------------------------------------------------------------------

function makePageDefault() {
    var page = deviceDriver.mMapping.makePage('Default')

    var selectedTrackChannel = page.mHostAccess.mTrackSelection.mMixerChannel
    for (var i = 0; i < 8; ++i) {
        page.makeValueBinding (surfaceElements.knobStrips[i].knob.mSurfaceValue, selectedTrackChannel.mQuickControls.getByIndex(i)).setValueTakeOverModeScaled()
    }

    page.makeActionBinding (surfaceElements.buttons[0].button.mSurfaceValue, page.mHostAccess.mTrackSelection.mAction.mPrevTrack)
    page.makeActionBinding (surfaceElements.buttons[1].button.mSurfaceValue, page.mHostAccess.mTrackSelection.mAction.mNextTrack)
    page.makeValueBinding (surfaceElements.buttons[2].button.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStop).setTypeToggle()
    page.makeValueBinding (surfaceElements.buttons[3].button.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStart).setTypeToggle()
    page.makeValueBinding (surfaceElements.buttons[4].button.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRecord).setTypeToggle()

    return page
}

var pageDefaut = makePageDefault()

pageDefaut.mOnActivate = function (context) {
	console.log('from script: AKAI MPK mini Plus "Default" page activated')
}
