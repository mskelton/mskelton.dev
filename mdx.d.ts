declare module "*.mdx" {
  export interface Meta extends Partial<ArticleMeta> {
    date: string
    description: string
    title: string
  }

  export const meta: Meta

  let MDXComponent: () => JSX.Element
  export default MDXComponent
}
