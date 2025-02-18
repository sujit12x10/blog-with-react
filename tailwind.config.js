/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        "racing": ["Racing Sans One", "sans-serif"],
        "Montserrat": ["Montserrat", "sans-serif"],
        "Bebas": ["Bebas Neue", "sans-serif"],
        "karla": ["Karla", "serif"],
        "poppins": ["Poppins", "serif"]
      },
    },
  },
  plugins: [],
}

