import clsx from 'clsx'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  size?: keyof typeof sizes
}

const sizes = {
  'base': 'px-24 md:px-[4vw] portrait:py-[5vh]',
  'lg': 'px-[16vw] md:px-[4vw] portrait:py-[15vh]'
}

const Layout = ({ children, className, size = 'base' }: Props) => {
  const sizeClass = sizes[size]

  return (
    <section className={clsx(
      'flex-shrink-0 h-screen py-[10vh]',
      `${sizeClass} ${className}`,
      'portrait:h-auto'
    )}>
      {children}
    </section>
  )
}

export default Layout
