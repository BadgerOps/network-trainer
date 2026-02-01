import React from 'react'
import { useThemeStore, THEMES } from '../store/themeStore'
import { X, Check, Palette, Monitor, Cpu, Server, Wifi } from 'lucide-react'

export default function ThemeSelector({ onClose }) {
  const { currentTheme, setTheme, getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-lg overflow-hidden"
        style={{
          background: theme.colors.bgSecondary,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: `0 0 60px ${theme.colors.glow}`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${theme.colors.border}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`
              }}
            >
              <Palette size={22} style={{ color: '#fff' }} />
            </div>
            <div>
              <h2
                className="text-xl font-bold uppercase tracking-wider"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.textPrimary
                }}
              >
                SELECT VISUAL STYLE
              </h2>
              <p
                className="text-sm"
                style={{
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textMuted
                }}
              >
                Choose your preferred interface theme
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded transition-all hover:scale-105"
            style={{
              background: `${theme.colors.error}33`,
              border: `1px solid ${theme.colors.error}66`
            }}
          >
            <X size={20} style={{ color: theme.colors.error }} />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(THEMES).map((t) => (
            <ThemeCard
              key={t.id}
              theme={t}
              isActive={currentTheme === t.id}
              onClick={() => setTheme(t.id)}
            />
          ))}
        </div>

        {/* Preview Section */}
        <div
          className="p-6"
          style={{
            background: theme.colors.bgPrimary,
            borderTop: `1px solid ${theme.colors.border}`
          }}
        >
          <p
            className="text-sm mb-4"
            style={{
              fontFamily: theme.fonts.body,
              color: theme.colors.textMuted
            }}
          >
            PREVIEW: {theme.name.toUpperCase()}
          </p>
          <ThemePreview theme={theme} />
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME CARD - Clickable theme selection card
// ═══════════════════════════════════════════════════════════════════════════

function ThemeCard({ theme, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative p-4 rounded-lg text-left transition-all hover:scale-[1.02] group"
      style={{
        background: theme.preview.bg,
        border: isActive
          ? `2px solid ${theme.colors.accent}`
          : `1px solid ${theme.colors.border}`,
        boxShadow: isActive
          ? `0 0 20px ${theme.colors.glow}`
          : 'none'
      }}
    >
      {/* Active indicator */}
      {isActive && (
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: theme.colors.accent }}
        >
          <Check size={14} style={{ color: '#fff' }} />
        </div>
      )}

      {/* Color swatches */}
      <div className="flex gap-2 mb-4">
        <div
          className="w-8 h-8 rounded"
          style={{ background: theme.preview.accent1 }}
        />
        <div
          className="w-8 h-8 rounded"
          style={{ background: theme.preview.accent2 }}
        />
        <div
          className="w-8 h-8 rounded"
          style={{ background: theme.preview.accent3 }}
        />
      </div>

      {/* Mini preview */}
      <div
        className="h-20 rounded mb-3 p-2 flex items-center justify-center gap-3"
        style={{
          background: theme.colors.bgPrimary,
          border: `1px solid ${theme.colors.border}`
        }}
      >
        <MiniDevice color={theme.colors.router} icon="router" />
        <MiniConnection color={theme.colors.accentSecondary} />
        <MiniDevice color={theme.colors.switch} icon="switch" />
        <MiniConnection color={theme.colors.accentSecondary} />
        <MiniDevice color={theme.colors.computer} icon="computer" />
      </div>

      {/* Theme info */}
      <h3
        className="font-bold text-lg"
        style={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.textPrimary
        }}
      >
        {theme.name}
      </h3>
      <p
        className="text-sm"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.colors.textSecondary
        }}
      >
        {theme.description}
      </p>

      {/* Effect badges */}
      <div className="flex gap-2 mt-3">
        {theme.effects.hasGlow && (
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: `${theme.colors.accent}33`,
              color: theme.colors.accent
            }}
          >
            GLOW
          </span>
        )}
        {theme.effects.hasScanlines && (
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: `${theme.colors.accentSecondary}33`,
              color: theme.colors.accentSecondary
            }}
          >
            CRT
          </span>
        )}
        {theme.effects.hasGrid && (
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: `${theme.colors.accentTertiary}33`,
              color: theme.colors.accentTertiary
            }}
          >
            GRID
          </span>
        )}
      </div>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MINI COMPONENTS for card previews
// ═══════════════════════════════════════════════════════════════════════════

function MiniDevice({ color, icon }) {
  const icons = {
    router: <Wifi size={16} />,
    switch: <Server size={16} />,
    computer: <Monitor size={16} />
  }

  return (
    <div
      className="w-10 h-10 rounded flex items-center justify-center"
      style={{
        background: `${color}22`,
        border: `2px solid ${color}`,
        color: color
      }}
    >
      {icons[icon]}
    </div>
  )
}

function MiniConnection({ color }) {
  return (
    <div
      className="w-6 h-0.5"
      style={{ background: color }}
    />
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME PREVIEW - Full UI mockup
// ═══════════════════════════════════════════════════════════════════════════

function ThemePreview({ theme }) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.bgSecondary
      }}
    >
      {/* Mock Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{
          background: theme.colors.bgPrimary,
          borderBottom: `1px solid ${theme.colors.border}`
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ background: theme.colors.accent }}
          >
            <Cpu size={16} style={{ color: '#fff' }} />
          </div>
          <span
            className="font-bold tracking-wider"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.textAccent
            }}
          >
            NETRUNNER
          </span>
        </div>
        <div className="flex gap-2">
          <div
            className="px-3 py-1.5 rounded text-xs"
            style={{
              background: theme.colors.bgHover,
              border: `1px solid ${theme.colors.borderLight}`,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body
            }}
          >
            SANDBOX
          </div>
          <div
            className="px-3 py-1.5 rounded text-xs"
            style={{
              background: theme.colors.accent,
              color: '#fff',
              fontFamily: theme.fonts.body
            }}
          >
            ACADEMY
          </div>
        </div>
      </div>

      {/* Mock Canvas Area */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className="w-48 p-3"
          style={{
            background: theme.colors.bgPrimary,
            borderRight: `1px solid ${theme.colors.border}`
          }}
        >
          <div
            className="text-xs mb-2 uppercase tracking-wider"
            style={{
              fontFamily: theme.fonts.body,
              color: theme.colors.textMuted
            }}
          >
            Hardware
          </div>
          <div className="space-y-2">
            {[
              { name: 'Router', color: theme.colors.router },
              { name: 'Switch', color: theme.colors.switch },
              { name: 'Computer', color: theme.colors.computer }
            ].map((d) => (
              <div
                key={d.name}
                className="flex items-center gap-2 p-2 rounded"
                style={{
                  background: `${d.color}15`,
                  border: `1px solid ${d.color}44`
                }}
              >
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{
                    background: `${d.color}33`,
                    border: `1px solid ${d.color}`
                  }}
                >
                  <Monitor size={12} style={{ color: d.color }} />
                </div>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: theme.fonts.body,
                    color: theme.colors.textSecondary
                  }}
                >
                  {d.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div
          className="flex-1 h-48 relative"
          style={{
            background: theme.effects.hasGrid
              ? `${theme.colors.bgPrimary} url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='${encodeURIComponent(theme.colors.borderLight)}' stroke-width='0.5'/%3E%3C/svg%3E")`
              : theme.colors.bgPrimary
          }}
        >
          {/* Mock network devices */}
          <MockDevice
            x={60}
            y={70}
            label="RTR"
            color={theme.colors.router}
            theme={theme}
          />
          <MockDevice
            x={180}
            y={70}
            label="SW"
            color={theme.colors.switch}
            theme={theme}
          />
          <MockDevice
            x={300}
            y={40}
            label="PC1"
            color={theme.colors.computer}
            theme={theme}
          />
          <MockDevice
            x={300}
            y={100}
            label="PC2"
            color={theme.colors.computer}
            theme={theme}
          />

          {/* Mock connections */}
          <svg className="absolute inset-0 pointer-events-none">
            <line
              x1="100"
              y1="90"
              x2="180"
              y2="90"
              stroke={theme.colors.accentSecondary}
              strokeWidth="2"
            />
            <line
              x1="220"
              y1="80"
              x2="300"
              y2="60"
              stroke={theme.colors.accentSecondary}
              strokeWidth="2"
            />
            <line
              x1="220"
              y1="100"
              x2="300"
              y2="120"
              stroke={theme.colors.accentSecondary}
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Mock Status Bar */}
      <div
        className="px-4 py-2 flex items-center justify-between text-xs"
        style={{
          background: theme.colors.bgPrimary,
          borderTop: `1px solid ${theme.colors.border}`,
          fontFamily: theme.fonts.mono,
          color: theme.colors.textMuted
        }}
      >
        <span>MODE: SANDBOX</span>
        <span style={{ color: theme.colors.success }}>● READY</span>
        <span>DEVICES: 4 | LINKS: 3</span>
      </div>
    </div>
  )
}

function MockDevice({ x, y, label, color, theme }) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <div
        className="w-10 h-10 rounded flex items-center justify-center"
        style={{
          background: `${color}22`,
          border: `2px solid ${color}`,
          boxShadow: theme.effects.hasGlow
            ? `0 0 ${theme.effects.glowStrength} ${color}66`
            : 'none'
        }}
      >
        <Monitor size={16} style={{ color }} />
      </div>
      <span
        className="mt-1 text-xs"
        style={{
          fontFamily: theme.fonts.mono,
          color: theme.colors.textSecondary
        }}
      >
        {label}
      </span>
    </div>
  )
}
