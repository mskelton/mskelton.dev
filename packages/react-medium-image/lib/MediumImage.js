// @ts-check
import clsx from "clsx"
import React, { cloneElement, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ExpandIcon } from "./icons.js"
import { getImgAlt, getImgSrc } from "./utils.js"

/** @type {HTMLDivElement} */
let portal
if (typeof document !== "undefined") {
  portal = document.createElement("div")
  portal.className = "data-rmi-portal"
  document.body.appendChild(portal)
}

/**
 * @typedef {object} MediumImageProps
 * @property {import("react").ElementType} wrapElement
 * @property {import("react").ReactElement} children
 * @property {string | null} className
 * @property {string | null} dialogClassName
 * @property {string | null} dialogContentClassName
 * @property {string | null} dialogOverlayClassName
 * @property {string | null} expandButtonClassName
 * @property {string | null} expandButtonContainerClassName
 * @property {string} collapseImageText
 * @property {string} expandImageText
 * @property {import("react").ReactElement | null} expandIcon
 */

/** @param {MediumImageProps} props */
export function MediumImage({
  children,
  className,
  collapseImageText = "Collapse image",
  dialogClassName,
  dialogContentClassName,
  dialogOverlayClassName,
  expandButtonClassName,
  expandButtonContainerClassName,
  expandIcon,
  expandImageText = "Expand image",
  wrapElement: WrapElement = "div",
}) {
  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const contentRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const imgRef = useRef(/** @type {HTMLImageElement | null} */ (null))
  const dialogRef = useRef(/** @type {HTMLDialogElement | null} */ (null))
  const dialogContentRef = useRef(/** @type {HTMLDivElement | null} */ (null))

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const id = useId()
  const dialogId = `rmi-dialog-${id}`
  const imageId = `rmi-img-${id}`

  const imgAlt = getImgAlt(imgRef.current)
  const imgSrc = getImgSrc(imgRef.current)
  const imgSizes = imgRef.current?.sizes
  const imgSrcSet = imgRef.current?.srcset

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal?.()
    } else {
      dialogRef.current?.close?.()
    }
  }, [isOpen])

  return (
    <WrapElement ref={containerRef} aria-owns={dialogId} className={className}>
      <WrapElement
        ref={contentRef}
        style={{ visibility: isOpen ? "hidden" : "visible" }}
      >
        {cloneElement(children, {
          onLoad: () => setIsImageLoaded(true),
          ref: imgRef,
        })}
      </WrapElement>

      <WrapElement
        className={clsx(
          "rmi-expand-button-container",
          expandButtonContainerClassName,
        )}
      >
        <button
          aria-label={
            imgAlt ? `${expandImageText}: ${imgAlt}` : expandImageText
          }
          className={clsx("rmi-expand-button", expandButtonClassName)}
          onClick={() => setIsOpen(true)}
          type="button"
        >
          {expandIcon ?? <ExpandIcon />}
        </button>
      </WrapElement>

      {isImageLoaded &&
        portal != null &&
        createPortal(
          <dialog
            ref={dialogRef}
            aria-labelledby={imageId}
            aria-modal="true"
            className={clsx("rmi-dialog", dialogClassName)}
            id={dialogId}
            // onClick={handleDialogClick}
            onCancel={() => setIsOpen(false)}
            onClose={() => setIsOpen(false)}
            role="dialog"
          >
            <div
              className={clsx("rmi-dialog-overlay", dialogOverlayClassName)}
            />

            <div
              ref={dialogContentRef}
              className={clsx("rmi-dialog-content", dialogContentClassName)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                // ref={refModalImg}
                alt={imgAlt}
                id={imageId}
                sizes={imgSizes}
                src={imgSrc}
                srcSet={imgSrcSet}
                // style={this.styleModalImg}
                // width={this.styleModalImg.width || undefined}
                // {...(isZoomImgLoaded && modalState === ModalState.LOADED
                //   ? zoomImg
                //   : {})}
                // height={this.styleModalImg.height || undefined}
              />
            </div>
          </dialog>,
          portal,
        )}
    </WrapElement>
  )
}
