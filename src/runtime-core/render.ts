import { ShapeFlags } from "../shared/ShapeFlag"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from "./vnode"

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

  const { shapeFlag, type } = vnode

  switch (type) {
    case Fragment:
      processFragment(vnode, container)
      break;

    case Text:
      processText(vnode, container)
      break;

    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        prcessElement(vnode, container)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container)
      }
      break;
  }
}

function processFragment(vnode: any, container: any) {
  mountChildren(vnode, container)
}

function processText(vnode: any, container: any) {
  const { children } = vnode
  const textNode = (vnode.el = document.createTextNode(children))
  container.append(textNode)
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
    console.log(key)
    // 具体 click => 通用
    //  on + Event name
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val)
    }
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