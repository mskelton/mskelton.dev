import * as jsdoc from "prettier-plugin-jsdoc"
import * as tailwind from "prettier-plugin-tailwindcss"

const config = {
  plugins: [tailwind, jsdoc],
  proseWrap: "always",
  semi: false,
}

export default config
