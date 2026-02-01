import React, { useRef, useState } from 'react'
import { Group, Rect, Text, Circle, Line, Path } from 'react-konva'
import { DEVICE_TYPES, useNetworkStore } from '../../store/networkStore'
import { useThemeStore } from '../../store/themeStore'

// Custom canvas icon renderer - matches the Lucide icons in sidebar
function DeviceIconCanvas({ type, x, y, size, color }) {
  const s = size * 0.4 // Scale factor

  switch (type) {
    case 'router':
      // Globe icon - matches sidebar
      return (
        <Group x={x} y={y}>
          <Circle radius={s} stroke={color} strokeWidth={2} fill="transparent" />
          <Line points={[-s, 0, s, 0]} stroke={color} strokeWidth={1.5} />
          <Line points={[0, -s, 0, s]} stroke={color} strokeWidth={1.5} />
          {/* Ellipse curves for globe effect */}
          <Path
            data={`M ${-s * 0.65} 0 A ${s * 0.35} ${s} 0 0 0 ${s * 0.65} 0`}
            stroke={color}
            strokeWidth={1.5}
          />
          <Path
            data={`M ${-s * 0.65} 0 A ${s * 0.35} ${s} 0 0 1 ${s * 0.65} 0`}
            stroke={color}
            strokeWidth={1.5}
          />
        </Group>
      )

    case 'switch':
      // Network/switch icon - horizontal box with ports
      return (
        <Group x={x} y={y}>
          <Rect
            x={-s}
            y={-s * 0.5}
            width={s * 2}
            height={s}
            stroke={color}
            strokeWidth={2}
            fill="transparent"
            cornerRadius={3}
          />
          {/* Port indicators */}
          {[-0.6, -0.2, 0.2, 0.6].map((offset, i) => (
            <React.Fragment key={i}>
              <Circle x={offset * s} y={-s * 0.1} radius={s * 0.12} fill={color} />
              <Rect
                x={offset * s - s * 0.08}
                y={s * 0.15}
                width={s * 0.16}
                height={s * 0.08}
                fill={color}
                opacity={0.6}
              />
            </React.Fragment>
          ))}
        </Group>
      )

    case 'l3switch':
      // Layers icon - stacked rectangles
      return (
        <Group x={x} y={y}>
          {[{ y: -s * 0.5, o: 1 }, { y: -s * 0.15, o: 0.7 }, { y: s * 0.2, o: 0.5 }].map((layer, i) => (
            <Rect
              key={i}
              x={-s + i * 3}
              y={layer.y}
              width={s * 2 - i * 6}
              height={s * 0.45}
              stroke={color}
              strokeWidth={1.5}
              fill="transparent"
              cornerRadius={2}
              opacity={layer.o}
            />
          ))}
        </Group>
      )

    case 'computer':
      // Monitor icon
      return (
        <Group x={x} y={y}>
          {/* Screen */}
          <Rect
            x={-s * 0.9}
            y={-s * 0.7}
            width={s * 1.8}
            height={s * 1.1}
            stroke={color}
            strokeWidth={2}
            fill="transparent"
            cornerRadius={4}
          />
          {/* Stand neck */}
          <Line points={[0, s * 0.4, 0, s * 0.7]} stroke={color} strokeWidth={2} />
          {/* Stand base */}
          <Line points={[-s * 0.5, s * 0.7, s * 0.5, s * 0.7]} stroke={color} strokeWidth={2} />
          {/* Screen content */}
          <Line points={[-s * 0.5, -s * 0.2, s * 0.4, -s * 0.2]} stroke={color} strokeWidth={1} opacity={0.4} />
          <Line points={[-s * 0.5, s * 0.05, s * 0.1, s * 0.05]} stroke={color} strokeWidth={1} opacity={0.4} />
        </Group>
      )

    case 'server':
      // Server rack icon
      return (
        <Group x={x} y={y}>
          {/* Top unit */}
          <Rect
            x={-s * 0.9}
            y={-s * 0.8}
            width={s * 1.8}
            height={s * 0.65}
            stroke={color}
            strokeWidth={2}
            fill="transparent"
            cornerRadius={2}
          />
          {/* Bottom unit */}
          <Rect
            x={-s * 0.9}
            y={s * 0.1}
            width={s * 1.8}
            height={s * 0.65}
            stroke={color}
            strokeWidth={2}
            fill="transparent"
            cornerRadius={2}
          />
          {/* LEDs */}
          <Circle x={-s * 0.55} y={-s * 0.47} radius={s * 0.1} fill={color} />
          <Circle x={-s * 0.55} y={s * 0.43} radius={s * 0.1} fill={color} />
          {/* Vent lines */}
          <Line points={[-s * 0.2, -s * 0.6, s * 0.6, -s * 0.6]} stroke={color} strokeWidth={1} opacity={0.5} />
          <Line points={[-s * 0.2, -s * 0.4, s * 0.6, -s * 0.4]} stroke={color} strokeWidth={1} opacity={0.5} />
          <Line points={[-s * 0.2, s * 0.3, s * 0.6, s * 0.3]} stroke={color} strokeWidth={1} opacity={0.5} />
          <Line points={[-s * 0.2, s * 0.5, s * 0.6, s * 0.5]} stroke={color} strokeWidth={1} opacity={0.5} />
        </Group>
      )

    case 'cloud':
      // Cloud icon
      return (
        <Group x={x} y={y}>
          {/* Cloud shape using overlapping circles */}
          <Circle x={-s * 0.4} y={s * 0.1} radius={s * 0.5} stroke={color} strokeWidth={2} fill="transparent" />
          <Circle x={s * 0.3} y={s * 0.15} radius={s * 0.4} stroke={color} strokeWidth={2} fill="transparent" />
          <Circle x={0} y={-s * 0.2} radius={s * 0.45} stroke={color} strokeWidth={2} fill="transparent" />
          {/* Fill overlaps */}
          <Circle x={-s * 0.4} y={s * 0.1} radius={s * 0.4} fill="rgba(13, 2, 33, 0.95)" />
          <Circle x={s * 0.3} y={s * 0.15} radius={s * 0.3} fill="rgba(13, 2, 33, 0.95)" />
          <Circle x={0} y={-s * 0.2} radius={s * 0.35} fill="rgba(13, 2, 33, 0.95)" />
        </Group>
      )

    default:
      // Fallback - simple CPU/chip icon
      return (
        <Group x={x} y={y}>
          <Rect
            x={-s * 0.6}
            y={-s * 0.6}
            width={s * 1.2}
            height={s * 1.2}
            stroke={color}
            strokeWidth={2}
            fill="transparent"
            cornerRadius={4}
          />
          {/* Pins */}
          {[-0.3, 0.3].map((offset) => (
            <React.Fragment key={offset}>
              <Line points={[offset * s, -s * 0.6, offset * s, -s * 0.9]} stroke={color} strokeWidth={2} />
              <Line points={[offset * s, s * 0.6, offset * s, s * 0.9]} stroke={color} strokeWidth={2} />
              <Line points={[-s * 0.6, offset * s, -s * 0.9, offset * s]} stroke={color} strokeWidth={2} />
              <Line points={[s * 0.6, offset * s, s * 0.9, offset * s]} stroke={color} strokeWidth={2} />
            </React.Fragment>
          ))}
        </Group>
      )
  }
}

