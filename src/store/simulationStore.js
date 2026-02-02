import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useNetworkStore } from './networkStore'

// Packet types with friendly descriptions
export const PACKET_TYPES = {
  ping: {
    name: 'Ping',
    icon: '📡',
    description: 'A simple message to check if a device is reachable',
    color: '#22c55e',
    protocol: 'ICMP'
  },
  http: {
    name: 'Web Request',
    icon: '🌐',
    description: 'Loading a webpage from a server',
    color: '#3b82f6',
    protocol: 'HTTP',
    port: 80
  },
  https: {
    name: 'Secure Web',
    icon: '🔒',
    description: 'Secure webpage request (encrypted)',
    color: '#8b5cf6',
    protocol: 'HTTPS',
    port: 443
  },
  dns: {
    name: 'DNS Lookup',
    icon: '📖',
    description: 'Looking up a website address',
    color: '#f59e0b',
    protocol: 'DNS',
    port: 53
  },
  data: {
    name: 'Data',
    icon: '📦',
    description: 'General data transfer',
    color: '#6366f1',
    protocol: 'TCP'
  }
}

export const useSimulationStore = create(
  persist(
    (set, get) => ({
      // State
      isRunning: false,
      speed: 1, // 0.5, 1, 2 multiplier
      packets: [], // Active packets in flight
      activePacket: null, // Currently selected packet for inspection
      logs: [], // Event log
      trafficGeneration: null, // Current traffic pattern being generated

  // Control actions
  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  toggle: () => set((state) => ({ isRunning: !state.isRunning })),

  setSpeed: (speed) => set({ speed }),

  // Packet actions
  sendPacket: (sourceDeviceId, targetDeviceId, type = 'ping', payload = null) => {
    const networkStore = useNetworkStore.getState()
    const source = networkStore.getDeviceById(sourceDeviceId)
    const target = networkStore.getDeviceById(targetDeviceId)

    if (!source || !target) {
      get().addLog('error', `Cannot send packet: device not found`)
      return null
    }

    // Find the path between devices
    const path = get().calculatePath(sourceDeviceId, targetDeviceId)

    if (!path || path.length === 0) {
      get().addLog('error', `No route from ${source.name} to ${target.name}`)
      return null
    }

    const packetConfig = PACKET_TYPES[type] || PACKET_TYPES.data

    const packet = {
      id: `pkt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      config: packetConfig,
      source: {
        deviceId: sourceDeviceId,
        deviceName: source.name,
        ip: source.interfaces[0]?.ip || 'Unknown'
      },
      target: {
        deviceId: targetDeviceId,
        deviceName: target.name,
        ip: target.interfaces[0]?.ip || 'Unknown'
      },
      path,
      currentPathIndex: 0,
      progress: 0, // 0-1 progress along current segment
      status: 'in-transit', // in-transit, delivered, dropped
      createdAt: Date.now(),
      headers: {
        ethernet: {
          srcMac: source.interfaces[0]?.macAddress,
          dstMac: null // Will be resolved per-hop
        },
        ip: {
          version: 4,
          srcIp: source.interfaces[0]?.ip,
          dstIp: target.interfaces[0]?.ip,
          ttl: 64,
          protocol: packetConfig.protocol
        },
        transport: type !== 'ping' ? {
          protocol: type === 'ping' ? 'ICMP' : 'TCP',
          srcPort: Math.floor(Math.random() * 60000) + 1024,
          dstPort: packetConfig.port || 80
        } : null
      },
      payload
    }

    set((state) => ({
      packets: [...state.packets, packet]
    }))

    get().addLog('info', `📤 ${source.name} → ${target.name}: ${packetConfig.name}`)

    return packet
  },

  // Update packet position (called by animation loop)
  updatePacket: (packetId, updates) => {
    set((state) => ({
      packets: state.packets.map((p) =>
        p.id === packetId ? { ...p, ...updates } : p
      )
    }))
  },

  // Move packet to next hop
  advancePacket: (packetId) => {
    set((state) => {
      const packet = state.packets.find((p) => p.id === packetId)
      if (!packet) return state

      const newIndex = packet.currentPathIndex + 1

      // Check if reached destination
      if (newIndex >= packet.path.length - 1) {
        get().addLog('success', `📥 ${packet.target.deviceName} received ${packet.config.name} from ${packet.source.deviceName}`)

        // If it's a ping, send a reply
        if (packet.type === 'ping') {
          setTimeout(() => {
            get().sendPacket(packet.target.deviceId, packet.source.deviceId, 'ping')
          }, 500 / state.speed)
        }

        return {
          packets: state.packets.filter((p) => p.id !== packetId)
        }
      }

      // Decrement TTL
      const newTtl = packet.headers.ip.ttl - 1
      if (newTtl <= 0) {
        get().addLog('error', `⚠️ Packet dropped: TTL exceeded`)
        return {
          packets: state.packets.filter((p) => p.id !== packetId)
        }
      }

      return {
        packets: state.packets.map((p) =>
          p.id === packetId
            ? {
                ...p,
                currentPathIndex: newIndex,
                progress: 0,
                headers: {
                  ...p.headers,
                  ip: { ...p.headers.ip, ttl: newTtl }
                }
              }
            : p
        )
      }
    })
  },

  // Remove packet
  removePacket: (packetId) => {
    set((state) => ({
      packets: state.packets.filter((p) => p.id !== packetId),
      activePacket: state.activePacket?.id === packetId ? null : state.activePacket
    }))
  },

  // Select packet for inspection
  selectPacket: (packet) => {
    set({ activePacket: packet })
  },

  // Clear all packets
  clearPackets: () => {
    set({ packets: [], activePacket: null })
  },

  // Calculate path between two devices using BFS
  calculatePath: (sourceId, targetId) => {
    const networkStore = useNetworkStore.getState()
    const { devices, connections } = networkStore

    // Build adjacency list
    const graph = {}
    devices.forEach((d) => {
      graph[d.id] = []
    })
    connections.forEach((c) => {
      if (c.status === 'up') {
        graph[c.source.deviceId].push(c.target.deviceId)
        graph[c.target.deviceId].push(c.source.deviceId)
      }
    })

    // BFS
    const queue = [[sourceId]]
    const visited = new Set([sourceId])

    while (queue.length > 0) {
      const path = queue.shift()
      const current = path[path.length - 1]

      if (current === targetId) {
        return path
      }

      for (const neighbor of graph[current] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push([...path, neighbor])
        }
      }
    }

    return null // No path found
  },

  // Logging
  addLog: (level, message) => {
    set((state) => ({
      logs: [
        ...state.logs.slice(-99), // Keep last 100 logs
        {
          id: Date.now(),
          level,
          message,
          timestamp: new Date().toLocaleTimeString()
        }
      ]
    }))
  },

  clearLogs: () => set({ logs: [] }),

  // Traffic generation
  startTrafficGeneration: (pattern) => {
    set({ trafficGeneration: pattern })
    // Traffic generation will be handled by a component
  },

  stopTrafficGeneration: () => {
    set({ trafficGeneration: null })
  },

  // Reset simulation
      reset: () => {
        set({
          isRunning: false,
          packets: [],
          activePacket: null,
          logs: [],
          trafficGeneration: null
        })
      }
    }),
    {
      name: 'netrunner-sim',
      partialize: (state) => ({
        isRunning: state.isRunning,
        speed: state.speed
      })
    }
  )
)
