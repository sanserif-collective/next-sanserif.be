import clsx from 'clsx'
import Header from 'components/Header'
import Icon from 'components/Icon'
import { ASScrollContainer } from 'features/asscroll'
import { CursorContext } from 'features/cursor'
import type { AppProps as NextAppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import getGlobal from 'queries/getGlobal'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import 'styles/main.css'
import type { Global } from 'types/global'
import type { Dictionary } from 'types/shared'
import Footer from '../components/Footer'
import ProgressBar from '../components/ProgressBar'

const Cursor = dynamic(
  () => import('components/Cursor'),
  { ssr: false }
)

type AppProps<P = {}> = { pageProps: P } & Omit<NextAppProps<P>, 'pageProps'>

type Props = {
  global: Global
  dictionary: Dictionary
  year: number
}

App.getInitialProps = async () => {
  const { global, dictionary } = await getGlobal()

  return {
    pageProps: {
      global: {
        ...global.data.attributes,
        navigation: global.data.attributes.navigation
      },
      dictionary: dictionary.data.attributes,
      year: new Date().getFullYear()
    }
  }
}

function App({ Component, pageProps }: AppProps<Props>) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

  const { contact, seo, configuration, navigation } = pageProps.global
  const { dictionary } = pageProps
  const { year } = pageProps

  return (
    <>
      <Head>
        <title>{seo.title}</title>
      </Head>
      <CursorContext.Provider value={{ hover, setHover }}>
        <ASScrollContainer
          inBetween={
            <>
              <Header
                links={navigation.links}
                open={menuOpen}
                setOpen={setMenuOpen}
                rights={dictionary.rights}
                {...contact}
              >
                <Link href="/">
                  <a
                    className={clsx(
                      'fixed z-20 top-[10vh] left-24',
                      'md:left-[4vw] portrait:top-[5vh]'
                    )}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <Icon
                      id="logo"
                      className="transition-colors duration-500 w-20 h-4 text-[color:var(--accent-color)]"
                    />
                  </a>
                </Link>
                <button
                  className={clsx(
                    'fixed z-20 w-6 h-6 top-[10vh] right-24',
                    'md:right-[4vw] portrait:top-[5vh]'
                  )}
                  onClick={() => setMenuOpen(state => !state)}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  {[...Array(2)].map((_, index) => (
                    <span
                      key={index}
                      className={clsx(
                        'absolute inset-x-0 bottom-1/2 first:top-1/2',
                        'h-[2px] block bg-[color:var(--accent-color)]',
                        'transition-[background-color,transform] duration-500 first:transform-gpu transform-gpu',
                        {
                          'first:rotate-45 translate-y-1/2 first:-translate-y-1/2 -rotate-45': menuOpen,
                          'translate-y-[calc(100%_+_3px)] first:translate-y-[calc(-100%_-_3px)]': !menuOpen,
                        }
                      )}
                    />
                  ))}
                </button>
              </Header>
              {isDesktop && (
                <>
                  <Cursor
                    speed={0.1}
                    className={clsx(
                      'flex items-center justify-center',
                      'transition-colors w-4 h-4 border border-[color:var(--accent-color)] rounded-full'
                    )}
                  />
                  <Cursor
                    scale={hover ? 3 : 1}
                    className="transition-colors h-[4px] w-[4px] bg-[color:var(--accent-color)] rounded-full"
                  />
                </>
              )}
              <ProgressBar />
            </>
          }
        >
          <main
            className={clsx(
              'flex flex-shrink-0',
              'portrait:flex-col portrait:flex-shrink'
            )}
          >
            {<Component {...pageProps} />}
          </main>
          <Footer
            place={contact.place}
            rights={dictionary.rights}
            year={year}
          />
        </ASScrollContainer>
      </CursorContext.Provider>
    </>
  )
}

export default App
