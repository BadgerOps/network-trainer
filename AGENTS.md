# AI Agent Guidelines for NETRUNNER

This document provides guidelines for AI coding assistants (Claude, Copilot, Cursor, etc.) working on the NETRUNNER codebase.

## Project Overview

NETRUNNER is an interactive network training tool built with React, Vite, and Konva for canvas rendering. It teaches networking concepts through visual simulation.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI framework |
| Vite | 7.x | Build tool and dev server |
| Konva / React-Konva | 10.x / 19.x | Canvas rendering for network visualization |
| Zustand | 5.x | State management |
| Tailwind CSS | 4.x | Styling |
| Lucide React | Latest | Icons |

## Architecture

### Directory Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # Entry point
├── components/
│   ├── canvas/          # Network canvas components (Konva)
│   ├── panels/          # Side panels, toolbars
│   └── ui/              # Reusable UI components
├── store/               # Zustand state stores
├── data/                # Static data, device definitions
├── engine/              # Network simulation logic
├── utils/               # Utility functions
└── styles/              # Global CSS, Tailwind config
```

### State Management

The app uses Zustand with multiple focused stores:

- **deviceStore**: Network device instances and selection state
- **connectionStore**: Connections between devices
- **simulationStore**: Packet simulation state
- **uiStore**: UI state (panels, modals, tools)

Access stores with hooks:
```jsx
import { useDeviceStore } from '../store/deviceStore';

function MyComponent() {
  const devices = useDeviceStore(state => state.devices);
  const addDevice = useDeviceStore(state => state.addDevice);
}
```

### Canvas Rendering

Network visualization uses React-Konva:

```jsx
import { Stage, Layer, Group, Rect, Text } from 'react-konva';

function NetworkCanvas() {
  return (
    <Stage width={800} height={600}>
      <Layer>
        {devices.map(device => (
          <DeviceNode key={device.id} device={device} />
        ))}
      </Layer>
    </Stage>
  );
}
```

## Coding Conventions

### Components

- Use functional components with hooks
- Prefer named exports over default exports
- Keep components small and focused
- Use React.memo for expensive renders

```jsx
// Preferred pattern
export function DeviceNode({ device, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(device.id);
  }, [device.id, onSelect]);

  return <Group onClick={handleClick}>{/* ... */}</Group>;
}
```

### State Updates

Use Zustand's set function with immer-style updates:

```js
// In store definition
addDevice: (device) => set((state) => ({
  devices: [...state.devices, device]
})),

// Or with produce for complex updates
updateDevice: (id, updates) => set((state) => ({
  devices: state.devices.map(d =>
    d.id === id ? { ...d, ...updates } : d
  )
})),
```

### Styling

Use Tailwind CSS classes. The project uses Tailwind v4 with the new CSS-first configuration:

```jsx
// Good
<div className="flex items-center gap-2 p-4 bg-slate-800 rounded-lg">

// Avoid inline styles unless necessary for dynamic values
<div style={{ transform: `translate(${x}px, ${y}px)` }}>
```

### File Naming

- Components: `PascalCase.jsx` (e.g., `DeviceNode.jsx`)
- Utilities: `camelCase.js` (e.g., `networkUtils.js`)
- Stores: `camelCaseStore.js` (e.g., `deviceStore.js`)
- Constants: `SCREAMING_SNAKE_CASE` in code

## Common Tasks

### Adding a New Device Type

1. Add to `src/data/devices.js`:
```js
export const DEVICE_TYPES = {
  // ...existing types
  firewall: {
    type: 'firewall',
    label: 'Firewall',
    icon: 'Shield',
    category: 'security',
    ports: 4,
    defaultConfig: {
      rules: [],
      defaultPolicy: 'deny'
    }
  }
};
```

2. Handle in DeviceNode component if special rendering needed
3. Add configuration panel for device-specific settings

### Adding Store Actions

```js
// src/store/deviceStore.js
export const useDeviceStore = create((set, get) => ({
  devices: [],

  // Add new action
  duplicateDevice: (id) => {
    const device = get().devices.find(d => d.id === id);
    if (!device) return;

    const newDevice = {
      ...device,
      id: generateId(),
      x: device.x + 50,
      y: device.y + 50
    };

    set((state) => ({
      devices: [...state.devices, newDevice]
    }));
  }
}));
```

### Working with Canvas Events

```jsx
// Konva event handling
<Rect
  onClick={(e) => handleClick(e)}
  onDragEnd={(e) => {
    const node = e.target;
    updatePosition(device.id, node.x(), node.y());
  }}
  draggable
/>
```

## Infrastructure

### OpenTofu (Terraform-compatible)

Infrastructure is managed with OpenTofu in `terraform/`:

- `providers.tf` - Cloudflare provider and R2 backend
- `main.tf` - Pages project, DNS records
- `variables.tf` - Input variables
- `outputs.tf` - Output values

Note: We use OpenTofu (open-source Terraform fork) instead of Terraform due to licensing. The `terraform` command is aliased to `tofu` in the dev shell.

### CI/CD

GitHub Actions in `.github/workflows/`:

- `ci.yml` - Build validation, OpenTofu plan on PRs
- `deploy.yml` - Production deployment on push to main

## Testing Approach

Currently manual testing. When making changes:

1. Verify build: `npm run build`
2. Test in dev server: `npm run dev`
3. Test affected features manually

## Common Pitfalls

### Konva Performance

- Use `React.memo` for device components
- Avoid re-rendering entire canvas on small changes
- Use Layer separation for different update frequencies

### State Subscriptions

```jsx
// Good - selective subscription
const selectedId = useDeviceStore(state => state.selectedId);

// Bad - subscribes to all state changes
const store = useDeviceStore();
```

### Connection Handling

Connections reference devices by ID. Always validate both endpoints exist:

```js
const isValidConnection = (conn, devices) => {
  return devices.some(d => d.id === conn.sourceId) &&
         devices.some(d => d.id === conn.targetId);
};
```

## Useful Commands

```bash
# Development
nix develop          # Enter dev environment with all tools
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build

# Deployment
gh auth login        # Authenticate GitHub CLI
wrangler login       # Authenticate Cloudflare CLI
tofu plan            # Preview infrastructure changes
tofu apply           # Apply infrastructure changes
```

## Getting Help

- Check existing components for patterns
- Review TRAINING_CURRICULUM.md for feature context
- See CONTRIBUTING.md for workflow guidelines
- Check docs/DEPLOY.md for deployment questions
