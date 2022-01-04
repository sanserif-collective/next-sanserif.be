import useGesture from 'app/hooks/useGesture'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

type Props = {
  className: string
  ease?: boolean
}

type CursorPosition = { x: number, y: number }

const Cursor = ({ className, ease = false }: Props) => {
  const cursor = useRef<HTMLDivElement>(null)
  const position: CursorPosition = { x: 0, y: 0 }

  const updatePosition = ({ x, y }: CursorPosition) => {
    if (!cursor.current) return
    position.x = x
    position.y = y
  }

  const moveCursor = () => {
    if (!cursor.current) return
    gsap[ease ? 'to' : 'set'](cursor.current, {
      x: position.x - (cursor.current.offsetWidth / 2),
      y: position.y - (cursor.current.offsetHeight / 2)
    })
  }

  useGesture({ onPointerMove: updatePosition })
  useEffect(() => gsap.ticker.add(moveCursor), [])

  return (
    <>
      <div
        ref={cursor}
        className={`absolute z-20 pointer-events-none ${className}`}
      >
      </div>
    </>
  )
}

export default Cursor