/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // ここにカスタムカラーを追加
          background: "#f9fafb",  // 背景色
          main: "#3b82f6",        // メインカラー
          accent: "#ef4444",      // 差し色
        },
      },
    },
    plugins: [],
  }
