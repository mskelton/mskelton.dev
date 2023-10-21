import React from "react"

export interface MediumImageProps {
  children: React.ReactElement
  className?: string
  collapseImageText?: string
  dialogClassName?: string
  dialogContentClassName?: string
  dialogOverlayClassName?: string
  expandButtonClassName?: string
  expandButtonContainerClassName?: string
  expandIcon?: React.ReactElement
  expandImageText?: string
  wrapElement?: React.ElementType
}

export declare function MediumImage(props: MediumImageProps): JSX.Element
