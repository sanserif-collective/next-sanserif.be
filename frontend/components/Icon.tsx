import sprite from 'public/images/sprite.svg'

type Props = {
  id: string
  className?: string
}

const Icon = ({ id, className }: Props) => (
  <svg className={className}>
    <use href={`${sprite}#${id}`} />
  </svg>
)

export default Icon
