import { useASScroll } from 'features/asscroll'
import { gsap } from 'gsap'
import usePortrait from 'hooks/usePortrait'
import { createElement, forwardRef, ReactNode, Ref, useEffect, useRef } from 'react'

type Props<T extends keyof JSX.IntrinsicElements> = {
  children: ReactNode
  className?: string
  as?: T
}

const mapper = gsap.utils.mapRange(-10, 10, -4, 4)

function Skew<T extends keyof JSX.IntrinsicElements>(
  {
    children,
    className,
    as = 'div' as T,
    ...rest
  }: Props<T>,
  ref: Ref<JSX.IntrinsicElements[T]>
) {
  const { scroll } = useASScroll()
  const isPortrait = usePortrait()

  const box = useRef<JSX.IntrinsicElements[T]>(null)

  useEffect(() => {
    if (!scroll) return
    const skewSet = gsap.quickSetter(
      box.current,
      isPortrait ? 'skewY' : 'skewX',
      'deg'
    )
    const skewBox = () => skewSet(mapper(
      scroll.speed * (isPortrait ? 1 : 3)
    ))
    gsap.ticker.add(skewBox)
    return () => gsap.ticker.remove(skewBox)
  }, [scroll, isPortrait])

  // const setBox = useCallback((box: JSX.IntrinsicElements[T]) => {

  // }, [scroll, isPortrait])

  return createElement(
    as, {
      ref: (element: JSX.IntrinsicElements[T]) => {
        // setBox(element)
        box.current = element
        // @ts-ignore
        ref = element
      },
      className,
      ...rest
    },
    children
  )
}

export default forwardRef(Skew)
