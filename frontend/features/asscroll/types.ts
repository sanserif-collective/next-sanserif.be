import type ASScroll from './ASScroll'

export type ScrollEvent = (currentPos: number, scroll: ASScroll) => void
export type ASScrollHookOptions = { onScroll?: ScrollEvent }
export type ASScrollContext = {
  scroll: ASScroll | null
  scrollEvents: Set<ScrollEvent>
}
