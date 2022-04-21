import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandler"

export const enum ReativeFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadOnly'
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers)
}

export function shallowReadonly(raw) {
  return createReactiveObject(raw, shallowReadonlyHandlers)
}

export function isReactive(value) {
  return !!value[ReativeFlags.IS_REACTIVE]
}

export function isReadOnly(value) {
  return !!value[ReativeFlags.IS_READONLY]
}

export function isProxy(value) {
  return isReactive(value) || isReadOnly(value)
}

function createReactiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}