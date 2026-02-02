import { create } from 'zustand'

// Device types with friendly names and default configs
export const DEVICE_TYPES = {
  router: {
    name: 'Router',
    iconName: 'router',
    description: 'Connects different networks together',
    color: '#ff2a6d',
    glowColor: 'rgba(255, 42, 109, 0.5)',
    defaultPorts: 4,
    canRoute: true,
    hasVLANs: false
  },
  switch: {
    name: 'Switch',
    iconName: 'switch',
    description: 'Connects devices in the same network',
    color: '#d300c5',
    glowColor: 'rgba(211, 0, 197, 0.5)',
    defaultPorts: 8,
    canRoute: false,
    hasVLANs: true
  },
  l3switch: {
    name: 'L3 Switch',
    iconName: 'l3switch',
    description: 'A smart switch that can also route',
    color: '#7b61ff',
    glowColor: 'rgba(123, 97, 255, 0.5)',
    defaultPorts: 8,
    canRoute: true,
    hasVLANs: true
  },
  computer: {
    name: 'Computer',
    iconName: 'computer',
    description: 'A regular computer on the network',
    color: '#05d9e8',
    glowColor: 'rgba(5, 217, 232, 0.5)',
    defaultPorts: 1,
    canRoute: false,
    hasVLANs: false
  },
  server: {
    name: 'Server',
    iconName: 'server',
    description: 'Provides services to other computers',
    color: '#39ff14',
    glowColor: 'rgba(57, 255, 20, 0.5)',
    defaultPorts: 2,
    canRoute: false,
    hasVLANs: false
  },
  cloud: {
    name: 'Internet',
    iconName: 'cloud',
    description: 'The global internet',
    color: '#ffe66d',
    glowColor: 'rgba(255, 230, 109, 0.5)',
    defaultPorts: 1,
    canRoute: true,
    hasVLANs: false
  }
}

// Helper to generate unique IDs
let deviceCounter = 0
const generateId = (type) => `${type}-${++deviceCounter}`

const getDefaultPortDirection = () => 'inout'

const isPortConnected = (connections, deviceId, portId) =>
  connections.some(
    (c) =>
      (c.source.deviceId === deviceId && c.source.portId === portId) ||
      (c.target.deviceId === deviceId && c.target.portId === portId)
  )

// Helper to create a new device
export const createDevice = (type, x, y) => {
  const config = DEVICE_TYPES[type]
  if (!config) return null

  const id = generateId(type)
  const interfaces = []

  // Create default interfaces
  for (let i = 0; i < config.defaultPorts; i++) {
      const direction = getDefaultPortDirection()
    interfaces.push({
      id: `${id}-port${i}`,
      name: type === 'router' ? `Gi0/${i}` : type.includes('switch') ? `Fa0/${i}` : `eth${i}`,
      ip: null,
      subnet: null,
      gateway: null,
      vlan: 1,
      mode: 'access', // access or trunk
      status: 'down',
      direction,
      portType: 'ethernet',
      maxConnections: 1,
      connectedTo: [],
      macAddress: generateMacAddress()
    })
  }

  return {
    id,
    type,
    name: `${config.name} ${deviceCounter}`,
    position: { x, y },
    interfaces,
    routingTable: config.canRoute ? [] : null,
    vlans: config.hasVLANs ? [{ id: 1, name: 'default' }] : null,
    macTable: type.includes('switch') ? {} : null,
    isSelected: false,
    config: { ...config }
  }
}

// Generate a random MAC address
const generateMacAddress = () => {
  const hex = '0123456789ABCDEF'
  let mac = ''
  for (let i = 0; i < 6; i++) {
    if (i > 0) mac += ':'
    mac += hex[Math.floor(Math.random() * 16)]
    mac += hex[Math.floor(Math.random() * 16)]
  }
  return mac
}

