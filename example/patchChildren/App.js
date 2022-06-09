import { h, ref } from "../../lib/guide-mini-vue.esm.js"

import ArrayToText from './ArrayToText.js'
// import ArrayToArray from './ArrayToArray.js'
import TextToArray from './TextToArray.js'
import TextToText from './TextToText.js'

export const App = {
  setup() { },
  render() {
    return h(
      'div', { tId: 1 },
      [
        h('p', {}, '主页'),
        h(TextToArray)
      ]
    )
  }
}