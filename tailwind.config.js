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
      grey: "#3B3B3B",
      lightgrey: "#ECEDF0",
      black: "#000000",
      dark: "#1D2144",
      primary: "#0586E4",
      secondary: "#4B4B4B",
      "dark-theme": "#121212",
      yellow: "#FBB040",
      "light-theme": "#f9f9f9",
      "body-color": "#959CB1",
      "editor-bg": "#24272F",
      "editor-border": "#C3D7E7",
      "editor-border-dark": "#455969",
      "editor-title": "#47B1FF",
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
      centerColumn: 1280,
    },
    extend: {
      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)"],
        mono: ["var(--font-ibm-plex-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
