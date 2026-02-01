import React from 'react'
import { useLessonStore } from '../../store/lessonStore'
import { useThemeStore } from '../../store/themeStore'
import { ChevronLeft, ChevronRight, X, CheckCircle, Zap, Target, BookOpen } from 'lucide-react'

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
      className="flex flex-col h-full"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.bgPrimary}fa 0%, ${theme.colors.bgSecondary}f2 100%)`
      }}
    >
      {/* Header */}
      <div
        className="p-4"
        style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center text-xl"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accentQuaternary} 0%, ${theme.colors.accentTertiary} 100%)`,
                borderRadius: `calc(${borderRadius} + 4px)`,
                boxShadow: theme.effects.hasGlow ? `0 0 15px ${theme.colors.accentQuaternary}66` : 'none'
              }}
            >
              {currentLesson.icon}
            </div>
            <div>
              <h2
                className="font-semibold uppercase tracking-wide"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.accentSecondary
                }}
              >
                {currentLesson.title}
              </h2>
              <p
                className="text-xs"
                style={{
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textMuted
                }}
              >
                <span style={{ color: theme.colors.accent }}>STEP {currentStep + 1}</span> OF {currentLesson.steps.length}
              </p>
            </div>
          </div>
          <button
            onClick={endLesson}
            className="p-2 transition-all hover:scale-105"
            style={{
              background: `${theme.colors.error}20`,
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
          className="h-2 overflow-hidden"
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
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} style={{ color: theme.colors.accentTertiary }} />
          <h3
            className="text-lg font-semibold uppercase tracking-wide"
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
              className="leading-relaxed"
              style={{
                fontFamily: theme.fonts.body,
                color: theme.colors.textSecondary
              }}
            >
              {formatContent(paragraph, theme)}
            </p>
          ))}
        </div>

        {/* Action hint */}
        {step.action && (
          <div
            className="mt-6 p-4"
            style={{
              background: `${theme.colors.warning}15`,
              border: `1px solid ${theme.colors.warning}66`,
              borderRadius,
              boxShadow: theme.effects.hasGlow ? `0 0 20px ${theme.colors.warning}1a` : 'none'
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
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.warning
                  }}
                >
                  YOUR MISSION
                </p>
                <p
                  className="text-sm mt-1"
                  style={{
                    fontFamily: theme.fonts.body,
                    color: theme.colors.warning,
                    opacity: 0.85
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
            className="mt-6 p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.success}1a 0%, ${theme.colors.accentSecondary}1a 100%)`,
              border: `1px solid ${theme.colors.success}80`,
              borderRadius,
              boxShadow: theme.effects.hasGlow ? `0 0 30px ${theme.colors.success}33` : 'none'
            }}
          >
            <div className="text-5xl mb-3">⚡</div>
            <h4
              className="text-xl font-bold uppercase tracking-wider"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.success,
                textShadow: theme.effects.hasGlow ? `0 0 10px ${theme.colors.success}80` : 'none'
              }}
            >
              TRAINING COMPLETE
            </h4>
            <p
              className="text-sm mt-2"
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
        className="p-4 flex items-center justify-between"
        style={{ borderTop: `1px solid ${theme.colors.borderLight}` }}
      >
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className="flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wide transition-all"
          style={{
            fontFamily: theme.fonts.heading,
            background: isFirstStep ? 'transparent' : `${theme.colors.accentQuaternary}20`,
            border: `1px solid ${isFirstStep ? theme.colors.borderLight : `${theme.colors.accentQuaternary}66`}`,
            color: isFirstStep ? theme.colors.textMuted : theme.colors.accentQuaternary,
            borderRadius,
            cursor: isFirstStep ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={16} />
          BACK
        </button>

        <div className="flex gap-2">
          {currentLesson.steps.map((_, i) => (
            <div
              key={i}
              className="h-2 transition-all duration-300"
              style={{
                width: i === currentStep ? 20 : 8,
                borderRadius: 4,
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
          className="flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wide transition-all hover:scale-105"
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
              COMPLETE
            </>
          ) : (
            <>
              NEXT
              <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Helper to format markdown-like content
function formatContent(text, theme) {
  // Handle bold text
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

    // Handle bullet points
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
