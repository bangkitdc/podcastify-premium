/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "clr-background-base-one": "#000000",
      "clr-background-base-two": "#121212",
      "clr-background-highlight-one": "#1a1a1a",
      "clr-background-highlight-two": "#2a2a2a",
      "clr-background-highlight-three": "#a7a7a7",
      "clr-text-primary": "#f9f9f9",
      "clr-text-secondary": "#b3b3b3",
      "clr-text-secondary-darken": "#808080",
      "clr-text-info": "#1ed760",
      "clr-text-info-hover": "#0ab346",
      "clr-text-warning": "#ffa42b",
      "clr-text-danger": "#f15e6c",
      "clr-text-announcement": "#3d91f4",
      "clr-text-black": "#000000",
      "clr-background-card": "#181818",
      "clr-hover-dropdown": "#3E3E3E",
      "clr-background-modal": "#282828",

      // 'background-noise': url('../assets/icons/bg.svg'),

      /* Font size */
      "fs-album-title-pc": "4rem",
      "fs-album-subtitle-pc": "1.5rem",
      "fs-heading": "1rem",
      "fs-title": "0.875rem",
      "fs-caption": "11px",

      "fs-mobile-album-title": "1.5rem",
      "fs-mobile-title": "1.125rem",
    },
    fontFamily: {
      circular: ["CircularStd", "sans"],
    },
    extend: {},
  },
  plugins: [],
};
