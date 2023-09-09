export async function getPost(slug: string) {
  const { default: Component, meta } = await import(`./content/${slug}.mdx`)
  return { Component, ...meta }
}
