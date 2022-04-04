import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import usePortrait from 'hooks/usePortrait'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ASScroll from './ASScroll'
import ASScrollContext from './ASScrollContext'
import type { ScrollEvent } from './types'

type Props = {
  children: ReactNode
  inBetween: ReactNode
}

gsap.registerPlugin(ScrollTrigger)

export const ASScrollContainer = ({ children, inBetween }: Props) => {
  const router = useRouter()

  const container = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)

  const [scroll, setScroll] = useState<ASScroll | null>(null)

  const scrollEvents = new Set<ScrollEvent>()
  const onScroll = (currentPos: number) => scrollEvents.forEach(
    event => scroll && event(currentPos, scroll)
  )

  const isPortrait = usePortrait()

  const refreshScroll = () => {
    if (!scroller.current || !scroll) return

    scroll.disable()
    scroll.enable({
      newScrollElements: scroller.current,
      horizontalScroll: isPortrait ? false: true,
      reset: true
    })
  }

  useEffect(() => refreshScroll(), [isPortrait])

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
    return () => setScroll(null)
  }, [])

  useEffect(() => {
    if (!scroll) return

    refreshScroll()

    gsap.ticker.add(scroll.update)
    scroll.on('scroll', onScroll)
    router.events.on('routeChangeComplete', refreshScroll)

    return () => {
      gsap.ticker.remove(scroll.update)
      scroll.off('scroll', onScroll)
      router.events.off('routeChangeComplete', refreshScroll)
    }
  }, [scroll])

  useLayoutEffect(() => {
    if (!scroll) return

    ScrollTrigger.defaults({
      horizontal: true,
      scroller: scroll.containerElement
    })

    ScrollTrigger.scrollerProxy(scroll.containerElement, {
      scrollTop(value = 0) {
        return (arguments.length && scroll)
          ? scroll.currentPos = value
          : scroll.currentPos
      },
      scrollLeft(value = 0) {
        return (arguments.length && scroll)
          ? scroll.currentPos = value
          : scroll.currentPos
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      pinType: 'transform'
    })

    scroll.on('update', ScrollTrigger.update)
    ScrollTrigger.addEventListener('refresh', scroll.resize)

    return () => {
      scroll.off('update', ScrollTrigger.update)
      ScrollTrigger.removeEventListener('refresh', scroll.resize)
    }
  }, [scroll])

  return (
    <ASScrollContext.Provider
      value={{
        scroll,
        scrollEvents
      }}
    >
      <div ref={container}>
        {inBetween}
        <div
          ref={scroller}
          className="flex portrait:flex-col"
        >
          {children}
        </div>
      </div>
    </ASScrollContext.Provider>
  )
}

export default ASScrollContainer
