/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#0a0a0c',
          900: '#111113',
          850: '#161619',
          800: '#1e1e23',
          700: '#2b2b31',
          600: '#3d3d45',
        },
        madera: {
          900: '#1a0d07',
          800: '#2c1810',
          700: '#3d2314',
          600: '#4a2e1b',
          500: '#5c3a21',
          400: '#7a4e2d',
        },
        olivo: {
          900: '#22280d',
          800: '#343b14',
          700: '#4b5320',
          600: '#5c6728',
          500: '#717d35',
          400: '#8e9c47',
        },
        dorado: {
          900: '#5c4516',
          800: '#7d5f20',
          700: '#9e7c38',
          600: '#b89047',
          500: '#c5a059',
          400: '#d4af37',
          300: '#e5c378',
          200: '#f3dea0',
        },
        brasa: {
          900: '#7f1d1d',
          800: '#991b1b',
          700: '#c2410c',
          600: '#ea580c',
          500: '#f97316',
          400: '#fb923c',
        },
        tierra: {
          800: '#4a2511',
          700: '#6b3a19',
          600: '#8b4513',
          500: '#a0522d',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'ember-pattern': 'radial-gradient(ellipse at top, rgba(234, 88, 12, 0.15), transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #c5a059 0%, #e5c378 50%, #9e7c38 100%)',
      }
    },
  },
  plugins: [],
}
