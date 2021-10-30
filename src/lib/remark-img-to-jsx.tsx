import fs from "fs"
import sizeOf from "image-size"
import { visit } from "unist-util-visit"

export default function remarkImgToJsx() {
  return (tree) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node) =>
        node.type === "paragraph" &&
        node.children.some((n) => n.type === "image"),
      (node) => {
        const imageNode = node.children.find((n) => n.type === "image")

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)

          // Convert original node to next/image
          ;(imageNode.type = "mdxJsxFlowElement"),
            (imageNode.name = "Image"),
            (imageNode.attributes = [
              { name: "alt", type: "mdxJsxAttribute", value: imageNode.alt },
              { name: "src", type: "mdxJsxAttribute", value: imageNode.url },
              {
                name: "width",
                type: "mdxJsxAttribute",
                value: dimensions.width,
              },
              {
                name: "height",
                type: "mdxJsxAttribute",
                value: dimensions.height,
              },
            ])

          // Change node type from p to div to avoid nesting error
          node.type = "div"
          node.children = [imageNode]
        }
      }
    )
  }
}
