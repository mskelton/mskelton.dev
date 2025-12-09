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
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-css-order"],
  proseWrap: "always",
  semi: false,
  tailwindFunctions: ["clsx"],
}

export default config
