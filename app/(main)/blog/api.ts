export async function getPost(slug: string) {
  const { default: Component, meta } = await import(`./posts/${slug}.mdx`)
  return { Component, ...meta }
}
