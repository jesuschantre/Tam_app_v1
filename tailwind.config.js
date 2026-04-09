/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Deberia ser ./app/**/*.{js,jsx,ts,tsx} y NO ./App/**/*.{js,jsx,ts,tsx}. Cambio: app y no App
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    // Nombre fuente, para clase en tailwing
    fontFamily: {
      'poppins-light': ['Poppins-Light', 'sans-serif'],
      'poppins-regular': ['Poppins-Regular', 'sans-serif'],
      'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
    },
    colors: {
      primary: '#003780', //Header | Footer
      secundary: {
        DEFAULT: '#333333',
        100: '#666666',
        200: '#999999',
        300: '#F4F4F4'
      },
      tertiary: '#FFFFFF', // Body
      quaternary: '#F4CE14'
    }
  },
  plugins: [],
}

