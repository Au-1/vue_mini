import { mutableHandlers, readonlyHandlers } from "./baseHandler"

export function reactive(raw) {
  return crateActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return crateActiveObject(raw, readonlyHandlers)
}

function crateActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}
