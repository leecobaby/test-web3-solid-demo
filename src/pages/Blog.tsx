import {
  useParams,
  useNavigate,
  useLocation,
  useRouteData,
  useMatch,
  useBeforeLeave
} from '@solidjs/router'
import type { Location, BeforeLeaveEventArgs } from '@solidjs/router'
import { createSignal, createResource, For } from 'solid-js'
import { css } from 'solid-styled-components'
import Card from '../components/Card'

import img1 from '../assets/images/img1.png'
import img2 from '../assets/images/img2.png'
import img3 from '../assets/images/img3.png'

const fetchUser = async (id) => {
  if (!id) return
  return (await fetch(`https://swapi.dev/api/people/${id}/`)).json()
}

const products = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    date: '9/24/2022',
    description:
      'Despite their small size and large numbers within a swarm, these species are capable of flashing in sync. When witnessing such an extraordinary display, it’s the radiance of their unified glow that stands out and not any individual firefly. ',
    avator:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    imageSrc: img1,
    imageAlt:
      'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.'
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    date: '9/24/2022',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    avator:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    imageSrc: img2,
    imageAlt: 'Front of plain black t-shirt.'
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    date: '9/24/2022',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    avator:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    imageSrc: img3,
    imageAlt: 'Front of plain black t-shirt.'
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    date: '9/24/2022',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    avator:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    imageSrc: img3,
    imageAlt: 'Front of plain black t-shirt.'
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    date: '9/24/2022',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    avator:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    imageSrc: img3,
    imageAlt: 'Front of plain black t-shirt.'
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    date: '9/24/2022',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    avator:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    imageSrc: img3,
    imageAlt: 'Front of plain black t-shirt.'
  }
  // More products...
]

const MatchStyle = css`
  border: 1px solid #ff77e5;
`

export default function Blog() {
  const location = useLocation<Location>()

  // const [userId, setUserId] = createSignal()
  // const [user] = createResource(userId, fetchUser)

  return (
    <div>
      {/* Page Title */}
      <h1
        class={`text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-center my-8`}
      >
        <span class="block xl:inline">Blog</span>
      </h1>

      {/* Navigation switch */}
      <nav class="flex justify-center my-4">
        <ul class="flex items center space-x-4 text-white">
          <li>
            <button
              class="border border-gray-50 border-opacity-20 rounded-3xl px-4 py-1 bg-white bg-opacity-10 hover:text-gray-300"
              classList={{ [MatchStyle]: true }}
            >
              All
            </button>
          </li>
          <li>
            <button class="border border-gray-50 border-opacity-20 rounded-3xl px-4 py-1 bg-white bg-opacity-10 hover:text-gray-300">
              New Markets
            </button>
          </li>
          <li>
            <button class="border border-gray-50 border-opacity-20 rounded-3xl px-4 py-1 bg-white bg-opacity-10 hover:text-gray-300">
              Announcements
            </button>
          </li>
          <li>
            <button class="border border-gray-50 border-opacity-20 rounded-3xl px-4 py-1 bg-white bg-opacity-10 hover:text-gray-300">
              Promotions
            </button>
          </li>
        </ul>
      </nav>

      {/* Card Grid */}
      <div class="max-w-2xl mx-auto py-10 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* hide elements for seo optimization. */}
        {/* Utilities for improving accessibility with screen readers. */}
        <h2 class="sr-only">Blog List</h2>

        <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          <For each={products}>
            {(product) => <Card product={product} localpath={location.pathname} />}
          </For>
        </div>
      </div>
    </div>
  )
}
