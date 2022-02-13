import { useContext } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import CursorContext from './CursorContext'

const useCursor = () => {
  const { setHover } = useContext(CursorContext)
  const on = useDebouncedCallback(() => setHover(true), 250)
  const off = useDebouncedCallback(() => setHover(false), 250)

  return {
    events: {
      onMouseEnter: on,
      onMouseLeave: off
    }
  }
}
export default useCursor
