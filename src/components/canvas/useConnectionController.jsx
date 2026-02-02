import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Group, Line, Rect, Text } from 'react-konva'
import { useNetworkStore } from '../../store/networkStore'
import { useThemeStore } from '../../store/themeStore'
import { DEVICE_NODE_SIZE, getPortPositions } from '../../utils/portLayout'

const SNAP_RADIUS = 18

export function useConnectionController({ stageRef, devices }) {
  const connectPorts = useNetworkStore((state) => state.connectPorts)
  const canConnectPorts = useNetworkStore((state) => state.canConnectPorts)
  const canStartConnection = useNetworkStore((state) => state.canStartConnection)
  const theme = useThemeStore((state) => state.getTheme())

  const [dragState, setDragState] = useState(null)
  const lastPointerRef = useRef({ x: 0, y: 0 })

  const portPoints = useMemo(() => {
    const points = []
    devices.forEach((device) => {
      const positions = getPortPositions(device, DEVICE_NODE_SIZE)
      positions.forEach(({ x, y, port }) => {
        points.push({
          deviceId: device.id,
          portId: port.id,
          direction: port.direction,
          x: device.position.x + x,
          y: device.position.y + y
        })
      })
    })
    return points
  }, [devices])

  const validTargetPortIds = useMemo(() => {
    if (!dragState?.active) return new Set()

    const valid = new Set()
    portPoints.forEach((point) => {
      if (point.deviceId === dragState.sourceDeviceId && point.portId === dragState.sourcePortId) return
      const result = canConnectPorts({
        sourceDeviceId: dragState.sourceDeviceId,
        sourcePortId: dragState.sourcePortId,
        targetDeviceId: point.deviceId,
        targetPortId: point.portId
      })
      if (result.ok) valid.add(point.portId)
    })
    return valid
  }, [canConnectPorts, dragState, portPoints])

  const cancelDrag = useCallback(() => {
    setDragState(null)
  }, [])

  const startConnectionDrag = useCallback((deviceId, portId) => {
    const result = canStartConnection(deviceId, portId)
    if (!result.ok) {
      const sourcePoint = portPoints.find(
        (point) => point.deviceId === deviceId && point.portId === portId
      )
      setDragState({
        active: false,
        sourceDeviceId: deviceId,
        sourcePortId: portId,
        sourcePoint: sourcePoint || lastPointerRef.current,
        message: result.reason
      })
      setTimeout(() => setDragState(null), 1200)
      return
    }

    const sourcePoint = portPoints.find(
      (point) => point.deviceId === deviceId && point.portId === portId
    )

    setDragState({
      active: true,
      sourceDeviceId: deviceId,
      sourcePortId: portId,
      sourcePoint: sourcePoint || lastPointerRef.current,
      pointer: lastPointerRef.current,
      snapTarget: null,
      invalidHover: null
    })
  }, [canStartConnection, portPoints])

  const updatePointer = useCallback(() => {
    if (!dragState?.active || !stageRef.current) return
    const pointer = stageRef.current.getPointerPosition()
    if (!pointer) return

    lastPointerRef.current = pointer

    let nearest = null
    let nearestDistance = Number.POSITIVE_INFINITY
    let invalidHover = null

    portPoints.forEach((point) => {
      if (point.deviceId === dragState.sourceDeviceId && point.portId === dragState.sourcePortId) return

      const dx = point.x - pointer.x
      const dy = point.y - pointer.y
      const distance = Math.hypot(dx, dy)

      if (distance > SNAP_RADIUS) return

      const result = canConnectPorts({
        sourceDeviceId: dragState.sourceDeviceId,
        sourcePortId: dragState.sourcePortId,
        targetDeviceId: point.deviceId,
        targetPortId: point.portId
      })

      if (result.ok && distance < nearestDistance) {
        nearest = { deviceId: point.deviceId, portId: point.portId, x: point.x, y: point.y }
        nearestDistance = distance
      }

      if (!result.ok && !invalidHover) {
        invalidHover = {
          deviceId: point.deviceId,
          portId: point.portId,
          reason: result.reason
        }
      }
    })

    setDragState((prev) =>
      prev
        ? {
            ...prev,
            pointer,
            snapTarget: nearest,
            invalidHover
          }
        : prev
    )
  }, [canConnectPorts, dragState, portPoints, stageRef])

  const finishDrag = useCallback(() => {
    if (!dragState?.active) return

    if (dragState.snapTarget) {
      connectPorts({
        sourceDeviceId: dragState.sourceDeviceId,
        sourcePortId: dragState.sourcePortId,
        targetDeviceId: dragState.snapTarget.deviceId,
        targetPortId: dragState.snapTarget.portId
      })
    }

    setDragState(null)
  }, [connectPorts, dragState])

  const onStageMouseDown = useCallback(
    (e) => {
      if (!dragState?.active) return
      if (e.target === e.currentTarget) {
        cancelDrag()
      }
    },
    [cancelDrag, dragState]
  )

  const onStageMouseMove = useCallback(() => {
    if (!dragState?.active) return
    updatePointer()
  }, [dragState, updatePointer])

  const onStageMouseUp = useCallback(() => {
    if (!dragState?.active) return
    finishDrag()
  }, [dragState, finishDrag])

  useEffect(() => {
    if (!dragState?.active) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') cancelDrag()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cancelDrag, dragState])

  const preview = dragState ? (
    <PreviewWire
      source={dragState}
      pointer={dragState.snapTarget || dragState.pointer}
      theme={theme}
      isValid={Boolean(dragState.snapTarget)}
      invalidReason={dragState.invalidHover?.reason}
    />
  ) : null

  return {
    startConnectionDrag,
    onStageMouseDown,
    onStageMouseMove,
    onStageMouseUp,
    dragState: dragState
      ? {
          ...dragState,
          active: Boolean(dragState.active),
          validTargetPortIds,
          invalidHoverDeviceId: dragState.invalidHover?.deviceId,
          invalidHoverPortId: dragState.invalidHover?.portId
        }
      : null,
    preview
  }
}

function PreviewWire({ source, pointer, theme, isValid, invalidReason }) {
  if (!source?.sourcePoint) return null

  if (!source.active && source.message) {
    return (
      <Tooltip
        x={source.sourcePoint.x + 12}
        y={source.sourcePoint.y + 12}
        text={source.message}
        theme={theme}
      />
    )
  }

  if (!pointer) return null

  const color = isValid ? theme.colors.accent : theme.colors.error
  const dash = isValid ? [] : [8, 6]

  return (
    <>
      <Line
        points={[source.sourcePoint.x, source.sourcePoint.y, pointer.x, pointer.y]}
        stroke={color}
        strokeWidth={3}
        dash={dash}
        lineCap="round"
        shadowColor={color}
        shadowBlur={theme.effects.hasGlow ? 8 : 0}
        opacity={0.8}
      />
      {invalidReason && !isValid && (
        <Tooltip
          x={pointer.x + 12}
          y={pointer.y + 12}
          text={invalidReason}
          theme={theme}
        />
      )}
    </>
  )
}

function Tooltip({ x, y, text, theme }) {
  return (
    <Group x={x} y={y}>
      <Rect
        width={Math.max(120, text.length * 6)}
        height={28}
        cornerRadius={6}
        fill={theme.colors.bgPrimary}
        stroke={theme.colors.error}
        strokeWidth={1}
        shadowColor="black"
        shadowBlur={8}
        shadowOpacity={0.3}
      />
      <Text
        x={8}
        y={7}
        text={text}
        fontSize={10}
        fill={theme.colors.textPrimary}
        fontFamily={theme.fonts.body}
      />
    </Group>
  )
}
