import { useASScroll } from 'features/asscroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { Service } from 'types/shared'
import Skew from './Skew'

type Props = {
  services: Service[]
}

const StickyServices = ({ services }: Props) => {
  const top = useRef<HTMLUListElement>(null)
  const bottom = useRef<HTMLUListElement>(null)

  const { scroll } = useASScroll()

  useEffect(() => {
    if (!top.current || !bottom.current || !scroll.current) return

    const { length } = bottom.current.childNodes

    const bottomTimelines = Array.from(
      bottom.current.childNodes
    ).map(node => {
      const subservices = node.lastChild?.childNodes!
      return gsap.timeline({ paused: true })
        .from(subservices, {
          opacity: 0,
          xPercent: 20,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out'
        })
    })

    const playCurrentSubservices = async (index: number) => {
      await Promise.all(bottomTimelines.map(
        timeline => timeline.reverse().then()
      ))
      bottomTimelines[index].play()
    }

    const topTriggers = Array.from(
      top.current.childNodes
    ).map((service, index) => {
      return ScrollTrigger.create({
        trigger: service as HTMLLIElement,
        start: '50% 50%',
        onEnter: () => playCurrentSubservices(index),
        onEnterBack: () => playCurrentSubservices(index)
      })
    })

    const bottomTrigger = ScrollTrigger.create({
      trigger: bottom.current,
      pin: true,
      start: `-${window.innerHeight / 16}px`,
      end: `${top.current.offsetWidth - (window.innerHeight / 4)}px`,
      onEnter: () => bottomTimelines[0].play(),
      onEnterBack: () => bottomTimelines[length - 1].play(),
      onLeave: () => bottomTimelines[length - 1].reverse(),
      onLeaveBack: () => bottomTimelines[0].reverse()
    })

    return () => {
      topTriggers.forEach((trigger, index) => {
        trigger.kill()
        bottomTimelines[index].kill()
      })
      bottomTrigger.kill()
    }
  }, [scroll.current, top.current, bottom.current])

  return (
    <div className="flex flex-col items-start justify-center h-full ml-44">
      <ul
        ref={top}
        className="flex space-x-[75vh]"
      >
        {services.map(({ name }) => (
          <li key={name}>
            <Skew className="text-[60vh] -tracking-widest leading-none font-light">
              {name}
            </Skew>
          </li>
        ))}
      </ul>
      <div className="ml-[6vh]">
        <ul
          ref={bottom}
          className="grid"
        >
          {services.map(({ name, subservices }) => (
            <li
              className="col-end-1 row-end-1"
              key={name}
            >
              <h3 className="sr-only">{name}</h3>
              <ul>
                {subservices.map(({ name }) => (
                  <li key={name}>
                    <h4>{name}</h4>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StickyServices
