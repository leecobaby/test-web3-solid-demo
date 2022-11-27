import { For } from 'solid-js'
import { A, useLocation, useMatch } from '@solidjs/router'
import type { Location } from '@solidjs/router'
import { Icon } from 'solid-heroicons'
import { bars_3 } from 'solid-heroicons/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from 'solid-headless'
import { css } from 'solid-styled-components'
import IconLogo from '../assets/images/logo.png'
import IconTwitter from '../assets/images/twitter.png'
import IconTelegram from '../assets/images/telegram.png'
import IconDiscord from '../assets/images/discord.png'

const menus = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Advantages',
    path: '#'
  },
  {
    name: 'Brand Story',
    path: '#'
  },
  {
    name: 'Why Firefly',
    path: '#'
  },
  {
    name: 'Team',
    path: '#'
  },
  {
    name: 'Roadmap',
    path: '#'
  },
  {
    name: 'Join us',
    path: '#'
  },
  {
    name: 'Blog',
    path: '/Blog'
  },
  {
    name: 'Academy',
    path: '#'
  }
]

const socials = [
  {
    name: 'Twitter',
    path: 'https://twitter.com/elonmusk',
    comment: <img src={IconTwitter} alt="Twitter" />
  },
  {
    name: 'Telegram',
    path: 'https://t.me/leecobaby',
    comment: <img src={IconTelegram} alt="Telegram" />
  },
  {
    name: 'Discord',
    path: 'https://discord.gg/leecobaby',
    comment: (
      <button class=" px-2 py-3 -my-3 rounded-2xl border border-[#FF77E5] border-spacing-12 whitespace-nowrap">
        <img class="inline-block" src={IconDiscord} alt="Discord" />
        <span class=" hidden ml-2 text-[#FF77E5] xl:inline">Join Discord</span>
      </button>
    )
  }
]

const MatchStyle = css`
  border-bottom-width: 2px;
  border-color: #ff77e5;
`
const MatchStyle2 = css`
  border: 2px solid #ff77e5;
`

export default function Header() {
  return (
    // {/* Wrapper */}
    <Disclosure
      defaultOpen={false}
      as="div"
      class="relative mx-auto max-w-screen-2xl px-4 sm:px-6 text-white"
    >
      {/*  Container */}
      <div class="flex items-center justify-between border-b-2 border-gray-700 py-8 md:space-x-10">
        {/* Logo */}
        <div class="flex justify-start  xl:flex-[0.5_0.5_0%]">
          <a href="#">
            <span class="sr-only">RUBY DEX</span>
            <img class="h-4 w-auto sm:h-6" src={IconLogo} alt="RUBY DEX" />
          </a>
        </div>
        {/* Bars */}
        <div class="-my-2 md:hidden">
          <DisclosureButton class=" align-middle rounded-md -m-1 p-1  text-slate-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF77E5]">
            <span class="sr-only">Open menu</span>
            <Icon path={bars_3} class=" w-8" />
          </DisclosureButton>
        </div>
        {/* Navigates */}
        <nav class="hidden space-x-10 md:flex lg:flex-initial">
          <ul class="flex justify-center items-center space-x-4">
            <For each={menus}>
              {(menu) => (
                <li>
                  <A
                    class=" font-semibold hover:underline py-2"
                    classList={{
                      [MatchStyle]: !!useMatch(() => menu.path)()
                    }}
                    href={menu.path}
                  >
                    {menu.name}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </nav>
        {/* Socials */}
        <div class="hidden items-center justify-end space-x-4 xl:flex xl:flex-1">
          <For each={socials}>
            {(social) => (
              <a
                href={social.path}
                class=" text-gray-400 hover:text-gray-500"
                target="_black"
                rel="noreferrer"
              >
                {social.comment}
              </a>
            )}
          </For>
          {/* <a
              href="#"
              class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="#"
              class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign up
            </a> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel class="p-2 md:hidden">
        <nav class="flex">
          <ul class="flex flex-col w-full">
            <For each={menus}>
              {(menu) => (
                <li class="w-full h-10 block relative">
                  <A
                    href={menu.path}
                    aria-hidden="true"
                    class=" block px-1 py-2 rounded-md font-semibold hover:bg-pink-300 hover:bg-opacity-80  absolute inset-0"
                    classList={{
                      [MatchStyle2]: !!useMatch(() => menu.path)()
                    }}
                  >
                    {menu.name}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </DisclosurePanel>
    </Disclosure>
  )
}
