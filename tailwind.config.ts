import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
      pulseLoading: {
          '0%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.05)' },
          '30%': { transform: 'scale(1.10)' },
          '50%': { transform: 'scale(1.15)' },
          '75%': { transform: 'scale(1.20)' },
          '100%': { transform: 'scale(1.30)' },
        }
      },
      animation: {
        pulseLoading: 'pulseLoading 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
