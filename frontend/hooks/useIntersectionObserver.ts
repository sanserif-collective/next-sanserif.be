import { useEffect, useState } from 'react'

const observed = new WeakMap()

const useIntersectionObserver = (toObserve: Element) => {
  const [inView, setInView] = useState(false)
  const [onEnter, setOnEnter] = useState(() => null)
  const [onLeave, setOnLeave] = useState(() => null)

  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      const { setInView, onEnter, onLeave } = observed.get(target)
      setInView(isIntersecting)

      if (onEnter && onLeave) {
        isIntersecting ? onEnter() : onLeave()
      }
    })
  })

  useEffect(() => {
    if (!toObserve) return
    observer.observe(toObserve)
    observed.set(toObserve, {
      setInView,
      onEnter,
      onLeave
    })
  }, [toObserve])

  return { inView, observer, onEnter: setOnEnter, onLeave: setOnLeave }
}

export default useIntersectionObserver
