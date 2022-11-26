import { A } from '@solidjs/router'

export default function Header() {
  return (
    <nav class=" flex justify-center space-x-4">
      <A class=" text-blue-600 hover:underline" href="/BasicsDemo">
        Basisc Demo
      </A>
      <A class=" text-blue-600 hover:underline" href="/AsyncDemo/1">
        Async Demo
      </A>
      <A class=" text-blue-600 hover:underline" href="/StoreDemo">
        Store Demo
      </A>
    </nav>
  )
}
