/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5542F6',
        highlight: '#eae8fb',
        bgGray: '#fbfafd',
      },
      screens: {
        s: {max: "850px"},
        // => @media(max-width: 850px) {...}
        xs: {max: "440px"},
        // => @media(max-width: 440px) {...}
        m: {max: "570px"},
        // => @media(max-width: 550px) {...}
        l: {max: "910px"}
        // => @media(max-width: 910px) {...}
      },
      // backgroundImage: {
      //   BackgroundImage: "url('/src/assets/images/Background.png')",
      // }
    },
  },
  plugins: [],
}

