// 饰范一个懒加载例子，打包时会分割代码片段，等待加载完毕后再渲染
export default function Lazy(props) {
  return <h3 class="text-4xl text-green-700 text-center py-2">Hi,Lazy {props.name}</h3>
}
