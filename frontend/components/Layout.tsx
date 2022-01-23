import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const Layout = ({ children, className }: Props) => (
  <section className={`flex-shrink-0 h-screen px-24 py-20 ${className}`}>
    {children}
  </section>
)

export default Layout
