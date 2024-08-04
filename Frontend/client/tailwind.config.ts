import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgCategory1': "url('/images/category/main/main-category_1.webp')",
        'bgCategory2': "url('/images/category/main/main-category_2.webp')",
        'bgCategory3': "url('/images/category/main/main-category_3.webp')",
      },
      screens: {
        "2xl": {max: "1000px"},
        // => @media(max-width: 995px) {...}
        xl: {max: "880px"},
        // => @media(max-width: 880px) {...}
        l: {max: "680px"},
        // => @media(max-width: 680px) {...}
        m: {max: "460px"},
        // => @media(max-width: 460px) {...}
      },
    },
  },
  plugins: [],
};
export default config;
