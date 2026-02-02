import React from 'react'
import { useLessonStore } from '../../store/lessonStore'
import { useThemeStore } from '../../store/themeStore'
import { ChevronLeft, ChevronRight, X, CheckCircle, Target, BookOpen, Timer, Gauge } from 'lucide-react'

export default function LessonViewer() {
  const { currentLesson, currentStep, nextStep, prevStep, endLesson } = useLessonStore()
  const theme = useThemeStore((state) => state.getTheme())

  if (!currentLesson) return null

  const step = currentLesson.steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === currentLesson.steps.length - 1
  const progress = ((currentStep + 1) / currentLesson.steps.length) * 100
  const borderRadius = theme.effects.borderRadius

  return (
    <div
      className="flex flex-col h-full relative overflow-hidden animate-lesson-panel"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.bgPrimary}f5 0%, ${theme.colors.bgSecondary}f2 100%)`
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 10% 20%, ${theme.colors.accentSecondary}1a, transparent 55%), radial-gradient(circle at 90% 10%, ${theme.colors.accent}14, transparent 50%)`
        }}
      />

      {/* Header */}
      <div
        className="p-6 relative"
        style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 flex items-center justify-center text-2xl"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`,
                borderRadius: `calc(${borderRadius} + 6px)`,
                boxShadow: theme.effects.hasGlow ? `0 0 18px ${theme.colors.accent}66` : 'none'
              }}
            >
              {currentLesson.icon}
            </div>
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.2em] leading-none"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.textMuted
                }}
              >
                Lesson Sequence
              </p>
              <h2
                className="text-2xl font-semibold uppercase tracking-wide leading-tight"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.textPrimary
                }}
              >
                {currentLesson.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <MetaPill icon={Timer} label={currentLesson.duration} theme={theme} />
                <MetaPill icon={Gauge} label={currentLesson.difficulty} theme={theme} />
                <MetaPill
                  icon={BookOpen}
                  label={`Step ${currentStep + 1}/${currentLesson.steps.length}`}
                  theme={theme}
                />
              </div>
            </div>
          </div>
          <button
            onClick={endLesson}
            className="p-2 transition-all hover:scale-105"
            style={{
              background: `${theme.colors.error}1a`,
              border: `1px solid ${theme.colors.error}66`,
              borderRadius
            }}
            title="Exit lesson"
          >
            <X size={16} style={{ color: theme.colors.error }} />
          </button>
        </div>

        {/* Progress bar */}
        <div
          className="h-3 mt-5 overflow-hidden"
          style={{
            background: `${theme.colors.bgPrimary}cc`,
            border: `1px solid ${theme.colors.borderLight}`,
            borderRadius
          }}
        >
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${theme.colors.accentSecondary} 0%, ${theme.colors.success} 100%)`,
              boxShadow: theme.effects.hasGlow ? `0 0 10px ${theme.colors.success}80` : 'none'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div
          className="p-6 animate-lesson-card"
          style={{
            background: `${theme.colors.bgSurface}f2`,
            border: `1px solid ${theme.colors.borderLight}`,
            borderRadius: `calc(${borderRadius} + 6px)`,
            boxShadow: theme.effects.hasGlow ? `0 12px 30px ${theme.colors.shadow}` : '0 12px 30px rgba(0,0,0,0.12)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="px-3 py-1 text-[12px] uppercase tracking-[0.2em] leading-none"
              style={{
                fontFamily: theme.fonts.heading,
                background: `${theme.colors.accentSecondary}1a`,
                color: theme.colors.accentSecondary,
                borderRadius
              }}
            >
              Step {currentStep + 1}
            </div>
            <h3
              className="text-xl font-semibold uppercase tracking-wide leading-tight"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.textPrimary
              }}
            >
              {step.title}
            </h3>
          </div>

          <div className="space-y-4">
            {step.content.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="leading-relaxed text-[16px]"
                style={{
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textSecondary
                }}
              >
                {formatContent(paragraph, theme)}
              </p>
            ))}
          </div>
        </div>

        {/* Action hint */}
        {step.action && (
          <div
            className="p-5"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.warning}1a 0%, ${theme.colors.warning}08 100%)`,
              border: `1px solid ${theme.colors.warning}66`,
              borderRadius: `calc(${borderRadius} + 4px)`
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="p-2"
                style={{
                  background: `${theme.colors.warning}20`,
                  borderRadius
                }}
              >
                <Target size={18} style={{ color: theme.colors.warning }} />
              </div>
              <div>
                <p
                  className="text-[12px] font-semibold uppercase tracking-[0.2em] leading-none"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.warning
                  }}
                >
                  Mission
                </p>
                <p
                  className="text-[15px] mt-2"
                  style={{
                    fontFamily: theme.fonts.body,
                    color: theme.colors.warning,
                    opacity: 0.9
                  }}
                >
                  {step.action.hint}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Completion celebration */}
        {isLastStep && (
          <div
            className="p-7 text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.success}1a 0%, ${theme.colors.accentSecondary}1a 100%)`,
              border: `1px solid ${theme.colors.success}80`,
              borderRadius: `calc(${borderRadius} + 6px)`,
              boxShadow: theme.effects.hasGlow ? `0 0 30px ${theme.colors.success}33` : 'none'
            }}
          >
            <div className="text-5xl mb-3">⚡</div>
            <h4
              className="text-2xl font-bold uppercase tracking-[0.12em]"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.success,
                textShadow: theme.effects.hasGlow ? `0 0 10px ${theme.colors.success}80` : 'none'
              }}
            >
              Training Complete
            </h4>
            <p
              className="text-[15px] mt-3"
              style={{
                fontFamily: theme.fonts.body,
                color: theme.colors.accentSecondary
              }}
            >
              Neural pathways upgraded. New skills acquired.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div
        className="p-5 flex items-center justify-between"
        style={{ borderTop: `1px solid ${theme.colors.borderLight}` }}
      >
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className="flex items-center gap-2 px-5 py-2.5 text-[13px] uppercase tracking-[0.2em] transition-all"
          style={{
            fontFamily: theme.fonts.heading,
            background: isFirstStep ? 'transparent' : `${theme.colors.accentQuaternary}1a`,
            border: `1px solid ${isFirstStep ? theme.colors.borderLight : `${theme.colors.accentQuaternary}66`}`,
            color: isFirstStep ? theme.colors.textMuted : theme.colors.accentQuaternary,
            borderRadius,
            cursor: isFirstStep ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="flex gap-2">
          {currentLesson.steps.map((_, i) => (
            <div
              key={i}
              className="h-2 transition-all duration-300"
              style={{
                width: i === currentStep ? 22 : 8,
                borderRadius: 999,
                background: i === currentStep
                  ? `linear-gradient(90deg, ${theme.colors.accentSecondary}, ${theme.colors.success})`
                  : i < currentStep
                  ? theme.colors.success
                  : theme.colors.borderLight,
                boxShadow: i === currentStep && theme.effects.hasGlow
                  ? `0 0 8px ${theme.colors.success}80`
                  : 'none'
              }}
            />
          ))}
        </div>

        <button
          onClick={isLastStep ? endLesson : nextStep}
          className="flex items-center gap-2 px-5 py-2.5 text-[13px] uppercase tracking-[0.2em] transition-all hover:scale-105"
          style={{
            fontFamily: theme.fonts.heading,
            background: isLastStep
              ? `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.accentSecondary} 100%)`
              : `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`,
            color: isLastStep ? theme.colors.bgPrimary : '#fff',
            borderRadius,
            boxShadow: theme.effects.hasGlow
              ? `0 0 15px ${isLastStep ? theme.colors.success : theme.colors.accent}66`
              : 'none'
          }}
        >
          {isLastStep ? (
            <>
              <CheckCircle size={16} />
              Complete
            </>
          ) : (
            <>
              Next
              <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function MetaPill({ icon: Icon, label, theme }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1 text-[12px] uppercase tracking-[0.2em]"
      style={{
        fontFamily: theme.fonts.heading,
        background: `${theme.colors.bgSurface}cc`,
        color: theme.colors.textMuted,
        border: `1px solid ${theme.colors.borderLight}`,
        borderRadius: `calc(${theme.effects.borderRadius} + 4px)`
      }}
    >
      <Icon size={14} style={{ color: theme.colors.accentSecondary }} />
      {label}
    </div>
  )
}

// Helper to format markdown-like content
function formatContent(text, theme) {
  const parts = text.split(/(\*\*.*?\*\*)/g)

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={i}
          className="font-semibold"
          style={{ color: theme.colors.accentSecondary }}
        >
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith('• ')) {
      return (
        <span
          key={i}
          className="block ml-4 my-1"
          style={{ color: theme.colors.textSecondary }}
        >
          <span style={{ color: theme.colors.accent }}>▸</span> {part.slice(2)}
        </span>
      )
    }

    return part
  })
}