// Main network store
export const useNetworkStore = create((set, get) => ({
  // State
  devices: [],
  connections: [],
  selectedDevice: null,
  selectedConnection: null,
  connectionMode: null, // null, 'selecting-source', 'selecting-target'
  pendingConnection: null, // { sourceDevice, sourcePort }

  // Device actions
  addDevice: (type, x, y) => {
    const device = createDevice(type, x, y)
    if (!device) return null
    set((state) => ({
      devices: [...state.devices, device]
    }))
    return device
  },

  removeDevice: (deviceId) => {
    set((state) => ({
      devices: state.devices.filter((d) => d.id !== deviceId),
      connections: state.connections.filter(
        (c) => c.source.deviceId !== deviceId && c.target.deviceId !== deviceId
      ),
      selectedDevice: state.selectedDevice?.id === deviceId ? null : state.selectedDevice
    }))
  },

  updateDevice: (deviceId, updates) => {
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === deviceId ? { ...d, ...updates } : d
      ),
      selectedDevice: state.selectedDevice?.id === deviceId
        ? { ...state.selectedDevice, ...updates }
        : state.selectedDevice
    }))
  },

  moveDevice: (deviceId, x, y) => {
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === deviceId ? { ...d, position: { x, y } } : d
      )
    }))
  },

  selectDevice: (device) => {
    set({ selectedDevice: device, selectedConnection: null })
  },

  deselectAll: () => {
    set({ selectedDevice: null, selectedConnection: null })
  },

  // Interface actions
  updateInterface: (deviceId, portId, updates) => {
    set((state) => {
      const device = state.devices.find((d) => d.id === deviceId)
      if (!device) return state

      const updatedInterfaces = device.interfaces.map((iface) =>
        iface.id === portId ? { ...iface, ...updates } : iface
      )

      const updatedDevice = { ...device, interfaces: updatedInterfaces }

      return {
        devices: state.devices.map((d) => (d.id === deviceId ? updatedDevice : d)),
        selectedDevice: state.selectedDevice?.id === deviceId ? updatedDevice : state.selectedDevice
      }
    })
  },

  // Connection actions
  startConnection: (deviceId, portId) => {
    set({
      connectionMode: 'selecting-target',
      pendingConnection: { sourceDevice: deviceId, sourcePort: portId }
    })
  },

  cancelConnection: () => {
    set({
      connectionMode: null,
      pendingConnection: null
    })
  },

  completeConnection: (targetDeviceId, targetPortId) => {
    const state = get()
    const { pendingConnection } = state

    if (!pendingConnection) return

    get().connectPorts({
      sourceDeviceId: pendingConnection.sourceDevice,
      sourcePortId: pendingConnection.sourcePort,
      targetDeviceId,
      targetPortId
    })

    set({ connectionMode: null, pendingConnection: null })
  },

  removeConnection: (connectionId) => {
    set((state) => {
      const conn = state.connections.find((c) => c.id === connectionId)
      if (!conn) return state

      const removeFromInterface = (iface, otherEnd) => {
        const connectedTo = Array.isArray(iface.connectedTo) ? iface.connectedTo : []
        const next = connectedTo.filter((id) => id !== otherEnd)
        return {
          ...iface,
          status: next.length > 0 ? 'up' : 'down',
          connectedTo: next
        }
      }

      const devices = state.devices.map((d) => {
        if (d.id !== conn.source.deviceId && d.id !== conn.target.deviceId) return d
        return {
          ...d,
          interfaces: d.interfaces.map((iface) => {
            if (
              (d.id === conn.source.deviceId && iface.id === conn.source.portId) ||
              (d.id === conn.target.deviceId && iface.id === conn.target.portId)
            ) {
              const otherEnd =
                d.id === conn.source.deviceId
                  ? `${conn.target.deviceId}:${conn.target.portId}`
                  : `${conn.source.deviceId}:${conn.source.portId}`
              return removeFromInterface(iface, otherEnd)
            }
            return iface
          })
        }
      })

      return {
        connections: state.connections.filter((c) => c.id !== connectionId),
        devices,
        selectedConnection: null
      }
    })
  },

  selectConnection: (connection) => {
    set({ selectedConnection: connection, selectedDevice: null })
  },

  canStartConnection: (deviceId, portId) => {
    const state = get()
    const device = state.devices.find((d) => d.id === deviceId)
    const port = device?.interfaces.find((iface) => iface.id === portId)
    if (!port) return { ok: false, reason: 'Port not found' }
    if (isPortConnected(state.connections, deviceId, portId)) {
      return { ok: false, reason: 'Port already in use' }
    }
    return { ok: true }
  },

  canConnectPorts: ({ sourceDeviceId, sourcePortId, targetDeviceId, targetPortId }) => {
    const state = get()

    if (sourceDeviceId === targetDeviceId && sourcePortId === targetPortId) {
      return { ok: false, reason: 'Cannot connect a port to itself' }
    }

    if (sourceDeviceId === targetDeviceId) {
      return { ok: false, reason: 'Cannot connect a device to itself' }
    }

    const sourceDevice = state.devices.find((d) => d.id === sourceDeviceId)
    const targetDevice = state.devices.find((d) => d.id === targetDeviceId)
    const sourcePort = sourceDevice?.interfaces.find((iface) => iface.id === sourcePortId)
    const targetPort = targetDevice?.interfaces.find((iface) => iface.id === targetPortId)

    if (!sourcePort || !targetPort) return { ok: false, reason: 'Port not found' }

    const isTargetConnected = isPortConnected(state.connections, targetDeviceId, targetPortId)
    if (targetPort.maxConnections === 1 && isTargetConnected) {
      return { ok: false, reason: 'Target port already in use' }
    }

    const isSourceConnected = isPortConnected(state.connections, sourceDeviceId, sourcePortId)
    if (sourcePort.maxConnections === 1 && isSourceConnected) {
      return { ok: false, reason: 'Source port already in use' }
    }

    const alreadyConnected = state.connections.some(
      (c) =>
        (c.source.deviceId === sourceDeviceId &&
          c.source.portId === sourcePortId &&
          c.target.deviceId === targetDeviceId &&
          c.target.portId === targetPortId) ||
        (c.source.deviceId === targetDeviceId &&
          c.source.portId === targetPortId &&
          c.target.deviceId === sourceDeviceId &&
          c.target.portId === sourcePortId)
    )
    if (alreadyConnected) return { ok: false, reason: 'Ports already connected' }

    return { ok: true }
  },

  connectPorts: ({ sourceDeviceId, sourcePortId, targetDeviceId, targetPortId }) => {
    const state = get()
    const result = state.canConnectPorts({
      sourceDeviceId,
      sourcePortId,
      targetDeviceId,
      targetPortId
    })

    if (!result.ok) return false

    const newConnection = {
      id: `conn-${Date.now()}`,
      source: { deviceId: sourceDeviceId, portId: sourcePortId },
      target: { deviceId: targetDeviceId, portId: targetPortId },
      status: 'up',
      speed: '1Gbps'
    }

    const addConnectionToInterface = (iface, otherEnd) => {
      const connectedTo = Array.isArray(iface.connectedTo) ? iface.connectedTo : []
      if (connectedTo.includes(otherEnd)) return iface
      const next = [...connectedTo, otherEnd]
      return { ...iface, status: 'up', connectedTo: next }
    }

    set((state) => ({
      connections: [...state.connections, newConnection],
      devices: state.devices.map((d) => {
        if (d.id !== sourceDeviceId && d.id !== targetDeviceId) return d
        return {
          ...d,
          interfaces: d.interfaces.map((iface) => {
            if (d.id === sourceDeviceId && iface.id === sourcePortId) {
              return addConnectionToInterface(iface, `${targetDeviceId}:${targetPortId}`)
            }
            if (d.id === targetDeviceId && iface.id === targetPortId) {
              return addConnectionToInterface(iface, `${sourceDeviceId}:${sourcePortId}`)
            }
            return iface
          })
        }
      })
    }))

    return true
  },

  // Routing table actions
  addRoute: (deviceId, route) => {
    set((state) => ({
      devices: state.devices.map((d) => {
        if (d.id !== deviceId || !d.routingTable) return d
        return {
          ...d,
          routingTable: [...d.routingTable, { id: `route-${Date.now()}`, ...route }]
        }
      })
    }))
  },

  removeRoute: (deviceId, routeId) => {
    set((state) => ({
      devices: state.devices.map((d) => {
        if (d.id !== deviceId || !d.routingTable) return d
        return {
          ...d,
          routingTable: d.routingTable.filter((r) => r.id !== routeId)
        }
      })
    }))
  },

  // VLAN actions
  addVlan: (deviceId, vlanId, name) => {
    set((state) => ({
      devices: state.devices.map((d) => {
        if (d.id !== deviceId || !d.vlans) return d
        // Don't add duplicate VLANs
        if (d.vlans.some((v) => v.id === vlanId)) return d
        return {
          ...d,
          vlans: [...d.vlans, { id: vlanId, name }]
        }
      })
    }))
  },

  // Utility
  getDeviceById: (id) => get().devices.find((d) => d.id === id),

  getConnectedDevices: (deviceId) => {
    const state = get()
    const connections = state.connections.filter(
      (c) => c.source.deviceId === deviceId || c.target.deviceId === deviceId
    )
    return connections.map((c) => {
      const otherId =
        c.source.deviceId === deviceId ? c.target.deviceId : c.source.deviceId
      return state.devices.find((d) => d.id === otherId)
    })
  },

  // Clear all
  clearNetwork: () => {
    deviceCounter = 0
    set({
      devices: [],
      connections: [],
      selectedDevice: null,
      selectedConnection: null,
      connectionMode: null,
      pendingConnection: null
    })
  },

  // Load demo network
  loadDemoNetwork: () => {
    deviceCounter = 0
    const router = createDevice('router', 400, 150)
    const switch1 = createDevice('switch', 200, 300)
    const switch2 = createDevice('switch', 600, 300)
    const pc1 = createDevice('computer', 100, 450)
    const pc2 = createDevice('computer', 300, 450)
    const server = createDevice('server', 600, 450)
    const cloud = createDevice('cloud', 400, 50)

    // Set some IPs
    router.interfaces[0].ip = '192.168.1.1'
    router.interfaces[0].subnet = '255.255.255.0'
    router.interfaces[1].ip = '192.168.2.1'
    router.interfaces[1].subnet = '255.255.255.0'
    router.interfaces[2].ip = '10.0.0.2'
    router.interfaces[2].subnet = '255.255.255.0'

    pc1.interfaces[0].ip = '192.168.1.10'
    pc1.interfaces[0].subnet = '255.255.255.0'
    pc1.interfaces[0].gateway = '192.168.1.1'

    pc2.interfaces[0].ip = '192.168.1.11'
    pc2.interfaces[0].subnet = '255.255.255.0'
    pc2.interfaces[0].gateway = '192.168.1.1'

    server.interfaces[0].ip = '192.168.2.100'
    server.interfaces[0].subnet = '255.255.255.0'
    server.interfaces[0].gateway = '192.168.2.1'

    set({
      devices: [router, switch1, switch2, pc1, pc2, server, cloud],
      connections: [
        {
          id: 'conn-1',
          source: { deviceId: router.id, portId: router.interfaces[0].id },
          target: { deviceId: switch1.id, portId: switch1.interfaces[0].id },
          status: 'up',
          speed: '1Gbps'
        },
        {
          id: 'conn-2',
          source: { deviceId: router.id, portId: router.interfaces[1].id },
          target: { deviceId: switch2.id, portId: switch2.interfaces[0].id },
          status: 'up',
          speed: '1Gbps'
        },
        {
          id: 'conn-3',
          source: { deviceId: router.id, portId: router.interfaces[2].id },
          target: { deviceId: cloud.id, portId: cloud.interfaces[0].id },
          status: 'up',
          speed: '1Gbps'
        },
        {
          id: 'conn-4',
          source: { deviceId: switch1.id, portId: switch1.interfaces[1].id },
          target: { deviceId: pc1.id, portId: pc1.interfaces[0].id },
          status: 'up',
          speed: '1Gbps'
        },
        {
          id: 'conn-5',
          source: { deviceId: switch1.id, portId: switch1.interfaces[2].id },
          target: { deviceId: pc2.id, portId: pc2.interfaces[0].id },
          status: 'up',
          speed: '1Gbps'
        },
        {
          id: 'conn-6',
          source: { deviceId: switch2.id, portId: switch2.interfaces[1].id },
          target: { deviceId: server.id, portId: server.interfaces[0].id },
          status: 'up',
          speed: '1Gbps'
        }
      ],
      selectedDevice: null,
      selectedConnection: null
    })
  }
}))
