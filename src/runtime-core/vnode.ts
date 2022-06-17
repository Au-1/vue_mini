import { ShapeFlags } from "../shared/ShapeFlag"

export const Fragment = Symbol("Fragment")
export const Text = Symbol("Text")

export function createVNode(type, props?, children?) {
  const vnode = {
    type, // 为传进来的 组件 对象，如 App.js
    props,
    children,
    component: null,
    key: props && props.key,
    shapeFlag: getShapFlag(type),
    el: null
  }

  if (typeof children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }

  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
    }
  }

  return vnode
}

export function createTextVNode(text: string) {
  return createVNode(Text, {}, text)
}

function getShapFlag(type) {
  return typeof type === "string"
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT
}