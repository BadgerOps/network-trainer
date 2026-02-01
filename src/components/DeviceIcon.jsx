import React from 'react'
import {
  Globe,
  Network,
  Layers,
  Monitor,
  Server,
  Cloud,
  Cpu,
  Router as RouterIcon,
  HardDrive
} from 'lucide-react'

// Map device types to Lucide icons and styling
const iconConfig = {
  router: {
    Icon: Globe,
    label: 'RTR'
  },
  switch: {
    Icon: Network,
    label: 'SW'
  },
  l3switch: {
    Icon: Layers,
    label: 'L3'
  },
  computer: {
    Icon: Monitor,
    label: 'PC'
  },
  server: {
    Icon: Server,
    label: 'SRV'
  },
  cloud: {
    Icon: Cloud,
    label: 'NET'
  }
}

export default function DeviceIcon({ type, size = 'md', color, showLabel = false, className = '' }) {
  const config = iconConfig[type]
  if (!config) return null

  const { Icon, label } = config

  const sizes = {
    sm: { icon: 16, container: 32 },
    md: { icon: 24, container: 48 },
    lg: { icon: 32, container: 64 }
  }

  const s = sizes[size] || sizes.md

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: s.container,
        height: s.container
      }}
    >
      {/* Glow effect background */}
      <div
        className="absolute inset-0 rounded"
        style={{
          background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
          filter: 'blur(4px)'
        }}
      />

      {/* Icon container with border */}
      <div
        className="relative flex items-center justify-center rounded"
        style={{
          width: s.container - 8,
          height: s.container - 8,
          background: 'rgba(13, 2, 33, 0.8)',
          border: `2px solid ${color}`,
          boxShadow: `0 0 10px ${color}66, inset 0 0 10px ${color}22`
        }}
      >
        <Icon
          size={s.icon}
          style={{
            color: color,
            filter: `drop-shadow(0 0 4px ${color})`
          }}
        />
      </div>

      {/* Label badge */}
      {showLabel && (
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider"
          style={{
            background: color,
            color: '#0d0221',
            boxShadow: `0 0 8px ${color}`
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

// Simple inline version for dropdowns/lists
export function DeviceIconInline({ type, size = 20, color }) {
  const config = iconConfig[type]
  if (!config) return null

  const { Icon } = config

  return (
    <div
      className="flex items-center justify-center rounded"
      style={{
        width: size + 8,
        height: size + 8,
        background: `${color}22`,
        border: `1px solid ${color}66`
      }}
    >
      <Icon
        size={size}
        style={{
          color: color,
          filter: `drop-shadow(0 0 2px ${color})`
        }}
      />
    </div>
  )
}
