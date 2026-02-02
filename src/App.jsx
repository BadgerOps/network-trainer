import React from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import StatusBar from './components/layout/StatusBar'
import NetworkCanvas from './components/canvas/NetworkCanvas'
import DeviceConfig from './components/panels/DeviceConfig'
import PacketInspector from './components/panels/PacketInspector'
import LessonViewer from './components/lessons/LessonViewer'
import { useNetworkStore } from './store/networkStore'
import { useSimulationStore } from './store/simulationStore'
import { useLessonStore } from './store/lessonStore'
import { useThemeStore } from './store/themeStore'

export default function App() {
  const selectedDevice = useNetworkStore((state) => state.selectedDevice)
  const activePacket = useSimulationStore((state) => state.activePacket)
  const currentLesson = useLessonStore((state) => state.currentLesson)
  const mode = useLessonStore((state) => state.mode)
  const theme = useThemeStore((state) => state.getTheme())
  const [dockWidth, setDockWidth] = React.useState(360)
  const isResizingRef = React.useRef(false)

  React.useEffect(() => {
    const handleMove = (event) => {
      if (!isResizingRef.current) return
      const nextWidth = Math.max(320, Math.min(520, window.innerWidth - event.clientX))
      setDockWidth(nextWidth)
    }

    const handleUp = () => {
      if (!isResizingRef.current) return
      isResizingRef.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  return (
    <div
      className="h-screen w-screen flex flex-col relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.bgPrimary} 0%, ${theme.colors.bgSecondary} 50%, ${theme.colors.bgTertiary} 100%)`
      }}
    >
      {/* Grid Background - only shows if theme has grid effect */}
      {theme.effects.hasGrid && (
        <div
          className="absolute inset-0 pointer-events-none grid-bg"
          style={{
            backgroundImage: `
              linear-gradient(${theme.colors.borderLight} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.colors.borderLight} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        />
      )}

      {/* Horizon glow effect - only shows if theme has glow */}
      {theme.effects.hasGlow && (
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center bottom, ${theme.colors.accent}4d 0%, transparent 70%)`
          }}
        />
      )}

      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Sidebar - Device Palette */}
        <Sidebar />

        {/* Canvas Area */}
        <main className="flex-1 relative canvas-area">
          <NetworkCanvas />

          {/* Status Bar Overlay */}
          <StatusBar />
        </main>

        {/* Right Panel - Context-sensitive */}
        <aside
          className="backdrop-blur-md flex flex-col relative"
          style={{
            width: dockWidth,
            background: `linear-gradient(180deg, ${theme.colors.bgPrimary}e6 0%, ${theme.colors.bgSecondary}e6 100%)`,
            borderLeft: `1px solid ${theme.colors.border}`
          }}
        >
          <div
            className="absolute left-0 top-0 h-full w-2 cursor-col-resize z-30 pointer-events-auto"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${theme.colors.borderLight}80 40%, ${theme.colors.borderLight}80 60%, transparent 100%)`
            }}
            onMouseDown={(event) => {
              event.preventDefault()
              isResizingRef.current = true
              document.body.style.cursor = 'col-resize'
              document.body.style.userSelect = 'none'
            }}
          />
          {/* Show lesson panel if in lesson mode */}
          {mode === 'lesson' && currentLesson && (
            <LessonViewer />
          )}

          {/* Show device config if device selected */}
          {selectedDevice && mode !== 'lesson' && (
            <DeviceConfig device={selectedDevice} />
          )}

          {/* Show packet inspector if packet selected */}
          {activePacket && (
            <PacketInspector packet={activePacket} />
          )}

          {/* Empty state */}
          {!selectedDevice && !activePacket && mode !== 'lesson' && (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div
                  className="text-5xl mb-4"
                  style={{
                    animation: theme.effects.hasGlow ? 'pulse-glow 2s ease-in-out infinite' : 'none'
                  }}
                >
                  ⚡
                </div>
                <p
                  className="text-lg font-medium mb-2"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.textAccent,
                    textShadow: theme.effects.hasGlow ? `0 0 10px ${theme.colors.textAccent}` : 'none'
                  }}
                >
                  SELECT TARGET
                </p>
                <p
                  className="text-sm"
                  style={{
                    fontFamily: theme.fonts.body,
                    color: theme.colors.textMuted
                  }}
                >
                  Click on any device to configure it, or drag devices from the left panel
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
