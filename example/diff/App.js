import { h, ref } from "../../lib/guide-mini-vue.esm.js"

import ArrayToArray from './ArrayToArray.js'

export const App = {
  setup() { },
  render() {
    return h(
      'div', { tId: 1 },
      [
        h('p', {}, '主页'),
        h(ArrayToArray)
      ]
    )
  }
}