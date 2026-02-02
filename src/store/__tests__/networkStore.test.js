import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useNetworkStore } from '../networkStore'

const resetStore = () => {
  useNetworkStore.getState().clearNetwork()
  useNetworkStore.setState({
    selectedDevice: null,
    selectedConnection: null,
    connectionMode: null,
    pendingConnection: null
  })
}

describe('networkStore', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    resetStore()
    vi.spyOn(Date, 'now').mockReturnValue(1234567890)
  })

  it('adds a device with default interfaces', () => {
    const device = useNetworkStore.getState().addDevice('router', 10, 20)

    const state = useNetworkStore.getState()
    expect(state.devices).toHaveLength(1)
    expect(device.type).toBe('router')
    expect(device.position).toEqual({ x: 10, y: 20 })
    expect(device.interfaces).toHaveLength(4)
    expect(device.interfaces[0].status).toBe('down')
  })

  it('removes a device and its connections', () => {
    const store = useNetworkStore.getState()
    const router = store.addDevice('router', 0, 0)
    const computer = store.addDevice('computer', 100, 0)

    store.connectPorts({
      sourceDeviceId: router.id,
      sourcePortId: router.interfaces[0].id,
      targetDeviceId: computer.id,
      targetPortId: computer.interfaces[0].id
    })

    expect(useNetworkStore.getState().connections).toHaveLength(1)

    store.selectDevice(router)
    store.removeDevice(router.id)

    const state = useNetworkStore.getState()
    expect(state.devices).toHaveLength(1)
    expect(state.connections).toHaveLength(0)
    expect(state.selectedDevice).toBeNull()
  })

  it('prevents self-connection', () => {
    const store = useNetworkStore.getState()
    const router = store.addDevice('router', 0, 0)

    const result = store.connectPorts({
      sourceDeviceId: router.id,
      sourcePortId: router.interfaces[0].id,
      targetDeviceId: router.id,
      targetPortId: router.interfaces[1].id
    })

    const state = useNetworkStore.getState()
    expect(result).toBe(false)
    expect(state.connections).toHaveLength(0)
  })

  it('prevents multiple connections on a single port', () => {
    const store = useNetworkStore.getState()
    const router = store.addDevice('router', 0, 0)
    const computer = store.addDevice('computer', 100, 0)
    const server = store.addDevice('server', 200, 0)

    const first = store.connectPorts({
      sourceDeviceId: router.id,
      sourcePortId: router.interfaces[0].id,
      targetDeviceId: computer.id,
      targetPortId: computer.interfaces[0].id
    })

    const second = store.connectPorts({
      sourceDeviceId: router.id,
      sourcePortId: router.interfaces[0].id,
      targetDeviceId: server.id,
      targetPortId: server.interfaces[0].id
    })

    const third = store.connectPorts({
      sourceDeviceId: router.id,
      sourcePortId: router.interfaces[1].id,
      targetDeviceId: computer.id,
      targetPortId: computer.interfaces[0].id
    })

    const state = useNetworkStore.getState()
    expect(first).toBe(true)
    expect(second).toBe(false)
    expect(third).toBe(false)
    expect(state.connections).toHaveLength(1)
  })

  it('updates interface status on connect and disconnect', () => {
    const store = useNetworkStore.getState()
    const router = store.addDevice('router', 0, 0)
    const computer = store.addDevice('computer', 100, 0)

    store.connectPorts({
      sourceDeviceId: router.id,
      sourcePortId: router.interfaces[0].id,
      targetDeviceId: computer.id,
      targetPortId: computer.interfaces[0].id
    })

    let state = useNetworkStore.getState()
    const connection = state.connections[0]

    const routerIface = state.devices
      .find((d) => d.id === router.id)
      .interfaces.find((iface) => iface.id === router.interfaces[0].id)

    const computerIface = state.devices
      .find((d) => d.id === computer.id)
      .interfaces.find((iface) => iface.id === computer.interfaces[0].id)

    expect(routerIface.status).toBe('up')
    expect(computerIface.status).toBe('up')
    expect(routerIface.connectedTo).toContain(`${computer.id}:${computer.interfaces[0].id}`)
    expect(computerIface.connectedTo).toContain(`${router.id}:${router.interfaces[0].id}`)

    store.removeConnection(connection.id)

    state = useNetworkStore.getState()
    const routerAfter = state.devices
      .find((d) => d.id === router.id)
      .interfaces.find((iface) => iface.id === router.interfaces[0].id)

    const computerAfter = state.devices
      .find((d) => d.id === computer.id)
      .interfaces.find((iface) => iface.id === computer.interfaces[0].id)

    expect(routerAfter.status).toBe('down')
    expect(computerAfter.status).toBe('down')
    expect(routerAfter.connectedTo).toHaveLength(0)
    expect(computerAfter.connectedTo).toHaveLength(0)
  })
})
