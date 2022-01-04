import sprite from 'public/images/sprite.svg'
import React from 'react'

type Props = {
  id: string
  className?: string
}

const Sprite = ({ id, className }: Props) => {
  return (
    <svg className={className}>
      <use href={`${sprite}#${id}`} />
    </svg>
  )
}

export default Sprite
