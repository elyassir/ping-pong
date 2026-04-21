import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      colors: {
        bg: {
          base:    '#0b0c10',
          raised:  '#13151c',
          overlay: '#1c1f2a',
          subtle:  '#22263a',
        },
        brand: {
          300: '#c4a7fa',
          400: '#9d6ef5',
          500: '#7c3aed',
        },
        highlight: {
          400: '#34e8db',
          500: '#06d6c7',
        },
        text: {
          primary:   '#f1f2f6',
          secondary: '#8b91a8',
          muted:     '#50566e',
        },
        success: '#22c55e',
        danger:  '#f4483a',
        warning: '#f59e0b',
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        body:    ['DM Sans', ...defaultTheme.fontFamily.sans],
        mono:    ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        hero:       'clamp(40px, 6vw, 64px)',
        display:    ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        heading:    ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        subheading: ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        body:       ['14px', { lineHeight: '1.6' }],
        caption:    ['12px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '16px',
        xl:   '24px',
        pill: '9999px',
      },
      boxShadow: {
        card:  '0 4px 24px rgba(0, 0, 0, 0.40)',
        brand: '0 0 24px rgba(124, 58, 237, 0.25)',
        cyan:  '0 0 16px rgba(6, 214, 199, 0.20)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 60% 40%, #3d1a6e 0%, #0b0c10 70%)',
        'brand-glow':    'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
