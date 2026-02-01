# Contributing to NETRUNNER

Thank you for your interest in contributing to NETRUNNER! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and inclusive. We're all here to learn and build something useful for network education.

## Getting Started

### Prerequisites

1. Install [Nix](https://nixos.org/download.html) (recommended) or ensure you have Node.js 20+
2. Fork the repository
3. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/network-trainer.git
   cd network-trainer
   ```

### Development Setup

```bash
# Enter the development environment
nix develop

# Install dependencies (happens automatically in nix develop)
npm install

# Start the dev server
npm run dev
```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-firewall-device` - New features
- `fix/packet-routing-bug` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/simplify-store` - Code refactoring

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code style guidelines below

3. Test your changes:
   ```bash
   npm run build  # Ensure it builds
   npm run dev    # Manual testing
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add firewall device support"
   ```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, no code change
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add DHCP server device type
fix: correct packet routing through switches
docs: add troubleshooting section to DEPLOY.md
refactor: simplify connection store logic
```

### Pull Requests

1. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request against `main`

3. Fill out the PR template with:
   - Description of changes
   - Screenshots (for UI changes)
   - Testing performed

4. Wait for CI to pass and request review

## Code Style Guidelines

### JavaScript/React

- Use functional components with hooks
- Use Zustand for state management
- Prefer named exports
- Keep components focused and small

```jsx
// Good
export function DeviceNode({ device, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(device.id);
  }, [device.id, onSelect]);

  return (
    <Group onClick={handleClick}>
      {/* ... */}
    </Group>
  );
}

// Avoid
export default class DeviceNode extends Component { /* ... */ }
```

### File Organization

- One component per file
- Co-locate related files (component + styles + tests)
- Use index files for clean exports

```
components/
├── DeviceNode/
│   ├── index.js          # Export
│   ├── DeviceNode.jsx    # Component
│   └── DeviceNode.test.js # Tests (when added)
```

### Styling

- Use Tailwind CSS utility classes
- Keep custom CSS minimal
- Use CSS variables for theming

```jsx
// Good - Tailwind utilities
<div className="flex items-center gap-2 p-4 bg-slate-800 rounded-lg">

// Avoid - inline styles
<div style={{ display: 'flex', padding: '16px' }}>
```

### State Management

- Use Zustand stores in `src/store/`
- Keep stores focused (devices, connections, UI state)
- Use selectors for derived state

```js
// Good - focused selector
const selectedDevice = useDeviceStore(state =>
  state.devices.find(d => d.id === state.selectedId)
);

// Avoid - selecting entire state
const store = useDeviceStore();
```

## Project Architecture

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/components/canvas/` | Network canvas and device rendering |
| `src/components/panels/` | Side panels (properties, toolbar) |
| `src/components/ui/` | Reusable UI primitives |
| `src/store/` | Zustand state stores |
| `src/data/` | Device definitions, defaults |
| `src/engine/` | Network simulation logic |
| `src/utils/` | Helper functions |

### State Stores

| Store | Responsibility |
|-------|----------------|
| `deviceStore` | Device instances, selection |
| `connectionStore` | Network connections |
| `simulationStore` | Packet simulation state |
| `uiStore` | UI state (panels, modals) |

## Adding New Features

### Adding a New Device Type

1. Add device definition to `src/data/devices.js`:
   ```js
   export const DEVICES = {
     // ...existing
     firewall: {
       type: 'firewall',
       label: 'Firewall',
       icon: ShieldIcon,
       ports: 4,
       defaultConfig: { /* ... */ }
     }
   };
   ```

2. Add rendering logic if needed in `src/components/canvas/DeviceNode.jsx`

3. Add configuration panel in `src/components/panels/`

4. Update curriculum if applicable

### Adding a New Lesson

1. Add lesson content to `TRAINING_CURRICULUM.md`
2. Implement any new interactive features needed
3. Create challenge validation logic

## Testing

Currently, testing is manual. When running changes:

1. Build succeeds: `npm run build`
2. Dev server works: `npm run dev`
3. Manual testing of affected features

We plan to add automated tests in the future. Contributions welcome!

## Documentation

- Update README.md for user-facing changes
- Update DEPLOY.md for infrastructure changes
- Add JSDoc comments for complex functions
- Update TRAINING_CURRICULUM.md for content changes

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas

## Recognition

Contributors will be recognized in the project. Thank you for helping make networking education more accessible!
