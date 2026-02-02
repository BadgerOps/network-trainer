import React, { useRef, useState } from 'react'
import { Group, Rect, Text, Circle } from 'react-konva'
import { useThemeStore } from '../../store/themeStore'
import { DEVICE_NODE_SIZE, getPortPositions } from '../../utils/portLayout'
import LucideKonvaIcon from './LucideKonvaIcon'
import { __iconNode as globeNode } from 'lucide-react/dist/esm/icons/globe.js'
import { __iconNode as networkNode } from 'lucide-react/dist/esm/icons/network.js'
import { __iconNode as layersNode } from 'lucide-react/dist/esm/icons/layers.js'
import { __iconNode as monitorNode } from 'lucide-react/dist/esm/icons/monitor.js'
import { __iconNode as serverNode } from 'lucide-react/dist/esm/icons/server.js'
import { __iconNode as cloudNode } from 'lucide-react/dist/esm/icons/cloud.js'

const ICON_NODES = {
  router: globeNode,
  switch: networkNode,
  l3switch: layersNode,
  computer: monitorNode,
  server: serverNode,
  cloud: cloudNode
}

export default function DeviceNode({
  device,
  isSelected,
  onSelect,
  onMove,
  connectionDrag,
  onPortDragStart
}) {
  const groupRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredPort, setHoveredPort] = useState(null)

  const theme = useThemeStore((state) => state.getTheme())

  const size = DEVICE_NODE_SIZE

  // Get device color from theme
  const deviceColor = {
    router: theme.colors.router,
    switch: theme.colors.switch,
    l3switch: theme.colors.l3switch,
    computer: theme.colors.computer,
    server: theme.colors.server,
    cloud: theme.colors.cloud
  }[device.type] || theme.colors.accent

  const portPositions = getPortPositions(device, size)

  const handleDragEnd = (e) => {
    onMove(e.target.x(), e.target.y())
  }

  const handleClick = (e) => {
    e.cancelBubble = true
    onSelect()
  }

  const handlePortMouseDown = (e, port) => {
    e.cancelBubble = true
    if (connectionDrag?.active) return
    if (onPortDragStart) onPortDragStart(device.id, port.id)
  }

  const getPortColor = (port) => {
    if (connectionDrag?.active) {
      if (connectionDrag.sourcePortId === port.id && connectionDrag.sourceDeviceId === device.id) {
        return theme.colors.accentTertiary
      }
      if (connectionDrag.validTargetPortIds?.has(port.id)) return theme.colors.success
      if (connectionDrag.invalidHoverPortId === port.id && connectionDrag.invalidHoverDeviceId === device.id) {
        return theme.colors.error
      }
      return theme.colors.textMuted
    }
    if (port.status === 'up') return theme.colors.success
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
      <LucideKonvaIcon
        iconNode={ICON_NODES[device.type]}
        x={size / 2 - 20}
        y={size / 2 - 22}
        size={40}
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
            onMouseDown={(e) => handlePortMouseDown(e, port)}
            onTouchStart={(e) => handlePortMouseDown(e, port)}
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
                text={`${port.status.toUpperCase()} • ${port.direction?.toUpperCase() || 'INOUT'}`}
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
