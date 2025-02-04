import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Configura Roboto como fuente principal
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'p-mmc': '#45204b',
        'p-mmc-h': '#3b144c',
        's-mmc':'#e7294f',
        's-mmc-h':'#c22343',
        'celebration':'#1dda8e',
        'concourse':'#45204b',
        'coronation':'#F0B23F',
        'sorteo':'#ff914d',
        'mmc-g':'#989894',
        'charla':'#4570d3'
      },
      
    },
  },
  variants: {
    extend: {
      textColor: ['hover', 'focus'], // Asegúrate de incluirlo si usas 'hover' o 'focus'.
      transitionProperty: ['text-color'], // Habilita transiciones para `text-color`.
    },
  },
  plugins: [],
};
export default config;
