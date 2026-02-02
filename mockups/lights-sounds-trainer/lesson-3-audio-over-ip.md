# Lesson 3: Audio over IP (Dante/AES67)

## Lesson Metadata
```javascript
{
  id: 'audio-over-ip-basics',
  module: 3,
  title: 'Audio over IP: Dante & AES67',
  icon: '🌐',
  difficulty: 'intermediate',
  duration: '25 min',
  description: 'Learn network audio routing, device discovery, channel subscriptions, and clock synchronization'
}
```

---

## Learning Objectives

By the end of this lesson, users will be able to:
1. Understand how audio travels over IP networks
2. Configure Dante devices and subscriptions
3. Manage clock sources and synchronization
4. Design redundant audio networks
5. Troubleshoot common AoIP issues

---

## Step-by-Step Content

### Step 1: What is Audio over IP?
```javascript
{
  id: 1,
  title: 'Audio Networking Revolution',
  content: `Audio over IP (AoIP) transmits digital audio over standard Ethernet networks.

**Why AoIP?**
• **Reduced cabling**: One Cat6 cable replaces dozens of analog snakes
• **Flexibility**: Route any input to any output instantly
• **Scalability**: Add channels by adding devices, not cables
• **Integration**: Audio, video, and control on one network

**Popular AoIP protocols:**
• **Dante**: Industry standard, easy to use
• **AES67**: Open standard for interoperability
• **AVB**: IEEE standard with guaranteed bandwidth
• **Ravenna**: AES67-compatible, used in broadcast

Think of it like email for audio - any device can send audio to any other device on the network.`,
  action: null
}
```

### Step 2: Dante Fundamentals
```javascript
{
  id: 2,
  title: 'How Dante Works',
  content: `Dante uses standard IP networking to transport audio.

**Key concepts:**
• **Transmit (TX)**: Device sends audio channels to the network
• **Receive (RX)**: Device subscribes to channels from other devices
• **Multicast**: One-to-many audio distribution
• **Unicast**: Point-to-point audio for efficiency

**Network requirements:**
• Gigabit Ethernet (1Gbps minimum)
• Managed switches recommended
• QoS (Quality of Service) configured
• Separate VLAN for audio (best practice)

**Latency options:**
• 0.25ms: Low latency (local connections)
• 0.5ms: Default (recommended)
• 1.0ms: Network spans with switches
• 5.0ms: Large networks or WiFi bridges`,
  action: null
}
```

### Step 3: Build a Dante Network
```javascript
{
  id: 3,
  title: 'Setting Up Your Dante Network',
  content: `Let's build a basic Dante audio network.

**Add these devices:**
• 1x Dante-enabled Switch
• 1x Digital Mixer (Dante)
• 1x Stage Box (Dante)
• 1x Recording Interface (Dante)

**Physical connections:**
Connect all Dante devices to the switch with Ethernet cables.`,
  action: {
    type: 'add-devices',
    required: ['dante_switch', 'mixer_dante', 'stagebox_dante', 'dante_interface'],
    hint: 'Add a switch, mixer, stage box, and recording interface'
  }
}
```

### Step 4: Connect the Network
```javascript
{
  id: 4,
  title: 'Physical Network Connections',
  content: `Connect all devices to the Dante switch.

**Best practices:**
• Use Cat6 or Cat6a cables
• Keep cable runs under 100 meters
• Label all cables clearly
• Use different colored cables for primary/secondary networks

**Connection type:**
Unlike analog audio where you connect inputs to outputs, with Dante you connect devices to the network - routing happens in software.`,
  action: {
    type: 'create-connection',
    connectionType: 'ethernet',
    required: [
      { from: 'mixer_dante', to: 'dante_switch' },
      { from: 'stagebox_dante', to: 'dante_switch' },
      { from: 'dante_interface', to: 'dante_switch' }
    ],
    hint: 'Connect all Dante devices to the network switch'
  }
}
```

### Step 5: Device Discovery
```javascript
{
  id: 5,
  title: 'Dante Controller',
  content: `Dante Controller is the software for managing Dante networks.

**Device discovery:**
When devices connect, they automatically appear in Dante Controller.

