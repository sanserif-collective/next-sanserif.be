import { gsap } from 'gsap'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { ScrollEvent } from '.'
import ASScroll from './ASScroll'
import ASScrollContext from './ASScrollContext'

type Props = {
  children: ReactNode
  inBetween: ReactNode
}

export const ASScrollContainer = ({ children, inBetween }: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)

  const [scroll, setScroll] = useState({} as ASScroll)
  const [mounted, setMounted] = useState(false)

  const scrollEvents = new Set<ScrollEvent>()
  const onScroll = (currentPos: number) => scrollEvents.forEach(
    event => event(currentPos, scroll)
  )

  const updateScroll = () => {
    if (!scroller.current || !scroll.containerElement) return
    scroll.disable()
    scroll.enable({
      newScrollElements: scroller.current,
      horizontalScroll: true,
      reset: true
    })
  }

  useEffect(() => {
    setScroll(
      new ASScroll({
        containerElement: container.current || document.body,
        disableRaf: true,
        ease: 0.05,
        customScrollbar: false,
        limitLerpRate: false
      })
    )
    setMounted(true)
    return () => setScroll({} as ASScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return
    updateScroll()
    gsap.ticker.add(scroll.update)
    scroll.on('scroll', onScroll)
    return () => {
      gsap.ticker.remove(scroll.update)
      scroll.off('scroll', onScroll)
    }
  }, [mounted])

  return (
    <ASScrollContext.Provider value={{ scroll, scrollEvents, updateScroll }}>
      <div ref={container}>
        {inBetween}
        <div className="flex" ref={scroller}>
          {children}
        </div>
      </div>
    </ASScrollContext.Provider>
  )
}

export default ASScrollContainer
