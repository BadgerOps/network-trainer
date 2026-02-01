import React from 'react'
import { DEVICE_TYPES, useNetworkStore } from '../../store/networkStore'
import { useSimulationStore, PACKET_TYPES } from '../../store/simulationStore'
import { useThemeStore } from '../../store/themeStore'
import { Send, Activity, ChevronDown, ChevronRight, Cpu, Radio } from 'lucide-react'
import DeviceIcon from '../DeviceIcon'

export default function Sidebar() {
  const addDevice = useNetworkStore((state) => state.addDevice)
  const devices = useNetworkStore((state) => state.devices)
  const connections = useNetworkStore((state) => state.connections)
  const sendPacket = useSimulationStore((state) => state.sendPacket)
  const theme = useThemeStore((state) => state.getTheme())

  const [draggedType, setDraggedType] = React.useState(null)
  const [showTrafficPanel, setShowTrafficPanel] = React.useState(false)
  const [selectedSource, setSelectedSource] = React.useState('')
  const [selectedTarget, setSelectedTarget] = React.useState('')
  const [selectedPacketType, setSelectedPacketType] = React.useState('ping')

  const handleDragStart = (e, type) => {
    setDraggedType(type)
    e.dataTransfer.setData('deviceType', type)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleSendPacket = () => {
    if (!selectedSource || !selectedTarget || selectedSource === selectedTarget) return
    sendPacket(selectedSource, selectedTarget, selectedPacketType)
  }

  const endpoints = devices.filter(d => d.type === 'computer' || d.type === 'server')

  // Map device types to theme colors
  const getDeviceColor = (type) => {
    const colorMap = {
      router: theme.colors.router,
      switch: theme.colors.switch,
      l3switch: theme.colors.l3switch,
      computer: theme.colors.computer,
      server: theme.colors.server,
      cloud: theme.colors.cloud
    }
    return colorMap[type] || theme.colors.accent
  }

  return (
    <aside
      className="w-64 flex flex-col"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.bgPrimary}f2 0%, ${theme.colors.bgSecondary}e6 100%)`,
        borderRight: `1px solid ${theme.colors.border}`
      }}
    >
      {/* Device Palette */}
      <div className="p-4" style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
        <h2
          className="text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-2"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.textAccent
          }}
        >
          <Cpu size={14} />
          HARDWARE
        </h2>
        <p
          className="text-xs mb-4"
          style={{
            fontFamily: theme.fonts.body,
            color: theme.colors.textMuted
          }}
        >
          Drag nodes to deploy
        </p>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(DEVICE_TYPES).map(([type, config]) => {
            const deviceColor = getDeviceColor(type)
            return (
              <div
                key={type}
                draggable
                onDragStart={(e) => handleDragStart(e, type)}
                className="rounded p-2 cursor-grab active:cursor-grabbing transition-all group flex flex-col items-center"
                style={{
                  background: `${theme.colors.bgSurface}99`,
                  border: `1px solid ${theme.colors.borderLight}`,
                  borderRadius: theme.effects.borderRadius
                }}
                title={config.description}
              >
                <DeviceIcon type={type} size="md" color={deviceColor} />
                <div
                  className="text-[10px] text-center font-semibold uppercase mt-1 tracking-wide"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: deviceColor
                  }}
                >
                  {config.name}
                </div>
                <div
                  className="text-[9px] text-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    fontFamily: theme.fonts.mono,
                    color: theme.colors.textMuted
                  }}
                >
                  {config.defaultPorts} PORTS
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Traffic Generator */}
      <div className="p-4" style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
        <button
          onClick={() => setShowTrafficPanel(!showTrafficPanel)}
          className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider transition-colors"
          style={{
            fontFamily: theme.fonts.heading,
            color: showTrafficPanel ? theme.colors.accent : theme.colors.textMuted
          }}
        >
          <span className="flex items-center gap-2">
            <Radio size={14} />
            TRANSMIT DATA
          </span>
          {showTrafficPanel ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {showTrafficPanel && (
          <div className="mt-4 space-y-3">
            {/* Source */}
            <div>
              <label
                className="text-xs block mb-1 uppercase"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.info
                }}
              >
                Origin Node
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full text-sm px-3 py-2 focus:outline-none transition-all"
                style={{
                  background: theme.colors.bgPrimary,
                  border: `1px solid ${theme.colors.info}4d`,
                  borderRadius: theme.effects.borderRadius,
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textSecondary
                }}
              >
                <option value="" style={{ background: theme.colors.bgPrimary }}>Select node...</option>
                {endpoints.map((d) => (
                  <option key={d.id} value={d.id} style={{ background: theme.colors.bgPrimary }}>
                    {d.name} ({d.interfaces[0]?.ip || 'No IP'})
                  </option>
                ))}
              </select>
            </div>

            {/* Target */}
            <div>
              <label
                className="text-xs block mb-1 uppercase"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.accent
                }}
              >
                Target Node
              </label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="w-full text-sm px-3 py-2 focus:outline-none transition-all"
                style={{
                  background: theme.colors.bgPrimary,
                  border: `1px solid ${theme.colors.accent}4d`,
                  borderRadius: theme.effects.borderRadius,
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textSecondary
                }}
              >
                <option value="" style={{ background: theme.colors.bgPrimary }}>Select node...</option>
                {endpoints.filter(d => d.id !== selectedSource).map((d) => (
                  <option key={d.id} value={d.id} style={{ background: theme.colors.bgPrimary }}>
                    {d.name} ({d.interfaces[0]?.ip || 'No IP'})
                  </option>
                ))}
              </select>
            </div>

            {/* Packet Type */}
            <div>
              <label
                className="text-xs block mb-1 uppercase"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.accentTertiary
                }}
              >
                Protocol
              </label>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(PACKET_TYPES).slice(0, 4).map(([type, config]) => (
                  <button
                    key={type}
                    onClick={() => setSelectedPacketType(type)}
                    className="p-2 text-xs flex items-center gap-1 transition-all"
                    style={{
                      background: selectedPacketType === type
                        ? `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`
                        : `${theme.colors.bgSurface}99`,
                      border: selectedPacketType === type
                        ? 'none'
                        : `1px solid ${theme.colors.borderLight}`,
                      borderRadius: theme.effects.borderRadius,
                      fontFamily: theme.fonts.body,
                      color: selectedPacketType === type ? '#fff' : theme.colors.textMuted,
                      boxShadow: selectedPacketType === type && theme.effects.hasGlow
                        ? `0 0 10px ${theme.colors.accent}4d`
                        : 'none'
                    }}
                  >
                    <span>{config.icon}</span>
                    <span className="uppercase">{config.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendPacket}
              disabled={!selectedSource || !selectedTarget}
              className="w-full py-2.5 text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              style={{
                background: (!selectedSource || !selectedTarget)
                  ? `${theme.colors.bgSurface}`
                  : `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.info} 100%)`,
                borderRadius: theme.effects.borderRadius,
                fontFamily: theme.fonts.heading,
                color: (!selectedSource || !selectedTarget)
                  ? theme.colors.textMuted
                  : theme.colors.bgPrimary,
                boxShadow: (!selectedSource || !selectedTarget)
                  ? 'none'
                  : theme.effects.hasGlow
                  ? `0 0 15px ${theme.colors.success}66`
                  : 'none',
                cursor: (!selectedSource || !selectedTarget) ? 'not-allowed' : 'pointer'
              }}
            >
              <Send size={16} />
              TRANSMIT
            </button>
          </div>
        )}
      </div>

      {/* System Info */}
      <div className="p-4 flex-1">
        <h2
          className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.accentQuaternary
          }}
        >
          <Activity size={14} />
          SYSTEM INFO
        </h2>
        <div
          className="space-y-2 text-xs"
          style={{
            fontFamily: theme.fonts.body,
            color: theme.colors.textMuted
          }}
        >
          <p><span style={{ color: theme.colors.info }}>DRAG</span> → Deploy nodes to grid</p>
          <p><span style={{ color: theme.colors.accent }}>CLICK PORT</span> → Create link</p>
          <p><span style={{ color: theme.colors.accentTertiary }}>SELECT</span> → Configure node</p>
          <p><span style={{ color: theme.colors.success }}>EXECUTE</span> → Watch data flow</p>
        </div>
      </div>

      {/* Network Stats */}
      <div
        className="p-4"
        style={{
          background: `${theme.colors.bgPrimary}80`,
          borderTop: `1px solid ${theme.colors.borderLight}`
        }}
      >
        <div
          className="flex justify-between text-xs uppercase"
          style={{
            fontFamily: theme.fonts.mono,
            color: theme.colors.textMuted
          }}
        >
          <span>
            NODES: <span style={{ color: theme.colors.info }}>{devices.length}</span>
          </span>
          <span>
            LINKS: <span style={{ color: theme.colors.accent }}>{connections.length}</span>
          </span>
        </div>
      </div>
    </aside>
  )
}
