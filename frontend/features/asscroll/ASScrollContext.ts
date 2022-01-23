import { createContext } from 'react'
import { ScrollEvent } from '.'
import type ASScroll from './ASScroll'

type ASScrollContext = {
  scroll: ASScroll
  scrollEvents: Set<ScrollEvent>
  updateScroll: () => void
}

const ASScrollContext = createContext({} as ASScrollContext)
export default ASScrollContext
