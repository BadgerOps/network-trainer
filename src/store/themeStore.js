import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ═══════════════════════════════════════════════════════════════════════════
// THEME DEFINITIONS
// Each theme defines colors, fonts, and visual characteristics
// ═══════════════════════════════════════════════════════════════════════════

export const THEMES = {
  // ─────────────────────────────────────────────────────────────────────────
  // THEME 1: CYBERPUNK / SYNTHWAVE
  // Inspired by 80s neon, Tron, Blade Runner
  // ─────────────────────────────────────────────────────────────────────────
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-soaked 80s retrofuturism',
    preview: {
      bg: 'linear-gradient(135deg, #0d0221 0%, #1a0a2e 100%)',
      accent1: '#ff2a6d',
      accent2: '#05d9e8',
      accent3: '#d300c5'
    },
    colors: {
      // Backgrounds
      bgPrimary: '#0d0221',
      bgSecondary: '#1a0a2e',
      bgTertiary: '#16213e',
      bgSurface: '#1a1a2e',
      bgHover: 'rgba(123, 97, 255, 0.1)',
      bgSelected: 'rgba(255, 42, 109, 0.2)',

      // Accents
      accent: '#ff2a6d',
      accentSecondary: '#05d9e8',
      accentTertiary: '#d300c5',
      accentQuaternary: '#7b61ff',

      // Status
      success: '#39ff14',
      warning: '#ffe66d',
      error: '#ff2a6d',
      info: '#05d9e8',

      // Text
      textPrimary: '#ffffff',
      textSecondary: '#ccccdd',
      textMuted: '#6b6b8d',
      textAccent: '#05d9e8',

      // Borders
      border: 'rgba(211, 0, 197, 0.4)',
      borderLight: 'rgba(123, 97, 255, 0.3)',
      borderAccent: '#ff2a6d',

      // Device colors
      router: '#ff2a6d',
      switch: '#05d9e8',
      l3switch: '#7b61ff',
      computer: '#39ff14',
      server: '#ffe66d',
      cloud: '#d300c5',

      // Shadows/Glows
      glow: 'rgba(211, 0, 197, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.5)'
    },
    fonts: {
      heading: "'Orbitron', sans-serif",
      body: "'Rajdhani', sans-serif",
      mono: "'Share Tech Mono', monospace"
    },
    effects: {
      borderRadius: '4px',
      glowStrength: '15px',
      animationSpeed: '0.3s',
      hasGrid: true,
      hasScanlines: true,
      hasGlow: true
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // THEME 2: CLEAN / PROFESSIONAL
  // Minimalist, light mode, enterprise-ready
  // ─────────────────────────────────────────────────────────────────────────
  clean: {
    id: 'clean',
    name: 'Clean Pro',
    description: 'Minimal, professional, light mode',
    preview: {
      bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      accent1: '#0b5bd3',
      accent2: '#1fbf9a',
      accent3: '#f97316'
    },
    colors: {
      // Backgrounds
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      bgTertiary: '#f1f5f9',
      bgSurface: '#ffffff',
      bgHover: 'rgba(59, 130, 246, 0.08)',
      bgSelected: 'rgba(59, 130, 246, 0.12)',

      // Accents
      accent: '#0b5bd3',
      accentSecondary: '#1fbf9a',
      accentTertiary: '#f97316',
      accentQuaternary: '#0ea5e9',

      // Status
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#0b5bd3',

      // Text
      textPrimary: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#94a3b8',
      textAccent: '#0b5bd3',

      // Borders
      border: '#e2e8f0',
      borderLight: '#f1f5f9',
      borderAccent: '#0b5bd3',

      // Device colors
      router: '#0b5bd3',
      switch: '#1fbf9a',
      l3switch: '#0ea5e9',
      computer: '#334155',
      server: '#f97316',
      cloud: '#38bdf8',

      // Shadows
      glow: 'rgba(59, 130, 246, 0.15)',
      shadow: 'rgba(0, 0, 0, 0.08)'
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'IBM Plex Sans', sans-serif",
      mono: "'IBM Plex Mono', monospace"
    },
    effects: {
      borderRadius: '8px',
      glowStrength: '0px',
      animationSpeed: '0.2s',
      hasGrid: false,
      hasScanlines: false,
      hasGlow: false
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // THEME 3: TERMINAL / HACKER
  // Green-on-black, matrix vibes, monospace everything
  // ─────────────────────────────────────────────────────────────────────────
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    description: 'Hacker aesthetic, green phosphor',
    preview: {
      bg: 'linear-gradient(135deg, #0a0a0a 0%, #0d1a0d 100%)',
      accent1: '#00ff00',
      accent2: '#00cc00',
      accent3: '#009900'
    },
    colors: {
      // Backgrounds
      bgPrimary: '#0a0a0a',
      bgSecondary: '#0d1a0d',
      bgTertiary: '#111611',
      bgSurface: '#0f140f',
      bgHover: 'rgba(0, 255, 0, 0.08)',
      bgSelected: 'rgba(0, 255, 0, 0.15)',

      // Accents - all greens
      accent: '#00ff00',
      accentSecondary: '#00cc00',
      accentTertiary: '#00ff66',
      accentQuaternary: '#66ff66',

      // Status
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000',
      info: '#00ffff',

      // Text
      textPrimary: '#00ff00',
      textSecondary: '#00cc00',
      textMuted: '#006600',
      textAccent: '#00ff66',

      // Borders
      border: 'rgba(0, 255, 0, 0.3)',
      borderLight: 'rgba(0, 255, 0, 0.15)',
      borderAccent: '#00ff00',

      // Device colors - phosphor variations
      router: '#00ff00',
      switch: '#00cc00',
      l3switch: '#00ff66',
      computer: '#66ff66',
      server: '#00ffcc',
      cloud: '#00ff99',

      // Shadows
      glow: 'rgba(0, 255, 0, 0.4)',
      shadow: 'rgba(0, 0, 0, 0.8)'
    },
    fonts: {
      heading: "'Share Tech Mono', 'Courier New', monospace",
      body: "'Share Tech Mono', 'Courier New', monospace",
      mono: "'Share Tech Mono', 'Courier New', monospace"
    },
    effects: {
      borderRadius: '0px',
      glowStrength: '10px',
      animationSpeed: '0.15s',
      hasGrid: false,
      hasScanlines: true,
      hasGlow: true
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // THEME 4: BLUEPRINT / ENGINEERING
  // Technical drawing aesthetic, graph paper, precise
  // ─────────────────────────────────────────────────────────────────────────
  blueprint: {
    id: 'blueprint',
    name: 'Blueprint',
    description: 'Technical engineering drawings',
    preview: {
      bg: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
      accent1: '#ffffff',
      accent2: '#87ceeb',
      accent3: '#4a9eff'
    },
    colors: {
      // Backgrounds - blueprint blues
      bgPrimary: '#0f2744',
      bgSecondary: '#1e3a5f',
      bgTertiary: '#234b6e',
      bgSurface: '#1a3550',
      bgHover: 'rgba(135, 206, 235, 0.1)',
      bgSelected: 'rgba(255, 255, 255, 0.1)',

      // Accents - white lines, cyan highlights
      accent: '#ffffff',
      accentSecondary: '#87ceeb',
      accentTertiary: '#4a9eff',
      accentQuaternary: '#60a5fa',

      // Status
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#87ceeb',

      // Text
      textPrimary: '#ffffff',
      textSecondary: '#87ceeb',
      textMuted: '#5a8cb8',
      textAccent: '#ffffff',

      // Borders - white/light blue lines
      border: 'rgba(255, 255, 255, 0.3)',
      borderLight: 'rgba(135, 206, 235, 0.2)',
      borderAccent: '#ffffff',

      // Device colors - technical whites and blues
      router: '#ffffff',
      switch: '#87ceeb',
      l3switch: '#4a9eff',
      computer: '#60a5fa',
      server: '#fbbf24',
      cloud: '#a5b4fc',

      // Shadows
      glow: 'rgba(135, 206, 235, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.4)'
    },
    fonts: {
      heading: "'IBM Plex Mono', monospace",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace"
    },
    effects: {
      borderRadius: '0px',
      glowStrength: '0px',
      animationSpeed: '0.25s',
      hasGrid: true,
      hasScanlines: false,
      hasGlow: false
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // THEME 5: VAPOR WAVE / AESTHETIC
  // Pastel gradients, 90s nostalgia, soft neon
  // ─────────────────────────────────────────────────────────────────────────
  vaporwave: {
    id: 'vaporwave',
    name: 'Vaporwave',
    description: '90s aesthetic, pastel dreams',
    preview: {
      bg: 'linear-gradient(135deg, #2d1b4e 0%, #1a1a3e 100%)',
      accent1: '#ff71ce',
      accent2: '#01cdfe',
      accent3: '#b967ff'
    },
    colors: {
      // Backgrounds - deep purples
      bgPrimary: '#1a1a3e',
      bgSecondary: '#2d1b4e',
      bgTertiary: '#3d2a5c',
      bgSurface: '#251942',
      bgHover: 'rgba(255, 113, 206, 0.1)',
      bgSelected: 'rgba(185, 103, 255, 0.15)',

      // Accents - pastel neon
      accent: '#ff71ce',
      accentSecondary: '#01cdfe',
      accentTertiary: '#b967ff',
      accentQuaternary: '#05ffa1',

      // Status
      success: '#05ffa1',
      warning: '#fffb96',
      error: '#ff6b6b',
      info: '#01cdfe',

      // Text
      textPrimary: '#ffffff',
      textSecondary: '#e0d4f7',
      textMuted: '#8b7aa8',
      textAccent: '#ff71ce',

      // Borders
      border: 'rgba(185, 103, 255, 0.4)',
      borderLight: 'rgba(255, 113, 206, 0.25)',
      borderAccent: '#ff71ce',

      // Device colors - soft pastels
      router: '#ff71ce',
      switch: '#01cdfe',
      l3switch: '#b967ff',
      computer: '#05ffa1',
      server: '#fffb96',
      cloud: '#ff9f7a',

      // Shadows
      glow: 'rgba(185, 103, 255, 0.4)',
      shadow: 'rgba(0, 0, 0, 0.5)'
    },
    fonts: {
      heading: "'Orbitron', sans-serif",
      body: "'Rajdhani', sans-serif",
      mono: "'Share Tech Mono', monospace"
    },
    effects: {
      borderRadius: '12px',
      glowStrength: '20px',
      animationSpeed: '0.4s',
      hasGrid: true,
      hasScanlines: false,
      hasGlow: true
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME STORE
// ═══════════════════════════════════════════════════════════════════════════

export const useThemeStore = create(
  persist(
    (set, get) => ({
      // Current theme ID
      currentTheme: 'cyberpunk',

      // Get current theme object
      getTheme: () => THEMES[get().currentTheme] || THEMES.cyberpunk,

      // Set theme by ID
      setTheme: (themeId) => {
        if (THEMES[themeId]) {
          set({ currentTheme: themeId })
          // Apply CSS variables to document
          applyThemeToDOM(THEMES[themeId])
        }
      },

      // Get all available themes
      getThemes: () => Object.values(THEMES),

      // Cycle to next theme
      nextTheme: () => {
        const themeIds = Object.keys(THEMES)
        const currentIndex = themeIds.indexOf(get().currentTheme)
        const nextIndex = (currentIndex + 1) % themeIds.length
        get().setTheme(themeIds[nextIndex])
      }
    }),
    {
      name: 'netrunner-theme',
      partialize: (state) => ({ currentTheme: state.currentTheme })
    }
  )
)

// ═══════════════════════════════════════════════════════════════════════════
// APPLY THEME TO DOM
// Sets CSS custom properties on :root
// ═══════════════════════════════════════════════════════════════════════════

export function applyThemeToDOM(theme) {
  const root = document.documentElement

  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${camelToKebab(key)}`, value)
  })

  // Apply fonts
  root.style.setProperty('--font-heading', theme.fonts.heading)
  root.style.setProperty('--font-body', theme.fonts.body)
  root.style.setProperty('--font-mono', theme.fonts.mono)

  // Apply effects
  root.style.setProperty('--border-radius', theme.effects.borderRadius)
  root.style.setProperty('--glow-strength', theme.effects.glowStrength)
  root.style.setProperty('--animation-speed', theme.effects.animationSpeed)

  // Toggle effect classes
  root.classList.toggle('has-grid', theme.effects.hasGrid)
  root.classList.toggle('has-scanlines', theme.effects.hasScanlines)
  root.classList.toggle('has-glow', theme.effects.hasGlow)
  root.classList.toggle('theme-cyberpunk', theme.id === 'cyberpunk')
}

// Helper to convert camelCase to kebab-case
function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

// Initialize theme on load
export function initializeTheme() {
  const state = useThemeStore.getState()
  const theme = THEMES[state.currentTheme] || THEMES.cyberpunk
  applyThemeToDOM(theme)
}
