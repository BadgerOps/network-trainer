/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'network': {
          'primary': '#6366f1',
          'secondary': '#8b5cf6',
          'success': '#22c55e',
          'warning': '#f59e0b',
          'error': '#ef4444',
          'info': '#3b82f6',
          'dark': '#1e1b4b',
          'light': '#f5f3ff'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'packet-flow': 'packetFlow 1s ease-in-out infinite',
      },
      keyframes: {
        packetFlow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
