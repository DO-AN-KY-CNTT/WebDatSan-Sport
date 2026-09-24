/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f7fa',
          100: '#dcecf2',
          200: '#bdd9e4',
          300: '#91bfd0',
          400: '#5f9db6',
          500: '#3a7d9b',
          600: '#215f7d',
          700: '#174b63',
          800: '#123c50',
          900: '#0d2e3d',
        },
        ink: {
          DEFAULT: '#1c0b0e',
          2: '#624a4d',
          3: '#775e62',
        },
        blush: {
          DEFAULT: '#fdf8f8',
          soft: '#f7e1e4',
        },
        line: {
          DEFAULT: '#e7ddde',
          strong: '#ddcfd1',
        },
        sports: {
          football: '#2f7568',
          badminton: '#215f7d',
          tennis: '#9c6d23',
          basketball: '#a64a4a',
          pickleball: '#3f8291',
          volleyball: '#72537d',
        },
      },
      borderRadius: {
        sb: 'var(--sb-radius)',
        'sb-lg': 'var(--sb-radius-lg)',
      },
      boxShadow: {
        sb: 'var(--sb-shadow-card)',
      },
      maxWidth: {
        shell: 'var(--sb-shell)',
      },
    },
  },
  plugins: [],
};
