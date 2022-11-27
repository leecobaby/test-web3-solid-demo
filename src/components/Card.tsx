import { splitProps } from 'solid-js'

interface CardProps {
  [key: string]: any
  class?: string
  children?: any
}

export default function Card(props: CardProps) {
  return (
    <div
      data-id={props.product.id}
      class="group relative border border-white border-opacity-20 rounded-[20px] flex flex-col overflow-hidden"
    >
      <div class="aspect-w-16 aspect-h-9 bg-gray-200 group-hover:opacity-75">
        <img
          src={props.product.imageSrc}
          alt={props.product.imageAlt}
          class="w-full h-full object-center object-cover sm:w-full sm:h-full"
        />
      </div>

      <div class="flex-1 p-4 space-y-8 flex flex-col justify-between">
        <div class="flex-1">
          <h3 class=" text-2xl leading-9 font-bold text-white my-4">
            <a href={props.product.href}>
              <span aria-hidden="true" class="absolute inset-0"></span>
              {props.product.name}
            </a>
          </h3>
          <p class=" font-extralight text-white line-clamp-6">{props.product.description}</p>
        </div>

        <div class=" mt-6 flex items-center justify-between">
          <div class="flex-none">
            <span class="sr-only">{props.product.name}</span>
            <img class=" inline-block h-10 w-10 rounded-full" src={props.product.avator} alt="" />
            <span class=" inline-block text-2xl font-bold leading-9 align-middle ml-4 text-white sm:w-32 xl:w-auto truncate">
              {props.product.name}
            </span>
          </div>
          <p class="text-base font-extralight text-white">{props.product.date}</p>
        </div>
      </div>
    </div>
  )
}
