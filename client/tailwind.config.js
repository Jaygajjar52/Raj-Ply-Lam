/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        wood: { DEFAULT: "#1B120B", light: "#2D1E16" },
        beige: "#F5E6D3",
        gold: { DEFAULT: "#D4AF37", light: "#E9CB6B", dark: "#A8842A" },
        cream: "#FFF8EE",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E9CB6B 0%, #D4AF37 50%, #A8842A 100%)",
        "wood-gradient": "linear-gradient(180deg, #1B120B 0%, #2D1E16 100%)",
        "grain-fade": "radial-gradient(120% 120% at 50% 0%, rgba(212,175,55,0.12) 0%, rgba(27,18,11,0) 60%)",
      },
      boxShadow: {
        gold: "0 8px 30px rgba(212, 175, 55, 0.25)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
