import { isObject } from "../shared/index"
import { ShapeFlags } from "../shared/ShapeFlag"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

// patch 函数，将组件 vnode 的 props 等属性添加，然后挂载到 container 上， 递归调用patch最终完成一个 vdom-tree
function patch(vnode, container) {
  // 处理组件
  // 判断 是不是 element
  // todo 判断vnode是不是一个element
  // 是element 就应该处理 element
  // 思考题： 如何去区分 是element 还是 compoent

  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    prcessElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container)
  }
}
function prcessElement(vnode, container) {
  mountElement(vnode, container)
}

function mountElement(vnode, container) {
  const { children, type, props, shapeFlag } = vnode
  const el = (vnode.el = document.createElement(type))

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }

  // props  
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  })
}

function processComponent(vnode, container) {
  mountComponet(vnode, container)

}

// 挂载组件
function mountComponet(vnode, container) {
  // 先创建一个 instance
  const instance = createComponentInstance(vnode)

  // 然后去处理组件内的 props, slots 以及 setup 函数 返回出来的值
  setupComponent(instance)

  setupRenderEffect(instance, vnode, container)
}

// 调用 render 函数 返回 vnode
function setupRenderEffect(instance, vnode, constructor) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode  
  // vnode -> patch
  // vnode -> element -> mountElement

  patch(subTree, constructor)

  // element => mount 
  vnode.el = subTree.el
}
