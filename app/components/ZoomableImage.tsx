"use client"

import "./ZoomableImage.css"
import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid"
import Image, { ImageProps } from "next/image"
import React from "react"
import Zoom from "react-medium-image-zoom"

export interface ZoomableImageProps extends Omit<ImageProps, "src"> {
  src: string
}

export default function ZoomableImage({
  alt,
  src,
  ...props
}: ZoomableImageProps) {
  const Component = src.startsWith("https://") ? "img" : Image

  return (
    <Zoom
      IconZoom={ArrowsPointingOutIcon}
      // eslint-disable-next-line react/jsx-no-useless-fragment
      ZoomContent={({ img }) => <>{img}</>}
      a11yNameButtonUnzoom={`Collapse image: ${alt}`}
      a11yNameButtonZoom={`Expand image: ${alt}`}
      wrapElement="span"
      zoomMargin={48}
    >
      <Component
        alt={alt ?? ""}
        className="sm:-mx-8 sm:max-w-[calc(100%+4rem)]"
        placeholder="blur"
        src={src}
        {...props}
      />
    </Zoom>
  )
}
