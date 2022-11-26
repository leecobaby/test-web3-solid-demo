import { Portal, Show } from 'solid-js/web'
import { css } from 'solid-styled-components'
import appStore from '../store'

// 示范 styled-components 的用法，但感觉并不好用
const StyledTip = css`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  color: rgb(241 245 249);
  background-color: rgb(220 38 38);
  padding: 0.25rem;
  border-radius: 0.75rem;
  z-index: 100;
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
`
console.log(StyledTip)

export default function Tip() {
  const [store, setStore] = appStore
  const getTodosNum = () => {
    return store.todos.filter((todo) => !todo.completed).length
  }
  // 示范 Solid Potal 传送门用法
  return (
    <Show when={store.todos.length}>
      <Portal>
        <span class={StyledTip}>TODO: {getTodosNum()}</span>
      </Portal>
    </Show>
  )
}
