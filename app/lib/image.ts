import { ImageProps } from "next/image"

export function isExternalImage(src: ImageProps["src"] | undefined) {
  return typeof src === "string" && src.startsWith("https://")
}
