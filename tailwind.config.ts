import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        pop: {
          mint: "#a8e6cf",
          sage: "#88c9a1",
          forest: "#2d5a3d",
          cream: "#fef9f0",
          coral: "#f4a574",
          warm: "#e8c4a0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
