import { gsap } from 'gsap'
import { RefObject, useEffect, useRef } from 'react'

type Options<E> = {
  property: string
  targets?: gsap.TweenTarget & RefObject<E>
  unit?: string
}

const useQuickSetter = <E> ({ targets, property, unit }: Options<E>) => {
  const ref = useRef<E>(null)
  const setter = useRef<Function>(() => null)

  useEffect(() => {
    const target = (targets?.current || targets || ref.current) as gsap.TweenTarget
    setter.current = gsap.quickSetter(target, property, unit)
  }, [])

  return [setter, targets || ref] as const
}

export default useQuickSetter
