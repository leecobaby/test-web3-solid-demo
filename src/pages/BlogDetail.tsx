import { Accessor, createResource, For } from 'solid-js'
import { marked } from 'marked'
import img1 from '../assets/images/img1.png'
import { Icon } from 'solid-heroicons'
import { chevronRight, home } from 'solid-heroicons/solid'
import { A, useLocation, useRouteData, Location } from '@solidjs/router'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, // 允许 Git Hub标准的markdown.
  pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  breaks: false, // 允许回车换行（该选项要求 gfm 为true）
  smartLists: true, // 使用比原生markdown更时髦的列表
  smartypants: false // 使用更为时髦的标点
})

export function fetchMarkDown() {
  return fetch('https://raw.githubusercontent.com/solidjs/solid/master/README.md').then((res) =>
    res.text()
  )
}

const products = {
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
}

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true }
]

export default function BlogDetail() {
  const backHref = useRouteData<Accessor<string>>()
  const [content] = createResource(fetchMarkDown)

  return (
    <div class="w-full h-full">
      {/* navigation */}
      <div class=" max-w-5xl mx-10 my-12 flex flex-col space-y-4  xl:mx-auto">
        <div class=" text-slate-100">
          <A href={backHref}>Back</A>
        </div>
        <nav class="flex" aria-label="Breadcrumb">
          <ol role="list" class="flex items-center space-x-4">
            <li>
              <div>
                <A href="#" class=" text-slate-100 hover:text-slate-300">
                  <Icon path={home} class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  <span class="sr-only">Home</span>
                </A>
              </div>
            </li>
            <For each={pages}>
              {(page) => (
                <li aria-label={page.name}>
                  <div class="flex items-center">
                    <Icon
                      path={chevronRight}
                      class="flex-shrink-0 h-5 w-5 text-slate-300"
                      aria-hidden="true"
                    />
                    <A
                      href={page.href}
                      class="ml-4 text-sm font-medium text-slate-100 hover:text-slate-300"
                      aria-current={page.current ? 'page' : undefined}
                    >
                      {page.name}
                    </A>
                  </div>
                </li>
              )}
            </For>
          </ol>
        </nav>
      </div>

      {/* main */}
      <div class=" max-w-4xl mx-10 flex flex-col  md:mx-auto">
        <div class=" w-full h-full aspect-w-16 aspect-h-9 rounded-[20px] overflow-hidden">
          <img
            src={products.imageSrc}
            alt={products.imageAlt}
            class="w-full h-full scale-110 object-center object-cover sm:w-full sm:h-full"
          />
        </div>

        {/* author */}
        <div class=" my-12 flex items-center justify-between">
          <div class="flex-none">
            <span class="sr-only">{products.name}</span>
            <img class=" inline-block h-10 w-10 rounded-full" src={products.avator} alt="" />
            <span class=" inline-block text-2xl font-bold leading-9 align-middle ml-4 text-white sm:w-32 xl:w-auto truncate">
              {products.name}
            </span>
          </div>
          <p class="text-base font-extralight text-white">{products.date}</p>
        </div>

        {/* content */}
        <article
          class="prose max-w-none prose-img:m-0 dark:prose-invert lg:prose-xl lg:prose-img:m-0"
          innerHTML={marked.parse(content() || 'Loading...')}
        ></article>
      </div>
    </div>
  )
}
