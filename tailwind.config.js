/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/global.css",   // ← 파일 위치·이름과 정확히 일치시켜 추가
  ],
  theme: {
    extend: {
      //Pretendard font
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      //Font sizes
      fontSize: {
        "heading-lg": ["24px", { lineHeight: "normal", fontWeight: "700" }],
        "heading-md": ["20px", { lineHeight: "normal", fontWeight: "700" }],
        "heading-sm": ["18px", { lineHeight: "normal", fontWeight: "700" }],

        "title-lg": ["20px", { lineHeight: "normal", fontWeight: "600" }],
        "title-md": ["16px", { lineHeight: "normal", fontWeight: "600" }],
        "title-sm": ["14px", { lineHeight: "normal", fontWeight: "600" }],

        "lable-lg": ["16px", { lineHeight: "normal", fontWeight: "500" }],
        "lable-md": ["14px", { lineHeight: "normal", fontWeight: "500" }],
        "lable-sm": ["12px", { lineHeight: "normal", fontWeight: "500" }],
      },
      //Colors
      colors: {
        primary: {
          700: "#BF3753", // dark scheme
          600: "#E65071",
          500: "#FF6387", // base
          400: "#FF91B8",
          300: "#FFC2DE",
          200: "#FFD9ED",
          100: "#FFF0F9",
          50: "#FFF7FC",
        },
        secondary: {
          700: "#C77B39",
          600: "#B28900",
          500: "#FDBD8C",
          400: "#FFCD9D",
          300: "#FFDBB6",
          200: "#FFE6CC",
          100: "#FFF1E5",
          50: "#FFF9F5",
        },
        error: {
          700: "#FF5252",
          500: "#FF0000",
          400: "#FF4D4D",
          300: "#FF8080",
          100: "#FFD6D6",
          50: "#FFECEC",
        },
        surface: {
          DEFAULT: "#FFFFFF",
        },
        background: {
          DEFAULT: "#F9FAFB",
        },
        black: "#222222",
        white: "#FFFFFF",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
};
