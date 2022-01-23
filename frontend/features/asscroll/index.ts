import dynamic from 'next/dynamic'

export const ASScrollContainer = dynamic(
  () => import('./ASScrollContainer'),
  { ssr: false }
)

export { default as ASScrollContext } from './ASScrollContext'
export * from './types'
export { default as useASScroll } from './useASScroll'
