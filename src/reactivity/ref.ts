import { hasChanged, isObject } from "../shared"
import { isTracking, trackEffect, triggleEffect } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
  private _value: any
  public dep
  private _rawValue: any
  public __v_isRef = true

  constructor(value) {
    this._rawValue = value
    this._value = convert(value)
    this.dep = new Set()
  }

  get value() {
    TrackRefValue(this)
    return this._value
  }

  set value(newValue) {
    // 当新的值不等于老的值的话，
    // 那么才需要触发依赖
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggleEffect(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function TrackRefValue(ref) {
  if (isTracking()) trackEffect(ref.dep)
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(ref) {
  return !!ref.__v_isRef
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return target[key].value = value
      } else {
        let a
        return a = Reflect.set(target, key, value)
      }
    }
  })
}