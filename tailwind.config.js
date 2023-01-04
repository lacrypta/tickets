/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.22, 0.14, 0.34, 1.4)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
