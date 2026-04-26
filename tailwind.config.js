module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2563EB", light: "#3B82F6", dark: "#1D4ED8" },
        danger: "#EF4444",
        success: "#22C55E",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
