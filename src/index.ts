// mini-vue的出口
export * from "./runtime-dom";

import { baseCompile } from "./compiler-core/src";
import * as runtimeDom from "./runtime-dom"
import { registerRuntimeCompiler } from "./runtime-dom"

function compileToFunction(template) {
  // 导出 code， 为字符串 https://vue-next-template-explorer.netlify.app/
  const { code } = baseCompile(template)
  const render = new Function("Vue", code)(runtimeDom)
  return render

  // const render = renderFunction()

  // function renderFunction(Vue) {
  // import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

  // export function render(_ctx, _cache, $props, $setup, $data, $options) {
  //   return (_openBlock(), _createElementBlock("div", null, "hi, " + _toDisplayString(_ctx.message), 1 /* TEXT */))
  // }

  // }
}

registerRuntimeCompiler(compileToFunction)

