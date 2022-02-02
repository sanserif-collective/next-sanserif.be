import { gsap } from 'gsap'
import useGesture from 'hooks/useGesture'
import { useEffect, useRef } from 'react'
import lerp from 'utilities/lerp'

type Props = {
  className: string
  speed?: number
}

const Cursor = ({ className, speed = 1 }: Props) => {
  const cursor = useRef<HTMLDivElement>(null)

  const cursorPosition = { x: 0, y: 0 }
  const mousePosition = { x: 0, y: 0 }

  const updatePosition = ({ x, y }: PointerEvent) => (mousePosition.x = x, mousePosition.y = y)
  useGesture({ onPointerMove: updatePosition })

  useEffect(() => {
    const xSet = gsap.quickSetter(cursor.current, 'x', 'px')
    const ySet = gsap.quickSetter(cursor.current, 'y', 'px')
    const halfWidth = cursor.current!.offsetWidth / 2
    const halfHeight = cursor.current!.offsetHeight / 2

    const moveCursor = () => {
      xSet(cursorPosition.x += lerp(mousePosition.x - halfWidth, cursorPosition.x, speed))
      ySet(cursorPosition.y += lerp(mousePosition.y - halfHeight, cursorPosition.y, speed))
    }

    gsap.ticker.add(moveCursor)
    return () => gsap.ticker.remove(moveCursor)
  }, [])

  return (
    <div
      ref={cursor}
      className={`fixed z-20 pointer-events-none ${className}`}
    />
  )
}

export default Cursor
