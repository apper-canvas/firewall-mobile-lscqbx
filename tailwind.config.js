/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FE3',
        secondary: '#7C72FF',
        accent: '#FF6B6B',
        surface: '#FFFFFF',
        background: '#F8F9FA',
        success: '#4ECDC4',
        warning: '#FFE66D',
        error: '#FF6B6B',
        info: '#4DABF7',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
        heading: ['Inter', 'ui-sans-serif', 'system-ui'] 
      },
      borderRadius: {
        'card': '12px',
        'input': '8px',
        'pill': '16px'
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 6px 16px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}