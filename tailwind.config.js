/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px", // Mobile devices
        md: "768px", // Tablets
        lg: "1024px", // Desktops
        xl: "1280px", // Large desktops
        "2xl": "1536px", // Extra large screens
      },
    },
  },
  plugins: [],
};
