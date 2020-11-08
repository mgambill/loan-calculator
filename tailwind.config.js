// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  plugins: [require("@tailwindcss/ui")],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        "8": "repeat(8, minmax(0, 1fr))"
      }
    }
  }
}
