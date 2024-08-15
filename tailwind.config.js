/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'charcoal-black': '#272626',
        'orange-white': '#FFF9F0',
        'deep-orange': '#FFC671',
        'light-orange': '#FFD390',
        'accent-blue': '#8B98FF',
      },
    },
  },
  plugins: [], // Changed this to an empty array
}
