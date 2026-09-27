/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ieee: {
          blue: '#00629B',
          'blue-dark': '#004A75',
          'blue-light': '#0080C9',
        },
        accent: {
          teal: '#00A9CE',
          orange: '#FF6B35',
          purple: '#6A4C93',
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'Calibri', 'Arial', 'sans-serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        body: ['Crimson Text', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xs': ['1.75rem',  { lineHeight: '2rem',    letterSpacing: '0.05em' }],
        'display-sm': ['2.25rem',  { lineHeight: '2.5rem',    letterSpacing: '0.04em' }],
        'display-md': ['3rem',    { lineHeight: '1.1',      letterSpacing: '0.03em' }],
        'display-lg': ['3.75rem',  { lineHeight: '1.1',      letterSpacing: '0.02em' }],
        'display-xl': ['4.5rem',  { lineHeight: '1',        letterSpacing: '0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'ieee': '0 4px 14px -3px rgba(0, 98, 155, 0.25)',
        'ieee-lg': '0 10px 25px -5px rgba(0, 98, 155, 0.3)',
        'ieee-xl': '0 20px 40px -10px rgba(0, 98, 155, 0.35)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'gradient': 'gradient 8s ease infinite',
        'gradient-slow': 'gradient 12s ease infinite',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float': 'float 6s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
