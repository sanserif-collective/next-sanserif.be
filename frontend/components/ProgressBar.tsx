import { ScrollEvent, useASScroll } from 'features/asscroll'
import { gsap } from 'gsap'
import { useCallback } from 'react'
import lerp from 'utilities/lerp'

const Scrollbar = () => {
  const speed = 0.1

  const scale = { x: 0 }
  const progress = { x: 0 }

  const updateProgress: ScrollEvent = (
    currentPos,
    { maxScroll }
  ) => progress.x = currentPos / maxScroll

  const { scroll } = useASScroll({ onScroll: updateProgress })

  const setScrollbar = useCallback((scrollbar: HTMLDivElement) => {
    const scaleXSet = gsap.quickSetter(scrollbar, 'scaleX')
    const scaleBar = () => scaleXSet(scale.x += lerp(progress.x, scale.x, speed))
    gsap.ticker.add(scaleBar)
    return () => gsap.ticker.remove(scaleBar)
  }, [scroll])

  return (
    <div
      ref={setScrollbar}
      className="fixed inset-x-0 bottom-0 z-10 h-2 origin-left bg-black"
    />
  )
}

export default Scrollbar
