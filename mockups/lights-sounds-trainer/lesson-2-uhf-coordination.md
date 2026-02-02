# Lesson 2: UHF Frequency Coordination

## Lesson Metadata
```javascript
{
  id: 'uhf-frequency-coordination',
  module: 2,
  title: 'UHF Frequency Coordination',
  icon: '📡',
  difficulty: 'intermediate',
  duration: '20 min',
  description: 'Learn to coordinate wireless frequencies, avoid interference, and calculate safe frequency spacing'
}
```

---

## Learning Objectives

By the end of this lesson, users will be able to:
1. Understand the RF spectrum used for wireless audio
2. Identify sources of interference
3. Calculate intermodulation products
4. Use frequency coordination tools effectively
5. Set up a multi-channel wireless system safely

---

## Step-by-Step Content

### Step 1: Introduction to RF Spectrum
```javascript
{
  id: 1,
  title: 'The Radio Frequency Landscape',
  content: `Wireless audio devices operate in the UHF (Ultra High Frequency) spectrum.

**Key frequency bands for wireless audio:**
• **470-608 MHz**: Primary band (post-repack)
• **614-698 MHz**: Formerly TV channels 38-51 (no longer legal)
• **902-928 MHz**: ISM band (shared with other devices)
• **1.9 GHz / 2.4 GHz**: DECT and WiFi bands

**Why UHF?**
• Good balance of range and penetration
• Less crowded than VHF
• Antenna sizes are practical

**The challenge:** This spectrum is shared with TV broadcasts, public safety, and other users. Coordination is essential!`,
  action: null
}
```

### Step 2: Understanding the Spectrum Display
```javascript
{
  id: 2,
  title: 'Reading the Spectrum',
  content: `The spectrum analyzer shows RF activity in your venue.

**Reading the display:**
• X-axis: Frequency (MHz)
• Y-axis: Signal strength (dBm)
• Peaks: Active transmitters or interference
• Noise floor: Background RF noise level

**What to look for:**
• 🔴 Tall peaks: Strong signals - AVOID these frequencies
• 🟡 Medium peaks: Moderate signals - use with caution
• 🟢 Low/flat areas: Clear spectrum - safe to use

The goal is to place your wireless frequencies in the "quiet" gaps between existing signals.`,
  action: {
    type: 'view-spectrum',
    hint: 'Click on the spectrum analyzer to expand the frequency view'
  }
}
```

### Step 3: Add Your Wireless Systems
```javascript
{
  id: 3,
  title: 'Setting Up Wireless Receivers',
  content: `Let's set up a 4-channel wireless microphone system.

**Drag these onto the canvas:**
• 4x Wireless Receivers
• 4x Wireless Transmitters (handhelds or bodypacks)
• 1x Antenna Combiner/Distro

**Real-world tip:** Always use an antenna distribution system when running more than 2 channels. It improves reception and reduces cable runs.`,
  action: {
    type: 'add-devices',
    required: ['wireless_rx', 'wireless_rx', 'wireless_rx', 'wireless_rx', 'antenna_distro'],
    hint: 'Add 4 wireless receivers and an antenna distribution unit'
  }
}
```

### Step 4: The Intermodulation Problem
```javascript
{
  id: 4,
  title: 'Understanding Intermodulation',
  content: `When multiple transmitters operate together, they create "ghost" frequencies called intermodulation (IM) products.

**How it happens:**
Two frequencies (F1 and F2) combine to create new frequencies:
• 2×F1 - F2 = IM product
• 2×F2 - F1 = IM product
• And many more combinations...

**Example:**
• Freq 1: 600.000 MHz
• Freq 2: 600.500 MHz
• IM Products: 599.500 MHz, 601.000 MHz, etc.

If an IM product lands on another receiver's frequency, you'll hear interference - often as a buzzing or heterodyne tone.

**The math gets exponential:** 4 transmitters can create 24+ IM products. 8 transmitters can create hundreds!`,
  action: null
}
```

