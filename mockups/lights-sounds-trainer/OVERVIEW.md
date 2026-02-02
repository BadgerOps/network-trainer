# Production Tech Trainer - Lights & Sounds Edition

## Project Overview

An interactive training application for lights and sounds production technicians, inspired by the NETRUNNER network trainer. This application teaches essential concepts for live event production through hands-on simulation.

## Target Audience

- Entry-level production technicians
- Venue staff learning AV basics
- Students in technical theater programs
- Freelance techs expanding their skillset
- Corporate AV teams

## Core Training Modules

### Module 1: Audio Fundamentals
- **Lesson 1.1**: Audio Mixing Fundamentals - Gain staging, channel strips, EQ, dynamics
- **Lesson 1.2**: Signal Flow Basics - Understanding how audio travels through a system

### Module 2: Wireless Systems
- **Lesson 2.1**: UHF Frequency Coordination - Avoiding interference, intermodulation, scanning
- **Lesson 2.2**: Wireless Best Practices - Antenna placement, battery management, backups

### Module 3: Audio Networking
- **Lesson 3.1**: Audio over IP (Dante/AES67) - Network audio routing, device discovery
- **Lesson 3.2**: AVB and Other Protocols - Understanding the ecosystem

### Module 4: Lighting Control
- **Lesson 4.1**: DMX Fundamentals - Addressing, universes, channels
- **Lesson 4.2**: Lighting Console Basics - Programming cues, timing, chases

### Module 5: System Integration
- **Lesson 5.1**: Stage Signal Flow & Patching - Complete system design
- **Lesson 5.2**: Troubleshooting Live Systems - Diagnosing common issues

---

## Technical Architecture

### Device Types (Canvas Elements)

```javascript
const DEVICE_TYPES = {
  // Audio Devices
  mixer: { name: 'Mixing Console', icon: 'Sliders', color: 'mixer', ports: 32 },
  stagebox: { name: 'Stage Box', icon: 'RectangleVertical', color: 'stagebox', ports: 32 },
  amplifier: { name: 'Power Amplifier', icon: 'Volume2', color: 'amplifier', ports: 4 },
  speaker: { name: 'Speaker/PA', icon: 'Speaker', color: 'speaker', ports: 2 },
  microphone: { name: 'Microphone', icon: 'Mic', color: 'microphone', ports: 1 },
  di_box: { name: 'DI Box', icon: 'ArrowRightLeft', color: 'di', ports: 2 },
  wireless_rx: { name: 'Wireless Receiver', icon: 'Radio', color: 'wireless', ports: 2 },
  wireless_tx: { name: 'Wireless Transmitter', icon: 'RadioTower', color: 'wireless', ports: 1 },
  iem_tx: { name: 'IEM Transmitter', icon: 'Headphones', color: 'iem', ports: 2 },

  // Network Audio Devices
  dante_switch: { name: 'Dante Switch', icon: 'Network', color: 'network', ports: 24 },
  dante_interface: { name: 'Dante Interface', icon: 'AudioLines', color: 'dante', ports: 8 },

  // Lighting Devices
  light_console: { name: 'Lighting Console', icon: 'MonitorCog', color: 'console', ports: 4 },
  dmx_splitter: { name: 'DMX Splitter', icon: 'Split', color: 'dmx', ports: 6 },
  dimmer_rack: { name: 'Dimmer Rack', icon: 'LayoutGrid', color: 'dimmer', ports: 12 },
  moving_head: { name: 'Moving Head', icon: 'Disc3', color: 'fixture', ports: 2 },
  led_par: { name: 'LED Par', icon: 'CircleDot', color: 'fixture', ports: 2 },
  hazer: { name: 'Hazer', icon: 'Cloud', color: 'effects', ports: 1 },

  // Infrastructure
  power_distro: { name: 'Power Distro', icon: 'Zap', color: 'power', ports: 6 },
  patch_bay: { name: 'Patch Bay', icon: 'Rows3', color: 'patch', ports: 48 },
}
```

### Connection Types

```javascript
const CONNECTION_TYPES = {
  xlr: { name: 'XLR (Analog Audio)', color: '#4CAF50', dashed: false },
  speakon: { name: 'Speakon (Speaker)', color: '#FF5722', dashed: false },
  dante: { name: 'Dante (Network Audio)', color: '#2196F3', dashed: false },
  dmx: { name: 'DMX (Lighting Control)', color: '#9C27B0', dashed: false },
  ethernet: { name: 'Ethernet', color: '#607D8B', dashed: false },
  power: { name: 'Power', color: '#FFC107', dashed: true },
  wireless: { name: 'Wireless Signal', color: '#00BCD4', dashed: true },
}
```

### Theme Adaptations

The existing 5 themes translate well:
- **Cyberpunk**: Perfect for modern concert production feel
- **Clean Pro**: Ideal for corporate/educational contexts
- **Terminal**: Tech crew aesthetic
- **Blueprint**: Technical documentation style
- **Vaporwave**: Retro production vibes

### Canvas Layer System

Same 3-layer architecture as NETRUNNER:
1. **Connections Layer**: Signal paths (audio, DMX, network)
2. **Devices Layer**: Equipment nodes with interactive ports
3. **Signal Animation Layer**: Audio levels, DMX data, network packets

---

## Simulation Features

### Audio Simulation
- Real-time gain staging visualization
- Clipping/overload indicators
- Signal level meters on devices
- Feedback loop detection
- EQ frequency response preview

### Frequency Coordination Simulation
- Visual frequency spectrum display
- Intermodulation product calculator
- Interference warning indicators
- Safe frequency suggestions
- TV channel overlay (showing occupied spectrum)

### Dante/AoIP Simulation
- Device discovery animation
- Channel subscription visualization
- Latency display
- Redundant path visualization
- Sample rate/clock source indicators

### DMX Simulation
- Address conflict detection
- Universe capacity meter
- Channel value visualization
- Fixture response preview
- Data flow animation

---

## Mockup Files in This Directory

1. `lesson-1-audio-mixing.md` - Audio Mixing Fundamentals
2. `lesson-2-uhf-coordination.md` - UHF Frequency Coordination
3. `lesson-3-audio-over-ip.md` - Dante/AES67 Basics
4. `lesson-4-dmx-lighting.md` - DMX Addressing & Control
5. `lesson-5-signal-flow.md` - Stage Signal Flow & Patching
6. `lessonStore-mockup.js` - Data structure for lessons
7. `deviceStore-mockup.js` - Device definitions and behaviors

---

## Implementation Notes

### Reusable from NETRUNNER
- Zustand store architecture
- Konva canvas system (3-layer)
- Theme system (all 5 themes)
- Lesson viewer component structure
- Drag-and-drop device placement
- Connection controller hook
- Port layout utilities

### New Components Needed
- Frequency spectrum visualizer
- Audio level meters
- DMX address calculator
- Channel matrix/patching grid
- Gain staging visualizer
- Wireless coordination view

### Key Differences from Networking
| NETRUNNER | Production Trainer |
|-----------|-------------------|
| IP addresses | DMX addresses, frequencies |
| Packets | Audio signals, DMX data |
| Routing tables | Patch assignments |
| VLANs | DMX universes |
| Bandwidth | Audio channels, headroom |

---

## Next Steps

1. Review and finalize lesson content
2. Design device icons and visual language
3. Build frequency coordination calculator component
4. Implement audio level visualization
5. Create DMX addressing simulator
6. Develop challenge scenarios
