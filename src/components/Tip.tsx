import { Portal, Show } from 'solid-js/web'
import appStore from '../store'

export default function Tip() {
  const [store, setStore] = appStore
  const getTodosNum = () => {
    return store.todos.filter((todo) => !todo.completed).length
  }
  // 示范 Solid Potal 传送门用法
  return (
    <Show when={store.todos.length}>
      <Portal>
        <span class=" bg-red-600 text-slate-100 p-1 rounded-xl shadow-lg fixed  top-5 right-5">
          TODO: {getTodosNum()}
        </span>
      </Portal>
    </Show>
  )
}
