# Lesson 1: Audio Mixing Fundamentals

## Lesson Metadata
```javascript
{
  id: 'audio-mixing-fundamentals',
  module: 1,
  title: 'Audio Mixing Fundamentals',
  icon: '🎚️',
  difficulty: 'beginner',
  duration: '15 min',
  description: 'Learn the basics of audio signal flow, gain staging, and channel strip controls'
}
```

---

## Learning Objectives

By the end of this lesson, users will be able to:
1. Understand the signal path from microphone to speaker
2. Properly set gain structure to avoid clipping
3. Identify the components of a channel strip
4. Use EQ to shape sound
5. Apply basic dynamics processing

---

## Step-by-Step Content

### Step 1: Introduction to Audio Signals
```javascript
{
  id: 1,
  title: 'What is an Audio Signal?',
  content: `Audio signals are electrical representations of sound waves.

**Key concepts:**
• Analog signals are continuous electrical voltages
• Digital signals are discrete numerical samples
• Signal level is measured in decibels (dB)
• Professional audio uses balanced connections to reject noise

Think of audio like water flowing through pipes - the signal flows from source to destination, and we can control its "pressure" (level) along the way.`,
  action: null // No action, pure learning
}
```

### Step 2: The Signal Chain
```javascript
{
  id: 2,
  title: 'Understanding Signal Flow',
  content: `Every audio system follows a basic signal chain:

**Source → Preamp → Processing → Output**

In a live sound context:
• **Source**: Microphone or instrument
• **Preamp**: Boosts weak mic signals
• **Processing**: EQ, compression, effects
• **Output**: Amplifier and speakers

Each stage must be properly calibrated to avoid distortion or noise.`,
  action: {
    type: 'add-devices',
    required: ['microphone', 'mixer', 'amplifier', 'speaker'],
    hint: 'Drag a microphone, mixer, amplifier, and speaker onto the canvas'
  }
}
```

### Step 3: Connect the Signal Chain
```javascript
{
  id: 3,
  title: 'Building the Audio Path',
  content: `Now connect your devices to create a complete signal path.

**Connection order:**
• Microphone → Mixer (input)
• Mixer (output) → Amplifier (input)
• Amplifier (output) → Speaker

Notice how audio flows in one direction, from source to destination.`,
  action: {
    type: 'create-connection',
    required: [
      { from: 'microphone', to: 'mixer' },
      { from: 'mixer', to: 'amplifier' },
      { from: 'amplifier', to: 'speaker' }
    ],
    hint: 'Click on ports to connect devices in order'
  }
}
```

### Step 4: Gain Staging Fundamentals
```javascript
{
  id: 4,
  title: 'The Art of Gain Staging',
  content: `Gain staging is setting proper signal levels at each stage.

**The goal:** Maximize signal-to-noise ratio without clipping

**Visual indicators on the canvas:**
• 🟢 Green: Healthy signal (-18 to -12 dB)
• 🟡 Yellow: Hot signal (-12 to -6 dB)
• 🔴 Red: Clipping! (0 dB and above)

**Golden rule:** Set each stage so peaks hit around -12 dB. This leaves "headroom" for unexpected loud moments.`,
  action: {
    type: 'configure-gain',
    target: 'mixer',
    hint: 'Adjust the gain on the mixer until the meter shows green'
  }
}
```

### Step 5: The Channel Strip
```javascript
{
  id: 5,
  title: 'Anatomy of a Channel Strip',
  content: `Click on the mixer to see the channel strip controls.

**From top to bottom:**

• **Gain/Trim**: First stage amplification
• **High-Pass Filter (HPF)**: Removes low rumble
• **EQ Section**: Shape the tone
  - High: Adds "air" and brightness
  - Mid: Presence and body
  - Low: Warmth and bass
• **Dynamics**: Compressor/gate
• **Aux Sends**: Monitor mixes, effects
• **Pan**: Left/right positioning
• **Fader**: Final level control
• **Mute/Solo**: Monitoring controls`,
  action: {
    type: 'select-device',
    target: 'mixer',
    hint: 'Click on the mixer to view its channel strip'
  }
}
```

### Step 6: EQ Basics - Cutting vs Boosting
```javascript
{
  id: 6,
  title: 'Equalization: Shaping Your Sound',
  content: `EQ adjusts the volume of specific frequencies.

**Pro tip:** Cut before you boost!

**Common EQ moves:**
• **HPF at 80-100Hz**: Removes rumble from vocals
• **Cut 250-400Hz**: Reduces "muddiness"
• **Boost 2-4kHz**: Adds presence/clarity
• **Cut 3-5kHz**: Tames harshness
• **Boost 10kHz+**: Adds "air"

**Frequency cheat sheet:**
• 60-250 Hz: Bass, warmth, boom
• 250-2000 Hz: Body, mud, honk
• 2000-6000 Hz: Presence, clarity, harshness
• 6000-20000 Hz: Brilliance, air, sizzle`,
  action: {
    type: 'adjust-eq',
    target: 'mixer',
    hint: 'Try cutting some low frequencies and boosting presence'
  }
}
```

