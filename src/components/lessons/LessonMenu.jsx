import React from 'react'
import { useLessonStore, LESSONS, CHALLENGES } from '../../store/lessonStore'
import { useNetworkStore } from '../../store/networkStore'
import { useThemeStore } from '../../store/themeStore'
import {
  X,
  BookOpen,
  Target,
  Trophy,
  Clock,
  Zap,
  ChevronRight,
  Lock,
  CheckCircle,
  Play
} from 'lucide-react'

// Module organization matching the curriculum
const NETWORK_MODULES = [
  {
    id: 1,
    name: 'Foundations',
    level: 'Beginner',
    lessons: ['intro-networks', 'ip-addresses', 'sending-data']
  },
  {
    id: 2,
    name: 'Switches & LANs',
    level: 'Beginner',
    lessons: ['switches', 'vlans']
  },
  {
    id: 3,
    name: 'Routing',
    level: 'Intermediate',
    lessons: ['routers', 'subnetting', 'inter-vlan']
  },
  {
    id: 4,
    name: 'Protocols',
    level: 'Intermediate',
    lessons: ['tcp-udp', 'ports']
  },
  {
    id: 5,
    name: 'Troubleshooting',
    level: 'Advanced',
    lessons: ['troubleshoot', 'packet-tracing']
  }
]

// Production Tech modules (lights & sounds)
const PRODUCTION_MODULES = [
  {
    id: 6,
    name: 'Audio Fundamentals',
    level: 'Beginner',
    lessons: ['audio-mixing-fundamentals']
  },
  {
    id: 7,
    name: 'Wireless Systems',
    level: 'Intermediate',
    lessons: ['uhf-frequency-coordination']
  },
  {
    id: 8,
    name: 'Audio Networking',
    level: 'Intermediate',
    lessons: ['audio-over-ip-basics']
  },
  {
    id: 9,
    name: 'Lighting Control',
    level: 'Beginner',
    lessons: ['dmx-lighting-fundamentals']
  },
  {
    id: 10,
    name: 'System Integration',
    level: 'Intermediate',
    lessons: ['stage-signal-flow']
  }
]

