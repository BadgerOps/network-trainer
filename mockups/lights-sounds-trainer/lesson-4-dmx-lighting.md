# Lesson 4: DMX Lighting & Addressing

## Lesson Metadata
```javascript
{
  id: 'dmx-lighting-fundamentals',
  module: 4,
  title: 'DMX Lighting & Addressing',
  icon: '💡',
  difficulty: 'beginner',
  duration: '20 min',
  description: 'Learn DMX512 protocol, fixture addressing, universes, and basic lighting control'
}
```

---

## Learning Objectives

By the end of this lesson, users will be able to:
1. Understand how DMX512 protocol works
2. Calculate DMX addresses for fixtures
3. Avoid address conflicts
4. Use multiple DMX universes
5. Connect and troubleshoot DMX systems

---

## Step-by-Step Content

### Step 1: What is DMX512?
```javascript
{
  id: 1,
  title: 'Introduction to DMX',
  content: `DMX512 is the standard protocol for controlling stage lighting.

**DMX stands for:**
• **D**igital
• **M**ultiplex
• **512** channels per universe

**How it works:**
• A lighting console sends data to all fixtures on the line
• Each fixture listens for its assigned address
• Data is 8-bit: values from 0-255
• Refreshes up to 44 times per second

Think of DMX like a radio broadcast - one transmitter, many receivers, each tuned to their own "station" (address).`,
  action: null
}
```

### Step 2: Understanding DMX Channels
```javascript
{
  id: 2,
  title: 'Channels and Addresses',
  content: `Each DMX universe has 512 channels, numbered 1-512.

**Key concepts:**
• **Channel**: A single 8-bit value (0-255)
• **Address**: The starting channel for a fixture
• **Footprint**: How many channels a fixture uses

**Common fixture footprints:**
• Dimmer: 1 channel (intensity only)
• RGB LED: 3 channels (red, green, blue)
• RGBW LED: 4-5 channels (+ white, + dimmer)
• Moving Head: 16-40+ channels

**Example:**
An RGB LED fixture at address 1 uses channels 1, 2, 3.
The next fixture must start at address 4 or higher.`,
  action: null
}
```

### Step 3: Build a Basic Lighting Rig
```javascript
{
  id: 3,
  title: 'Setting Up Your Fixtures',
  content: `Let's build a simple lighting rig.

**Add these devices:**
• 1x Lighting Console
• 1x DMX Splitter
• 4x LED Par fixtures
• 2x Moving Head fixtures

The console controls everything. The splitter distributes the DMX signal to all fixtures.`,
  action: {
    type: 'add-devices',
    required: ['light_console', 'dmx_splitter', 'led_par', 'led_par', 'led_par', 'led_par', 'moving_head', 'moving_head'],
    hint: 'Add a console, splitter, 4 LED pars, and 2 moving heads'
  }
}
```

### Step 4: Connect the DMX Chain
```javascript
{
  id: 4,
  title: 'Wiring DMX',
  content: `DMX uses a daisy-chain topology.

**Connection order:**
• Console → Splitter (input)
• Splitter (outputs) → First fixture in each line
• Fixture → Next fixture → Next fixture...

**Important rules:**
• Use 5-pin XLR cables (not audio cables!)
• Maximum 32 fixtures per line without splitter
• Maximum cable length: 300m (1000ft) total
• Always use a DMX terminator on the last fixture

Connect your devices now.`,
  action: {
    type: 'create-connection',
    connectionType: 'dmx',
    required: [
      { from: 'light_console', to: 'dmx_splitter' },
      { from: 'dmx_splitter', to: 'led_par_1' },
      { from: 'led_par_1', to: 'led_par_2' },
      { from: 'dmx_splitter', to: 'moving_head_1' }
    ],
    hint: 'Connect console to splitter, then splitter outputs to fixture chains'
  }
}
```

### Step 5: Address Your Fixtures
```javascript
{
  id: 5,
  title: 'Setting DMX Addresses',
  content: `Now assign addresses to each fixture.

**Address planning:**
With 4 LED Pars (5ch each) and 2 Moving Heads (16ch each):

| Fixture | Channels | Start Address | End Address |
|---------|----------|---------------|-------------|
| LED Par 1 | 5 | 001 | 005 |
| LED Par 2 | 5 | 006 | 010 |
| LED Par 3 | 5 | 011 | 015 |
| LED Par 4 | 5 | 016 | 020 |
| Mover 1 | 16 | 101 | 116 |
| Mover 2 | 16 | 117 | 132 |

