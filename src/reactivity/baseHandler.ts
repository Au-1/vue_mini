import { track, triggle } from "./effect"
import { ReativeFlags } from "./reactive"

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly = false) {
  return function get(target, key) {
    if (key === ReativeFlags.IS_REACTIVE) return !isReadonly
    if (key === ReativeFlags.IS_READONLY) return isReadonly

    const res = Reflect.get(target, key)

    if (!isReadonly) track(target, key)

    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    triggle(target, key)
    return res
  }
}

export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} set 失败，因为 target 是 raadonly`, target)
    return true
  }
}