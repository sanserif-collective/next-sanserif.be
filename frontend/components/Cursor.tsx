import { gsap } from 'gsap'
import useGesture from 'hooks/useGesture'
import { memo, useEffect, useRef } from 'react'
import lerp from 'utilities/lerp'

type Props = {
  className: string
  speed?: number
  scale?: number
}

const Cursor = ({ className, speed = 1, scale = 1 }: Props) => {
  const cursorPosition = { x: 0, y: 0 }
  const mousePosition = { x: 0, y: 0 }

  const cursor = useRef<HTMLDivElement>(null)

  const updatePosition = ({ x, y }: PointerEvent) => {
    mousePosition.x = x
    mousePosition.y = y
  }

  useEffect(() => {
    if (!cursor.current) return
    const scaling = gsap.to(cursor.current, {
      scale,
      duration: 0.5,
      ease: 'power3.out'
    })
    scaling.play()
    return () => { scaling.kill() }
  })

  useEffect(() => {
    if (!cursor.current) return

    const xSet = gsap.quickSetter(cursor.current, 'x', 'px')
    const ySet = gsap.quickSetter(cursor.current, 'y', 'px')

    const halfWidth = cursor.current.offsetWidth / 2
    const halfHeight = cursor.current.offsetHeight / 2

    const moveCursor = () => {
      const x = lerp(
        mousePosition.x - halfWidth,
        cursorPosition.x,
        speed
      )
      const y = lerp(
        mousePosition.y - halfHeight,
        cursorPosition.y,
        speed
      )
      xSet(cursorPosition.x += x)
      ySet(cursorPosition.y += y)
    }

    gsap.ticker.add(moveCursor)
    return () => gsap.ticker.remove(moveCursor)
  }, [])


  useGesture({ onPointerMove: updatePosition })

  return (
    <div
      ref={cursor}
      className={`fixed z-20 pointer-events-none ${className}`}
    />
  )
}

export default memo(Cursor)
