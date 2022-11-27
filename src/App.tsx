import { Component, createSignal, lazy, Show } from 'solid-js'
import { Routes, Route, useLocation, useBeforeLeave, BeforeLeaveEventArgs } from '@solidjs/router'
import Header from './components/Header'
import Tip from './components/Tip'

import Blog from './pages/Blog'
import StoreDemo from './pages/StoreDemo'
// 异步路由
const BlogDetail: Component = lazy(() => import('./pages/BlogDetail'))

const App: Component = () => {
  const location = useLocation<Location>()
  useBeforeLeave((e: BeforeLeaveEventArgs) => {
    setBackPath(location.pathname)
  })
  const [backPath, setBackPath] = createSignal('')

  return (
    <>
      <Header />

      {/* 示范 SPA Router 用法，看起来像是监听导航栏去加载组件 */}
      <Routes>
        <Route path="/" component={Blog} />
        <Route path="/Blog">
          <Route path="/" component={Blog} />
          <Route path="/:id" component={BlogDetail} data={backPath} />
        </Route>
        <Route path="/StoreDemo" component={StoreDemo} />
      </Routes>

      {/* 示范 Solid Portal 传送门用法 */}
      <Tip />
    </>
  )
}

export default App