### Step 5: Frequency Coordination Simulation
```javascript
{
  id: 5,
  title: 'Interactive Frequency Coordinator',
  content: `Now let's coordinate frequencies for your 4-channel system.

**Using the coordinator:**
1. Click on a wireless receiver
2. View available frequencies in the panel
3. Select a frequency from the "safe" list
4. Watch the IM calculator update in real-time

**The panel shows:**
• 🟢 Safe frequencies (no conflicts)
• 🟡 Marginal frequencies (close to IM products)
• 🔴 Conflict frequencies (on or near IM products)

Set all 4 receivers to compatible frequencies.`,
  action: {
    type: 'configure-frequency',
    target: 'wireless_rx',
    required: 4,
    hint: 'Assign frequencies to all 4 receivers using the coordination panel'
  }
}
```

### Step 6: Sync Transmitters
```javascript
{
  id: 6,
  title: 'Syncing Transmitters',
  content: `With receivers configured, sync your transmitters.

**Sync methods:**
• **IR Sync**: Point transmitter at receiver, press sync button
• **Manual**: Set frequency on transmitter display
• **Networked**: Use Wireless Workbench or similar

**Best practice:** Always verify TX frequency matches RX after sync.

Connect each transmitter to its corresponding receiver.`,
  action: {
    type: 'create-connection',
    connectionType: 'wireless',
    hint: 'Link each transmitter to its paired receiver'
  }
}
```

### Step 7: TV Channel Awareness
```javascript
{
  id: 7,
  title: 'Avoiding TV Broadcast Interference',
  content: `TV broadcasts are powerful signals that will interfere with wireless audio.

**The FCC Repack (2020):**
• TV stations moved to channels 2-36 (54-608 MHz)
• 600 MHz band (614-698 MHz) is now off-limits
• Always check local TV channels before choosing frequencies

**Tools for checking TV channels:**
• FCC White Space Database
• Shure Frequency Finder
• Sennheiser Frequency Finder
• Local TV station listings

**On the spectrum display:** Active TV channels appear as wide, flat-topped signals spanning 6 MHz each.`,
  action: {
    type: 'identify-tv-channels',
    hint: 'Click on the TV channel indicators on the spectrum display'
  }
}
```

### Step 8: Antenna Placement Basics
```javascript
{
  id: 8,
  title: 'Optimizing Antenna Placement',
  content: `Good antenna placement is as important as frequency coordination.

**Key principles:**
• **Line of sight**: Keep antennas visible from transmitter positions
• **Height**: Elevate antennas above crowd level (6+ feet)
• **Spacing**: Separate diversity antennas by 1/4 wavelength minimum
• **Distance**: Keep RX antennas away from TX antennas of IEM systems

**Avoid:**
• Metal structures between antenna and transmitter
• LED walls and video panels (RF noise sources)
• Placing antennas on the floor
• Running antenna cables next to power cables

**Rule of thumb:** "If you can see the stage, the antenna can see the transmitters."`,
  action: null
}
```

### Step 9: Test Your System
```javascript
{
  id: 9,
  title: 'System Check',
  content: `Let's verify your wireless system is working properly.

**Walkthrough test:**
1. Turn on all transmitters
2. Check RF signal strength on all receivers
3. Monitor for dropouts or interference
4. Check audio quality

Send a test signal through all 4 wireless channels to verify coordination.`,
  action: {
    type: 'send-signal',
    signalType: 'wireless-test',
    hint: 'Use "Test All Wireless" in the sidebar'
  }
}
```

### Step 10: Congratulations
```javascript
{
  id: 10,
  title: 'Lesson Complete!',
  content: `You've mastered UHF frequency coordination!

**Key takeaways:**
• Always scan the venue before selecting frequencies
• Intermodulation products must be calculated, not guessed
• TV channels are off-limits - check local broadcasts
• Antenna placement is critical for reliability
• Use coordination software for complex deployments

