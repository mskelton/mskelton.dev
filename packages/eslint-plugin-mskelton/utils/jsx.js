/**
 * @param {object} node - Node to check.
 * @returns {boolean} Whether or not the node if a JSX element or fragment.
 */
exports.isJSX = function (node) {
  return node && ["JSXElement", "JSXFragment"].indexOf(node.type) >= 0
}
