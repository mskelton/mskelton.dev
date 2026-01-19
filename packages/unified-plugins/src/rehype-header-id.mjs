import { hasProperty } from 'hast-util-has-property'
import { headingRank } from 'hast-util-heading-rank'
import { visit } from 'unist-util-visit'

/**
 * The rehype-slug plugin adds an id property to headings. This works normally
 * but given that my site has a sticky header, the headings need to be offset.
 * Using scroll-margin-top sadly causes scroll jumping, so using an absolutely
 * positioned span with a negative margin is the best solution.
 */
export default function rehypeHeaderId() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (headingRank(node) && node.properties && hasProperty(node, 'id')) {
        const id = node.properties.id

        // Remove the id from the heading
        node.properties.id = undefined
        node.properties.className = ['relative']

        // Add the id to a span with a negative margin
        node.children.unshift({
          properties: {
            className: [
              '-mt-[110px]',
              'pt-[110px]',
              'absolute',
              'block',
              'invisible',
            ],
            id,
          },
          tagName: 'span',
          type: 'element',
        })
      }
    })
  }
}
