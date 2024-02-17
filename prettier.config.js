/** @type {import("prettier").Config} */
const config = {
  cssDeclarationSorterOrder: "alphabetical",
  overrides: [
    {
      files: "*.mdx",
      options: {
        printWidth: 75,
      },
    },
  ],
  plugins: [
    "./node_modules/prettier-plugin-jsdoc/dist/index.js",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-css-order",
  ],
  proseWrap: "always",
  semi: false,
  tailwindFunctions: ["clsx"],
}

export default config
