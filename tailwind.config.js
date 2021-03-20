module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0c1016",
        "primary-light": "#10151c",
        "primary-dark": "#06080b",
        secondary: "#F9F871",
        "secondary-dark": "#c7c65a",
        "secondary-light": "#e0df66",
        tertiary: "#E09F1F",
        "tertiary-dark": "#b37f19",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