**Pro tip:** Leave gaps between fixture types for expansion.

Click each fixture to set its address.`,
  action: {
    type: 'configure-address',
    target: 'all-fixtures',
    hint: 'Set addresses for all fixtures in the configuration panel'
  }
}
```

### Step 6: Understanding Fixture Modes
```javascript
{
  id: 6,
  title: 'Fixture Personality Modes',
  content: `Most fixtures have multiple DMX modes (personalities).

**Example - Moving Head modes:**
• **16-channel mode**: Basic control
• **24-channel mode**: Adds fine movement
• **40-channel mode**: Full feature access

**Channel layout example (16ch Moving Head):**

| Channel | Function | Range |
|---------|----------|-------|
| 1 | Pan (coarse) | 0-255 |
| 2 | Pan (fine) | 0-255 |
| 3 | Tilt (coarse) | 0-255 |
| 4 | Tilt (fine) | 0-255 |
| 5 | Speed | 0-255 |
| 6 | Dimmer | 0-255 |
| 7 | Shutter | 0-255 |
| 8 | Color wheel | 0-255 |
| 9-16 | Gobo, prism, focus... | 0-255 |

**Important:** Console fixture library must match fixture mode!`,
  action: {
    type: 'configure-mode',
    target: 'moving_head_1',
    hint: 'Select the fixture mode from the dropdown in the config panel'
  }
}
```

### Step 7: Avoiding Address Conflicts
```javascript
{
  id: 7,
  title: 'Address Conflicts',
  content: `Address conflicts cause unpredictable behavior.

**What is a conflict?**
Two fixtures using the same DMX channel(s).

**Conflict example:**
• Fixture A at address 1 (5 channels: 1-5)
• Fixture B at address 3 (5 channels: 3-7)
• Channels 3, 4, 5 are shared - CONFLICT!

**Symptoms of conflicts:**
• Fixtures moving/changing unexpectedly
• Colors not matching
• Some channels not responding

**The canvas shows conflicts:**
• 🔴 Red highlight: Address conflict
• ⚠️ Warning icon: Overlapping channels

Click on a conflicting fixture to see which addresses overlap.`,
  action: {
    type: 'identify-conflict',
    hint: 'Look for red-highlighted fixtures indicating address conflicts'
  }
}
```

### Step 8: Multiple DMX Universes
```javascript
{
  id: 8,
  title: 'Expanding with Universes',
  content: `When you need more than 512 channels, add more universes.

**Universe numbering:**
• Universe 1: Channels 1-512
• Universe 2: Channels 1-512 (separate output)
• Universe 3, 4, 5... and so on

**Addressing notation:**
• "1.001" = Universe 1, Channel 1
• "2.256" = Universe 2, Channel 256

**Physical setup:**
Each universe needs its own DMX output from the console (or a network node).

**Typical organization:**
• Universe 1: Front wash fixtures
• Universe 2: Moving heads
• Universe 3: LED walls/pixels
• Universe 4: House lights`,
  action: {
    type: 'add-universe',
    hint: 'Add a second universe output from the console'
  }
}
```

### Step 9: sACN and Art-Net
```javascript
{
  id: 9,
  title: 'DMX over Network',
  content: `Modern shows use Ethernet to distribute DMX data.

**Protocols:**
• **sACN (E1.31)**: Simple, multicast, industry standard
• **Art-Net**: Older, unicast/broadcast, widely supported

**Benefits:**
• One cable carries hundreds of universes
• Network switches instead of splitters
• Remote monitoring and control
• Longer distances (no 300m limit)

**Network DMX flow:**
Console → Ethernet Switch → DMX Nodes → Fixtures

Each node converts network data back to DMX512 cables.

**Addressing in network DMX:**
Still use universe.channel format, but universes travel over IP instead of separate cables.`,
  action: null
}
```

### Step 10: Test Your Lighting Rig
```javascript
{
  id: 10,
  title: 'Verify Your Setup',
  content: `Let's test the complete DMX system.

**Testing procedure:**
1. Set all fixtures to full intensity
2. Verify each fixture responds individually
3. Check for any conflicts
4. Run a test sequence

Send DMX data to all fixtures to see them respond.`,
  action: {
    type: 'send-signal',
    signalType: 'dmx-test',
    hint: 'Use "Test All Fixtures" in the sidebar'
  }
}
```

