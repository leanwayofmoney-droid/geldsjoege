/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   "#2C5A85",
          dark:      "#1A3A57",
          secondary: "#6C7B8B",
          light:     "#4A7DAD",
          muted:     "#9BBCD8",
          bg:        "#F8F9FA",
        },
        slate: {
          50:  "#F8F9FA",
          100: "#F1F3F5",
          200: "#E2E6EA",
          300: "#CDD3D9",
          400: "#9BA8B5",
          500: "#6C7B8B",
          600: "#4E5D6C",
          700: "#364352",
          800: "#1E2D3D",
          900: "#0F1A26",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};