**What you see:**
• Device names (customizable)
• Channel counts (TX and RX)
• Sample rate and latency settings
• Network status and clock info

**The matrix view:**
• Rows = Receive channels (destinations)
• Columns = Transmit channels (sources)
• Click intersections to create subscriptions

Watch the devices appear as they connect to the network.`,
  action: {
    type: 'view-panel',
    panel: 'dante-controller',
    hint: 'Open the Dante Controller panel to see discovered devices'
  }
}
```

### Step 6: Creating Subscriptions
```javascript
{
  id: 6,
  title: 'Routing Audio with Subscriptions',
  content: `In Dante, receivers "subscribe" to transmitter channels.

**Creating a subscription:**
1. Find the source device's TX channel (column)
2. Find the destination device's RX channel (row)
3. Click the intersection to subscribe
4. A green checkmark appears when audio flows

**Let's route audio:**
• Stage Box channels 1-16 → Mixer inputs 1-16
• Mixer outputs → Recording Interface inputs

**Subscription states:**
• ✓ (Green): Audio flowing
• ⏳ (Yellow): Subscription pending
• ✕ (Red): Subscription failed`,
  action: {
    type: 'create-subscription',
    subscriptions: [
      { from: 'stagebox:1-16', to: 'mixer:1-16' },
      { from: 'mixer:L-R', to: 'recorder:1-2' }
    ],
    hint: 'Use the Dante matrix to route stage box to mixer, and mixer to recorder'
  }
}
```

### Step 7: Clock Synchronization
```javascript
{
  id: 7,
  title: 'The Clock Source',
  content: `All Dante devices must share a common clock to stay synchronized.

**Why clocking matters:**
Digital audio is sampled at precise intervals (e.g., 48,000 times per second). If devices disagree on timing, you get clicks, pops, and distortion.

**Dante clocking:**
• One device is the **Clock Master**
• All other devices sync to the master
• Automatic failover if master disconnects

**Clock Master selection:**
• Dante auto-selects the best clock
• You can force a preferred master
• External clock input (Word Clock) is highest priority

**Look for:**
• 👑 Crown icon: Clock Master
• 🔗 Link icon: Synced to master
• ⚠️ Warning: Clock issues`,
  action: {
    type: 'configure-clock',
    target: 'mixer_dante',
    hint: 'Set the mixer as the preferred clock master'
  }
}
```

### Step 8: Redundant Networking
```javascript
{
  id: 8,
  title: 'Building Redundancy',
  content: `Professional Dante systems use dual network paths for reliability.

**Primary and Secondary networks:**
• Devices have two Ethernet ports
• Primary carries audio normally
• Secondary takes over if primary fails
• Switchover is automatic and seamless

**Redundancy modes:**
• **Redundant**: Identical audio on both networks
• **Switched**: Secondary only on failure (lower bandwidth)

**Implementation:**
• Use two separate switches
• Keep cable paths physically separate
• Test failover regularly`,
  action: {
    type: 'add-device',
    deviceType: 'dante_switch',
    hint: 'Add a second switch for redundancy and connect secondary ports'
  }
}
```

### Step 9: Sample Rates and Latency
```javascript
{
  id: 9,
  title: 'Configuring Sample Rate and Latency',
  content: `All devices on a Dante network must use the same sample rate.

**Sample rates:**
• **44.1 kHz**: CD quality, music playback
• **48 kHz**: Standard for live sound and broadcast
• **96 kHz**: High-resolution recording

**Latency settings:**
Latency is the delay from input to output.

| Setting | Use Case |
|---------|----------|
| 0.25ms | Single switch, no hops |
| 0.5ms | 1-2 switches, recommended |
| 1.0ms | 3+ switches or long cables |
| 5.0ms | Very large networks |

**Pro tip:** Lower latency = more CPU and network load. Use the highest latency your application allows.`,
  action: {
    type: 'configure-device',
    target: 'all',
    settings: { sampleRate: 48000, latency: 0.5 },
    hint: 'Set all devices to 48kHz sample rate and 0.5ms latency'
  }
}
```

### Step 10: Test Your Network
```javascript
{
  id: 10,
  title: 'Verify Audio Flow',
  content: `Let's test the complete Dante network.

