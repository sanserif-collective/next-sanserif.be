import { useContext, useEffect } from 'react'
import ASScrollContext from './ASScrollContext'
import type { ASScrollHookOptions } from './types'

const useASScroll = (options?: ASScrollHookOptions) => {
  const { scroll, scrollEvents, ...rest } = useContext(ASScrollContext)

  useEffect(() => {
    options?.onScroll && scrollEvents.add(options?.onScroll)
    return () => { options?.onScroll && scrollEvents.delete(options?.onScroll) }
  }, [scroll])

  return { scroll, ...rest }
}

export default useASScroll
