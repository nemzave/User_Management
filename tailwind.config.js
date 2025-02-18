/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          100: "#EAE7DC",
          200: "#D8C3A5",
          500: "#8E8D8A",
          700: "#5C5C5C",
        },
      },
    },
  },
  plugins: [],
};
