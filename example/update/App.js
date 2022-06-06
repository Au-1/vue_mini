import { h, ref } from "../../lib/guide-mini-vue.esm.js"

export const App = {
  setup() {
    const count = ref(0);

    const onClick = () => {
      count.value++;
    };

    return {
      count,
      onClick
    }
  },
  render() {
    console.log(this.count);
    return h(
      'div',
      {
        id: 'rppt',
      },
      [
        h('div', {}, 'count:' + this.count),
        h('button', { onClick: this.onClick, }, 'click')
      ]
    )
  }
}