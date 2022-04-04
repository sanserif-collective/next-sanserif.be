import clsx from 'clsx'
import { memo } from 'react'
import type { Strapi } from 'types/strapi'

type Props = Strapi.Text<'place' | 'rights'> & { year: number }

const Footer = ({ place, rights, year }: Props) => {
  return (
    <footer className={clsx(
      'h-screen py-8',
      'portrait:h-auto portrait:py-0 portrait:mb-2 portrait:text-sm'
    )}>
      <div className={clsx(
        'h-full px-8 py-8 border-l border-black writing-rl md:px-[4vw]',
        'portrait:writing-tb portrait:border-l-0 portrait:border-t'
      )}>
        <ul className={clsx(
          'flex flex-row-reverse justify-between transform rotate-180',
          'portrait:rotate-0'
        )}>
          <li>{rights} — {year}</li>
          <li>{place}</li>
        </ul>
      </div>
    </footer>
  )
}

export default memo(Footer)
