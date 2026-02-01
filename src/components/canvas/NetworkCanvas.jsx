import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Stage, Layer, Group } from 'react-konva'
import { useNetworkStore } from '../../store/networkStore'
import { useSimulationStore } from '../../store/simulationStore'
import DeviceNode from './DeviceNode'
import ConnectionLine from './ConnectionLine'
import PacketAnimation from './PacketAnimation'

export default function NetworkCanvas() {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const devices = useNetworkStore((state) => state.devices)
  const connections = useNetworkStore((state) => state.connections)
  const selectedDevice = useNetworkStore((state) => state.selectedDevice)
  const addDevice = useNetworkStore((state) => state.addDevice)
  const moveDevice = useNetworkStore((state) => state.moveDevice)
  const selectDevice = useNetworkStore((state) => state.selectDevice)
  const deselectAll = useNetworkStore((state) => state.deselectAll)
  const connectionMode = useNetworkStore((state) => state.connectionMode)
  const pendingConnection = useNetworkStore((state) => state.pendingConnection)

  const packets = useSimulationStore((state) => state.packets)
  const isRunning = useSimulationStore((state) => state.isRunning)
  const speed = useSimulationStore((state) => state.speed)

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Handle drag and drop from sidebar
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDraggingOver(false)

    const deviceType = e.dataTransfer.getData('deviceType')
    if (!deviceType) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    addDevice(deviceType, x, y)
  }

  // Handle stage click (deselect)
  const handleStageClick = (e) => {
    // Only deselect if clicking on empty space
    if (e.target === e.currentTarget) {
      deselectAll()
    }
  }

  // Get device position by ID
  const getDevicePosition = useCallback(
    (deviceId) => {
      const device = devices.find((d) => d.id === deviceId)
      return device ? device.position : null
    },
    [devices]
  )

  // Calculate connection line points
  const getConnectionPoints = useCallback(
    (connection) => {
      const sourcePos = getDevicePosition(connection.source.deviceId)
      const targetPos = getDevicePosition(connection.target.deviceId)

      if (!sourcePos || !targetPos) return null

      // Offset to center of device
      const offset = 40
      return {
        x1: sourcePos.x + offset,
        y1: sourcePos.y + offset,
        x2: targetPos.x + offset,
        y2: targetPos.y + offset
      }
    },
    [getDevicePosition]
  )

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden transition-all ${
        isDraggingOver ? 'bg-white/5' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drop zone indicator */}
      {isDraggingOver && (
        <div className="absolute inset-4 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center pointer-events-none z-10">
          <div className="bg-white/90 px-6 py-3 rounded-lg shadow-lg">
            <span className="text-lg font-medium text-gray-700">Drop device here!</span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {devices.length === 0 && !isDraggingOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-50">🌐</div>
            <h2 className="text-2xl font-bold text-white/60 mb-2">Your Network Starts Here</h2>
            <p className="text-white/40 max-w-md">
              Drag devices from the left panel to build your network, or click the{' '}
              <span className="text-purple-300">✨ sparkle button</span> to load a demo!
            </p>
          </div>
        </div>
      )}

      {/* Grid pattern background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Konva Stage */}
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleStageClick}
      >
        {/* Connection Layer (below devices) */}
        <Layer>
          {connections.map((connection) => {
            const points = getConnectionPoints(connection)
            if (!points) return null

            return (
              <ConnectionLine
                key={connection.id}
                connection={connection}
                points={points}
                isActive={isRunning}
              />
            )
          })}

          {/* Pending connection line */}
          {connectionMode && pendingConnection && (
            <PendingConnectionLine
              sourceDeviceId={pendingConnection.sourceDevice}
              devices={devices}
            />
          )}
        </Layer>

        {/* Device Layer */}
        <Layer>
          {devices.map((device) => (
            <DeviceNode
              key={device.id}
              device={device}
              isSelected={selectedDevice?.id === device.id}
              onSelect={() => selectDevice(device)}
              onMove={(x, y) => moveDevice(device.id, x, y)}
              connectionMode={connectionMode}
            />
          ))}
        </Layer>

        {/* Packet Animation Layer (above devices) */}
        <Layer>
          {packets.map((packet) => (
            <PacketAnimation
              key={packet.id}
              packet={packet}
              devices={devices}
              isRunning={isRunning}
              speed={speed}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

// Pending connection line that follows mouse
function PendingConnectionLine({ sourceDeviceId, devices }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sourceDevice = devices.find((d) => d.id === sourceDeviceId)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const stage = document.querySelector('.konvajs-content')
      if (!stage) return
      const rect = stage.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!sourceDevice) return null

  const offset = 40
  return (
    <Group>
      <Line
        points={[
          sourceDevice.position.x + offset,
          sourceDevice.position.y + offset,
          mousePos.x,
          mousePos.y
        ]}
        stroke="#6366f1"
        strokeWidth={3}
        dash={[10, 5]}
        opacity={0.7}
      />
    </Group>
  )
}

// Need to import Line for the pending connection
import { Line } from 'react-konva'