**Pro tip:** Save successful frequency plans for each venue - you can often reuse them.

**Next up:** Wireless Best Practices - Antenna systems, battery management, and backup strategies.`,
  action: null,
  isComplete: true
}
```

---

## Canvas Mockup: Frequency Coordination View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        UHF FREQUENCY COORDINATION                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SPECTRUM ANALYZER (470-608 MHz)                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │     TV14    TV15         TV20                   TV32    TV33           │ │
│  │   ┌─────┐ ┌─────┐      ┌─────┐               ┌─────┐ ┌─────┐          │ │
│  │   │█████│ │█████│      │█████│               │█████│ │█████│          │ │
│  │   │█████│ │█████│   ▲  │█████│    ▲     ▲    │█████│ │█████│          │ │
│  │ ▲ │█████│ │█████│   █  │█████│    █     █    │█████│ │█████│  ▲       │ │
│  │ █ │█████│ │█████│  ▲█▲ │█████│   ▲█▲   ▲█▲   │█████│ │█████│  █       │ │
│  │▄█▄│█████│ │█████│▄▄███▄│█████│▄▄▄███▄▄▄███▄▄▄│█████│ │█████│▄▄█▄▄     │ │
│  │▀▀▀│█████│ │█████│▀▀▀▀▀▀│█████│▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│█████│ │█████│▀▀▀▀▀     │ │
│  └───┴─────┴─┴─────┴──────┴─────┴───────────────┴─────┴─┴─────┴──────────┘ │
│   470      490      510      530      550      570      590      608       │
│                     MHz                                                      │
│        ▲ Your Frequencies    █ TV Channels    ▄ Noise Floor                │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  DEVICE LAYOUT                                                         │ │
│  │                                                                        │ │
│  │         📡                                                             │ │
│  │    Antenna Distro                                                      │ │
│  │    ────┬───┬───┬───┬────                                              │ │
│  │        │   │   │   │                                                   │ │
│  │   ┌────▼─┐ ┌─▼───┐ ┌─▼───┐ ┌─▼───┐                                    │ │
│  │   │📻 RX1│ │📻 RX2│ │📻 RX3│ │📻 RX4│                                    │ │
│  │   │518.4 │ │524.8 │ │531.2 │ │537.6 │  MHz                             │ │
│  │   │ ████ │ │ ████ │ │ ████ │ │ ████ │  Signal                          │ │
│  │   └──────┘ └──────┘ └──────┘ └──────┘                                  │ │
│  │      ⋮         ⋮         ⋮         ⋮    Wireless Link                  │ │
│  │      ⋮         ⋮         ⋮         ⋮                                   │ │
│  │   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                                  │ │
│  │   │🎤 TX1│ │🎤 TX2│ │🎤 TX3│ │🎙️ TX4│                                   │ │
│  │   │518.4 │ │524.8 │ │531.2 │ │537.6 │  MHz                             │ │
│  │   └──────┘ └──────┘ └──────┘ └──────┘                                  │ │
│  │   Handheld Handheld Handheld Bodypack                                  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Device Configuration Panel: Wireless Receiver

