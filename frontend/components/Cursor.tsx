import { useQuickSetter } from 'features/gsap'
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

  const [xSet] = useQuickSetter({ targets: cursor, property: 'x', unit: 'px' })
  const [ySet] = useQuickSetter({ targets: cursor, property: 'y', unit: 'px' })

  const cursorPosition = { x: 0, y: 0 }
  const mousePosition = { x: 0, y: 0 }

  const updatePosition = ({ x, y }: PointerEvent) => (mousePosition.x = x, mousePosition.y = y)
  useGesture({ onPointerMove: updatePosition })

  useEffect(() => {
    if (!cursor.current) return

    const halfWidth = cursor.current.offsetWidth / 2
    const halfHeight = cursor.current.offsetHeight / 2

    const moveCursor = () => {
      xSet.current?.(cursorPosition.x += lerp(mousePosition.x - halfWidth, cursorPosition.x, speed))
      ySet.current?.(cursorPosition.y += lerp(mousePosition.y - halfHeight, cursorPosition.y, speed))
    }

    gsap.ticker.add(moveCursor)
    return () => gsap.ticker.remove(moveCursor)
  }, [])

  return (
    <div
      ref={cursor}
      className={`fixed z-20 pointer-events-none ${className}`}
    >
    </div>
  )
}

export default Cursor
