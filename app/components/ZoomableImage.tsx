"use client"

import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid"
import Image, { ImageProps } from "next/image"
import React from "react"
import { MediumImage } from "react-medium-image"
import { getSrc, isExternalImage } from "lib/image"

export interface ZoomableImageProps extends Omit<ImageProps, "src"> {
  src: ImageProps["src"] | string
}

export default function ZoomableImage({
  alt,
  src,
  ...props
}: ZoomableImageProps) {
  const Component = isExternalImage(src) ? "img" : Image
  const isGIF = getSrc(src)?.endsWith(".gif")

  return (
    <MediumImage
      className="sm:-mx-8 sm:max-w-[calc(100%+4rem)]"
      margin={48}
      zoomIcon={<ArrowsPointingOutIcon />}
    >
      <Component
        alt={alt ?? ""}
        placeholder={isGIF ? undefined : "blur"}
        src={src as string}
        {...props}
      />
    </MediumImage>
  )
}
