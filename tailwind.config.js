/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'warm-white': '#F9F8F6',
        'sage-green': '#B7C9B0',
        'mute-blue': '#A1B5C1',
        'soft-charcoal': '#4A4A4A',
      },
      fontFamily: {
        'pretendard': ['Pretendard'],
        'nanum-myeongjo': ['NanumMyeongjo'],
        'gowun-batang': ['GowunBatang'],
      }
    },
  },
  plugins: [],
}
