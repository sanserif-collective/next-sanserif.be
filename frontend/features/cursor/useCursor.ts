import { useContext } from 'react'
import CursorContext from './CursorContext'

const useCursor = () => {
  const { setHover } = useContext(CursorContext)

  return {
    events: {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false)
    }
  }
}
export default useCursor
