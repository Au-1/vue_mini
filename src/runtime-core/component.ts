import { proxyRefs } from "../reactivity"
import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vnode, parent) {
  console.log('createComponentInstance', parent);

  const component = {
    vnode,
    type: vnode.type,
    next: null,
    setupState: {},
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    isMounted: false,
    subTree: {},
    emit: () => { },
  }
  component.emit = emit.bind(null, component) as any
  return component
}

// 更新组件内部的 prop,slot 等
export function setupComponent(instance) {
  // todo
  initProps(instance, instance.vnode.props)
  initSlots(instance, instance.vnode.children)

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
    setCurrentInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit })
    setCurrentInstance(null)

    handleSetupResult(instance, setupResult)
  }
}

// 处理 setup 结果， 挂载到实例上
function handleSetupResult(instance, setupResult: any) {
  // Todo
  if (typeof setupResult === 'object') {
    instance.setupState = proxyRefs(setupResult)
  }

  // 保证 组件的 render函数 是有值的
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type

  if(compiler && !Component.render){
     if(Component.template){
      Component.render = compiler(Component.template)
     }
  }
  instance.render = Component.render
}

let currentInstance = null

export function getCurrentInstance() {
  return currentInstance
}

export function setCurrentInstance(instance) {
  currentInstance = instance
}

let compiler;

export function registerRuntimeCompiler(_compiler) {
  compiler  = _compiler
}