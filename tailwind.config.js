/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter':['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans'],
        'cookie': ['Cookie', 'cursive'],
        'libre': ['Libre Baskerville', 'serif'],
        'merriweather': ['Merriweather', 'serif'],
        'pacifico': ['Pacifico', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'radial-gradient': 'radial-gradient( circle 897px at 9% 80.3%, rgba(55,60,245,1) 0%, rgba(234,161,15,0.90) 100.2% )',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("flowbite/plugin")
  ],
}
