/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container:{
      padding:{
        DEFAULT: '15px',
      }
    },
    screens:{
      sm: '440px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors:{

      },
      animation:{

      },
      fontFamily: {
        'ubuntu-mono': ['var(--font-ubuntu-mono)'],
      },
      backgroundImage: {
        
      },
    },
  },
  container:{
    padding:{
      DEFAULT: '15px',
    },
  },
  plugins: [],
}
