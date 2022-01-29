import { ScrollEvent, useASScroll } from 'features/asscroll'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import lerp from 'utilities/lerp'

const Scrollbar = () => {
  const speed = 0.1

  const scale = { x: 0 }
  const progress = { x: 0 }

  const updateProgress: ScrollEvent = (
    currentPos,
    { maxScroll }
  ) => progress.x = currentPos / maxScroll

  const scrollbar = useRef<HTMLDivElement>(null)
  const { scroll } = useASScroll({ onScroll: updateProgress })

  useEffect(() => {
    const scaleXSet = gsap.quickSetter(scrollbar.current, 'scaleX')
    const scaleBar = () => scaleXSet(scale.x += lerp(progress.x, scale.x, speed))
    gsap.ticker.add(scaleBar)
    return () => gsap.ticker.remove(scaleBar)
  }, [scroll])

  return (
    <div
      ref={scrollbar}
      className="fixed inset-x-0 bottom-0 z-10 h-2 origin-left bg-black"
    >
    </div>
  )
}

export default Scrollbar
