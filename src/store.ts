import { createRoot } from 'solid-js'
import { createStore } from 'solid-js/store'

interface AppStroe {
  todos: any[] & { id?: number }[]
}

function createAppStore() {
  return createStore<AppStroe>({ todos: [] })
}

export default createRoot(createAppStore)
