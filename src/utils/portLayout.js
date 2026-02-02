export const DEVICE_NODE_SIZE = 80

export function getPortPositions(device, size = DEVICE_NODE_SIZE) {
  const ports = device.interfaces || []
  const positions = []
  const numPorts = ports.length

  if (numPorts === 0) return positions

  for (let i = 0; i < numPorts; i++) {
    const side = i % 4
    const indexOnSide = Math.floor(i / 4)
    const portsOnSide = Math.ceil(numPorts / 4)
    const offset = ((indexOnSide + 1) / (portsOnSide + 1)) * size

    let x
    let y
    switch (side) {
      case 0:
        x = offset
        y = 0
        break
      case 1:
        x = size
        y = offset
        break
      case 2:
        x = size - offset
        y = size
        break
      default:
        x = 0
        y = size - offset
        break
    }
    positions.push({ x, y, port: ports[i] })
  }

  return positions
}

export function getPortCanvasPosition(device, portId, size = DEVICE_NODE_SIZE) {
  const positions = getPortPositions(device, size)
  const found = positions.find((pos) => pos.port.id === portId)
  if (!found) return null

  return {
    x: device.position.x + found.x,
    y: device.position.y + found.y,
    port: found.port
  }
}
