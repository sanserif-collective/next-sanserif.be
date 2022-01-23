import { useContext, useEffect } from 'react'
import { ScrollEvent } from '.'
import ASScrollContext from './ASScrollContext'

type ASScrollHookOptions = {
  onScroll: ScrollEvent
}

const useASScroll = ({ onScroll }: ASScrollHookOptions) => {
  const { scroll, scrollEvents, ...rest } = useContext(ASScrollContext)

  useEffect(() => {
    scrollEvents.add(onScroll)
    return () => { scrollEvents.delete(onScroll) }
  }, [scroll])

  return { scroll, ...rest }
}
export default useASScroll
