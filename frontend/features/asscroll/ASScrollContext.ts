import { createContext } from 'react'
import { ScrollCallback } from '.'
import ASScroll from './ASScroll'

type ASScrollContext = {
  scroll: ASScroll
  scrollCallbacks: Set<ScrollCallback>
  updateScroll: () => void
}

const ASScrollContext = createContext({} as ASScrollContext)
export default ASScrollContext