**Test checklist:**
✓ All devices discovered
✓ Clock master established
✓ Subscriptions active (green checkmarks)
✓ Sample rates matched
✓ Audio levels visible

Send a test signal through the network to verify routing.`,
  action: {
    type: 'send-signal',
    signalType: 'dante-test',
    hint: 'Send a test tone from the stage box through to the recorder'
  }
}
```

### Step 11: Congratulations
```javascript
{
  id: 11,
  title: 'Lesson Complete!',
  content: `You've learned the fundamentals of Audio over IP with Dante!

**Key takeaways:**
• Dante simplifies audio routing with network-based subscriptions
• All devices must share a common clock source
• Redundant networks provide reliability for critical applications
• Sample rate and latency must be configured consistently
• Dante Controller is your central management tool

**Troubleshooting tips:**
• No devices appearing? Check switch and VLAN configuration
• Audio clicking/popping? Check clock synchronization
• High latency? Reduce network hops or increase latency setting
• Subscription failed? Verify sample rates match

**Next up:** AVB and Other Protocols - Understanding the broader AoIP ecosystem.`,
  action: null,
  isComplete: true
}
```

---

## Canvas Mockup: Dante Network View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AUDIO OVER IP - DANTE NETWORK                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                          ┌──────────────────────┐                            │
│                          │   🌐 DANTE SWITCH    │                            │
│                          │   Primary Network    │                            │
│                          │  ● ● ● ● ● ● ● ●    │                            │
│                          │  1 2 3 4 5 6 7 8    │                            │
│                          └──────┬───┬───┬──────┘                            │
│                                 │   │   │                                    │
│                    ┌────────────┘   │   └────────────┐                      │
│                    │                │                │                       │
│              ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐                  │
│              │🎚️ MIXER   │   │📦 STAGEBOX │   │💾 RECORDER│                  │
│              │           │   │           │   │           │                  │
│              │ 👑 MASTER │   │ 🔗 SYNCED  │   │ 🔗 SYNCED  │                  │
│              │ TX: 32ch  │   │ TX: 32ch  │   │ TX: 2ch   │                  │
│              │ RX: 32ch  │   │ RX: 16ch  │   │ RX: 32ch  │                  │
│              │ 48kHz     │   │ 48kHz     │   │ 48kHz     │                  │
│              └───────────┘   └───────────┘   └───────────┘                  │
│                                                                              │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                              │
│  AUDIO FLOW VISUALIZATION                                                    │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  STAGEBOX                        MIXER                    RECORDER    │  │
│  │    CH1  ●━━━━━━━━━━━━━━━━━━━━━━▶ CH1                                 │  │
│  │    CH2  ●━━━━━━━━━━━━━━━━━━━━━━▶ CH2                                 │  │
│  │    ...  ●                        ...                                  │  │
│  │   CH16  ●━━━━━━━━━━━━━━━━━━━━━━▶ CH16                                │  │
│  │                                                                       │  │
│  │                                  MAIN L ●━━━━━━━━━━━━━━━━━▶ CH1       │  │
│  │                                  MAIN R ●━━━━━━━━━━━━━━━━━▶ CH2       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ━━ Active subscription   ┄┄ Pending   ── Available                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Device Configuration Panel: Dante Device

