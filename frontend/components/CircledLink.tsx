import clsx from 'clsx'
import { useCursor } from 'features/cursor'
import { gsap } from 'gsap'
import Link from 'next/link'
import { DetailedHTMLProps, ReactNode, useEffect, useRef } from 'react'
import SplitType from 'split-type'
import Heading from './Heading'
import Skew from './Skew'

type Props = {
  href: string
  subtitle: string
  children: ReactNode
  className?: string
}

const CircledLink = ({ href, children, subtitle, className = '' }: Props) => {
  const cursor = useCursor()

  const circle = useRef<DetailedHTMLProps>(null)
  const top = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)

  const timeline = useRef<gsap.core.Timeline>()

  useEffect(() => {
    const topSplit = new SplitType(
      top.current as HTMLElement,
      { types: 'chars' }
    )

    const bottomSplit =  new SplitType(
      bottom.current as HTMLElement,
      { types: 'chars' }
    )

    timeline.current = gsap.timeline({ paused: true })
      .to(topSplit.chars, {
        stagger: 0.1,
        rotateX: -90,
        yPercent: -50,
        duration: 0.75,
        ease: 'power3.inOut'
      })
      .from(bottomSplit.chars, {
        stagger: 0.1,
        rotateX: 90,
        yPercent: 50,
        duration: 0.75,
        ease: 'power3.inOut'
      }, 0.125)
    return () => {
      topSplit.revert()
      bottomSplit.revert()
      timeline.current?.kill()
    }
  }, [])

  return (
  <Link href={href}>
    <a
      className={`group relative ${className}`}
      onMouseEnter={() => {
        timeline.current?.play()
        cursor.events.onMouseEnter()
      }}
      onMouseLeave={() => {
        timeline.current?.reverse()
        cursor.events.onMouseLeave()
      }}
    >
      <Skew className="grid max-w-[80vmin] text-center">
        <Heading
          ref={top}
          className="col-end-1 row-end-1 origin-top"
          size="4xl"
        >
          {children}
        </Heading>
        <Heading
          ref={bottom}
          className="col-end-1 row-end-1 origin-top"
          size="4xl"
        >
          {children}
        </Heading>
      </Skew>
      <span className="mt-4 inline-block ml-6 after:content-['⟶'] after:text-[18px] after:ml-2">{subtitle}</span>
      <div
        ref={circle}
        className={clsx(
          'z-[-10] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'rounded-[100%] border border-black w-[70vmin] h-[30vmin]',
          'transition-transform transform-gpu duration-1000 group-hover:scale-75 group-hover:rotate-6'
        )}
      />
    </a>
  </Link>
  )
}

export default CircledLink
