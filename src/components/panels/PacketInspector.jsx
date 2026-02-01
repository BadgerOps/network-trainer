import React from 'react'
import { X, Layers, ArrowRight, Lightbulb } from 'lucide-react'
import { useSimulationStore, PACKET_TYPES } from '../../store/simulationStore'
import { useThemeStore } from '../../store/themeStore'

export default function PacketInspector({ packet }) {
  const selectPacket = useSimulationStore((state) => state.selectPacket)
  const theme = useThemeStore((state) => state.getTheme())
  const config = PACKET_TYPES[packet.type] || PACKET_TYPES.data

  const borderRadius = theme.effects.borderRadius

  return (
    <div style={{ borderTop: `1px solid ${theme.colors.border}` }}>
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${theme.colors.border}` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center text-xl"
            style={{
              backgroundColor: `${theme.colors.accentSecondary}25`,
              borderRadius: `calc(${borderRadius} + 4px)`,
              border: `1px solid ${theme.colors.accentSecondary}50`
            }}
          >
            {config.icon}
          </div>
          <div>
            <h3
              className="font-semibold"
              style={{
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.heading
              }}
            >
              {config.name} Packet
            </h3>
            <p
              className="text-xs"
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.mono
              }}
            >
              {config.protocol} Protocol
            </p>
          </div>
        </div>
        <button
          onClick={() => selectPacket(null)}
          className="p-1.5 transition-colors"
          style={{
            borderRadius,
            background: 'transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = theme.colors.bgHover}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <X size={18} style={{ color: theme.colors.textMuted }} />
        </button>
      </div>

      {/* Journey */}
      <div
        className="p-4"
        style={{ borderBottom: `1px solid ${theme.colors.border}` }}
      >
        <h4
          className="text-xs font-semibold uppercase mb-3 flex items-center gap-2 tracking-wider"
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.fonts.heading
          }}
        >
          <Layers size={14} style={{ color: theme.colors.accentSecondary }} />
          Journey
        </h4>
        <div className="flex items-center gap-2 text-sm">
          <div
            className="px-3 py-1.5"
            style={{
              background: `${theme.colors.success}20`,
              color: theme.colors.success,
              borderRadius,
              fontFamily: theme.fonts.mono
            }}
          >
            {packet.source.deviceName}
          </div>
          <ArrowRight size={16} style={{ color: theme.colors.textMuted }} />
          <div
            className="px-3 py-1.5"
            style={{
              background: `${theme.colors.info}20`,
              color: theme.colors.info,
              borderRadius,
              fontFamily: theme.fonts.mono
            }}
          >
            {packet.target.deviceName}
          </div>
        </div>
        <div
          className="mt-2 text-xs"
          style={{ color: theme.colors.textMuted }}
        >
          Hop {packet.currentPathIndex + 1} of {packet.path.length}
        </div>
      </div>

      {/* Headers */}
      <div className="p-4 space-y-4">
        {/* Layer 2 - Ethernet */}
        <LayerCard
          layer="Layer 2"
          name="Ethernet Frame"
          color={theme.colors.accentTertiary}
          icon="📦"
          theme={theme}
        >
          <Row label="Source MAC" value={packet.headers.ethernet.srcMac || 'N/A'} theme={theme} />
          <Row label="Dest MAC" value={packet.headers.ethernet.dstMac || 'Next hop'} theme={theme} />
          <p
            className="mt-2 text-xs italic"
            style={{ color: theme.colors.textMuted }}
          >
            The "envelope" that carries data between directly connected devices
          </p>
        </LayerCard>

        {/* Layer 3 - IP */}
        <LayerCard
          layer="Layer 3"
          name="IP Packet"
          color={theme.colors.info}
          icon="🌐"
          theme={theme}
        >
          <Row label="Version" value={`IPv${packet.headers.ip.version}`} theme={theme} />
          <Row label="Source IP" value={packet.headers.ip.srcIp || 'N/A'} theme={theme} />
          <Row label="Dest IP" value={packet.headers.ip.dstIp || 'N/A'} theme={theme} />
          <Row label="TTL" value={packet.headers.ip.ttl} theme={theme} />
          <Row label="Protocol" value={packet.headers.ip.protocol} theme={theme} />
          <p
            className="mt-2 text-xs italic"
            style={{ color: theme.colors.textMuted }}
          >
            Contains the actual source and destination addresses for routing
          </p>
        </LayerCard>

        {/* Layer 4 - Transport (if applicable) */}
        {packet.headers.transport && (
          <LayerCard
            layer="Layer 4"
            name={packet.headers.transport.protocol}
            color={theme.colors.success}
            icon="🚚"
            theme={theme}
          >
            <Row label="Source Port" value={packet.headers.transport.srcPort} theme={theme} />
            <Row label="Dest Port" value={packet.headers.transport.dstPort} theme={theme} />
            <p
              className="mt-2 text-xs italic"
              style={{ color: theme.colors.textMuted }}
            >
              {packet.headers.transport.protocol === 'TCP'
                ? 'Reliable, ordered delivery - like registered mail'
                : 'Fast but unreliable - like shouting across the room'}
            </p>
          </LayerCard>
        )}
      </div>

      {/* Fun fact */}
      <div
        className="p-4 mx-4 mb-4 flex items-start gap-2"
        style={{
          background: `${theme.colors.accentQuaternary}15`,
          borderRadius: theme.effects.borderRadius,
          border: `1px solid ${theme.colors.accentQuaternary}30`
        }}
      >
        <Lightbulb size={16} style={{ color: theme.colors.accentQuaternary, marginTop: 2 }} />
        <p
          className="text-xs"
          style={{ color: theme.colors.accentQuaternary }}
        >
          <strong>Did you know?</strong> This packet travels at nearly the speed of light through the cables!
        </p>
      </div>
    </div>
  )
}

function LayerCard({ layer, name, color, icon, theme, children }) {
  return (
    <div
      className="p-3"
      style={{
        background: `${theme.colors.bgPrimary}80`,
        borderRadius: theme.effects.borderRadius,
        border: `1px solid ${theme.colors.borderLight}`
      }}
    >
      <h4
        className="text-xs font-semibold mb-2 flex items-center gap-2"
        style={{
          color,
          fontFamily: theme.fonts.heading,
          letterSpacing: '0.05em'
        }}
      >
        <span>{icon}</span>
        {layer} - {name}
      </h4>
      <div className="space-y-1 text-xs">
        {children}
      </div>
    </div>
  )
}

function Row({ label, value, theme }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: theme.colors.textMuted }}>{label}</span>
      <span
        style={{
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.mono
        }}
      >
        {value}
      </span>
    </div>
  )
}
