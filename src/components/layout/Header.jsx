import React from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  BookOpen,
  Layers,
  HelpCircle,
  Zap,
  Terminal,
  GraduationCap,
  Palette
} from 'lucide-react'
import { useSimulationStore } from '../../store/simulationStore'
import { useNetworkStore } from '../../store/networkStore'
import { useLessonStore } from '../../store/lessonStore'
import { useThemeStore } from '../../store/themeStore'
import LessonMenu from '../lessons/LessonMenu'
import ThemeSelector from '../ThemeSelector'

export default function Header() {
  const { isRunning, toggle, speed, setSpeed, reset } = useSimulationStore()
  const { clearNetwork, loadDemoNetwork } = useNetworkStore()
  const { mode, setMode, endLesson, endChallenge, currentLesson, currentChallenge } = useLessonStore()
  const theme = useThemeStore((state) => state.getTheme())

  const [showTrainingMenu, setShowTrainingMenu] = React.useState(false)
  const [showThemeSelector, setShowThemeSelector] = React.useState(false)

  const handleClearAll = () => {
    if (confirm('⚠️ PURGE ALL NODES? This action cannot be undone.')) {
      clearNetwork()
      reset()
    }
  }

  const handleLoadDemo = () => {
    loadDemoNetwork()
    reset()
  }

  const handleExitSession = () => {
    if (mode === 'lesson') endLesson()
    if (mode === 'challenge') endChallenge()
    setMode('sandbox')
  }

  return (
    <>
      <header
        className="relative px-4 py-3 z-20"
        style={{
          background: `linear-gradient(180deg, ${theme.colors.bgPrimary}f2 0%, ${theme.colors.bgSecondary}e6 100%)`,
          borderBottom: `1px solid ${theme.colors.border}`,
          boxShadow: `0 0 20px ${theme.colors.glow}`
        }}
      >
        {/* Animated border glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px animate-data-flow"
          style={{ opacity: 0.6 }}
        />

        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`,
                borderRadius: theme.effects.borderRadius,
                boxShadow: theme.effects.hasGlow ? `0 0 15px ${theme.colors.accent}80` : 'none'
              }}
            >
              <Terminal size={24} style={{ color: '#fff' }} />
            </div>
            <div>
              <h1
                className="text-xl font-bold tracking-wider"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.textAccent,
                  textShadow: theme.effects.hasGlow ? `0 0 10px ${theme.colors.textAccent}80` : 'none'
                }}
              >
                NETRUNNER
              </h1>
              <p
                className="text-xs tracking-wide"
                style={{
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textMuted
                }}
              >
                NETWORK SIMULATION TERMINAL v2.0
              </p>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1 p-1"
              style={{
                background: `${theme.colors.bgPrimary}cc`,
                border: `1px solid ${theme.colors.borderLight}`,
                borderRadius: theme.effects.borderRadius
              }}
            >
              <ModeButton
                active={mode === 'sandbox'}
                onClick={handleExitSession}
                icon={<Layers size={16} />}
                label="SANDBOX"
                theme={theme}
              />

              <ModeButton
                active={mode === 'lesson' || mode === 'challenge'}
                onClick={() => setShowTrainingMenu(true)}
                icon={<GraduationCap size={16} />}
                label="ACADEMY"
                highlight
                theme={theme}
              />
            </div>

            {/* Current Session Indicator */}
            {(currentLesson || currentChallenge) && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded animate-pulse"
                style={{
                  background: currentLesson
                    ? `${theme.colors.info}33`
                    : `${theme.colors.accent}33`,
                  border: `1px solid ${currentLesson ? theme.colors.info : theme.colors.accent}66`,
                  borderRadius: theme.effects.borderRadius
                }}
              >
                <BookOpen size={14} style={{ color: currentLesson ? theme.colors.info : theme.colors.accent }} />
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: currentLesson ? theme.colors.info : theme.colors.accent
                  }}
                >
                  {currentLesson?.title || currentChallenge?.title}
                </span>
              </div>
            )}
          </div>

          {/* Simulation Controls */}
          <div className="flex items-center gap-2">
            {/* Speed Control */}
            <div
              className="flex items-center gap-2 px-3 py-1.5"
              style={{
                background: `${theme.colors.bgPrimary}cc`,
                border: `1px solid ${theme.colors.borderLight}`,
                borderRadius: theme.effects.borderRadius
              }}
            >
              <Gauge size={16} style={{ color: theme.colors.accentQuaternary }} />
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-transparent text-sm border-none focus:outline-none cursor-pointer"
                style={{
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textSecondary
                }}
              >
                <option value={0.5} style={{ background: theme.colors.bgPrimary }}>0.5x SLOW</option>
                <option value={1} style={{ background: theme.colors.bgPrimary }}>1.0x NORMAL</option>
                <option value={2} style={{ background: theme.colors.bgPrimary }}>2.0x FAST</option>
              </select>
            </div>

            {/* Play/Pause */}
            <button
              onClick={toggle}
              className="p-2.5 transition-all text-sm"
              style={{
                background: isRunning
                  ? `linear-gradient(135deg, ${theme.colors.warning} 0%, ${theme.colors.accent} 100%)`
                  : `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.info} 100%)`,
                borderRadius: theme.effects.borderRadius,
                boxShadow: theme.effects.hasGlow
                  ? `0 0 15px ${isRunning ? theme.colors.warning : theme.colors.success}66`
                  : 'none'
              }}
              title={isRunning ? 'Pause simulation' : 'Start simulation'}
            >
              {isRunning
                ? <Pause size={20} style={{ color: theme.colors.bgPrimary }} />
                : <Play size={20} style={{ color: theme.colors.bgPrimary }} />
              }
            </button>

            {/* Demo Network */}
            <button
              onClick={handleLoadDemo}
              className="p-2.5 transition-all group"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accentTertiary} 0%, ${theme.colors.accent} 100%)`,
                borderRadius: theme.effects.borderRadius,
                boxShadow: theme.effects.hasGlow ? `0 0 15px ${theme.colors.accentTertiary}66` : 'none'
              }}
              title="Load demo network"
            >
              <Zap size={20} style={{ color: '#fff' }} className="group-hover:animate-pulse" />
            </button>

            {/* Theme Selector */}
            <button
              onClick={() => setShowThemeSelector(true)}
              className="p-2.5 transition-all hover:scale-105"
              style={{
                background: `${theme.colors.bgTertiary}cc`,
                border: `1px solid ${theme.colors.accentQuaternary}66`,
                borderRadius: theme.effects.borderRadius
              }}
              title="Change theme"
            >
              <Palette size={20} style={{ color: theme.colors.accentQuaternary }} />
            </button>

            {/* Reset */}
            <button
              onClick={handleClearAll}
              className="p-2.5 transition-all hover:scale-105"
              style={{
                background: `${theme.colors.bgTertiary}cc`,
                border: `1px solid ${theme.colors.error}66`,
                borderRadius: theme.effects.borderRadius
              }}
              title="Clear network"
            >
              <RotateCcw size={20} style={{ color: theme.colors.error }} />
            </button>

            {/* Help */}
            <button
              className="p-2.5 transition-all hover:scale-105"
              style={{
                background: `${theme.colors.bgTertiary}cc`,
                border: `1px solid ${theme.colors.info}66`,
                borderRadius: theme.effects.borderRadius
              }}
              title="Help"
            >
              <HelpCircle size={20} style={{ color: theme.colors.info }} />
            </button>
          </div>
        </div>
      </header>

      {/* Training Menu Modal */}
      {showTrainingMenu && (
        <LessonMenu onClose={() => setShowTrainingMenu(false)} />
      )}

      {/* Theme Selector Modal */}
      {showThemeSelector && (
        <ThemeSelector onClose={() => setShowThemeSelector(false)} />
      )}
    </>
  )
}

function ModeButton({ active, onClick, icon, label, highlight, theme }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 tracking-wide"
      style={{
        background: active
          ? `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`
          : highlight
          ? `linear-gradient(135deg, ${theme.colors.accentQuaternary}4d 0%, ${theme.colors.accentTertiary}4d 100%)`
          : 'transparent',
        color: active ? '#fff' : highlight ? theme.colors.accentTertiary : theme.colors.textMuted,
        fontFamily: theme.fonts.heading,
        borderRadius: theme.effects.borderRadius,
        boxShadow: active && theme.effects.hasGlow ? `0 0 15px ${theme.colors.accent}66` : 'none',
        border: highlight && !active ? `1px solid ${theme.colors.accentTertiary}66` : 'none'
      }}
    >
      {icon}
      {label}
    </button>
  )
}
