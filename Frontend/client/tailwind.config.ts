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
        'bgCategory1': "url('/images/category/category_1.webp')",
        'bgCategory2': "url('/images/category/category_2.webp')",
        'bgCategory3': "url('/images/category/category_3.webp')",
        'bgCategory4': "url('/images/category/category_4.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
