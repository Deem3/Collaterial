/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        module: '0px 5px 4px 0px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
};
