import { For } from 'solid-js'
import { createStore } from 'solid-js/store'
import appStore from '../store'

// 这是个 Solid Store 使用饰范
export default function StoreDemo() {
  let input
  let todoId = 0
  const [store, setStore] = appStore
  const addTodo = (text) => {
    setStore('todos', (todos) => [...todos, { id: ++todoId, text, completed: false }])
  }
  const toggleTodo = (id) => {
    setStore(
      'todos',
      (todo) => todo.id === id,
      'completed',
      (completed) => !completed
    )
  }

  return (
    <div class=" text-center">
      <h1 class="text-4xl text-green-700 text-center py-10">Store Demo</h1>
      <div>
        <input
          ref={input}
          class="border-2 border-gray-300 rounded-lg py-2 px-4 m-2 w-1/2"
          placeholder="输入你的持久化数据"
        />
        <button
          class=" bg-slate-300 rounded-md p-2 font-bold text-center"
          onClick={(e) => {
            if (!input.value.trim()) return
            addTodo(input.value)
            input.value = ''
          }}
        >
          Add Todo
        </button>
      </div>
      <For each={store.todos}>
        {(todo) => {
          const { id, text } = todo
          console.log(`Creating ${text}`)
          return (
            <div>
              <input
                type="checkbox"
                class=" mx-2 w-4 h-4 align-middle"
                checked={todo.completed}
                onchange={[toggleTodo, id]}
              />
              <span
                style={{ 'text-decoration': todo.completed ? 'line-through' : 'none' }}
                class=" h-4 align-middle text-xl"
              >
                {text}
              </span>
            </div>
          )
        }}
      </For>
    </div>
  )
}
