import React, { useEffect, useRef } from 'react'
import { Group, Rect, Text, Circle } from 'react-konva'
import { useSimulationStore, PACKET_TYPES } from '../../store/simulationStore'

export default function PacketAnimation({ packet, devices, isRunning, speed }) {
  const updatePacket = useSimulationStore((state) => state.updatePacket)
  const advancePacket = useSimulationStore((state) => state.advancePacket)
  const selectPacket = useSimulationStore((state) => state.selectPacket)

  const animationRef = useRef(null)
  const lastTimeRef = useRef(null)

  // Get current and next device positions
  const currentDeviceId = packet.path[packet.currentPathIndex]
  const nextDeviceId = packet.path[packet.currentPathIndex + 1]

  const currentDevice = devices.find((d) => d.id === currentDeviceId)
  const nextDevice = devices.find((d) => d.id === nextDeviceId)

  // Animation loop
  useEffect(() => {
    if (!isRunning || !currentDevice || !nextDevice) return

    const animate = (timestamp) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp
      }

      const delta = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      // Update progress (speed factor applied)
      const progressDelta = (delta / 1000) * speed * 1.5 // 1.5 = base speed
      const newProgress = packet.progress + progressDelta

      if (newProgress >= 1) {
        // Move to next hop
        advancePacket(packet.id)
        lastTimeRef.current = null
      } else {
        updatePacket(packet.id, { progress: newProgress })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRunning, packet.id, packet.progress, packet.currentPathIndex, speed, currentDevice, nextDevice])

  if (!currentDevice || !nextDevice) return null

  // Calculate current position
  const offset = 40 // Center of device
  const x1 = currentDevice.position.x + offset
  const y1 = currentDevice.position.y + offset
  const x2 = nextDevice.position.x + offset
  const y2 = nextDevice.position.y + offset

  const x = x1 + (x2 - x1) * packet.progress
  const y = y1 + (y2 - y1) * packet.progress

  const config = PACKET_TYPES[packet.type] || PACKET_TYPES.data

  return (
    <Group
      x={x}
      y={y}
      onClick={() => selectPacket(packet)}
      onTap={() => selectPacket(packet)}
    >
      {/* Packet glow */}
      <Circle
        radius={20}
        fill={config.color}
        opacity={0.2}
        shadowColor={config.color}
        shadowBlur={15}
      />

      {/* Packet body */}
      <Rect
        x={-15}
        y={-10}
        width={30}
        height={20}
        cornerRadius={4}
        fill={config.color}
        shadowColor="black"
        shadowBlur={5}
        shadowOpacity={0.3}
      />

      {/* Packet icon */}
      <Text
        x={-15}
        y={-8}
        width={30}
        text={config.icon}
        fontSize={14}
        align="center"
      />

      {/* Direction indicator (small arrow) */}
      <Group rotation={Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)}>
        <Text
          x={15}
          y={-6}
          text="→"
          fontSize={12}
          fill="white"
          opacity={0.7}
        />
      </Group>
    </Group>
  )
}
