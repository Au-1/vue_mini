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

// 对比中间的部分
// 删除老的（在老的里边存在，新的里面不存在）
// 5.1
// a,b,(c,d),f,g
// a,b,(e,c),f,g
// D节点在新的里面是没有的, 需要删除
// c 节点 props 也发生了变化

const prevChildrenMiddle = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "C", id: 'c-prev' }, "C"),
  h('p', { key: "D" }, "D"),
  h('p', { key: "F" }, "F"),
  h('p', { key: "G" }, "G"),
]
const nextChildrenMiddle = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "E" }, "E"),
  h('p', { key: "C", id: 'c-next' }, "C"),
  h('p', { key: "F" }, "F"),
  h('p', { key: "G" }, "G"),
]

// 5.1.1
// a,b,(c,e,d),f,g
// a,b,(e,c),f,g
// 中间部分,老的比新的多,多出来的部分直接可以被干掉(优化删除逻辑)

const prevChildrenMiddleM = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "C", id: 'c-prev' }, "C"),
  h('p', { key: "E", }, "E"),
  h('p', { key: "D" }, "D"),
  h('p', { key: "F" }, "F"),
  h('p', { key: "G" }, "G"),
]
const nextChildrenMiddleM = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "E" }, "E"),
  h('p', { key: "C", id: 'c-next' }, "C"),
  h('p', { key: "F" }, "F"),
  h('p', { key: "G" }, "G"),
]



// 3，创建新节点
// a,b,(c,e),f,g
// a,b,(e,c,d),f,g
//  d节点在老的节点中不存在， 新的里边存在， 所以需要创建

const prevChildrenC = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "C" }, "C"),
  h('p', { key: "E" }, "E"),
  h('p', { key: "F" }, "F"),
  h('p', { key: "G" }, "G"),
]
const nextChildrenC = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "E" }, "E"),
  h('p', { key: "C" }, "C"),
  h('p', { key: "D" }, "D"),
  h('p', { key: "F" }, "F"),
  h('p', { key: "G" }, "G"),
]


// fix c节点应该是移动的，而不是删除之后重新创建
const prevFix = [
  h('p', { key: "A" }, "A"),
  h('p', {}, "C"),
  h('p', { key: "B" }, "B"),
  h('p', { key: "D" }, "D"),
]
const nextFix = [
  h('p', { key: "A" }, "A"),
  h('p', { key: "B" }, "B"),
  h('p', {}, "C"),
  h('p', { key: "D" }, "D"),
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
      ? h('div', {}, nextFix)
      : h('div', {}, prevFix);
  }
}