### Step 11: Congratulations
```javascript
{
  id: 11,
  title: 'Lesson Complete!',
  content: `You've mastered DMX lighting fundamentals!

**Key takeaways:**
• DMX512 uses 512 channels per universe
• Each fixture needs a unique start address
• Footprint = number of channels a fixture uses
• Never overlap addresses between fixtures
• Use splitters for cable runs, nodes for network distribution

**Troubleshooting tips:**
• Flickering: Check cable connections, add terminator
• No response: Verify address and mode match console
• Wrong colors: Check RGB channel order in fixture profile
• Only some fixtures work: Check DMX chain continuity

**Next up:** Lighting Console Basics - Programming cues, timing, and effects.`,
  action: null,
  isComplete: true
}
```

---

## Canvas Mockup: DMX Lighting Rig

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DMX LIGHTING & ADDRESSING                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  UNIVERSE 1: FRONT WASH (20/512 channels used)                              │
│  ▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 4%                  │
│                                                                              │
│  ┌──────────────────┐                                                        │
│  │  🎛️ CONSOLE      │                                                        │
│  │  GrandMA3        │                                                        │
│  │  ─────────────   │                                                        │
│  │  [U1] [U2] [U3]  │ ◄── Universe outputs                                  │
│  └───────┬──────────┘                                                        │
│          │ DMX                                                               │
│          ▼                                                                   │
│  ┌──────────────────┐                                                        │
│  │  📤 DMX SPLITTER │                                                        │
│  │  ○ ○ ○ ○ ○ ○    │                                                        │
│  │  1 2 3 4 5 6    │ ◄── 6 isolated outputs                                 │
│  └──┬───┬───┬───┬──┘                                                        │
│     │   │   │   │                                                            │
│     │   │   │   └────────────────────────┐                                  │
│     │   │   └───────────────┐            │                                  │
│     │   └──────┐            │            │                                  │
│     ▼          ▼            ▼            ▼                                  │
│  ┌──────┐  ┌──────┐    ┌──────┐    ┌──────┐                                │
│  │💡 PAR│  │💡 PAR│    │💡 PAR│    │💡 PAR│                                │
│  │ #001 │──│ #006 │    │ #011 │    │ #016 │                                │
│  │ 5ch  │  │ 5ch  │    │ 5ch  │    │ 5ch  │                                │
│  │      │  │      │    │      │    │      │                                │
│  │[===] │  │[===] │    │[===] │    │[===] │  ◄── Color preview             │
│  └──────┘  └──────┘    └──────┘    └──────┘                                │
│                                                                              │
│  UNIVERSE 2: MOVING LIGHTS (32/512 channels used)                           │
│  ▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 6%                   │
│                                                                              │
│                    ┌──────────┐        ┌──────────┐                         │
│                    │🔦 MOVER  │        │🔦 MOVER  │                         │
│                    │   #101   │        │   #117   │                         │
│                    │  16ch    │        │  16ch    │                         │
│                    │    ◎     │        │    ◎     │ ◄── Beam direction      │
│                    │   ╱ ╲    │        │   ╱ ╲    │                         │
│                    └──────────┘        └──────────┘                         │
│                                                                              │
│  ═══ DMX Cable    ● Port (connected)    ○ Port (available)                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Device Configuration Panel: LED Par Fixture

```
┌──────────────────────────────────────────┐
│ 💡 LED Par - Unit 1                      │
├──────────────────────────────────────────┤
│ ▼ DMX ADDRESS                            │
│   Universe: [1 ▼]                        │
│   Address:  [001] (1-512)                │
│   Footprint: 5 channels                  │
│   Range: 001 - 005                       │
│                                          │
│   ADDRESS MAP:                           │
│   ┌─────────────────────────────────┐    │
│   │ 1  2  3  4  5  6  7  8  ...     │    │
│   │ ██ ██ ██ ██ ██ ░░ ░░ ░░        │    │
│   └─────────────────────────────────┘    │
│   ██ = In use  ░░ = Available            │
│                                          │
│ ▼ FIXTURE MODE                           │
│   Mode: [5-Channel RGBWD ▼]              │
│                                          │
│   CH1: Red        [████████░░] 200       │
│   CH2: Green      [██████░░░░] 150       │
│   CH3: Blue       [░░░░░░░░░░] 0         │
│   CH4: White      [████░░░░░░] 100       │
│   CH5: Dimmer     [██████████] 255       │
│                                          │
│ ▼ PREVIEW                                │
│   ┌─────────────────────────────────┐    │
│   │                                 │    │
│   │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │    │
│   │      ▓▓ WARM AMBER ▓▓          │    │
│   │      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │    │
│   │                                 │    │
│   └─────────────────────────────────┘    │
│                                          │
│ ▼ STATUS                                 │
│   DMX Signal: ● Receiving                │
│   Last Update: 23ms ago                  │
│   Errors: None                           │
│                                          │
│ [LOCATE]  [BLACKOUT]  [FULL]             │
└──────────────────────────────────────────┘
```

