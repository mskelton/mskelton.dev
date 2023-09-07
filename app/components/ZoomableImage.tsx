"use client"

import "./ZoomableImage.css"
import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid"
import Image, { ImageProps } from "next/image"
import React from "react"
import Zoom from "react-medium-image-zoom"

export interface ZoomableImageProps extends ImageProps {}

export default function ZoomableImage({ alt, ...props }: ZoomableImageProps) {
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
      <Image
        alt={alt ?? ""}
        className="sm:-mx-8 sm:max-w-[calc(100%+4rem)]"
        placeholder="blur"
        {...props}
      />
    </Zoom>
  )
}
