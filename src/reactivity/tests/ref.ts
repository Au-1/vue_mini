import { hasChanged, isObject } from "../../shared"
import { isTracking, trackEffect, triggleEffect } from "../effect"
import { reactive } from "../reactive"

class RefImpl {
  private _value: any
  public dep
  private _rawValue: any

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