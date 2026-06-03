/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rail: {
          green: '#00A651',
          darkgreen: '#007A3D',
          gold: '#F5A623',
          bg: '#0A0E0B',
          surface: '#111815',
          card: '#161D18',
          border: '#1E2B21',
          text: '#E8F0EA',
          muted: '#6B7F6E',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'pulse-green': 'pulseGreen 2s infinite',
        'train-move': 'trainMove 3s linear infinite',
      },
      keyframes: {
        slideUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        pulseGreen: { '0%,100%': { boxShadow: '0 0 0 0 rgba(0,166,81,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(0,166,81,0)' } },
        trainMove: { from: { transform: 'translateX(-10px)' }, to: { transform: 'translateX(10px)' } },
      }
    },
  },
  plugins: [],
}
