/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './afrismart_project/AFRIMART/templates/**/*.html',
    './afrismart_project/AfrimartCore/templates/**/*.html',
    './**/*.{js,html}',
    "./src/**/*.{html,js}"
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
    },
  plugins: [],
}
}
