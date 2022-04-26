function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type
    };
    return component;
}
// 更新组件内部的 prop,slot 等
function setupComponent(instance) {
    // todo
    // initProp()
    // initSlots()
    // 对 setup 函数处理
    setupStatefulComponent(instance);
}
// 对 setup 函数进行出来
function setupStatefulComponent(instance) {
    const Component = instance.type;
    const { setup } = Component;
    if (setup) {
        // setup 可能返回 function 或者 Object
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
// 处理 setup 结果， 挂载到实例上
function handleSetupResult(instance, setupResult) {
    // Todo
    if (typeof setupResult === 'object') {
        instance.setup = setupResult;
    }
    // 保证 组件的 render函数 是有值的
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, container) {
    // patch
    patch(vnode);
}
// patch 函数，将组件 vnode 的 props 等属性添加，然后挂载到 container 上， 递归调用patch最终完成一个 vdom-tree
function patch(vnode, container) {
    // 处理组件
    // 判断 是不是 element
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponet(vnode);
}
// 挂载组件
function mountComponet(vnode, container) {
    // 先创建一个 instance
    const instance = createComponentInstance(vnode);
    // 然后去处理组件内的 props, slots 以及 setup 函数 返回出来的值
    setupComponent(instance);
    setupRenderEffect(instance);
}
// 调用 render 函数 返回 vnode
function setupRenderEffect(instance, constructor) {
    const subTree = instance.render();
    // vnode  
    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree);
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先转换成 vnode
            // component -> vnode
            // 后续的逻辑操作， 都会基于 vnode
            const vnode = createVNode(rootComponent);
            // 进行进一步处理
            render(vnode);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };
