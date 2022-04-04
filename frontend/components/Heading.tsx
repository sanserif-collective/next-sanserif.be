import { createElement, forwardRef, ReactNode, Ref } from 'react'

type Props<T extends keyof JSX.IntrinsicElements> = {
  children: ReactNode
  size?: 'lg' | 'xl' | '4xl'
  variant?: 'arrow'
  as?: T
  className?: string
}

const variants = {
  'arrow': 'after:content-["→"] after:inline-block after:transform after:ml-4'
}

const sizes = {
  'lg': 'text-lg font-normal md:text-base',
  'xl': 'text-2xl font-normal normal-case md:text-xl',
  '4xl': 'text-4xl font-light'
}

function Heading<T extends keyof JSX.IntrinsicElements>(
  {
    children,
    variant,
    size = 'xl',
    as = 'span' as T,
    className = '',
    ...rest
  }: Props<T>,
  ref: Ref<JSX.IntrinsicElements[T]>
) {
  const sizeClass = sizes[size]
  const variantClass = variant ? variants[variant] : ''

  return createElement(
    as, {
      ref,
      className: `${sizeClass} ${variantClass} ${className}`,
      ...rest
    },
    children
  )
}

export default forwardRef(Heading)
