export function  createVNode(type, props?, children?) {
  const vnode = {
    type, // 为传进来的 组件 对象，如 App.js
    props,
    children
  }
  return vnode   
}