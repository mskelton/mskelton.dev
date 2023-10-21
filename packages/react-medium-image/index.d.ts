import React from "react"

export interface MediumImageProps {
  /** The image to make zoomable. */
  children: React.ReactElement
  /** The CSS className of the container element. */
  className?: string
  /** The margin between the image and the viewport when zooming. */
  margin?: number
  /** Icon to show in the zoom button */
  zoomIcon?: React.ReactElement
  /**
   * Text to show in the zoom button
   *
   * @default "Zoom image"
   */
  zoomImageText?: string
}

export declare function MediumImage(props: MediumImageProps): JSX.Element
