import React from 'react'
import { Group, Path, Circle, Rect, Line } from 'react-konva'

const parseNumber = (value, fallback = 0) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

const parsePoints = (points) => {
  if (!points) return []
  return points
    .trim()
    .split(/[ ,]+/)
    .map((point) => Number(point))
    .filter((value) => Number.isFinite(value))
}

export default function LucideKonvaIcon({ iconNode, x, y, size, color }) {
  if (!iconNode) {
    return (
      <Group x={x} y={y}>
        <Rect width={size} height={size} stroke={color} strokeWidth={2} />
      </Group>
    )
  }

  const scale = size / 24

  return (
    <Group x={x} y={y} scaleX={scale} scaleY={scale}>
      {iconNode.map(([tag, attrs], index) => {
        const key = `${tag}-${index}`
        const stroke = color
        const strokeWidth = parseNumber(attrs.strokeWidth, 2)
        const lineCap = attrs.strokeLinecap || 'round'
        const lineJoin = attrs.strokeLinejoin || 'round'

        if (tag === 'path') {
          return (
            <Path
              key={key}
              data={attrs.d}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fillEnabled={false}
              lineCap={lineCap}
              lineJoin={lineJoin}
              listening={false}
            />
          )
        }

        if (tag === 'circle') {
          return (
            <Circle
              key={key}
              x={parseNumber(attrs.cx)}
              y={parseNumber(attrs.cy)}
              radius={parseNumber(attrs.r)}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fillEnabled={false}
              listening={false}
            />
          )
        }

        if (tag === 'rect') {
          const radius = parseNumber(attrs.rx)
          return (
            <Rect
              key={key}
              x={parseNumber(attrs.x)}
              y={parseNumber(attrs.y)}
              width={parseNumber(attrs.width)}
              height={parseNumber(attrs.height)}
              cornerRadius={radius}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fillEnabled={false}
              listening={false}
            />
          )
        }

        if (tag === 'line') {
          return (
            <Line
              key={key}
              points={[
                parseNumber(attrs.x1),
                parseNumber(attrs.y1),
                parseNumber(attrs.x2),
                parseNumber(attrs.y2)
              ]}
              stroke={stroke}
              strokeWidth={strokeWidth}
              lineCap={lineCap}
              lineJoin={lineJoin}
              closed={false}
              listening={false}
            />
          )
        }

        if (tag === 'polyline' || tag === 'polygon') {
          const points = parsePoints(attrs.points)
          return (
            <Line
              key={key}
              points={points}
              stroke={stroke}
              strokeWidth={strokeWidth}
              lineCap={lineCap}
              lineJoin={lineJoin}
              closed={tag === 'polygon'}
              listening={false}
            />
          )
        }

        return null
      })}
    </Group>
  )
}
