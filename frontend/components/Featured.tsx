import clsx from 'clsx'
import Skew from 'components/Skew'
import { useCursor } from 'features/cursor'
import Image from 'next/image'
import Link from 'next/link'
import type { Project, ProjectZone as ZoneProps } from 'types/home'

type ProjectProps = {
  project: Project
  size?: keyof typeof sizes
  className?: string
}

const sizes = {
  xs: {
    width: 140,
    height: 180,
    defaultClassName: 'w-[15vh] lg-portrait:w-[25vw] md-portrait:w-[40vw]',
  },
  sm: {
    width: 220,
    height: 300,
    defaultClassName: 'w-[20vh] lg-portrait:w-[35vw] md-portrait:w-[50vw]'
  },
  base: {
    width: 300,
    height: 400,
    defaultClassName: 'w-[30vh] max-w-lg lg-portrait:w-[40vw] md-portrait:w-[80vw]'
  },
  md: {
    width: 600,
    height: 400,
    defaultClassName: 'w-[60vh] lg-portrait:w-[80vw]'
  }
}

export const Thumbnail = ({ project, className = '', size = 'base' }: ProjectProps) => {
  const cursor = useCursor()

  const { defaultClassName, ...rest } = sizes[size]
  const { slug, title, about } = project
  const { url } = about.featured.data.attributes

  return (
    <Link href={`/projects/${slug}`}>
      <a
        className={clsx(
          'transition-[clip-path] duration-700 [clip-path:inset(0px)] hover:[clip-path:inset(5%)] group',
          `${defaultClassName} ${className}`
        )}
        {...cursor.events}
      >
        <h3 className="sr-only">{project.title}</h3>
        <Skew>
          <Image
            src={url}
            alt={title}
            objectFit="cover"
            quality={100}
            layout="responsive"
            className={clsx(
              'transition-transform duration-700 transform-gpu',
              'group-hover:scale-105'
            )}
            {...rest}
          />
        </Skew>
      </a>
    </Link>
  )
}

export const OneCenter = ({ first }: ZoneProps<'first'>) => (
  <div className={clsx(
    'flex items-center flex-shrink-0',
    'portrait:justify-center'
  )}>
    <Thumbnail
      size="md"
      project={first}
    />
  </div>
)

export const TwoBottom = ({ second, third }: ZoneProps<'second' | 'third'>) => (
  <div className={clsx(
    'relative flex items-end justify-center top-[10vh] h-1/2 w-full',
    'portrait:h-auto portrait:top-auto portrait:items-start',
    'md-portrait:flex-col'
  )}>
    <Thumbnail
      size="sm"
      project={second}
    />
    <Thumbnail
      size="xs"
      project={third}
      className={clsx(
        'ml-80',
        'lg-portrait:ml-auto lg-portrait:mt-[8vh] lg-portrait:relative lg-portrait:left-[4vw]',
        'md-portrait:mt-[16vh]'
      )}
    />
  </div>
)
