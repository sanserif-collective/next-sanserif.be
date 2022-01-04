import { useASScroll } from 'app/features/asscroll'
import type ASScroll from 'app/features/asscroll/ASScroll'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

const Scrollbar = () => {
  const scrollbar = useRef<HTMLDivElement>(null)
  const { scroll, scrollCallbacks } = useASScroll()

  const scale = { x: 0 }
  const setProgress = () => {
    gsap.to(scrollbar.current, {
      scaleX: scale.x
    })
  }

  const onScroll = (
    progress: number,
    scroll: ASScroll
  ) => scale.x = progress / scroll.maxScroll

  useEffect(() => {
    gsap.ticker.add(setProgress)
    scrollCallbacks.add(onScroll)

    return () => {
      gsap.ticker.remove(setProgress)
      scrollCallbacks.delete(onScroll)
    }
  }, [scroll])

  return (
    <div ref={scrollbar} className="fixed inset-x-0 bottom-0 z-10 h-2 origin-left bg-black"></div>
  )
}

export default Scrollbar
