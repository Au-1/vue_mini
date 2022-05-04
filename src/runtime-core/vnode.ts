import { ShapeFlags } from "../shared/ShapeFlag"

export function createVNode(type, props?, children?) {
  const vnode = {
    type, // 为传进来的 组件 对象，如 App.js
    props,
    children,
    shapeFlag: getShapFlag(type),
    el: null
  }

  if (typeof children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }

  return vnode
}

function getShapFlag(type) {
  return typeof type === "string"
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT
}