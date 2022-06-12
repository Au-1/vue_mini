import { h, ref } from "../../lib/guide-mini-vue.esm.js"

// 左侧对比
// (a b) c
// (a b) d e
const prevChildrenLeft = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "C" }, "C"),
]
const nextChildrenLeft = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "D" }, "D"),
  h('p', { key: "E" }, "E"),
]

// 右侧对比
// c (a b) 
// d e (a b) 
const prevChildrenRight = [
  h('p', { key: "C" }, "C"),
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
]
const nextChildrenRight = [
  h('p', { key: "D" }, "D"),
  h('p', { key: "E" }, "E"),
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
]

// 新的比老的
// (a b) 
//  (a b) c
const prevChildrenLong = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
]
const nextChildrenLong = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "C" }, "C"),
  h('p', { key: "D" }, "D"),
]

// 新的比老的长 右边
// (a b) 
// c (a b) 
const prevChildrenLongRight = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
]
const nextChildrenLongRight = [
  h('p', { key: "C" }, "C"),
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
]

// 老的比新的长 
// (a b) c
// (a b) 
const prevChildrenShort = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "C" }, "C"),
]
const nextChildrenShort = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
]

// 老的比新的长  右
// c (a b) 
// (a b) 
const prevChildrenShortRight = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "C" }, "C"),
]
const nextChildrenShortRight = [
  h('p', { key: "B" }, "B"),
  h('p', { key: "C" }, "C"),
]

export default {
  name: 'ArrayToText',
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;

    return {
      isChange
    }
  },
  render() {
    const self = this;

    return self.isChange
      ? h('div', {}, nextChildrenShortRight)
      : h('div', {}, prevChildrenShortRight);
  }
}