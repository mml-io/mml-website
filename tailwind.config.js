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
      "link-text-dark": "#38bdf8",
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
      // MML brand palette
      mml: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49",
      },
      // Standard palettes needed by new components
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617",
      },
      cyan: {
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        950: "#083344",
      },
      indigo: {
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        950: "#1e1b4b",
      },
      rose: {
        400: "#fb7185",
        500: "#f43f5e",
      },
      emerald: {
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        950: "#022c22",
      },
      amber: {
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
      },
      yellow: {
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
      },
      purple: {
        400: "#a78bfa",
        500: "#8b5cf6",
      },
      blue: {
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
      },
      gray: {
        200: "#e5e7eb",
      },
      red: {
        800: "#991b1b",
      },
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
        glass: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(20% 20% at 15% 10%, rgba(10, 126, 164, 0.18) 0%, rgba(10, 126, 164, 0) 100%), radial-gradient(25% 25% at 80% 0%, rgba(255, 70, 84, 0.15) 0%, rgba(255, 70, 84, 0) 100%), radial-gradient(22% 22% at 100% 80%, rgba(0, 178, 255, 0.16) 0%, rgba(0, 178, 255, 0) 100%)",
        "mesh-dark":
          "radial-gradient(20% 20% at 15% 10%, rgba(55, 181, 210, 0.15) 0%, rgba(55, 181, 210, 0) 100%), radial-gradient(25% 25% at 80% 0%, rgba(255, 122, 133, 0.12) 0%, rgba(255, 122, 133, 0) 100%), radial-gradient(22% 22% at 100% 80%, rgba(91, 206, 255, 0.14) 0%, rgba(91, 206, 255, 0) 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
