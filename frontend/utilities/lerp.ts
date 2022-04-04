import { gsap } from 'gsap'

const lerp = (newValue: number, oldValue: number, speed: number) => {
  const delta = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
  return (newValue - oldValue) * delta
}

export default lerp
