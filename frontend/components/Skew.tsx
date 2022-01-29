import { useASScroll } from 'features/asscroll'
import { gsap } from 'gsap'
import { ReactNode, useEffect, useRef } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const clamper = gsap.utils.mapRange(-5, 5, -2, 2)

const Skew = ({ children, className }: Props) => {
  const { scroll } = useASScroll()
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const skewSet = gsap.quickSetter(box.current, 'skewX', 'deg')
    const skewBox = () => skewSet(clamper(scroll.speed * 3))
    gsap.ticker.add(skewBox)
    return () => gsap.ticker.remove(skewBox)
  }, [scroll])

  return (
    <div
      ref={box}
      className={className}
    >
      {children}
    </div>
  )
}

export default Skew
