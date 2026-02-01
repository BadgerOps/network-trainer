import React from 'react'
import { useSimulationStore } from '../../store/simulationStore'
import { useNetworkStore } from '../../store/networkStore'
import { useLessonStore } from '../../store/lessonStore'
import { useThemeStore } from '../../store/themeStore'
import { Activity, Wifi, WifiOff, AlertCircle, CheckCircle, Info, X, Terminal, Zap } from 'lucide-react'

export default function StatusBar() {
  const { isRunning, packets, logs } = useSimulationStore()
  const { connectionMode } = useNetworkStore()
  const { mode, currentChallenge, completedObjectives, checkObjectives } = useLessonStore()
  const theme = useThemeStore((state) => state.getTheme())

  const [showLogs, setShowLogs] = React.useState(false)

  // Check challenge objectives periodically
  React.useEffect(() => {
    if (mode !== 'challenge' || !currentChallenge) return

    const interval = setInterval(() => {
      const networkState = useNetworkStore.getState()
      const simState = useSimulationStore.getState()
      checkObjectives(networkState, simState)
    }, 1000)

    return () => clearInterval(interval)
  }, [mode, currentChallenge, checkObjectives])

  const recentLogs = logs.slice(-5).reverse()

  const getLogIcon = (level) => {
    switch (level) {
      case 'success':
        return <CheckCircle size={12} style={{ color: theme.colors.success }} />
      case 'error':
        return <AlertCircle size={12} style={{ color: theme.colors.error }} />
      default:
        return <Info size={12} style={{ color: theme.colors.info }} />
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      {/* Connection Mode Indicator */}
      {connectionMode && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 pointer-events-auto">
          <div
            className="px-4 py-2 text-sm uppercase tracking-wide animate-pulse flex items-center gap-3"
            style={{
              fontFamily: theme.fonts.heading,
              background: `linear-gradient(135deg, ${theme.colors.accentTertiary} 0%, ${theme.colors.accent} 100%)`,
              borderRadius: theme.effects.borderRadius,
              boxShadow: theme.effects.hasGlow ? `0 0 20px ${theme.colors.accentTertiary}80` : 'none',
              color: '#fff'
            }}
          >
            <Zap size={16} />
            SELECT TARGET PORT TO LINK
            <button
              onClick={() => useNetworkStore.getState().cancelConnection()}
              className="ml-2 hover:scale-110 transition-transform"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Challenge Objectives */}
      {mode === 'challenge' && currentChallenge && (
        <div className="absolute top-4 left-4 pointer-events-auto">
          <div
            className="p-4 max-w-xs backdrop-blur-md"
            style={{
              background: `${theme.colors.bgPrimary}f2`,
              border: `1px solid ${theme.colors.accent}66`,
              borderRadius: parseInt(theme.effects.borderRadius) + 4,
              boxShadow: theme.effects.hasGlow ? `0 0 20px ${theme.colors.accent}33` : `0 4px 20px ${theme.colors.shadow}`
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{currentChallenge.icon}</span>
              <div>
                <h3
                  className="font-semibold uppercase"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.accent
                  }}
                >
                  {currentChallenge.title}
                </h3>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: theme.fonts.body,
                    color: theme.colors.textMuted
                  }}
                >
                  {currentChallenge.description}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {currentChallenge.objectives.map((obj) => {
                const isComplete = completedObjectives.includes(obj.id)
                return (
                  <div
                    key={obj.id}
                    className="flex items-center gap-2 text-sm"
                    style={{
                      fontFamily: theme.fonts.body,
                      color: isComplete ? theme.colors.success : theme.colors.textMuted
                    }}
                  >
                    {isComplete ? (
                      <CheckCircle size={16} style={{ color: theme.colors.success }} />
                    ) : (
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ border: `2px solid ${theme.colors.textMuted}` }}
                      />
                    )}
                    <span className={isComplete ? 'line-through' : ''}>{obj.text}</span>
                  </div>
                )
              })}
            </div>

            {completedObjectives.length === currentChallenge.objectives.length && (
              <div
                className="mt-4 p-3 text-center"
                style={{
                  background: `${theme.colors.success}1a`,
                  border: `1px solid ${theme.colors.success}66`,
                  borderRadius: theme.effects.borderRadius
                }}
              >
                <div className="text-2xl mb-1">⚡</div>
                <div
                  className="font-semibold uppercase"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.success
                  }}
                >
                  MISSION COMPLETE
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Status Bar */}
      <div className="flex items-end justify-between p-4 pointer-events-auto">
        {/* Simulation Status */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 text-sm uppercase tracking-wide"
            style={{
              fontFamily: theme.fonts.heading,
              background: isRunning
                ? `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.info} 100%)`
                : `${theme.colors.bgPrimary}e6`,
              border: isRunning ? 'none' : `1px solid ${theme.colors.borderLight}`,
              borderRadius: theme.effects.borderRadius,
              color: isRunning ? theme.colors.bgPrimary : theme.colors.textMuted,
              boxShadow: isRunning && theme.effects.hasGlow ? `0 0 15px ${theme.colors.success}66` : 'none'
            }}
          >
            {isRunning ? (
              <>
                <Wifi size={16} className="animate-pulse" />
                <span>ONLINE</span>
              </>
            ) : (
              <>
                <WifiOff size={16} />
                <span>STANDBY</span>
              </>
            )}
          </div>

          {packets.length > 0 && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 text-sm"
              style={{
                fontFamily: theme.fonts.mono,
                background: `${theme.colors.accentTertiary}33`,
                border: `1px solid ${theme.colors.accentTertiary}66`,
                borderRadius: theme.effects.borderRadius,
                color: theme.colors.accentTertiary
              }}
            >
              <Activity size={16} className="animate-pulse" />
              <span>{packets.length} PACKETS IN TRANSIT</span>
            </div>
          )}
        </div>

        {/* Event Log */}
        <div className="relative">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm uppercase tracking-wide transition-all"
            style={{
              fontFamily: theme.fonts.heading,
              background: `${theme.colors.bgPrimary}e6`,
              border: `1px solid ${theme.colors.info}4d`,
              borderRadius: theme.effects.borderRadius,
              color: theme.colors.info
            }}
          >
            <Terminal size={16} />
            SYSTEM LOG
            {logs.length > 0 && (
              <span
                className="ml-1 px-1.5 py-0.5 text-xs"
                style={{
                  fontFamily: theme.fonts.mono,
                  background: `${theme.colors.accent}4d`,
                  borderRadius: theme.effects.borderRadius,
                  color: theme.colors.accent
                }}
              >
                {logs.length}
              </span>
            )}
          </button>

          {showLogs && (
            <div
              className="absolute bottom-full right-0 mb-2 w-96 overflow-hidden"
              style={{
                background: `${theme.colors.bgPrimary}fa`,
                border: `1px solid ${theme.colors.info}66`,
                borderRadius: parseInt(theme.effects.borderRadius) + 4,
                boxShadow: `0 0 30px ${theme.colors.shadow}, ${theme.effects.hasGlow ? `0 0 15px ${theme.colors.info}33` : 'none'}`
              }}
            >
              <div
                className="flex items-center justify-between p-3"
                style={{
                  background: `${theme.colors.info}1a`,
                  borderBottom: `1px solid ${theme.colors.info}4d`
                }}
              >
                <h3
                  className="text-sm uppercase"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.info
                  }}
                >
                  SYSTEM LOG
                </h3>
                <button
                  onClick={() => useSimulationStore.getState().clearLogs()}
                  className="text-xs uppercase transition-colors hover:opacity-80"
                  style={{
                    fontFamily: theme.fonts.body,
                    color: theme.colors.error
                  }}
                >
                  PURGE
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <div
                    className="p-4 text-center text-sm"
                    style={{
                      fontFamily: theme.fonts.body,
                      color: theme.colors.textMuted
                    }}
                  >
                    NO EVENTS LOGGED. INITIATE DATA TRANSFER.
                  </div>
                ) : (
                  <div>
                    {recentLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 flex items-start gap-2"
                        style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}
                      >
                        {getLogIcon(log.level)}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm"
                            style={{
                              fontFamily: theme.fonts.body,
                              color: theme.colors.textSecondary
                            }}
                          >
                            {log.message}
                          </p>
                          <p
                            className="text-xs"
                            style={{
                              fontFamily: theme.fonts.mono,
                              color: theme.colors.textMuted
                            }}
                          >
                            {log.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
