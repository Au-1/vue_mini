import { h } from "../../lib/guide-mini-vue.esm.js"
import { Foo } from "./Foo.js"

window.self = null
export const App = {
  render() {
    window.self = this
    // ui
    name: "App"
    return h(
      'div',
      {
        id: 'root',
        onClick() {
          console.log("click");
        },
        onMousedown() {
          console.log("mousedown");
        }
      },
      [
        h("div", {}, "foo: " + this.msg),
        h(Foo, {
          count: 1
        })
      ]
      // 'hi,' + this.msg
      // string
      // 'hi'
      // Array
      // [h("p", {class: 'red'}, 'hi'), h("p", {class:'blue'}, "mini-vue")]
    )
  },
  setup() {
    // composition api
    return {
      msg: 'mini-vue haha '
    }
  }
}