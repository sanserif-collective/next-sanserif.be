import gsap from 'gsap'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import type { ScrollCallback } from '.'
import ASScroll from './ASScroll'
import ASScrollContext from './ASScrollContext'

type Props = {
  children: React.ReactNode
  inBetween: React.ReactNode
}

export const ASScrollContainer = ({ children, inBetween }: Props) => {
  const router = useRouter()

  const scrollContainer = useRef<HTMLDivElement>(null)
  const scrollElement = useRef<HTMLDivElement>(null)

  const [scroll, setScroll] = useState({} as ASScroll)
  const [mounted, setMounted] = useState(false)

  const scrollCallbacks = new Set<ScrollCallback>()

  const updateScroll = () => {
    scroll.disable()
    scroll.enable({
      newScrollElements: scrollElement.current!,
      horizontalScroll: true,
      reset: true
    })
  }

  const onScroll = (progress: number) => {
    scrollCallbacks.forEach(
      callback => callback(progress, scroll)
    )
  }

  const onPageChange = () => updateScroll()

  useEffect(() => {
    setScroll(
      new ASScroll({
        containerElement: scrollContainer.current!,
        disableRaf: true,
        ease: 0.05,
        customScrollbar: false,
        limitLerpRate: false
      })
    )
    setMounted(true)

    return () => setScroll({} as ASScroll)
  }, [scrollContainer])

  useEffect(() => {
    if (!mounted) return
    updateScroll()

    gsap.ticker.add(scroll.update)

    scroll.on('scroll', onScroll)
    router.events.on(
      'routeChangeComplete',
      onPageChange
    )

    return () => {
      gsap.ticker.remove(scroll.update)
      scrollCallbacks.clear()
      router.events.off(
        'routeChangeComplete',
        onPageChange
      )
    }
  }, [scroll])

  return (
    <ASScrollContext.Provider value={{ scroll, scrollCallbacks, updateScroll }}>
      <div ref={scrollContainer}>
        {inBetween}
        <div className="flex" ref={scrollElement}>
          {children}
        </div>
      </div>
    </ASScrollContext.Provider>
  )
}

export default ASScrollContainer
