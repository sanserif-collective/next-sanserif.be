import clsx from 'clsx'
import CircledLink from 'components/CircledLink'
import * as Featured from 'components/Featured'
import Heading from 'components/Heading'
import Layout from 'components/Layout'
import Skew from 'components/Skew'
import type { GetStaticProps } from 'next'
import getHome from 'queries/getHome'
import { memo } from 'react'
import type { Builder } from 'types/home'
import type { Header, NextLink } from 'types/shared'

type Props = {
  header: Header
  builder: Builder
  next: NextLink
  preview?: boolean | null
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview = null }) => {
  const { header, builder, next } = (await getHome()).home.data.attributes
  return { props: { header, builder, next, preview } }
}

const Home = ({ header, builder, next }: Props) => {
  const [firstZone, ...othersZones] = builder

  return (
    <>
      <Layout className={clsx(
        'flex items-end w-screen',
        'portrait:flex-col portrait:h-screen'
      )}>
        <Skew
          className={clsx(
            'relative right-32 top-[18%]',
            'text-[16vw] tracking-[-0.07em] font-light leading-[0.9]',
            'portrait:right-auto portrait:top-auto portrait:mt-auto',
            'portrait:text-[12vw]'
          )}
          as="h1"
        >
          {header.title}
        </Skew>
        <Heading
          as="h2"
          size="lg"
          variant="arrow"
          className={clsx(
            'rotate-180 writing-rl',
            'after:rotate-90 after:mt-4 after:ml-0',
            'portrait:writing-tb portrait:rotate-0 portrait:mt-8',
            'portrait:after:mt-0 portrait:after:ml-4'
          )}
        >
          {header.subtitle}
        </Heading>
      </Layout>
      <Layout className={clsx(
        'flex space-x-80',
        'portrait:flex-col portrait:space-x-0 portrait:space-y-[16vh]',
      )}>
        <div className="portrait:space-y-[16vh]">
          <div className={clsx(
            'flex items-center flex-shrink-0 h-1/2',
            'portrait:items-start portrait:h-auto portrait:flex-shrink',
            'lg-portrait:justify-between',
            'sm-portrait:flex-col'
          )}>
            <p className="max-w-sm">{header.description}</p>
            {firstZone.__typename === 'ComponentHomeBuilderOneTopOneBottom' && (
              <Featured.Thumbnail
                project={firstZone.first.data.attributes}
                className={clsx(
                  'relative bottom-[10vmin] ml-80',
                  'portrait:bottom-auto portrait:left-[4vw] portrait:mt-[16vh]',
                  'lg-portrait:ml-[4vw]',
                  'md-portrait:ml-auto'
                )}
              />
            )}
            {firstZone.__typename === 'ComponentHomeBuilderOneTopTwoBottom' && (
              <Featured.Thumbnail
                project={firstZone.first.data.attributes}
                className={clsx(
                  'ml-80 relative',
                  'lg-portrait:ml-[4vw] lg-portrait:mt-[16vh] lg-portrait:left-[4vw]',
                  'sm-portrait:ml-auto'
                )}
              />
            )}
          </div>
          {firstZone.__typename === 'ComponentHomeBuilderOneTopOneBottom' && (
            <div className={clsx(
              'flex items-end h-1/2 ml-80',
              'portrait:ml-0 portrait:h-auto portrait:items-start',
            )}>
              <Featured.Thumbnail
                size="sm"
                project={firstZone.second.data.attributes}
                className={clsx(
                  'relative top-[10vh]',
                  'portrait:top-auto portrait:right-[4vw]'
                )}
              />
            </div>
          )}
          {firstZone.__typename === 'ComponentHomeBuilderOneTopTwoBottom' && (
            <Featured.TwoBottom
              second={firstZone.second.data.attributes}
              third={firstZone.third.data.attributes}
            />
          )}
        </div>
        {firstZone.__typename === 'ComponentHomeBuilderCenter' && (
          <Featured.OneCenter first={firstZone.first.data.attributes} />
        )}
        {othersZones.map(zone => (
          <>
            {zone.__typename === 'ComponentHomeBuilderCenter' && (
              <Featured.OneCenter
                key={zone.first.data.attributes.slug}
                first={zone.first.data.attributes}
              />
            )}
            {zone.__typename === 'ComponentHomeBuilderOneTopOneBottom' && (
              <div
                key={zone.first.data.attributes.slug}
                className={clsx(
                  'lg-portrait:flex lg-portrait:justify-between',
                  'md-portrait:flex-col md-portrait:space-y-[16vh]'
                )}
              >
                <div className={clsx(
                  'h-1/2',
                  'portrait:h-auto',
                  'lg-portrait:mt-[16vh]',
                  'md-portrait:mt-0'
                )}>
                  <Featured.Thumbnail
                    project={zone.first.data.attributes}
                    className={clsx(
                      'relative bottom-[10vh]',
                      'portrait:bottom-auto',
                      'lg-portrait:right-[4vw]'
                    )}
                  />
                </div>
                <div className={clsx(
                  'flex items-end h-1/2',
                  'portrait:h-auto portrait:items-start',
                  'md-portrait:ml-auto'
                )}>
                  <Featured.Thumbnail
                    size="sm"
                    project={zone.second.data.attributes}
                    className={clsx(
                      'relative top-[10vh] ml-80',
                      'portrait:top-auto',
                      'lg-portrait:ml-0',
                      'lg-portrait:left-[4vw]'
                    )}
                  />
                </div>
              </div>
            )}
            {zone.__typename === 'ComponentHomeBuilderOneTopTwoBottom' && (
              <div key={zone.first.data.attributes.slug}>
                <div className="flex h-1/2 portrait:h-auto">
                  <Featured.Thumbnail
                    project={zone.first.data.attributes}
                    className={clsx(
                      'ml-80',
                      'portrait:ml-auto',
                      'md-portrait:relative md-portrait:left-[4vw]'
                    )}
                  />
                </div>
                <div className={clsx(
                  'flex items-end h-1/2',
                  'portrait:h-auto portrait:mt-[16vh]'
                )}>
                  <Featured.TwoBottom
                    second={zone.second.data.attributes}
                    third={zone.third.data.attributes}
                  />
                </div>
              </div>
            )}
          </>
        ))}
      </Layout>
      <Layout
        className="flex items-center justify-center"
        size="lg"
      >
        <CircledLink
          href={`/${next.link.page}`}
          subtitle={next.subtitle}
        >
          {next.link.label}
        </CircledLink>
      </Layout>
    </>
  )
}

export default memo(Home)
