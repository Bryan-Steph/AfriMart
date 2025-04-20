/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: {
          light: '#3B82F6', // Blue-500 (main brand color)
          dark: '#1E40AF',  // Dark blue (for dark mode)
        },
        secondary: {
          light: '#10B981', // Emerald-500 (green, for actions)
          dark: '#047857',  // Dark green
        },
        accent: {
          light: '#000', // Amber-500 (warm accent, e.g., discounts)
          dark: '#000',
        },
        // Backgrounds/text
        background: {
          light: '#FFFFFF',
          dark: '#111827',  // Gray-900
        },
        text: {
          light: '#1F2937', // Gray-800
          dark: '#F9FAFB',  // Gray-50
        },
        darkMode: 'class',
    },
  },
  plugins: [],
}
}
