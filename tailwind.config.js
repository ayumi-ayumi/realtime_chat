/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Lucida Console','Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    
    extend: {
    },
  },
  plugins: [],
}
