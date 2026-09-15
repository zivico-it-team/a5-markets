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
        brand: {
          // A5 Logo Signature Colors
          teal: '#17a2b8',
          'teal-hover': '#138496',
          cyan: '#00b4d8',
          'cyan-hover': '#0096c7',
          aqua: '#00c2cb',
          navy: '#163b65',
          'navy-dark': '#0e3150',
          'navy-deep': '#091c30',
          
          // Primary Theme Accent mapped to A5 Logo Cyan/Teal
          primary: '#00b4d8',
          'primary-hover': '#0096c7',
          'primary-light': '#e0f7fa',
          'primary-glow': 'rgba(0, 180, 216, 0.25)',
          
          // Green retained for positive candle/price changes
          green: '#00d26a',
          'green-hover': '#00b85c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 180, 216, 0.45)',
        'glow-teal': '0 0 25px -5px rgba(23, 162, 184, 0.45)',
        'glow-navy': '0 0 25px -5px rgba(22, 59, 101, 0.5)',
        'glow-green': '0 0 25px -5px rgba(0, 210, 106, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.35s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', '.light &');
    }
  ],
}
