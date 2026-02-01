# NETRUNNER

An interactive network training tool for beginners. Learn networking concepts through hands-on simulation.

## Features

- **Visual Network Builder**: Drag-and-drop interface for building network topologies
- **Real-time Packet Simulation**: Watch packets travel through your network
- **Progressive Curriculum**: Structured learning path from basics to advanced concepts
- **Interactive Challenges**: Test your knowledge with hands-on exercises
- **Device Configuration**: Configure routers, switches, and endpoints with real networking concepts

## Getting Started

### Prerequisites

- [Nix](https://nixos.org/download.html) (recommended) or Node.js 20+

### Development

```bash
# Enter development environment (installs all dependencies)
nix develop

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Without Nix

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Project Structure

```
network-trainer/
├── src/
│   ├── components/     # React components
│   │   ├── canvas/     # Network canvas components
│   │   ├── panels/     # Side panels (properties, etc.)
│   │   └── ui/         # Reusable UI components
│   ├── store/          # Zustand state management
│   ├── data/           # Device definitions and configs
│   ├── engine/         # Network simulation engine
│   ├── utils/          # Utility functions
│   └── styles/         # Global styles
├── terraform/          # Infrastructure as Code
├── docs/               # Documentation
└── public/             # Static assets
```

## Learning Curriculum

NETRUNNER includes a structured curriculum covering:

1. **Foundations**: Networks, IP addresses, packets
2. **Switches & LANs**: MAC addresses, VLANs
3. **Routing**: Routers, routing tables, subnetting
4. **Protocols**: TCP/UDP, ports, common services
5. **Troubleshooting**: Diagnostics and problem-solving

See [TRAINING_CURRICULUM.md](./TRAINING_CURRICULUM.md) for the full curriculum.

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Konva / React-Konva** - Canvas rendering
- **Zustand** - State management
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

## Deployment

NETRUNNER is deployed to Cloudflare Pages at [netrunner.badgerops.foo](https://netrunner.badgerops.foo).

See [docs/DEPLOY.md](./docs/DEPLOY.md) for deployment instructions.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## AI Agents

This project supports AI-assisted development. See [AGENTS.md](./AGENTS.md) for guidelines on working with AI coding assistants.

## License

MIT License - see [LICENSE](./LICENSE) for details.
