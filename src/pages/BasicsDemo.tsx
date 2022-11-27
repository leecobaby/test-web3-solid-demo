import { createSignal, lazy, Show, Suspense } from 'solid-js'
import type { Component } from 'solid-js'
import { List } from '../components/List'
import { getUserList } from '../mock'

// 懒加载方案
const Lazy = lazy(async () => {
  // 模拟延迟
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return import('../components/Lazy')
})

export default function BasicsDemo() {
  const [count, setCount] = createSignal(0)
  const [user, setUser] = createSignal([])
  const [model, setModel] = createSignal('')
  const increment = () => setCount(count() + 1)
  const name = 'Solid'

  return (
    <>
      {/* 饰范 show 用法 */}
      <Show
        when={count() > 0}
        fallback={<h1 class="text-4xl text-green-700 text-center py-10">Basisc Demo</h1>}
      >
        <h1 class="text-4xl text-green-700 text-center py-10">Clinks Button</h1>
      </Show>

      {/* Suspense 比 Show 更适合针对异步场景优化页面，可以协调多个异步事件，Suspense 作为一个边界，可以在这些异步事件未完成时显示 fallback 占位而不是部分加载的内容。 */}
      <Suspense fallback={<p class="text-4xl text-gray-500 text-center py-2">Loading...</p>}>
        <Lazy name={name} />
      </Suspense>

      <button
        type="button"
        class=" bg-slate-300 rounded-md px-12 my-4 mx-auto table font-bold text-center"
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
      <div>
        <pre class=" bg-slate-50 text-gray-400">{JSON.stringify(user(), null, 2)}</pre>
      </div>
      <List items={user()} count={count()} model={model()} />
    </>
  )
}