```
┌──────────────────────────────────────────┐
│ 📻 Wireless Receiver - CH 1              │
├──────────────────────────────────────────┤
│ ▼ FREQUENCY                              │
│   Current: [518.400] MHz                 │
│   Group: A  Channel: 04                  │
│                                          │
│   ┌──────────────────────────────────┐   │
│   │ FREQUENCY FINDER                 │   │
│   │ 🟢 518.400 MHz - Clear           │   │
│   │ 🟢 524.800 MHz - Clear           │   │
│   │ 🟢 531.200 MHz - Clear           │   │
│   │ 🟢 537.600 MHz - Clear           │   │
│   │ 🟡 542.000 MHz - Near IM         │   │
│   │ 🔴 544.200 MHz - TV Channel 27   │   │
│   │ 🔴 548.600 MHz - IM Conflict     │   │
│   └──────────────────────────────────┘   │
│                                          │
│ ▼ RF SIGNAL                              │
│   Strength: ████████░░ -32 dBm           │
│   Diversity: A ████░░  B ██████          │
│   Quality: Excellent ●                   │
│                                          │
│ ▼ AUDIO                                  │
│   Level: ██████░░░░ -12 dB               │
│   Mute: OFF ○                            │
│   Output: [Line ▼]                       │
│                                          │
│ ▼ TRANSMITTER STATUS                     │
│   Battery: ████████ 95% (4.5 hrs)        │
│   Muted: No                              │
│   Connected: ✓                           │
│                                          │
│ [SYNC TX]  [SCAN SPECTRUM]               │
└──────────────────────────────────────────┘
```

---

## Intermodulation Calculator Panel

```
┌──────────────────────────────────────────────────────────────────┐
│ 📊 INTERMODULATION CALCULATOR                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ACTIVE FREQUENCIES                      IM PRODUCTS              │
│ ┌──────────────────────────────┐       ┌──────────────────────┐  │
│ │ CH1: 518.400 MHz         ✓   │       │ 2A-B: 512.000 MHz    │  │
│ │ CH2: 524.800 MHz         ✓   │       │ 2B-A: 531.200 MHz ⚠️  │  │
│ │ CH3: 531.200 MHz         ✓   │       │ 2A-C: 505.600 MHz    │  │
│ │ CH4: 537.600 MHz         ✓   │       │ 2C-A: 544.000 MHz    │  │
│ │ + Add Frequency              │       │ 2B-C: 518.400 MHz ⚠️  │  │
│ └──────────────────────────────┘       │ 2C-B: 537.600 MHz ⚠️  │  │
│                                        │ ... and 18 more       │  │
│ COORDINATION STATUS                    └──────────────────────┘  │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ✓ All 4 frequencies are compatible                          │ │
│ │ ✓ No TV channel conflicts                                    │ │
│ │ ⚠️ 3 IM products within 200kHz of active frequencies        │ │
│ │   (Within tolerance - monitor for issues)                    │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ RECOMMENDED SPACING: 6.4 MHz minimum for this group             │
│                                                                  │
│ [RECALCULATE]  [EXPORT FREQ LIST]  [SAVE PLAN]                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Interactive Elements

### Spectrum Analyzer
- Real-time animated spectrum display
- Zoomable frequency range
- TV channel overlays with channel numbers
- Your frequency markers (clickable to select)
- Noise floor indicator
- Peak hold option

### Frequency Coordinator
- Drag-to-select frequencies on spectrum
- Real-time IM calculation (updates as you select)
- Color-coded frequency suggestions
- Export to common wireless workbench formats
- Save/load venue frequency plans

### Wireless Link Visualization
- Dashed animated lines for RF connections
- Signal strength affects line opacity
- Dropout simulation (link flickers red)
- Distance/range indicator

---

## Challenge Ideas

### Challenge 1: "4-Channel Comedy Show"
**Objective:** Coordinate 4 wireless handhelds
- Avoid TV channels 14, 15, 20
- All IM products must be 400kHz from active frequencies
- Successfully pass audio through all channels

### Challenge 2: "The Dense Venue"
**Objective:** Squeeze 8 channels into limited spectrum
- Only 12 MHz of clear spectrum available
- Avoid all intermodulation conflicts
- Maintain 200kHz minimum spacing

### Challenge 3: "Corporate Event"
**Objective:** Coordinate wireless for a complex show
- 4 handheld mics for presenters
- 4 lavalier mics for panelists
- 2 IEM channels for confidence monitors
- No interference on any channel

### Challenge 4: "Troubleshoot the Dropout"
**Objective:** Find and fix the interference source
- One channel is experiencing dropouts
- Identify the interfering signal on spectrum
- Move the frequency to a clear spot
