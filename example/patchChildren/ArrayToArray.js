import { h, ref } from "../../lib/guide-mini-vue.esm.js"

const prevChildren = [h('div', {}, 'B'), h('div', {}, 'A')];
const nextChildren = [h('div', {}, 'A'), h('div', {}, 'B')];

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

    return self.isChange === true
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren);
  }
}