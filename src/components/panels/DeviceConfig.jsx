import React, { useState } from 'react'
import { useNetworkStore, DEVICE_TYPES } from '../../store/networkStore'
import { useThemeStore } from '../../store/themeStore'
import {
  Trash2,
  Network,
  Router,
  Settings,
  ChevronDown,
  ChevronRight,
  Globe,
  Layers,
  Monitor,
  Server,
  Cloud
} from 'lucide-react'

// Get the icon component for a device type
function getDeviceIcon(type, size = 24) {
  const iconMap = {
    router: Globe,
    switch: Network,
    l3switch: Layers,
    computer: Monitor,
    server: Server,
    cloud: Cloud
  }
  const IconComponent = iconMap[type] || Network
  return <IconComponent size={size} />
}

export default function DeviceConfig({ device }) {
  const updateDevice = useNetworkStore((state) => state.updateDevice)
  const updateInterface = useNetworkStore((state) => state.updateInterface)
  const removeDevice = useNetworkStore((state) => state.removeDevice)
  const deselectAll = useNetworkStore((state) => state.deselectAll)
  const addRoute = useNetworkStore((state) => state.addRoute)
  const removeRoute = useNetworkStore((state) => state.removeRoute)
  const theme = useThemeStore((state) => state.getTheme())

  const [expandedSections, setExpandedSections] = useState({
    general: true,
    interfaces: true,
    routing: false
  })

  const [newRoute, setNewRoute] = useState({
    network: '',
    gateway: '',
    interfaceId: ''
  })

  const config = DEVICE_TYPES[device.type]

  // Get device color from theme
  const deviceColor = {
    router: theme.colors.router,
    switch: theme.colors.switch,
    l3switch: theme.colors.l3switch,
    computer: theme.colors.computer,
    server: theme.colors.server,
    cloud: theme.colors.cloud
  }[device.type] || theme.colors.accent

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleNameChange = (e) => {
    updateDevice(device.id, { name: e.target.value })
  }

  const handleInterfaceChange = (portId, field, value) => {
    updateInterface(device.id, portId, { [field]: value })
  }

  const handleDelete = () => {
    if (confirm(`Delete ${device.name}? This will also remove all connections.`)) {
      removeDevice(device.id)
      deselectAll()
    }
  }

  const handleAddRoute = () => {
    if (!newRoute.network || !newRoute.gateway) return
    addRoute(device.id, newRoute)
    setNewRoute({ network: '', gateway: '', interfaceId: '' })
  }

  const borderRadius = theme.effects.borderRadius

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div
        className="p-4"
        style={{ borderBottom: `1px solid ${theme.colors.border}` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 flex items-center justify-center"
            style={{
              backgroundColor: `${deviceColor}25`,
              borderRadius: `calc(${borderRadius} + 4px)`,
              border: `1px solid ${deviceColor}50`
            }}
          >
            <span style={{ color: deviceColor }}>
              {getDeviceIcon(device.type, 24)}
            </span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={device.name}
              onChange={handleNameChange}
              className="bg-transparent font-semibold text-lg border-none focus:outline-none w-full px-1 -ml-1"
              style={{
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.heading
              }}
            />
            <p
              className="text-xs"
              style={{ color: theme.colors.textMuted }}
            >
              {config?.description}
            </p>
          </div>
        </div>
      </div>

      {/* General Section */}
      <Section
        title="General"
        icon={<Settings size={16} />}
        expanded={expandedSections.general}
        onToggle={() => toggleSection('general')}
        theme={theme}
      >
        <div className="space-y-3">
          <InfoRow label="Type" value={config?.name} theme={theme} />
          <InfoRow label="Ports" value={device.interfaces?.length || 0} theme={theme} />
          <InfoRow
            label="Can Route"
            value={config?.canRoute ? 'Yes' : 'No'}
            theme={theme}
          />
          {config?.hasVLANs && (
            <InfoRow label="VLAN Support" value="Yes" theme={theme} />
          )}
        </div>
      </Section>

      {/* Interfaces Section */}
      <Section
        title="Network Interfaces"
        icon={<Network size={16} />}
        expanded={expandedSections.interfaces}
        onToggle={() => toggleSection('interfaces')}
        theme={theme}
      >
        <div className="space-y-4">
          {device.interfaces?.map((iface) => (
            <div
              key={iface.id}
              className="p-3"
              style={{
                background: `${theme.colors.bgPrimary}80`,
                borderRadius,
                border: `1px solid ${theme.colors.borderLight}`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-medium text-sm"
                  style={{
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.mono
                  }}
                >
                  {iface.name}
                </span>
                <span
                  className="text-xs px-2 py-0.5"
                  style={{
                    borderRadius,
                    background: iface.status === 'up'
                      ? `${theme.colors.success}25`
                      : `${theme.colors.textMuted}25`,
                    color: iface.status === 'up'
                      ? theme.colors.success
                      : theme.colors.textMuted
                  }}
                >
                  {iface.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                <InputField
                  label="IP Address"
                  value={iface.ip || ''}
                  onChange={(e) =>
                    handleInterfaceChange(iface.id, 'ip', e.target.value)
                  }
                  placeholder="192.168.1.1"
                  theme={theme}
                />

                <InputField
                  label="Subnet Mask"
                  value={iface.subnet || ''}
                  onChange={(e) =>
                    handleInterfaceChange(iface.id, 'subnet', e.target.value)
                  }
                  placeholder="255.255.255.0"
                  theme={theme}
                />

                {(device.type === 'computer' || device.type === 'server') && (
                  <InputField
                    label="Default Gateway"
                    value={iface.gateway || ''}
                    onChange={(e) =>
                      handleInterfaceChange(iface.id, 'gateway', e.target.value)
                    }
                    placeholder="192.168.1.1"
                    theme={theme}
                  />
                )}

                {config?.hasVLANs && (
                  <InputField
                    label="VLAN"
                    type="number"
                    value={iface.vlan || 1}
                    onChange={(e) =>
                      handleInterfaceChange(iface.id, 'vlan', parseInt(e.target.value))
                    }
                    min="1"
                    max="4094"
                    theme={theme}
                  />
                )}

                <div
                  className="text-xs pt-1"
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.mono
                  }}
                >
                  MAC: {iface.macAddress}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Routing Table Section (for routers and L3 switches) */}
      {config?.canRoute && (
        <Section
          title="Routing Table"
          icon={<Router size={16} />}
          expanded={expandedSections.routing}
          onToggle={() => toggleSection('routing')}
          theme={theme}
        >
          <div className="space-y-3">
            {device.routingTable?.length === 0 && (
              <p
                className="text-xs text-center py-2"
                style={{ color: theme.colors.textMuted }}
              >
                No routes configured
              </p>
            )}

            {device.routingTable?.map((route) => (
              <div
                key={route.id}
                className="p-2 flex items-center justify-between"
                style={{
                  background: `${theme.colors.bgPrimary}80`,
                  borderRadius
                }}
              >
                <div
                  className="text-sm"
                  style={{ fontFamily: theme.fonts.mono }}
                >
                  <span style={{ color: theme.colors.textPrimary }}>{route.network}</span>
                  <span style={{ color: theme.colors.textMuted }} className="mx-2">→</span>
                  <span style={{ color: theme.colors.success }}>{route.gateway}</span>
                </div>
                <button
                  onClick={() => removeRoute(device.id, route.id)}
                  className="p-1 transition-colors hover:opacity-80"
                  style={{ color: theme.colors.error }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Add new route */}
            <div
              className="space-y-2 pt-3"
              style={{ borderTop: `1px solid ${theme.colors.borderLight}` }}
            >
              <InputField
                value={newRoute.network}
                onChange={(e) =>
                  setNewRoute((prev) => ({ ...prev, network: e.target.value }))
                }
                placeholder="Network (e.g., 10.0.0.0/8)"
                theme={theme}
              />
              <InputField
                value={newRoute.gateway}
                onChange={(e) =>
                  setNewRoute((prev) => ({ ...prev, gateway: e.target.value }))
                }
                placeholder="Gateway (e.g., 192.168.1.1)"
                theme={theme}
              />
              <button
                onClick={handleAddRoute}
                disabled={!newRoute.network || !newRoute.gateway}
                className="w-full py-2 text-sm font-medium transition-all"
                style={{
                  background: (!newRoute.network || !newRoute.gateway)
                    ? theme.colors.textMuted
                    : `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`,
                  color: theme.colors.bgPrimary,
                  borderRadius,
                  fontFamily: theme.fonts.heading,
                  cursor: (!newRoute.network || !newRoute.gateway) ? 'not-allowed' : 'pointer',
                  opacity: (!newRoute.network || !newRoute.gateway) ? 0.5 : 1,
                  boxShadow: theme.effects.hasGlow && newRoute.network && newRoute.gateway
                    ? `0 0 15px ${theme.colors.accent}50`
                    : 'none'
                }}
              >
                ADD ROUTE
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* Delete Button */}
      <div className="p-4">
        <button
          onClick={handleDelete}
          className="w-full py-2.5 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          style={{
            background: `${theme.colors.error}20`,
            color: theme.colors.error,
            borderRadius,
            border: `1px solid ${theme.colors.error}40`,
            fontFamily: theme.fonts.heading,
            fontSize: '0.875rem',
            letterSpacing: '0.05em'
          }}
        >
          <Trash2 size={16} />
          DELETE DEVICE
        </button>
      </div>
    </div>
  )
}

function Section({ title, icon, expanded, onToggle, children, theme }) {
  return (
    <div style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between transition-colors"
        style={{
          color: theme.colors.textPrimary,
          background: 'transparent'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = theme.colors.bgHover}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <span
          className="flex items-center gap-2 font-medium text-sm uppercase tracking-wider"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.textSecondary
          }}
        >
          <span style={{ color: theme.colors.accentSecondary }}>{icon}</span>
          {title}
        </span>
        <span style={{ color: theme.colors.textMuted }}>
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      </button>
      {expanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

function InfoRow({ label, value, theme }) {
  return (
    <div className="flex justify-between text-sm">
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

function InputField({ label, value, onChange, placeholder, type = 'text', theme, ...props }) {
  return (
    <div>
      {label && (
        <label
          className="text-xs block mb-1"
          style={{ color: theme.colors.textMuted }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-sm px-2.5 py-2 transition-all focus:outline-none"
        style={{
          background: theme.colors.bgPrimary,
          color: theme.colors.textPrimary,
          borderRadius: theme.effects.borderRadius,
          border: `1px solid ${theme.colors.borderLight}`,
          fontFamily: theme.fonts.mono
        }}
        onFocus={(e) => {
          e.target.style.borderColor = theme.colors.accent
          e.target.style.boxShadow = `0 0 0 2px ${theme.colors.accent}30`
        }}
        onBlur={(e) => {
          e.target.style.borderColor = theme.colors.borderLight
          e.target.style.boxShadow = 'none'
        }}
        {...props}
      />
    </div>
  )
}
