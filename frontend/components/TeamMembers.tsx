import { useASScroll } from 'features/asscroll'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Member } from 'types/shared'
import Skew from './Skew'

type Props = {
  members: Member[]
}

const transformer = gsap.utils.pipe(
  gsap.utils.wrapYoyo(-0.5, 0.5),
  gsap.utils.mapRange(-0.5, 0.5, 5, 36),
  gsap.utils.clamp(5, 35)
)

const TeamMembers = ({ members }: Props) => {
  const { scroll } = useASScroll()

  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!list.current) return

    const { length } = list.current.childNodes

    const triggers = Array.from(
      list.current.childNodes
    ).map((node, index) => {
      const widthSet = gsap.quickSetter(node, 'width', 'vh')

      return ScrollTrigger.create({
        trigger: node as HTMLLIElement,
        scrub: true,
        onUpdate({ progress }) {
          widthSet(transformer(progress))
          index === length - 1 && scroll?.resize()
        }
      })
    })

    return () => triggers.forEach(trigger => trigger.kill(true))
  }, [scroll])

  return (
    <ul
      ref={list}
      className="relative flex items-end ml-24 space-x-16 top-20"
    >
      {members.map(({ name, portrait }) => (
        <Skew
          as="li"
          key={name}
          className="w-[5vh]"
        >
          <h4 className="sr-only">{name}</h4>
          <Image
            src={portrait.data.attributes.url}
            width={180}
            height={250}
            objectFit="cover"
            alt={name}
            layout="responsive"
          />
        </Skew>
      ))}
    </ul>
  )
}

export default TeamMembers
