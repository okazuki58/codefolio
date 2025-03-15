/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            img: {
              marginTop: "1em",
              marginBottom: "1em",
            },
            figure: {
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            h2: {
              fontWeight: "700",
              marginTop: "2em",
              marginBottom: "1em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
