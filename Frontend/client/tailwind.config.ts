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
    },
  },
  plugins: [],
};
export default config;