```
┌──────────────────────────────────────────┐
│ 🎚️ Mixer FOH - Dante                     │
├──────────────────────────────────────────┤
│ ▼ DEVICE INFO                            │
│   Name: [Mixer FOH        ]              │
│   Model: DiGiCo SD12                     │
│   IP Address: 192.168.1.10               │
│   MAC: 00:1D:C1:XX:XX:XX                 │
│                                          │
│ ▼ CLOCK STATUS                           │
│   Role: 👑 Preferred Master              │
│   Status: ● Clock Master Active          │
│   External Sync: None                    │
│   [Set as Preferred Master]              │
│                                          │
│ ▼ NETWORK                                │
│   Primary: ● Connected (1Gbps)           │
│   Secondary: ● Connected (1Gbps)         │
│   Mode: [Redundant ▼]                    │
│                                          │
│ ▼ AUDIO FORMAT                           │
│   Sample Rate: [48000 Hz ▼]              │
│   Encoding: 24-bit                       │
│   Latency: [0.5ms ▼]                     │
│                                          │
│ ▼ TRANSMIT CHANNELS (32)                 │
│   CH 1:  Main L      ████░░ -12dB        │
│   CH 2:  Main R      ████░░ -12dB        │
│   CH 3:  Mon 1       ██░░░░ -24dB        │
│   CH 4:  Mon 2       ██░░░░ -24dB        │
│   ... (expand for all)                   │
│                                          │
│ ▼ RECEIVE CHANNELS (32)                  │
│   CH 1:  ← Stagebox/CH1  ████░ -15dB     │
│   CH 2:  ← Stagebox/CH2  ███░░ -18dB     │
│   ... (expand for all)                   │
│                                          │
│ [IDENTIFY]  [RENAME]  [REBOOT]           │
└──────────────────────────────────────────┘
```

---

## Dante Controller Matrix Panel

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 📊 DANTE CONTROLLER - Subscription Matrix                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                    TRANSMITTERS →                                            │
│              ┌─────────────────────────────────────────────────┐             │
│              │ Stagebox        │ Mixer          │ Recorder     │             │
│              │ 1  2  3  4 ... │ L  R  M1 M2 ...│ 1  2        │             │
│  ┌───────────┼─────────────────┼────────────────┼──────────────┤             │
│  │Mixer    1 │ ✓                                              │             │
│  │         2 │    ✓                                           │             │
│  │         3 │       ✓                                        │             │
│ R│         4 │          ✓                                     │             │
│ E│       ... │             ...                                │             │
│ C│        16 │                ✓                               │             │
│ E├───────────┼─────────────────┼────────────────┼──────────────┤             │
│ I│Recorder 1 │                │ ✓               │              │             │
│ V│         2 │                │    ✓            │              │             │
│ E├───────────┼─────────────────┼────────────────┼──────────────┤             │
│ R│Stagebox 1 │                │       ✓         │              │             │
│ S│         2 │                │          ✓      │              │             │
│  │       ... │                │            ...  │              │             │
│ ↓└───────────┴─────────────────┴────────────────┴──────────────┘             │
│                                                                              │
│  Legend: ✓ Active  ⏳ Pending  ✕ Failed  ○ Available                        │
│                                                                              │
│  [AUTO-SUBSCRIBE]  [CLEAR ALL]  [SAVE PRESET]  [LOAD PRESET]                │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Interactive Elements

### Device Discovery Animation
- Devices pulse when first discovered
- Network connection lines animate on connect
- IP addresses fade in after discovery
- Clock sync icons appear when stable

### Subscription Flow
- Animated audio flow along subscription paths
- Thickness indicates channel count
- Color indicates signal level (green/yellow/red)
- Dashed lines for pending subscriptions

### Clock Visualization
- Crown icon on clock master
- Sync pulse animation radiating from master
- Warning indicators for clock issues
- Clock tree view option

### Network Health Panel
- Bandwidth utilization per port
- Latency statistics
- Packet loss indicators
- Error counters

---

## Challenge Ideas

### Challenge 1: "Basic Dante Setup"
**Objective:** Connect 3 Dante devices
- Stage box to mixer (16 channels)
- Mixer to speakers (L/R)
- Verify audio flow

### Challenge 2: "Redundant Network"
**Objective:** Build fault-tolerant infrastructure
- Set up primary and secondary switches
- Connect all devices to both networks
- Simulate primary failure - audio must continue

### Challenge 3: "Multi-Room Broadcast"
**Objective:** Route audio to multiple destinations
- One source to 4 different receivers
- Different channel selections per destination
- Configure multicast efficiently

### Challenge 4: "Clock Troubleshooting"
**Objective:** Fix audio glitches
- System has clicking/popping audio
- Identify the clock conflict
- Establish proper clock hierarchy

### Challenge 5: "The Big Event"
**Objective:** Design a complete broadcast network
- FOH mixer with 64 inputs
- 2 stage boxes (32ch each)
- 4 recording systems
- Monitor world mixer
- Redundant networking throughout
