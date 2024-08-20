/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#FFFFFF",
      grey: "#363A47",
      lightgrey: "#ECEDF0",
      "hero-link-bg": "#ECEDF0BB",
      "hero-link-bg-hover": "#363A47",
      black: "#000000",
      dark: "#1D2144",
      primary: "#0A7EA4",
      "primary-dark": "#0A7EA4",
      secondary: "#4B4B4B",
      "feature-odd-bg": "#ECEDF0",
      "feature-odd-bg-dark": "#43475A",
      "link-text": "#0A7EA4",
      "link-text-dark": "#0A7EA4",
      "dark-theme": "#282B37",
      "light-theme": "#f9f9f9",
      "body-color": "#959CB1",
      "body-color-dark": "#d5d5d5",
      "editor-bg": "#24272F",
      "editor-border": "#C3D7E7",
      "editor-border-dark": "#455969",
      "editor-title": "#0A7EA4",
      "code-bg": "#efefef",
      "code-bg-dark": "#262626",
      "code-text": "#0A7EA4",
      "code-text-dark": "#37b5d3",
      "mdx-code-text": "#B58900",
      "mdx-code-text-dark": "#d6a500",
    },
    screens: {
      xs: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "575px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1300px",
      // => @media (min-width: 1400px) { ... }
      "3xl": "1600px",
    },
    maxWidth: {
      centerColumnMD: 800,
      centerColumnXL: 700,
      centerColumn2XL: 900,
      centerColumn3XL: 1000,
    },
    extend: {
      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-roboto)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