export default function LessonMenu({ onClose }) {
  const { startLesson, startChallenge, completedLessons, completedChallenges } = useLessonStore()
  const clearNetwork = useNetworkStore((state) => state.clearNetwork)
  const theme = useThemeStore((state) => state.getTheme())
  const [activeTab, setActiveTab] = React.useState('lessons')
  const [activeCurriculum, setActiveCurriculum] = React.useState('network') // 'network' or 'production'

  const borderRadius = theme.effects.borderRadius

  // Get module colors from theme
  const moduleColors = [
    theme.colors.accentSecondary,
    theme.colors.accentTertiary,
    theme.colors.accent,
    theme.colors.accentQuaternary,
    theme.colors.success
  ]

  // Get active modules based on selected curriculum
  const MODULES = activeCurriculum === 'network' ? NETWORK_MODULES : PRODUCTION_MODULES

  const handleStartLesson = (lessonId) => {
    clearNetwork()
    startLesson(lessonId)
    onClose()
  }

  const handleStartChallenge = (challengeId) => {
    clearNetwork()
    startChallenge(challengeId)
    onClose()
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return theme.colors.accentSecondary
      case 'Intermediate': return theme.colors.warning
      case 'Advanced': return theme.colors.accent
      default: return theme.colors.textMuted
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: `${theme.colors.bgPrimary}e6`,
        backdropFilter: 'blur(8px)'
      }}
    >
      <div
        className="w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(180deg, ${theme.colors.bgSecondary}fa 0%, ${theme.colors.bgPrimary}fa 100%)`,
          border: `1px solid ${theme.colors.borderLight}`,
          borderRadius: `calc(${borderRadius} + 8px)`,
          boxShadow: theme.effects.hasGlow
            ? `0 0 60px ${theme.colors.accentQuaternary}33, 0 0 30px ${theme.colors.accentTertiary}1a`
            : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header */}
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 flex items-center justify-center text-2xl"
              style={{
                background: activeCurriculum === 'network'
                  ? `linear-gradient(135deg, ${theme.colors.accentQuaternary} 0%, ${theme.colors.accentTertiary} 100%)`
                  : `linear-gradient(135deg, ${theme.colors.warning} 0%, ${theme.colors.accent} 100%)`,
                borderRadius: `calc(${borderRadius} + 4px)`,
                boxShadow: theme.effects.hasGlow
                  ? `0 0 20px ${activeCurriculum === 'network' ? theme.colors.accentQuaternary : theme.colors.warning}66`
                  : 'none'
              }}
            >
              {activeCurriculum === 'network' ? <Zap size={24} style={{ color: '#fff' }} /> : '🎚️'}
            </div>
            <div>
              <h2
                className="text-xl font-bold uppercase tracking-wider"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.textPrimary,
                  textShadow: theme.effects.hasGlow ? `0 0 10px ${theme.colors.accentTertiary}80` : 'none'
                }}
              >
                {activeCurriculum === 'network' ? 'NETRUNNER ACADEMY' : 'PRODUCTION TECH TRAINER'}
              </h2>
              <p
                className="text-sm"
                style={{
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textMuted
                }}
              >
                {activeCurriculum === 'network'
                  ? 'Master networking fundamentals'
                  : 'Learn live event production'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-all hover:scale-105"
            style={{
              background: `${theme.colors.error}20`,
              border: `1px solid ${theme.colors.error}66`,
              borderRadius
            }}
          >
            <X size={20} style={{ color: theme.colors.error }} />
          </button>
        </div>

        {/* Curriculum Toggle */}
        <div className="flex gap-2 px-5 pt-4">
          <button
            onClick={() => setActiveCurriculum('network')}
            className="flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wide transition-all"
            style={{
              fontFamily: theme.fonts.heading,
              background: activeCurriculum === 'network'
                ? `linear-gradient(135deg, ${theme.colors.info} 0%, ${theme.colors.accentSecondary} 100%)`
                : `${theme.colors.info}15`,
              border: activeCurriculum === 'network' ? 'none' : `1px solid ${theme.colors.borderLight}`,
              color: activeCurriculum === 'network' ? '#fff' : theme.colors.textMuted,
              borderRadius,
              boxShadow: activeCurriculum === 'network' && theme.effects.hasGlow
                ? `0 0 15px ${theme.colors.info}66`
                : 'none'
            }}
          >
            🌐 Network Training
          </button>
          <button
            onClick={() => setActiveCurriculum('production')}
            className="flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wide transition-all"
            style={{
              fontFamily: theme.fonts.heading,
              background: activeCurriculum === 'production'
                ? `linear-gradient(135deg, ${theme.colors.warning} 0%, ${theme.colors.accent} 100%)`
                : `${theme.colors.warning}15`,
              border: activeCurriculum === 'production' ? 'none' : `1px solid ${theme.colors.borderLight}`,
              color: activeCurriculum === 'production' ? '#fff' : theme.colors.textMuted,
              borderRadius,
              boxShadow: activeCurriculum === 'production' && theme.effects.hasGlow
                ? `0 0 15px ${theme.colors.warning}66`
                : 'none'
            }}
          >
            🎚️ Production Tech
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-5 pt-3">
          <button
            onClick={() => setActiveTab('lessons')}
            className="flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wide transition-all"
            style={{
              fontFamily: theme.fonts.heading,
              background: activeTab === 'lessons'
                ? `linear-gradient(135deg, ${theme.colors.accentSecondary} 0%, ${theme.colors.accentQuaternary} 100%)`
                : `${theme.colors.accentQuaternary}15`,
              border: activeTab === 'lessons' ? 'none' : `1px solid ${theme.colors.borderLight}`,
              color: activeTab === 'lessons' ? theme.colors.bgPrimary : theme.colors.textMuted,
              borderRadius,
              boxShadow: activeTab === 'lessons' && theme.effects.hasGlow
                ? `0 0 15px ${theme.colors.accentSecondary}66`
                : 'none'
            }}
          >
            <BookOpen size={16} />
            Training Modules
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className="flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wide transition-all"
            style={{
              fontFamily: theme.fonts.heading,
              background: activeTab === 'challenges'
                ? `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`
                : `${theme.colors.accent}15`,
              border: activeTab === 'challenges' ? 'none' : `1px solid ${theme.colors.borderLight}`,
              color: activeTab === 'challenges' ? '#fff' : theme.colors.textMuted,
              borderRadius,
              boxShadow: activeTab === 'challenges' && theme.effects.hasGlow
                ? `0 0 15px ${theme.colors.accent}66`
                : 'none'
            }}
          >
            <Target size={16} />
            Challenges
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'lessons' ? (
            <div className="space-y-6">
              {MODULES.map((module, moduleIndex) => {
                const moduleColor = moduleColors[moduleIndex % moduleColors.length]

                return (
                  <div key={module.id}>
                    {/* Module Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 flex items-center justify-center font-bold"
                        style={{
                          fontFamily: theme.fonts.heading,
                          background: `${moduleColor}22`,
                          border: `2px solid ${moduleColor}`,
                          color: moduleColor,
                          borderRadius
                        }}
                      >
                        {module.id}
                      </div>
                      <div>
                        <h3
                          className="font-semibold uppercase tracking-wide"
                          style={{
                            fontFamily: theme.fonts.heading,
                            color: moduleColor
                          }}
                        >
                          {module.name}
                        </h3>
                        <span
                          className="text-xs uppercase"
                          style={{
                            fontFamily: theme.fonts.body,
                            color: getLevelColor(module.level)
                          }}
                        >
                          {module.level}
                        </span>
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="grid gap-2 ml-11">
                      {module.lessons.map((lessonId) => {
                        const lesson = LESSONS[lessonId]
                        if (!lesson) return (
                          <div
                            key={lessonId}
                            className="p-3 flex items-center gap-3 opacity-50"
                            style={{
                              background: `${theme.colors.bgTertiary}80`,
                              border: `1px solid ${theme.colors.borderLight}`,
                              borderRadius
                            }}
                          >
                            <Lock size={16} style={{ color: theme.colors.textMuted }} />
                            <span
                              className="text-sm"
                              style={{
                                fontFamily: theme.fonts.body,
                                color: theme.colors.textMuted
                              }}
                            >
                              Coming Soon...
                            </span>
                          </div>
                        )

                        const isCompleted = completedLessons.includes(lessonId)

                        return (
                          <button
                            key={lessonId}
                            onClick={() => handleStartLesson(lessonId)}
                            className="p-3 flex items-center gap-3 transition-all hover:scale-[1.02] group w-full text-left"
                            style={{
                              background: isCompleted
                                ? `${theme.colors.success}15`
                                : `${theme.colors.bgTertiary}80`,
                              border: `1px solid ${isCompleted ? `${theme.colors.success}66` : theme.colors.borderLight}`,
                              borderRadius
                            }}
                          >
                            <div
                              className="w-10 h-10 flex items-center justify-center text-lg shrink-0"
                              style={{
                                background: isCompleted
                                  ? `${theme.colors.success}20`
                                  : `${moduleColor}22`,
                                border: `1px solid ${isCompleted ? theme.colors.success : moduleColor}66`,
                                borderRadius
                              }}
                            >
                              {isCompleted
                                ? <CheckCircle size={20} style={{ color: theme.colors.success }} />
                                : lesson.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className="font-semibold"
                                style={{
                                  fontFamily: theme.fonts.body,
                                  color: theme.colors.textPrimary
                                }}
                              >
                                {lesson.title}
                              </div>
                              <div
                                className="text-xs flex items-center gap-2"
                                style={{
                                  fontFamily: theme.fonts.body,
                                  color: theme.colors.textMuted
                                }}
                              >
                                <Clock size={12} />
                                {lesson.duration}
                                <span>•</span>
                                {lesson.steps.length} steps
                              </div>
                            </div>
                            <div
                              className="p-2 opacity-0 group-hover:opacity-100 transition-all"
                              style={{
                                background: `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.accentSecondary} 100%)`,
                                borderRadius
                              }}
                            >
                              <Play size={16} style={{ color: theme.colors.bgPrimary }} />
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid gap-3">
              {Object.values(CHALLENGES).map((challenge) => {
                const isCompleted = completedChallenges.includes(challenge.id)

                return (
                  <button
                    key={challenge.id}
                    onClick={() => handleStartChallenge(challenge.id)}
                    className="p-4 flex items-center gap-4 transition-all hover:scale-[1.02] group w-full text-left"
                    style={{
                      background: isCompleted
                        ? `${theme.colors.success}15`
                        : `${theme.colors.bgTertiary}80`,
                      border: `1px solid ${isCompleted ? `${theme.colors.success}66` : `${theme.colors.accent}50`}`,
                      borderRadius
                    }}
                  >
                    <div
                      className="w-14 h-14 flex items-center justify-center text-2xl shrink-0"
                      style={{
                        background: isCompleted
                          ? `${theme.colors.success}20`
                          : `${theme.colors.accent}20`,
                        border: `2px solid ${isCompleted ? theme.colors.success : theme.colors.accent}`,
                        borderRadius,
                        boxShadow: theme.effects.hasGlow
                          ? `0 0 15px ${isCompleted ? theme.colors.success : theme.colors.accent}4d`
                          : 'none'
                      }}
                    >
                      {isCompleted
                        ? <Trophy size={28} style={{ color: theme.colors.success }} />
                        : challenge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-semibold uppercase tracking-wide"
                        style={{
                          fontFamily: theme.fonts.heading,
                          color: isCompleted ? theme.colors.success : theme.colors.accent
                        }}
                      >
                        {challenge.title}
                      </div>
                      <div
                        className="text-sm mt-1"
                        style={{
                          fontFamily: theme.fonts.body,
                          color: theme.colors.textSecondary
                        }}
                      >
                        {challenge.description}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="text-xs uppercase px-2 py-0.5"
                          style={{
                            fontFamily: theme.fonts.heading,
                            background: challenge.difficulty === 'easy'
                              ? `${theme.colors.accentSecondary}20`
                              : challenge.difficulty === 'medium'
                              ? `${theme.colors.warning}20`
                              : `${theme.colors.accent}20`,
                            color: challenge.difficulty === 'easy'
                              ? theme.colors.accentSecondary
                              : challenge.difficulty === 'medium'
                              ? theme.colors.warning
                              : theme.colors.accent,
                            borderRadius
                          }}
                        >
                          {challenge.difficulty}
                        </span>
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: theme.fonts.body,
                            color: theme.colors.textMuted
                          }}
                        >
                          {challenge.objectives.length} objectives
                        </span>
                      </div>
                    </div>
                    <div
                      className="p-3 opacity-0 group-hover:opacity-100 transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentTertiary} 100%)`,
                        borderRadius,
                        boxShadow: theme.effects.hasGlow ? `0 0 15px ${theme.colors.accent}66` : 'none'
                      }}
                    >
                      <ChevronRight size={20} style={{ color: '#fff' }} />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div
          className="p-4 flex items-center justify-between"
          style={{
            background: `${theme.colors.bgPrimary}cc`,
            borderTop: `1px solid ${theme.colors.borderLight}`
          }}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen size={16} style={{ color: theme.colors.accentSecondary }} />
              <span
                className="text-sm"
                style={{
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textMuted
                }}
              >
                <span style={{ color: theme.colors.accentSecondary }}>{completedLessons.length}</span>
                /{Object.keys(LESSONS).length} Lessons
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy size={16} style={{ color: theme.colors.accent }} />
              <span
                className="text-sm"
                style={{
                  fontFamily: theme.fonts.body,
                  color: theme.colors.textMuted
                }}
              >
                <span style={{ color: theme.colors.accent }}>{completedChallenges.length}</span>
                /{Object.keys(CHALLENGES).length} Challenges
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} style={{ color: theme.colors.success }} />
            <span
              className="text-sm uppercase"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.success
              }}
            >
              {completedLessons.length >= 3 ? 'INTERMEDIATE' : 'BEGINNER'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
