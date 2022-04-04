import { useEffect } from 'react'

type Events = {
  onPointerMove: (event: PointerEvent) => void
}

const pointerMoveCallbacks = new Set<(event: PointerEvent) => void>()
document.addEventListener(
  'pointermove',
  event => pointerMoveCallbacks.forEach(
    callback => callback(event)
  )
)

const useGesture = ({ onPointerMove }: Events) => {
  useEffect(() => {
    pointerMoveCallbacks.add(onPointerMove)
    return () => { pointerMoveCallbacks.delete(onPointerMove) }
  }, [])
}

export default useGesture
