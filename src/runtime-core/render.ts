import { effect } from "../reactivity/effect"
import { EMPTY_OBJ } from "../shared"
import { ShapeFlags } from "../shared/ShapeFlag"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { Fragment, Text } from "./vnode"

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
    remove: hostRemove,
    setElementText: hostSetElementText
  } = options


  function render(vnode, container) {
    // patch
    patch(null, vnode, container, null)
  }

  // patch 函数，将组件 vnode 的 props 等属性添加，然后挂载到 container 上， 递归调用patch最终完成一个 vdom-tree
  function patch(n1, n2, container, parentComponent) {
    // 处理组件
    // 判断 是不是 element
    // todo 判断vnode是不是一个element
    // 是element 就应该处理 element
    // 思考题： 如何去区分 是element 还是 compoent

    // n1 之前的， n2 新的
    const { shapeFlag, type } = n2

    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent)
        break;

      case Text:
        processText(n1, n2, container)
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent)
        }
        break;
    }
  }

  function processFragment(n1: any, n2: any, container: any, parentComponent) {
    mountChildren(n2.children, container, parentComponent)
  }

  function processText(n1, n2: any, container: any) {
    const { children } = n2
    const textNode = (n2.el = document.createTextNode(children))
    container.append(textNode)
  }

  function processElement(n1, n2, container, parentComponent) {
    if (!n1) {
      mountElement(n2, container, parentComponent)
    } else {
      patchElement(n1, n2, container, parentComponent)
    }
  }

  function patchElement(n1, n2, container, parentComponent) {
    console.log('patchElement');

    console.log('n1', n1)
    console.log('n2', n2)

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ

    const el = (n2.el = n1.el)

    patchChildren(n1, n2, el, parentComponent)
    patchProps(el, newProps, oldProps)
  }

  function patchChildren(n1, n2, container, parentComponent) {
    const prevShapeFlag = n1.shapeFlag
    const c1 = n1.children
    const { shapeFlag } = n2
    const c2 = n2.children

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 1. 把老的 children 清空
        unmounteChildren(n1.children)
      }
      if (c1 !== c2) {
        hostSetElementText(container, c2)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, '')
        mountChildren(c2, container, parentComponent)
      }
    }
  }

  function unmounteChildren(children) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i].el
      // revmove
      hostRemove(el)
    }
  }

  function patchProps(el, newProps, oldProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prevProp = oldProps[key]
        const nextProp = newProps[key]

        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp)
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null)
          }
        }
      }
    }
  }

  function mountElement(vnode, container, parentComponent) {
    const { children, type, props, shapeFlag } = vnode
    const el = (vnode.el = hostCreateElement(type))

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode.children, el, parentComponent)
    }

    // props  
    for (const key in props) {
      const val = props[key]
      console.log(key)
      // 具体 click => 通用
      //  on + Event name
      // const isOn = (key: string) => /^on[A-Z]/.test(key)
      // if (isOn(key)) {
      //   const event = key.slice(2).toLowerCase()
      //   el.addEventListener(event, val)
      // } else {
      //   el.setAttribute(key, val)
      // }
      hostPatchProp(el, key, null, val)
    }

    // container.append(el)
    hostInsert(el, container)
  }

  function mountChildren(children, container, parentComponent) {
    children.forEach(v => {
      patch(null, v, container, parentComponent)
    })
  }

  function processComponent(n1, n2, container, parentComponent) {
    mountComponet(n2, container, parentComponent)
  }

  // 挂载组件
  function mountComponet(vnode, container, parentComponent) {
    // 先创建一个 instance
    const instance = createComponentInstance(vnode, parentComponent)

    // 然后去处理组件内的 props, slots 以及 setup 函数 返回出来的值
    setupComponent(instance)

    setupRenderEffect(instance, vnode, container)
  }

  // 调用 render 函数 返回 vnode
  function setupRenderEffect(instance, vnode, constructor) {
    effect(() => {
      if (!instance.isMounted) {
        console.log('init');

        const { proxy } = instance
        const subTree = (instance.subTree = instance.render.call(proxy))
        console.log(subTree);

        // vnode  
        // vnode -> patch
        // vnode -> element -> mountElement

        patch(null, subTree, constructor, instance)

        // element => mount 
        vnode.el = subTree.el

        instance.isMounted = true
      } else {
        console.log('update');

        const { proxy } = instance
        const subTree = instance.render.call(proxy)
        const preSubTree = instance.subTree

        instance.subTree = subTree

        console.log('current', subTree);
        console.log('prev', preSubTree);

        patch(preSubTree, subTree, constructor, instance)
      }

    })
  }

  return {
    createApp: createAppAPI(render)
  }
}