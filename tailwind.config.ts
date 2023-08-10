import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bg-outside': 'var(--bg-outside)',
        'bg-primary': 'var(--bg-primary)',
        'line': 'var(--line)',
        'header-primary': 'var(--header-primary)',
        'text-primary': 'var(--text-primary)',
        'button-hover': 'var(--button-hover)',
        'accent-primary': 'var(--accent-primary)'
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        bounceArrow: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)', color: '#86E5FF'},
          '40%': { transform: 'translateY(-30px)',color: '#F472B6' },
          '60%': { transform: 'translateY(-15px)', color: '#86E5FF' }
        }
      },
      animation: {
        'waving-hand': 'wave 2s linear infinite',
        'bounce-arrow': 'bounceArrow 2s infinite'
      },
    },
  },
  plugins: [],
}
export default config
