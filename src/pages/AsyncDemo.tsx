import { useParams, useNavigate, useLocation, useRouteData } from '@solidjs/router'
import type { Location, RouteDataFunc } from '@solidjs/router'

export default function AsyncDemo() {
  const parmas = useParams()
  const navigate = useNavigate()
  const location = useLocation<Location>()
  const data = useRouteData()
  console.log(Object.assign({}, parmas))
  console.log(navigate)
  console.log(location, location.query.id)
  console.log(data)

  return <h1 class="text-4xl text-green-700 text-center py-10">Async Demo</h1>
}
