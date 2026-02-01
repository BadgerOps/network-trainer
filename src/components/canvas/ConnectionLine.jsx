import React from 'react'
import { Group, Line, Circle, Text } from 'react-konva'
import { useNetworkStore } from '../../store/networkStore'

export default function ConnectionLine({ connection, points, isActive }) {
  const removeConnection = useNetworkStore((state) => state.removeConnection)
  const selectConnection = useNetworkStore((state) => state.selectConnection)
  const [isHovered, setIsHovered] = React.useState(false)

  const { x1, y1, x2, y2 } = points

  // Calculate midpoint for status indicator
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2

  // Calculate line angle for proper orientation
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)

  const getStatusColor = () => {
    switch (connection.status) {
      case 'up':
        return '#22c55e'
      case 'down':
        return '#ef4444'
      default:
        return '#94a3b8'
    }
  }

  const handleClick = (e) => {
    e.cancelBubble = true
    selectConnection(connection)
  }

  const handleDoubleClick = (e) => {
    e.cancelBubble = true
    if (confirm('Remove this connection?')) {
      removeConnection(connection.id)
    }
  }

  return (
    <Group>
      {/* Main connection line */}
      <Line
        points={[x1, y1, x2, y2]}
        stroke={isHovered ? '#6366f1' : getStatusColor()}
        strokeWidth={isHovered ? 4 : 3}
        lineCap="round"
        shadowColor={getStatusColor()}
        shadowBlur={isActive ? 8 : 0}
        onClick={handleClick}
        onDblClick={handleDoubleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        hitStrokeWidth={15}
      />

      {/* Animated data flow indicator (when active) */}
      {isActive && connection.status === 'up' && (
        <AnimatedFlowDots
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          color={getStatusColor()}
        />
      )}

      {/* Connection status badge */}
      {isHovered && (
        <Group x={midX} y={midY}>
          <Circle radius={20} fill="rgba(30, 27, 75, 0.95)" />
          <Text
            x={-12}
            y={-5}
            text={connection.status === 'up' ? '✓' : '✗'}
            fontSize={14}
            fill={getStatusColor()}
            align="center"
          />
        </Group>
      )}
    </Group>
  )
}

// Animated dots flowing along the connection
function AnimatedFlowDots({ x1, y1, x2, y2, color }) {
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    let animationId
    const animate = () => {
      setOffset((prev) => (prev + 0.02) % 1)
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Create 3 dots along the line
  const dots = [0, 0.33, 0.66].map((baseOffset) => {
    const t = (baseOffset + offset) % 1
    return {
      x: x1 + (x2 - x1) * t,
      y: y1 + (y2 - y1) * t
    }
  })

  return (
    <Group>
      {dots.map((dot, i) => (
        <Circle
          key={i}
          x={dot.x}
          y={dot.y}
          radius={3}
          fill={color}
          opacity={0.6}
          shadowColor={color}
          shadowBlur={4}
        />
      ))}
    </Group>
  )
}
