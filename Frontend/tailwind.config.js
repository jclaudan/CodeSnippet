/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "like-burst": {
          "0%": {
            transform: "scale(0)",
            opacity: 1,
          },
          "50%": {
            transform: "scale(1)",
            opacity: 0.5,
          },
          "100%": {
            transform: "scale(1.5)",
            opacity: 0,
          },
        },
        "bookmark-pop": {
          "0%": {
            transform: "scale(0)",
            opacity: 1,
          },
          "50%": {
            transform: "scale(1.5)",
            opacity: 0.5,
          },
          "100%": {
            transform: "scale(0)",
            opacity: 0,
          },
        },
      },
      animation: {
        "like-burst": "like-burst 0.45s ease-out forwards",
        "bookmark-pop": "bookmark-pop 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
