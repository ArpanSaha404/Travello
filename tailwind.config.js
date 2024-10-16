/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation : {
        'Fade-In-Out' : 'fadeInOut 10s ease-in-out infinite',
      },
      keyframes : {
        fadeInOut : {
          '0%' : { opacity : 1 },
          '50%' : { opacity : 0 },
          '100%' : { opacity : 1 }
        },
      },
    },
  },
  plugins: [],
}