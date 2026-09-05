/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F5F7F5',
          100: '#E8ECE8',
          200: '#D2DDD2',
          300: '#B0C2B0',
          400: '#8CA48C',
          500: '#6C8E7B',
          600: '#567262',
          700: '#43584C',
          800: '#34453C',
          900: '#26332C',
        },
        forest: {
          500: '#2D4A3E',
          600: '#233B31',
          700: '#1B2E26',
        },
        cream: {
          50: '#FDFBF7',
          100: '#FAF8F5',
          200: '#F4EFEA',
          300: '#EAE1D7',
        },
        warmbeige: '#EFE7DE',
        softteal: '#5E8B7E',
        subtlepeach: '#F7D6C8'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(45, 74, 62, 0.06), 0 2px 6px -1px rgba(45, 74, 62, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(45, 74, 62, 0.08), 0 4px 10px -2px rgba(45, 74, 62, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
      }
    },
  },
  plugins: [],
}
