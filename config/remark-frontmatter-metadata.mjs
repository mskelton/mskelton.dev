import { matter } from "vfile-matter"

export default function remarkFrontmatterMetadata() {
  return function (_, file) {
    matter(file)
  }
}
