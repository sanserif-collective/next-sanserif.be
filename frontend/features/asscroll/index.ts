import dynamic from 'next/dynamic'
import type ASScroll from './ASScroll'

export type ScrollCallback = (progress: number, scroll: ASScroll) => void

export const ASScrollContainer = dynamic(
  () => import('./ASScrollContainer'),
  { ssr: false }
)

export { default as ASScrollContext } from './ASScrollContext'
export { default as useASScroll } from './useASScroll'
