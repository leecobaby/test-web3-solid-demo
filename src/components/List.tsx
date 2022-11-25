import { on, createEffect, createSignal, For, mergeProps } from 'solid-js'
import type { Component, MergeProps, FlowProps } from 'solid-js'
import { untrack } from 'solid-js/web'

// 创建一个 signal,用于循环颜色
const [color, setColor] = createSignal('red')
const colors = ['red', 'green', 'blue']

// 这里展示一种子组件向父组件传递数据的方式，虽然不知道是否算好的方式
// 内嵌到 JSX 的数据传值，需要像 React 一样，在父组件定义一个函数，然后传递给子组件，子组件调用父组件的函数，传递数据。
// 整体改变颜色
const nextColor = () => {
  console.log('current color', color())

  const index = colors.indexOf(color())
  return setColor(colors[(index + 1) % colors.length])
}

// 改变追加颜色
let colorModel3 = color()

// 这种方法并不好，有 bug，但能工作了
export const getColor = (model: string) => {
  let result
  switch (model) {
    case 'model1':
      result = color()
      break
    case 'model2':
      result = untrack(color)
      untrack(nextColor)
      break
    case 'model3':
      result = colorModel3
      break
    default:
      result = color()
      break
  }
  console.log(result)
  return result
}

export const List: Component<any> = (props) => {
  // 设置 porps 默认值，又保持 singnal 的响应式
  let newProps = mergeProps(
    {
      class: 'bg-slate-300 rounded-md px-12 mx-auto my-2 table font-bold text-center',
      count: 0
    },
    props
  )

  // effect 需要在组件内部定义，否则无法监听到数据变化
  // 发现 JSX 中的监听会先触发，然后再触发 effect
  createEffect(
    // solid 提供一个 on 工具函数，可以为我们的设置显式依赖，只监听第一个参数中 signal 的变化，它也允许计算不立即执行而只在第一次更改时运行。可以使用defer 选项启用此功能。
    on(
      () => newProps.items,
      (items) => (colorModel3 = nextColor()),
      { defer: true }
    )
  )

  return (
    <ul class={newProps.class}>
      {newProps.count} 父组件传递过来的次数
      <For each={newProps.items} fallback={<li>Loading...</li>}>
        {/* 仔细观察会发现，列表增加数据的时候元数据不会重新渲染 */}
        {/* 因为 Solid For Component 会自动生成 index，index 本身便是一个 signal，能响应式的更新或不变  */}
        {(item: any) => (
          <li
            class="text-center"
            style={{
              color: getColor(untrack(() => newProps.model))
              // 整体改变颜色
              // color()

              // 每个元素改变颜色
              // nextColor1() // 这是错误做法，它是响应式调用的，会陷入死循环
              // 应该思考如果传入非响应式数据
              // nextColor2()

              // 每次点击改变追加的元素的颜色
              // nextColor3
            }}
          >
            {item.username}
          </li>
        )}
      </For>
    </ul>
  )
}
