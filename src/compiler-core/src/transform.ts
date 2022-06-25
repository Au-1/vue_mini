
export function transform(root, options) {
  const context = createTransformContext(root, options)
  traverseNode(root, context)
}

function traverseNode(node: any, context) {

  //! 调用外部传入的 plugin
  //! 2. 修改 text content
  const nodeTransforms = context.nodeTransforms
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    transform(node)
  }

  // 1. 遍历 - 深度优先搜索
  traverChildren(node, context)
}

function createTransformContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || []
  }
  return context
}

function traverChildren(node, context) {
  const children = node.children

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context)
    }
  }

}