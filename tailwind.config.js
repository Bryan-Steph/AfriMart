/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    "./*.html",
    "./registration.html",
    "./login.html",
    "./CreateShop.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#34D399',
        secondary: '#388276',
        accent: '#000',
        dark: '#172937',
        light: '#F9FAFB'
      }
    }
  },
  plugins: [],
}

