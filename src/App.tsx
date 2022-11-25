import { Component, lazy, Show } from 'solid-js'
import { createSignal } from 'solid-js'
import { List } from './components/List'
import { User, getUserList } from './mock'

const [count, setCount] = createSignal(0)
const [user, setUser] = createSignal([])
const [model, setModel] = createSignal('')
const increment = () => setCount(count() + 1)
const name = 'Solid'

// 懒加载方案
const Lazy = lazy(async () => {
  // 模拟延迟
  await new Promise((resolve) => setTimeout(resolve, 5000))
  return import('./components/Lazy')
})

const App: Component = () => {
  return (
    <>
      <Lazy name={name} />
      {/* 饰范 show 用法 */}
      <Show
        when={count() > 0}
        fallback={<h3 class="text-4xl text-green-700 text-center py-10">Please Clinks Button</h3>}
      >
        <h3 class="text-4xl text-green-700 text-center py-10">{`Hello ${name}`}</h3>
      </Show>
      <button
        type="button"
        class=" bg-slate-300 rounded-md px-12 mx-auto table font-bold text-center"
        onClick={increment}
      >
        {'Clicks'} {count()}
      </button>

      <div class=" text-center">
        <button
          type="button"
          value="model1"
          class=" bg-slate-300 rounded-md px-6 m-2 font-bold text-center"
          onClick={(e) => {
            // effect 是对比新旧是否为同一个变量，不通则触发更新。变量如果是对象，如果不设置新的对象，变量的内存地址相同，不会触发更新。
            // 尽量不要返回对象的引用，而是返回新的对象，这样可以触发更新。
            setUser(getUserList(5).slice())
            setModel((e.target as HTMLButtonElement).value)
          }}
        >
          整体变色 {user().length}
        </button>
        <button
          type="button"
          value="model2"
          class=" bg-slate-300 rounded-md px-6 m-2 font-bold text-center"
          onClick={(e) => {
            // effect 是对比新旧是否为同一个变量，不通则触发更新。变量如果是对象，如果不设置新的对象，变量的内存地址相同，不会触发更新。
            // 尽量不要返回指定的对象，而是返回新的对象，这样可以触发更新。
            setUser(getUserList(5).slice())
            setModel((e.target as HTMLButtonElement).value)
          }}
        >
          单个变色 {user().length}
        </button>
        <button
          type="button"
          value="model3"
          class=" bg-slate-300 rounded-md px-6 m-2 font-bold text-center"
          onClick={(e) => {
            // effect 是对比新旧是否为同一个变量，不通则触发更新。变量如果是对象，如果不设置新的对象，变量的内存地址相同，不会触发更新。
            // 尽量不要返回指定的对象，而是返回新的对象，这样可以触发更新。
            setUser(getUserList(5).slice())
            setModel((e.target as HTMLButtonElement).value)
          }}
        >
          追加变色 {user().length}
        </button>
      </div>
      <List items={user()} count={count()} model={model()} />
    </>
  )
}

export default App
