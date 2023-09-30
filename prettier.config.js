const config = {
  cssDeclarationSorterOrder: "alphabetical",
  plugins: [
    "./node_modules/prettier-plugin-jsdoc/dist/index.js",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-css-order",
  ],
  proseWrap: "always",
  semi: false,
}

export default config
