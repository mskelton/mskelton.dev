import { PostSource } from "~/types/posts"

export abstract class ContentProvider {
  abstract getAllPosts(): Promise<PostSource[]>

  abstract getPost(slug: string): Promise<PostSource>
}
