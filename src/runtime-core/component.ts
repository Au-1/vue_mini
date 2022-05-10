import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    emit: () => {},
  }
  component.emit = emit.bind(null, component) as any
  return component
}

// 更新组件内部的 prop,slot 等
export function setupComponent(instance) {
  // todo
  initProps(instance, instance.vnode.props)
  // initSlots()

  // 对 setup 函数处理
  setupStatefulComponent(instance)
}

// 对 setup 函数进行处理
function setupStatefulComponent(instance: any) {
  const Component = instance.type

  // ctx
  instance.proxy = new Proxy(
    { _: instance },
    PublicInstanceProxyHandlers
  )

  const { setup } = Component

  if (setup) {
    // setup 可能返回 function 或者 Object
    const setupResult = setup(shallowReadonly(instance.props), {emit: instance.emit})


    handleSetupResult(instance, setupResult)
  }
}

// 处理 setup 结果， 挂载到实例上
function handleSetupResult(instance, setupResult: any) {
  // Todo
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  // 保证 组件的 render函数 是有值的
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type

  instance.render = Component.render
}