### Step 7: Dynamics Processing
```javascript
{
  id: 7,
  title: 'Compression & Gates',
  content: `Dynamics processors control the volume range of audio.

**Compressor**: Reduces loud peaks
• Threshold: Level where compression starts
• Ratio: How much to reduce (4:1 means 4dB in = 1dB out)
• Attack: How fast it clamps down
• Release: How fast it lets go

**Noise Gate**: Silences quiet signals
• Useful for removing bleed between songs
• Set threshold just above the noise floor

**When to use compression:**
• Vocals: Tame dynamics, increase presence
• Bass: Even out the low end
• Drums: Add punch and sustain`,
  action: null
}
```

### Step 8: Putting It Together
```javascript
{
  id: 8,
  title: 'Test Your Signal Chain',
  content: `Now let's test your audio system!

Send a test tone through the signal chain and watch it flow:
• The microphone will generate a signal
• Watch the meters on the mixer
• See the signal reach the speakers

If everything is connected correctly, you'll see the signal animate through each device.`,
  action: {
    type: 'send-signal',
    signalType: 'test-tone',
    hint: 'Use the "Send Test Tone" button in the sidebar'
  }
}
```

### Step 9: Congratulations
```javascript
{
  id: 9,
  title: 'Lesson Complete!',
  content: `Excellent work! You've learned the fundamentals of audio mixing.

**Key takeaways:**
• Audio flows from source → preamp → processing → output
• Proper gain staging prevents noise and distortion
• EQ shapes tone - cut before you boost
• Compression controls dynamics

**Next up:** Signal Flow Basics - Learn how audio travels through complex systems with multiple sources and destinations.`,
  action: null,
  isComplete: true
}
```

---

## Canvas Mockup

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AUDIO MIXING FUNDAMENTALS                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│    ┌─────────┐                                                           │
│    │   🎤    │                                                           │
│    │         │                                                           │
│    │  Mic 1  ├───────┐                                                   │
│    │         │       │                                                   │
│    └─────────┘       │     ┌─────────────────┐                          │
│                      │     │      🎚️🎚️🎚️      │     ┌─────────┐        │
│    ┌─────────┐       ├────►│                 ├────►│   🔊   │        │
│    │   🎤    │       │     │   Mixer FOH     │     │   Amp   ├──►🔈   │
│    │         ├───────┤     │                 │     │         │        │
│    │  Mic 2  │       │     │  ████░░ -12dB   │     └─────────┘        │
│    └─────────┘       │     └─────────────────┘                          │
│                      │                                                   │
│    ┌─────────┐       │                                                   │
│    │   🎸    ├───────┘                                                   │
│    │         │                                                           │
│    │   DI    │           Signal Flow Animation                          │
│    └─────────┘           ═══════════════════►                            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Device Configuration Panel Mockup

When the mixer is selected, show this panel:

```
┌──────────────────────────────────┐
│ 🎚️ Mixer - Channel 1              │
├──────────────────────────────────┤
│ ▼ INPUT                          │
│   Gain    [████████░░] +24dB     │
│   Phantom [48V ●]                │
│   HPF     [80Hz  ▼]              │
│                                  │
│ ▼ EQUALIZER                      │
│   HF  12kHz [────●────] +0dB     │
│   HMF  3kHz [────●────] +0dB     │
│   LMF 400Hz [────●────] +0dB     │
│   LF  100Hz [────●────] +0dB     │
│                                  │
│ ▼ DYNAMICS                       │
│   Compressor [ON ○]              │
│   Threshold  [────●────] -12dB   │
│   Ratio      [4:1  ▼]            │
│   Gate       [OFF ○]             │
│                                  │
│ ▼ OUTPUT                         │
│   Pan    [L ────●──── R]         │
│   Fader  [████████░░░░] -6dB     │
│   [MUTE]  [SOLO]                 │
│                                  │
│ METER: ████████░░░░░░░ -12dB     │
└──────────────────────────────────┘
```

---

## Interactive Elements

### Gain Staging Visualization
- Real-time animated meters on all devices
- Color-coded level indicators (green/yellow/red)
- Clipping warning animation with flash effect
- Noise floor indicator (gray below signal)

### Signal Flow Animation
- Animated dots flowing along connection lines
- Color changes based on signal level
- Speed indicates signal presence
- Stops when muted/disconnected

### EQ Curve Display
- Visual frequency response curve
- Interactive draggable EQ points
- Before/after comparison toggle
- Frequency analyzer overlay option

---

## Challenge Ideas for This Module

### Challenge 1: "Set the Gain"
**Objective:** Set proper gain structure on a 4-channel setup
- Avoid clipping on any channel
- Keep all signals above -20dB
- Successfully pass audio to outputs

### Challenge 2: "Fix the Muddy Mix"
**Objective:** Use EQ to clean up a muddy vocal
- Reduce low-mid buildup
- Add presence without harshness
- Maintain natural tone

### Challenge 3: "Complete Signal Path"
**Objective:** Build a full PA system from scratch
- Connect 4 inputs to a mixer
- Route to main outputs
- Send test signal successfully