---

## Address Calculator Panel

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 📊 DMX ADDRESS CALCULATOR                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ UNIVERSE 1 ADDRESS MAP                                                       │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │001-005 LED Par 1     ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │006-010 LED Par 2     ░░░░░░██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │011-015 LED Par 3     ░░░░░░░░░░░░██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │016-020 LED Par 4     ░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │021-512 (Available)   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ UNIVERSE 2 ADDRESS MAP                                                       │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │101-116 Moving Head 1 ░░░░░░░░░░░░░░░░░░░░████████████████░░░░░░░░░░░░░░│ │
│ │117-132 Moving Head 2 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████████│ │
│ │001-100 (Available)   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ FIXTURE LIST                                        QUICK ACTIONS            │
│ ┌────────────────────────────────────────────┐     ┌─────────────────────┐  │
│ │ Fixture        │ U  │ Addr  │ Foot │ Status│     │ [Auto-Address All]  │  │
│ │────────────────┼────┼───────┼──────┼───────│     │ [Check Conflicts]   │  │
│ │ LED Par 1      │ 1  │ 001   │ 5    │ ✓     │     │ [Export Patch]      │  │
│ │ LED Par 2      │ 1  │ 006   │ 5    │ ✓     │     │ [Import Patch]      │  │
│ │ LED Par 3      │ 1  │ 011   │ 5    │ ✓     │     └─────────────────────┘  │
│ │ LED Par 4      │ 1  │ 016   │ 5    │ ✓     │                              │
│ │ Moving Head 1  │ 2  │ 101   │ 16   │ ✓     │     STATISTICS               │
│ │ Moving Head 2  │ 2  │ 117   │ 16   │ ✓     │     Universes: 2             │
│ │                │    │       │      │       │     Fixtures: 6              │
│ └────────────────┴────┴───────┴──────┴───────┘     Channels: 52/1024        │
│                                                                              │
│ ⚠️ No conflicts detected                                                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Interactive Elements

### DMX Signal Visualization
- Animated data flow on DMX cables (purple dots)
- Speed indicates refresh rate
- Data direction arrows
- Connection status colors (green=active, red=no signal)

### Fixture Response Preview
- Real-time color/intensity display on fixtures
- Moving heads show pan/tilt position
- Beam preview (cone of light)
- Strobe/effect visualization

### Address Conflict Detection
- Automatic conflict detection
- Red highlight on conflicting fixtures
- Conflict details in tooltip
- One-click auto-fix suggestion

### Universe Capacity Meter
- Visual bar showing channel utilization
- Color coding (green=healthy, yellow=crowded, red=near limit)
- Hover to see detailed breakdown
- Drag fixtures between universes

---

## Challenge Ideas

### Challenge 1: "Basic Rig Address"
**Objective:** Address 8 LED pars correctly
- No overlapping addresses
- All fixtures respond to console
- Use standard 5-channel mode

### Challenge 2: "Find the Conflict"
**Objective:** Diagnose address problems
- Pre-configured rig with hidden conflicts
- Identify all conflicting fixtures
- Reassign addresses to fix

### Challenge 3: "Multi-Universe Setup"
**Objective:** Build a rig across 2 universes
- Universe 1: 24 LED wash fixtures
- Universe 2: 8 moving heads
- Universe utilization under 80%

### Challenge 4: "From Patch Sheet to Reality"
**Objective:** Match a given address plan
- Provided patch sheet with all addresses
- Configure fixtures to match exactly
- Test each fixture responds correctly

### Challenge 5: "Network DMX Conversion"
**Objective:** Convert a DMX rig to sACN
- Replace splitters with network nodes
- Maintain same addressing
- Verify all fixtures still work
