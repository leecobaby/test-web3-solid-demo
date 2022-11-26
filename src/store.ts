import { createRoot } from 'solid-js'
import { createStore } from 'solid-js/store'

function createAppStore() {
  return createStore({ todos: [] })
}

export default createRoot(createAppStore)
