# Network Trainer - Project Scheme

## Overview

An interactive network training tool for beginners to learn IPv4, subnetting, IPv6, TCP, UDP, ports, VLANs, and inter-VLAN routing through hands-on visualization and configuration.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tooling
- **Konva.js + react-konva** - Canvas-based network visualization
- **Zustand** - State management (with persist middleware)
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Icon library
- **Nix Flake** - Development environment

## Architecture

```
src/
├── components/
│   ├── canvas/
│   │   ├── NetworkCanvas.jsx    # Main Konva Stage
│   │   ├── DeviceNode.jsx       # Device rendering with custom icons
│   │   └── ConnectionLine.jsx   # Network connections
│   ├── layout/
│   │   ├── Header.jsx           # Top bar with theme selector
│   │   ├── Sidebar.jsx          # Device palette
│   │   └── StatusBar.jsx        # Bottom status/logs
│   ├── panels/
│   │   ├── DeviceConfig.jsx     # Device configuration panel
│   │   └── PacketInspector.jsx  # Packet detail viewer
│   ├── lessons/
│   │   ├── LessonViewer.jsx     # Step-by-step lesson display
│   │   └── LessonMenu.jsx       # Training module selection
│   └── ThemeSelector.jsx        # Theme picker modal
├── store/
│   ├── networkStore.js          # Devices, connections, interfaces
│   ├── simulationStore.js       # Packet simulation state
│   ├── lessonStore.js           # Lessons, challenges, progress
│   └── themeStore.js            # Theme configuration & persistence
├── styles/
│   └── globals.css              # CSS variables & base styles
├── App.jsx                      # Main application layout
└── main.jsx                     # Entry point
```

## Theme System

### Available Themes

1. **Cyberpunk** (Default)
   - Dark purple/pink neon aesthetic
   - Glow effects, scanlines, grid background
   - Orbitron heading font

2. **Clean Pro**
   - Light mode professional design
   - No effects, sharp corners
   - Inter font family

3. **Terminal**
   - Green phosphor hacker aesthetic
   - Monospace fonts throughout
   - Subtle glow effects

4. **Blueprint**
   - Technical drawing style
   - Blue/white color scheme
   - Grid background

5. **Vaporwave**
   - 90s pastel aesthetic
   - Pink/cyan gradients
   - Rounded corners

### Theme Structure

```javascript
{
  id: 'theme-id',
  name: 'Display Name',
  colors: {
    bgPrimary, bgSecondary, bgTertiary, bgHover,
    accent, accentSecondary, accentTertiary, accentQuaternary,
    textPrimary, textSecondary, textMuted,
    border, borderLight,
    success, warning, error, info,
    router, switch, l3switch, computer, server, cloud
  },
  fonts: {
    heading, body, mono
  },
  effects: {
    borderRadius, glowStrength,
    hasGlow, hasScanlines, hasGrid
  }
}
```

### Theme Application

- CSS variables set on `:root` via `applyThemeToDOM()`
- Components access theme via `useThemeStore((state) => state.getTheme())`
- Persisted to localStorage via Zustand persist middleware

## Training Curriculum

### Module 1: Foundations (Beginner)
- Introduction to Networks
- IP Addresses Explained
- Sending Data Between Devices

### Module 2: Switches & LANs (Beginner)
- How Switches Work
- VLANs - Virtual Networks

### Module 3: Routing (Intermediate)
- Routers - Connecting Networks
- Subnetting Made Simple
- Inter-VLAN Routing

### Module 4: Protocols (Intermediate)
- TCP vs UDP
- Ports & Services

### Module 5: Troubleshooting (Advanced)
- Network Troubleshooting
- Packet Tracing

### Challenges
1. **First Connection** (Easy) - Connect two computers
2. **Build a LAN** (Medium) - Multi-device network
3. **Route Between Networks** (Medium) - Inter-network routing
4. **VLAN Segmentation** (Hard) - Network isolation

## Device Types

| Type | Icon | Ports | Can Route | Has VLANs |
|------|------|-------|-----------|-----------|
| Router | Globe | 4 | Yes | No |
| Switch | Network | 8 | No | Yes |
| L3 Switch | Layers | 8 | Yes | Yes |
| Computer | Monitor | 1 | No | No |
| Server | Server | 2 | No | No |
| Cloud/Internet | Cloud | 1 | Yes | No |

## Implemented Features

### Core
- [x] Drag-and-drop device placement
- [x] Click-to-connect cable drawing
- [x] Device configuration panel
- [x] Interface IP/subnet configuration
- [x] Routing table management
- [x] Network state persistence

### Visualization
- [x] Custom Konva-based device icons
- [x] Animated connection lines
- [x] Theme-aware canvas rendering
- [x] Device selection highlighting

### Learning
- [x] 8 comprehensive lessons
- [x] 4 hands-on challenges
- [x] Progress tracking (persisted)
- [x] Step-by-step guidance
- [x] Mission hints

### UI/UX
- [x] 5 distinct visual themes
- [x] Consistent component styling
- [x] Theme persistence
- [x] Responsive panels
- [x] Keyboard shortcuts (planned)

## Planned Features

### Short Term
- [ ] Packet simulation visualization
- [ ] Real-time traffic animation
- [ ] ARP table display
- [ ] MAC address learning visualization
- [ ] Ping/traceroute tools

### Medium Term
- [ ] IPv6 support
- [ ] DHCP simulation
- [ ] DNS resolution
- [ ] NAT demonstration
- [ ] Firewall rules

### Long Term
- [ ] Save/load network topologies
- [ ] Share configurations
- [ ] Custom lesson creation
- [ ] Achievement system
- [ ] Multiplayer troubleshooting

## File Locations

- **Workspace**: `/sessions/youthful-hopeful-shannon/mnt/network-trainer`
- **Theme Store**: `src/store/themeStore.js`
- **Lesson Content**: `src/store/lessonStore.js`
- **Device Types**: `src/store/networkStore.js`

## Development

```bash
# Enter Nix shell
nix develop

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Design Principles

1. **Beginner-Friendly**: No assumed networking knowledge
2. **Visual Learning**: See packets flow, not just read about them
3. **Hands-On**: Build real topologies, not just quizzes
4. **Beautiful**: Modern, themeable UI that's enjoyable to use
5. **Progressive**: Start simple, unlock complexity gradually
