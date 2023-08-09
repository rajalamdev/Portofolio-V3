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
        'text-primary': 'var(--text-primary)'
      }
    },
  },
  plugins: [],
}
export default config
