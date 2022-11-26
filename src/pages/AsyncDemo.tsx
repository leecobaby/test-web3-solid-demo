import { useParams, useNavigate, useLocation, useRouteData } from '@solidjs/router'
import type { Location, RouteDataFunc } from '@solidjs/router'
import { createSignal, createResource } from 'solid-js'

const fetchUser = async (id) => {
  if (!id) return
  return (await fetch(`https://swapi.dev/api/people/${id}/`)).json()
}

export default function AsyncDemo() {
  const parmas = useParams()
  const navigate = useNavigate()
  const location = useLocation<Location>()
  const data = useRouteData()
  console.log(Object.assign({}, parmas))
  console.log(navigate)
  console.log(location, location.query.id)
  console.log(data)

  const [userId, setUserId] = createSignal()
  // 饰范 Solid 异步请求数据的用法
  // Solid 会自动缓存数据，不会重复请求
  // 生成的 Resource Signal，还包含响应式 loading 和 error 属性，可以根据当前状态轻松控制我们的视图。
  const [user] = createResource(userId, fetchUser)

  return (
    <div class=" text-center">
      <h1 class="text-4xl text-green-700 text-center py-10">Async Demo</h1>

      <input
        class=" border-2 border-gray-300 rounded-lg py-2 px-4 my-2 block w-1/2 mx-auto"
        type="number"
        min="1"
        placeholder="Enter Numeric Id"
        onInput={(e) => setUserId(e.currentTarget.value)}
      />
      <span>{user.loading && 'Loading...'}</span>
      <div>
        <pre class=" bg-slate-50 text-gray-400">{JSON.stringify(user(), null, 2)}</pre>
      </div>
    </div>
  )
}
