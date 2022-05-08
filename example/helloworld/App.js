import { h } from "../../lib/guide-mini-vue.esm.js"

window.self = null
export const App = {
  render() {
    window.self = this
    // ui
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
      'hi,' + this.msg
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