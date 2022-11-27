import { Component, lazy, Show } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import Header from './components/Header'
import Tip from './components/Tip'

import Blog from './pages/Blog'
import BasicsDemo from './pages/BasicsDemo'
import StoreDemo from './pages/StoreDemo'
// 异步路由
const AsyncDemo: Component = lazy(() => import('./pages/AsyncDemo'))

const App: Component = () => {
  return (
    <>
      <Header />

      {/* 示范 SPA Router 用法，看起来像是监听导航栏去加载组件 */}
      <Routes>
        <Route path="/" component={Blog} />
        <Route path="/Blog" component={Blog} />
        <Route path="/BasicsDemo" component={BasicsDemo} />
        <Route path="/AsyncDemo/:id" component={AsyncDemo} data={() => ({ key: 'demo' })} />
        <Route path="/StoreDemo" component={StoreDemo} />
      </Routes>

      {/* 示范 Solid Portal 传送门用法 */}
      <Tip />
    </>
  )
}

export default App