export default function DeviceNode({
  device,
  isSelected,
  onSelect,
  onMove,
  connectionMode
}) {
  const groupRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredPort, setHoveredPort] = useState(null)

  const startConnection = useNetworkStore((state) => state.startConnection)
  const completeConnection = useNetworkStore((state) => state.completeConnection)
  const theme = useThemeStore((state) => state.getTheme())

  const config = DEVICE_TYPES[device.type]
  const size = 80

  // Get device color from theme
  const deviceColor = {
    router: theme.colors.router,
    switch: theme.colors.switch,
    l3switch: theme.colors.l3switch,
    computer: theme.colors.computer,
    server: theme.colors.server,
    cloud: theme.colors.cloud
  }[device.type] || theme.colors.accent

  // Calculate port positions
  const getPortPositions = () => {
    const ports = device.interfaces || []
    const positions = []
    const numPorts = ports.length

    for (let i = 0; i < numPorts; i++) {
      const side = i % 4
      const indexOnSide = Math.floor(i / 4)
      const portsOnSide = Math.ceil(numPorts / 4)
      const offset = ((indexOnSide + 1) / (portsOnSide + 1)) * size

      let x, y
      switch (side) {
        case 0: x = offset; y = 0; break
        case 1: x = size; y = offset; break
        case 2: x = size - offset; y = size; break
        default: x = 0; y = size - offset; break
      }
      positions.push({ x, y, port: ports[i] })
    }
    return positions
  }

  const portPositions = getPortPositions()

  const handleDragEnd = (e) => {
    onMove(e.target.x(), e.target.y())
  }

  const handleClick = (e) => {
    e.cancelBubble = true
    onSelect()
  }

  const handlePortClick = (e, port) => {
    e.cancelBubble = true
    if (connectionMode === 'selecting-target') {
      completeConnection(device.id, port.id)
    } else {
      startConnection(device.id, port.id)
    }
  }

  const getPortColor = (port) => {
    if (port.status === 'up') return theme.colors.success
    if (connectionMode) return theme.colors.accentQuaternary
    return theme.colors.textMuted
  }

  const borderRadius = parseInt(theme.effects.borderRadius) || 4

  return (
    <Group
      ref={groupRef}
      x={device.position.x}
      y={device.position.y}
      draggable
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onTap={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setHoveredPort(null) }}
    >
      {/* Selection glow */}
      {isSelected && (
        <Rect
          x={-8}
          y={-8}
          width={size + 16}
          height={size + 16}
          cornerRadius={borderRadius + 8}
          fill="transparent"
          stroke={deviceColor}
          strokeWidth={2}
          shadowColor={deviceColor}
          shadowBlur={theme.effects.hasGlow ? 25 : 10}
          shadowOpacity={0.6}
        />
      )}

      {/* Device background */}
      <Rect
        x={0}
        y={0}
        width={size}
        height={size}
        cornerRadius={borderRadius + 4}
        fill={isHovered ? `${deviceColor}25` : theme.colors.bgSurface}
        stroke={deviceColor}
        strokeWidth={2}
        shadowColor={theme.effects.hasGlow ? deviceColor : 'black'}
        shadowBlur={theme.effects.hasGlow ? 15 : 8}
        shadowOpacity={theme.effects.hasGlow ? 0.4 : 0.25}
        shadowOffset={{ x: 0, y: 2 }}
      />

      {/* Device icon */}
      <DeviceIconCanvas
        type={device.type}
        x={size / 2}
        y={size / 2 - 3}
        size={42}
        color={deviceColor}
      />

      {/* Device name */}
      <Text
        x={0}
        y={size + 8}
        width={size}
        text={device.name}
        fontSize={11}
        fill={theme.colors.textPrimary}
        align="center"
        fontFamily={theme.fonts.heading}
        fontStyle="bold"
      />

      {/* IP Address */}
      {device.interfaces?.[0]?.ip && (
        <Text
          x={0}
          y={size + 22}
          width={size}
          text={device.interfaces[0].ip}
          fontSize={9}
          fill={theme.colors.textMuted}
          align="center"
          fontFamily={theme.fonts.mono}
        />
      )}

      {/* Ports */}
      {portPositions.map(({ x, y, port }) => (
        <Group key={port.id}>
          <Circle
            x={x}
            y={y}
            radius={hoveredPort === port.id ? 8 : 6}
            fill={getPortColor(port)}
            stroke={hoveredPort === port.id ? theme.colors.textPrimary : 'transparent'}
            strokeWidth={2}
            onMouseEnter={() => setHoveredPort(port.id)}
            onMouseLeave={() => setHoveredPort(null)}
            onClick={(e) => handlePortClick(e, port)}
            onTap={(e) => handlePortClick(e, port)}
            shadowColor={port.status === 'up' ? theme.colors.success : 'transparent'}
            shadowBlur={port.status === 'up' && theme.effects.hasGlow ? 10 : 0}
          />

          {/* Port tooltip */}
          {hoveredPort === port.id && (
            <Group x={x + 12} y={y - 25}>
              <Rect
                width={88}
                height={port.ip ? 46 : 34}
                cornerRadius={borderRadius}
                fill={theme.colors.bgPrimary}
                stroke={theme.colors.border}
                strokeWidth={1}
                shadowColor="black"
                shadowBlur={8}
                shadowOpacity={0.4}
              />
              <Text
                x={6}
                y={5}
                text={port.name}
                fontSize={10}
                fill={theme.colors.textPrimary}
                fontFamily={theme.fonts.mono}
                fontStyle="bold"
              />
              <Text
                x={6}
                y={18}
                text={port.status.toUpperCase()}
                fontSize={9}
                fill={port.status === 'up' ? theme.colors.success : theme.colors.textMuted}
                fontFamily={theme.fonts.body}
              />
              {port.ip && (
                <Text
                  x={6}
                  y={31}
                  text={port.ip}
                  fontSize={8}
                  fill={theme.colors.textSecondary}
                  fontFamily={theme.fonts.mono}
                />
              )}
            </Group>
          )}
        </Group>
      ))}

      {/* Activity indicator */}
      {device.interfaces?.some((i) => i.status === 'up') && (
        <Circle
          x={size - 10}
          y={10}
          radius={5}
          fill={theme.colors.success}
          shadowColor={theme.colors.success}
          shadowBlur={theme.effects.hasGlow ? 10 : 0}
        />
      )}
    </Group>
  )
}
