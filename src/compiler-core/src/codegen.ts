import { NodeTypes } from "./ast"
import { helperMapName, TO_DISPLAY_STRING } from "./runtimeHelpers"

export function generate(ast) {
  const context = createCodegenContext()
  const { push } = context

  genFunctionPreamble(ast, context)
  push("return ")

  const functionName = "render"
  const args = ["_ctx", "_cache", "$props", "$setup", "$data", "$options"]
  const signature = args.join(", ")

  push(`function ${functionName}(${signature}) {`)
  push("return ")
  genNode(ast.codegenNode, context)
  push("}")

  return { code: context.code }
}

function genNode(node: any, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context)
      break
    case NodeTypes.INTERPOLATION:
      geninterpolation(node, context)
      break
    case NodeTypes.SIMPLE_EXPRESSION:
      genExperession(node, context)
      break
    default:
      break
  }


  return context
}

function createCodegenContext() {
  const context = {
    code: "",
    push(source) {
      context.code += source
    },
    helper(key) {
      return `_${helperMapName[key]}`
    }
  }
  return context
}

function genFunctionPreamble(ast, context) {
  const { push } = context
  const VueBinging = "Vue"
  const aliasHelper = (s) => `${helperMapName[s]}: _${helperMapName[s]}`

  if (ast.helpers.length > 0) {
    push(`const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinging}`)
    push('\n')
  }
}

function genText(node, context) {
  const { push } = context
  push(`'${node.content}'`)
}

function geninterpolation(node, context) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(")")
}

function genExperession(node, context) {
  const { push } = context

  push(`${node.content}`)
}