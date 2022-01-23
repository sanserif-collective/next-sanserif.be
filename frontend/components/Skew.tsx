import { useASScroll } from 'features/asscroll'
import { useQuickSetter } from 'features/gsap'
import { gsap } from 'gsap'
import { ReactNode, useEffect } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const clamper = gsap.utils.mapRange(-5, 5, -2, 2)

const Skew = ({ children, className }: Props) => {
  const { scroll } = useASScroll()
  const [skewSet, box] = useQuickSetter<HTMLDivElement>({ property: 'skewX', unit: 'deg' })

  useEffect(() => {
    const skewBox = () => skewSet.current?.(clamper(scroll.speed * 3))

    gsap.ticker.add(skewBox)
    return () => gsap.ticker.remove(skewBox)
  }, [scroll])

  return (
    <div ref={box} className={className}>
      {children}
    </div>
  )
}

export default Skew
