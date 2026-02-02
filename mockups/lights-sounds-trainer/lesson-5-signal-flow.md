# Lesson 5: Stage Signal Flow & Patching

## Lesson Metadata
```javascript
{
  id: 'stage-signal-flow',
  module: 5,
  title: 'Stage Signal Flow & Patching',
  icon: '🔀',
  difficulty: 'intermediate',
  duration: '25 min',
  description: 'Master the complete signal path from stage to speakers, including patch bays, splits, and system design'
}
```

---

## Learning Objectives

By the end of this lesson, users will be able to:
1. Trace signal flow from source to destination
2. Use audio splits for multiple destinations
3. Configure patch bays and tie lines
4. Design a complete PA system layout
5. Troubleshoot signal flow problems

---

## Step-by-Step Content

### Step 1: The Big Picture
```javascript
{
  id: 1,
  title: 'Understanding Complete Signal Flow',
  content: `A live production signal chain has many stages between source and audience.

**Complete audio signal path:**

**STAGE**
Microphones/DIs → Stage Box → Analog/Digital Split

**TRANSPORT**
→ FOH Snake/Dante Network →

**FRONT OF HOUSE**
→ FOH Mixer → Processing → Amplifiers → Main PA

**MONITORS**
→ Monitor Mixer → Amp/Powered → Stage Monitors/IEMs

**BROADCAST/RECORDING**
→ Recording Interface → Multitrack System

Each path must be planned, connected, and verified. Missing one connection breaks the entire chain.`,
  action: null
}
```

### Step 2: Input Sources
```javascript
{
  id: 2,
  title: 'Starting at the Source',
  content: `Every signal chain starts with input sources.

**Microphone types:**
• **Dynamic**: Rugged, no phantom power needed (SM58, SM57)
• **Condenser**: Sensitive, requires 48V phantom power
• **Ribbon**: Delicate, never apply phantom power!

**Direct inputs:**
• **DI Box**: Converts high-Z instrument to low-Z balanced
• **Active DI**: Requires power, handles hot signals better
• **Passive DI**: No power, natural sound

**Line-level sources:**
• Keyboards, playback devices, effects processors
• Already at line level, may need isolation/balancing

