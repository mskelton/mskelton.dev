import { ImageProps } from "next/image"

export function isExternalImage(src: ImageProps["src"] | undefined) {
  return typeof src === "string" && src.startsWith("https://")
}

export function getSrc(src: ImageProps["src"] | undefined) {
  if (!src) return undefined

  return (
    typeof src === "string" ? src
    : "default" in src ? src.default.src
    : src.src
  )
}
