import { camelize, toHandlerKey } from "../shared/index"

export function emit(instance, event, ...args) {
  console.log("event", event)

  const { props } = instance

  // Tpp
  // add -> Add
  // add-foo => addFoo
  const handlerName = toHandlerKey(camelize(event))

  const handler = props[handlerName]
  handler && handler(...args)

}