Let's add some input sources to our stage.`,
  action: {
    type: 'add-devices',
    required: ['microphone', 'microphone', 'di_box', 'keyboard', 'wireless_rx'],
    hint: 'Add various input sources to the stage area'
  }
}
```

### Step 3: The Stage Box
```javascript
{
  id: 3,
  title: 'Consolidating Inputs: The Stage Box',
  content: `Stage boxes collect all inputs into one location.

**Stage box functions:**
• Consolidate many inputs into one multi-pair cable
• Provide phantom power distribution
• Often include splitter transformers
• May have local headphone monitoring

**Analog vs Digital:**
• **Analog stage box**: Sends analog audio via copper snake
• **Digital stage box**: Converts to Dante/AES50/MADI at stage

**Typical configurations:**
• 16x4: 16 inputs, 4 returns
• 32x8: 32 inputs, 8 returns
• 48x16: 48 inputs, 16 returns

Connect your sources to the stage box.`,
  action: {
    type: 'add-devices',
    required: ['stagebox'],
    hint: 'Add a stage box and connect all inputs to it'
  }
}
```

### Step 4: The Audio Split
```javascript
{
  id: 4,
  title: 'Splitting the Signal',
  content: `Audio splits send one input to multiple destinations.

**Why split?**
• FOH and monitors need the same inputs
• Broadcast/recording needs isolated feeds
• Multiple mix positions (delay towers, etc.)

**Split types:**
• **Y-split**: Simple cable split (shares phantom power - risky!)
• **Passive split**: Transformer isolated, no phantom sharing
• **Active split**: Powered, can add gain, best isolation

**Split configurations:**
• 2-way: FOH + Monitors
• 3-way: FOH + Monitors + Broadcast
• 4-way: Add recording or delay tower

**Important:** Always coordinate phantom power between splits!

Add a splitter to your system.`,
  action: {
    type: 'add-devices',
    required: ['audio_split'],
    hint: 'Add an audio splitter between stage box and destinations'
  }
}
```

### Step 5: Route to FOH
```javascript
{
  id: 5,
  title: 'Front of House Signal Path',
  content: `The FOH path delivers audio to the main PA system.

**FOH signal chain:**
Split output → Snake/Network → FOH Mixer → System Processor → Amplifiers → Main PA

**Key components:**

**FOH Mixer:**
• Main mix for audience
• Effects processing
• Subgroup/VCA organization

**System Processor:**
• Crossover (splits highs/lows)
• Limiting (protects speakers)
• EQ (room correction)
• Delay (time alignment)

**Amplifiers:**
• Match power to speakers
• Separate amps for subs, mids, highs

**Main PA:**
• Line arrays or point source
• Subwoofers
• Front fills for near audience

Connect your FOH chain.`,
  action: {
    type: 'create-connection',
    required: [
      { from: 'audio_split', to: 'mixer_foh' },
      { from: 'mixer_foh', to: 'system_processor' },
      { from: 'system_processor', to: 'amplifier' },
      { from: 'amplifier', to: 'main_pa' }
    ],
    hint: 'Build the complete FOH signal path'
  }
}
```

### Step 6: Monitor World
```javascript
{
  id: 6,
  title: 'Stage Monitor Signal Path',
  content: `Monitor world provides audio back to performers.

**Monitor options:**

**Wedge monitors:**
• Floor monitors facing performers
• Each mix is a separate output
• Typically 6-12 separate mixes

**In-ear monitors (IEMs):**
• Personal mix via wireless earpieces
• Stereo capability for spatial positioning
• Better hearing protection
• Requires wireless transmitters

**Side fills:**
• Large speakers at stage edges
• Supplements wedges/IEMs
• Gives "feel" of the PA

**Monitor signal path:**
Split → Monitor Mixer → (Crossover for wedges) → Amp/Powered → Wedge/IEM TX

Add monitor equipment to your system.`,
  action: {
    type: 'add-devices',
    required: ['mixer_mon', 'wedge_monitor', 'wedge_monitor', 'iem_tx'],
    hint: 'Add monitor mixer, wedge monitors, and IEM system'
  }
}
```

### Step 7: Recording/Broadcast Feeds
```javascript
{
  id: 7,
  title: 'Recording and Broadcast',
  content: `Recording and broadcast require clean, isolated feeds.

**Recording options:**

**Multitrack recording:**
• Every channel recorded separately
• Maximum flexibility in post-production
• Requires high channel-count interface

**Stereo/Stem recording:**
• Mix or submixes recorded
• Smaller file sizes
• Less post flexibility

**Broadcast feeds:**

**Program feed:**
• Mixed output ready for broadcast
• Properly limited and compressed

**Clean feed:**
• Without announcer/commentary
• For international broadcasts

**ISO feeds:**
• Individual inputs for broadcast mixing
• Similar to multitrack

Add a recording interface to capture the show.`,
  action: {
    type: 'add-devices',
    required: ['recording_interface'],
    hint: 'Add a recording interface connected to the split'
  }
}
```

### Step 8: Patch Bays and Tie Lines
```javascript
{
  id: 8,
  title: 'Flexible Routing with Patch Bays',
  content: `Patch bays allow quick reconfiguration of signal routing.

**Patch bay configurations:**
• **Full-normal**: Top and bottom connected by default
• **Half-normal**: Connection broken when patching bottom
• **Non-normal**: No default connection, must patch everything

**Common uses:**
• Insert points for outboard gear
• Alternative routing options
• Quick troubleshooting access
• Tie lines between locations

**Tie lines:**
Permanent cables between venues or rooms that can be patched as needed.

**Example:**
Main room has 8 tie lines to green room. Patch bay allows assigning any channels to those lines instantly.`,
  action: {
    type: 'add-devices',
    required: ['patch_bay'],
    hint: 'Add a patch bay for flexible routing'
  }
}
```

### Step 9: Complete System Design
```javascript
{
  id: 9,
  title: 'Putting It All Together',
  content: `Let's verify your complete system design.

**System checklist:**

✓ **Inputs**: All sources connected to stage box
✓ **Split**: Signal divided for all destinations
✓ **FOH Path**: Split → Mixer → Processing → Amps → PA
✓ **Monitor Path**: Split → Mon Mixer → Wedges/IEMs
✓ **Recording**: Isolated feed to recording interface
✓ **Patch Bay**: Flexible routing configured

**Signal flow validation:**
• Trace each input from source to final destination
• Verify no breaks in the chain
• Check phantom power paths
• Confirm split isolation

Your canvas should show the complete system with all signal paths.`,
  action: {
    type: 'verify-system',
    hint: 'Use the "Validate System" button to check all connections'
  }
}
```

### Step 10: Test the Complete System
```javascript
{
  id: 10,
  title: 'Full System Test',
  content: `Now let's test audio flow through the entire system.

**Test procedure:**

1. **Line check**: Send tone through each input
2. **FOH verify**: Confirm signal reaches main PA
3. **Monitor verify**: Confirm signal reaches each monitor mix
4. **Recording verify**: Confirm signal reaches recorder

Watch the signal flow animate through all paths simultaneously.`,
  action: {
    type: 'send-signal',
    signalType: 'system-test',
    hint: 'Run a full system test from the sidebar'
  }
}
```

### Step 11: Congratulations
```javascript
{
  id: 11,
  title: 'Lesson Complete!',
  content: `Outstanding! You've mastered stage signal flow and patching!

**Key takeaways:**
• Signal flows from source → stage box → split → destinations
• Splits allow one input to feed multiple systems
• FOH, monitors, and recording have separate paths
• Patch bays provide flexible routing
• Every connection must be verified

**Troubleshooting guide:**
• No signal at FOH? Check split and snake routing
• Feedback in monitors? Verify correct mix assignment
• Hum/buzz? Check ground lifts and cable shielding
• One channel missing? Trace from source to destination

**Pro tip:** Always do a complete line check before the show, verifying every input at every destination.

**You've completed the core curriculum!** Ready for advanced challenges?`,
  action: null,
  isComplete: true
}
```

---

## Canvas Mockup: Complete Stage System

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           STAGE SIGNAL FLOW & PATCHING                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ╔═══════════════════════════════════════════════════════════════════════════════╗  │
│  ║  STAGE                                                                        ║  │
│  ║                                                                               ║  │
│  ║  🎤     🎤     🎤     🎤        🎸      🎹                                   ║  │
│  ║  Vox1  Vox2  Drum1  Drum2     Bass    Keys                                   ║  │
│  ║   │     │     │      │         │       │                                     ║  │
│  ║   │     │     │      │         │       │                                     ║  │
│  ║   ▼     ▼     ▼      ▼         ▼       ▼                                     ║  │
│  ║  ┌─────────────────────────────────────────────┐                              ║  │
│  ║  │            📦 STAGE BOX (32x8)              │                              ║  │
│  ║  │   IN: ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●     │                              ║  │
│  ║  │  OUT: ○ ○ ○ ○ ○ ○ ○ ○                      │                              ║  │
│  ║  └─────────────────────┬───────────────────────┘                              ║  │
│  ║                        │                                                      ║  │
│  ║    🔊 Wedge    🔊 Wedge │          🎧 IEM TX                                  ║  │
│  ║      Mix 1      Mix 2  │            Mix 3-4                                   ║  │
│  ╚════════════════════════╪══════════════════════════════════════════════════════╝  │
│                           │                                                          │
│                           │ SNAKE / DANTE NETWORK                                    │
│                           ▼                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                        🔀 AUDIO SPLIT (3-Way)                                  │ │
│  │                    ┌────────┴────────┴────────┐                               │ │
│  │                    │         │                │                                │ │
│  └────────────────────┼─────────┼────────────────┼────────────────────────────────┘ │
│                       │         │                │                                   │
│      ┌────────────────┘         │                └────────────────┐                  │
│      ▼                          ▼                                 ▼                  │
│  ┌──────────┐              ┌──────────┐                     ┌──────────┐            │
│  │🎚️ FOH    │              │🎚️ MON    │                     │💾 REC    │            │
│  │ MIXER    │              │ MIXER    │                     │INTERFACE │            │
│  │  32ch    │              │  32ch    │                     │  32ch    │            │
│  └────┬─────┘              └────┬─────┘                     └────┬─────┘            │
│       │                         │                                │                   │
│       ▼                         │                                ▼                   │
│  ┌──────────┐              ┌────┴────────────┐             ┌──────────┐             │
│  │⚙️ SYSTEM │              │                 │             │💻 DAW    │             │
│  │PROCESSOR │              ▼                 ▼             │Recording │             │
│  └────┬─────┘         ┌────────┐       ┌────────┐          └──────────┘             │
│       │               │🔊 WDG 1│       │🔊 WDG 2│                                    │
│  ┌────┴────┐          └────────┘       └────────┘                                    │
│  │         │               ▲                ▲                                        │
│  ▼         ▼               └────────────────┘                                        │
│ ┌───┐   ┌───┐              To Stage Monitors                                         │
│ │🔊 │   │🔊 │                                                                        │
│ │AMP│   │AMP│   AUDIENCE AREA                                                        │
│ └─┬─┘   └─┬─┘   🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑                                          │
│   │       │                                                                          │
│   ▼       ▼                                                                          │
│ ┌───┐   ┌───┐                                                                        │
│ │🔈 │   │🔈 │   ◄── Main PA (L/R)                                                   │
│ │L  │   │R  │                                                                        │
│ └───┘   └───┘                                                                        │
│                                                                                      │
│  ━━ Audio signal   ┄┄ Returns   ●Connected  ○Available                              │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Signal Flow Diagram Panel

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🔀 SIGNAL FLOW DIAGRAM                                                               │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  INPUT SOURCES          STAGE BOX        SPLIT           DESTINATIONS               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     ┌─────────► FOH MIXER           │
│  🎤 Vox 1 ─────────► CH1 ─────────► SPLIT ─────────┼─────────► MON MIXER           │
│                                                     └─────────► RECORDER            │
│                                                     ┌─────────► FOH MIXER           │
│  🎤 Vox 2 ─────────► CH2 ─────────► SPLIT ─────────┼─────────► MON MIXER           │
│                                                     └─────────► RECORDER            │
│                                                     ┌─────────► FOH MIXER           │
│  🥁 Kick ──────────► CH3 ─────────► SPLIT ─────────┼─────────► MON MIXER           │
│                                                     └─────────► RECORDER            │
│                                                     ┌─────────► FOH MIXER           │
│  🥁 Snare ─────────► CH4 ─────────► SPLIT ─────────┼─────────► MON MIXER           │
│                                                     └─────────► RECORDER            │
│                                                                                      │
│  ... (expandable for all channels)                                                   │
│                                                                                      │
│  RETURN PATHS                                                                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                                      │
│  MON MIXER ──► Mix 1 ──► Stagebox ──► Wedge 1 (Drummer)                             │
│  MON MIXER ──► Mix 2 ──► Stagebox ──► Wedge 2 (Vocalist)                            │
│  MON MIXER ──► Mix 3 ──► IEM TX ──► (Wireless to bassist)                           │
│  MON MIXER ──► Mix 4 ──► IEM TX ──► (Wireless to guitarist)                         │
│                                                                                      │
│  FOH MIXER ──► Main L/R ──► System Proc ──► Amps ──► Main PA                        │
│  FOH MIXER ──► Sub ──► System Proc ──► Sub Amp ──► Subs                             │
│                                                                                      │
│  [HIGHLIGHT PATH]  [TRACE SIGNAL]  [FIND BREAK]  [EXPORT DIAGRAM]                   │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Device Configuration Panel: Audio Split

```
┌──────────────────────────────────────────┐
│ 🔀 Audio Split - 32ch 3-Way              │
├──────────────────────────────────────────┤
│ ▼ SPLIT CONFIGURATION                    │
│   Type: [Active Isolated ▼]              │
│   Channels: 32                           │
│   Ways: 3 (FOH, MON, REC)                │
│                                          │
│ ▼ OUTPUT ASSIGNMENTS                     │
│   ┌────────────────────────────────────┐ │
│   │ Output A: FOH Console      [●]     │ │
│   │   Gain: [+0dB ▼]                   │ │
│   │   Ground Lift: [OFF ▼]             │ │
│   │                                    │ │
│   │ Output B: Monitor Console  [●]     │ │
│   │   Gain: [+0dB ▼]                   │ │
│   │   Ground Lift: [OFF ▼]             │ │
│   │                                    │ │
│   │ Output C: Recording        [●]     │ │
│   │   Gain: [+0dB ▼]                   │ │
│   │   Ground Lift: [ON ▼]              │ │
│   └────────────────────────────────────┘ │
│                                          │
│ ▼ PHANTOM POWER                          │
│   Source: [Input ▼]                      │
│   ⚠️ Phantom passes through all outputs │
│   at 30mA per channel                    │
│                                          │
│ ▼ SIGNAL PRESENCE                        │
│   CH 1:  ████░░  CH 9:  ██░░░░           │
│   CH 2:  ███░░░  CH 10: ░░░░░░           │
│   CH 3:  █████░  CH 11: ██████           │
│   CH 4:  ████░░  CH 12: ███░░░           │
│   ...                                    │
│                                          │
│ [TEST ALL]  [ISOLATE CH]  [MUTE OUTPUT]  │
└──────────────────────────────────────────┘
```

---

## Interactive Elements

### Signal Flow Animation
- Animated dots flowing along all signal paths
- Color indicates signal level (green/yellow/red)
- Bidirectional flows for returns
- Speed indicates presence (slow = low level)

### Path Tracing
- Click any input to highlight its complete path
- All destinations for that input illuminate
- Dim unrelated connections
- Trace reverse from output to source

### Break Detection
- Click "Find Breaks" to test connectivity
- Missing connections flash red
- Suggests connections to complete paths
- Validates split routing

### Patch Bay Interaction
- Click to patch/unpatch connections
- Shows normalled connections
- Patch cord visualization
- Quick patch presets

---

## Challenge Ideas

### Challenge 1: "Festival Stage Setup"
**Objective:** Build a complete festival stage
- 32 input channels
- 3-way split (FOH, MON, Broadcast)
- 8 monitor mixes
- Full FOH PA system
- Test all signal paths

### Challenge 2: "Find the Fault"
**Objective:** Diagnose a broken signal path
- System has missing audio on several channels
- Identify all broken connections
- Repair the signal paths
- Verify with system test

### Challenge 3: "Quick Changeover"
**Objective:** Reconfigure for a different act
- Start with Rock Band setup
- Reconfigure for Jazz Quartet
- Different input list
- Different monitor requirements
- Time limit: 5 minutes

### Challenge 4: "Broadcast Integration"
**Objective:** Add broadcast to existing system
- Existing FOH + Monitor system
- Add isolated broadcast split
- Provide program feed
- Provide ISO feeds
- No disruption to existing audio

### Challenge 5: "Troubleshooting Marathon"
**Objective:** Fix multiple system issues
- Ground loop hum on channel 5
- No signal to monitor wedge 3
- Clipping on broadcast feed
- Phantom power conflict
- Fix all issues to pass
