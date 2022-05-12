import { h, createTextVNode } from "../../lib/guide-mini-vue.esm.js"
import { Foo } from "./Foo.js"

window.self = null
export const App = {
  render() {
    window.self = this
    // ui
    name: "App"
    // return h(
    //   'div',
    //   {},
    //   [
    //     h('div', {}, "App"),
    //     h(Foo, {
    //       onAdd(a, b) {
    //         console.log("onAdd", a, b);
    //       },
    //       onAddFoo(a, b) {
    //         console.log("onAddFoo", a, b);
    //       }
    //     })
    //   ]
    //   // {
    //   //   id: 'root',
    //   //   onClick() {
    //   //     console.log("click");
    //   //   },
    //   //   onMousedown() {
    //   //     console.log("mousedown");
    //   //   }
    //   // },
    //   // [
    //   //   h("div", {}, "foo: " + this.msg),
    //   //   h(Foo, {
    //   //     count: 1
    //   //   })
    //   // ]
    //   // 'hi,' + this.msg
    //   // string
    //   // 'hi'
    //   // Array
    //   // [h("p", {class: 'red'}, 'hi'), h("p", {class:'blue'}, "mini-vue")]
    // )
    const app = h("div", {}, "App")
    const foo = h(Foo, {}, {
      header: ({ age }) => [h('p', {}, "header" + age),
      createTextVNode("你好呀")
      ],
      footer: () => h('p', {}, "footer")
    })
    return h("div", {}, [app, foo])
  },
  setup() {
    // composition api
    return {
      // msg: 'mini-vue haha '
    }
  }
}