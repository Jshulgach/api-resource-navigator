import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        spruce: "rgb(var(--color-spruce) / <alpha-value>)",
        clay: "rgb(var(--color-clay) / <alpha-value>)",
        skysoft: "rgb(var(--color-skysoft) / <alpha-value>)"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(31, 41, 51, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
