import { render } from "./render"
import { createVNode } from "./vnode"

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先转换成 vnode
      // component -> vnode
      // 后续的逻辑操作， 都会基于 vnode

      const vnode = createVNode(rootComponent)

      // 进行进一步处理
      render(vnode, rootContainer, null)
    }
  }
}

