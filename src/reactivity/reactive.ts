import { mutableHandlers, readonlyHandlers } from "./baseHandler"

export const enum ReativeFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadOnly'
}

export function reactive(raw) {
  return crateActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return crateActiveObject(raw, readonlyHandlers)
}

export function isReactive(value) {
  return !!value[ReativeFlags.IS_REACTIVE]
}

export function isReadOnly(value) {
  return !!value[ReativeFlags.IS_READONLY]
}

function crateActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}
