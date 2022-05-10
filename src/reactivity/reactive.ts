import { isObject } from "../shared/index"
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

function createReactiveObject(target: any, baseHandlers) {
  if(!isObject(target)){
    console.warn(`target ${target} 必须是一个对象`);
    return target
  }
  return new Proxy(target, baseHandlers)
}