import Footer from 'app/components/Footer'
import Header from 'app/components/Header'
import ProgressBar from 'app/components/ProgressBar'
import { ASScrollContainer } from 'app/features/asscroll'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import 'styles/main.css'

const Cursor = dynamic(
  () => import('app/components/Cursor'),
  { ssr: false }
)

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ASScrollContainer
        inBetween={
          <>
            <Cursor ease={true} className="flex items-center justify-center w-4 h-4 border border-black rounded-full" />
            <Cursor className="h-[4px] w-[4px] bg-black rounded-full" />
            <ProgressBar />
            <Header />
          </>
        }
      >
        <main className="flex flex-shrink-0">
          {<Component {...pageProps} />}
        </main>
        <Footer />
      </ASScrollContainer>
    </>
  )
}

export default App
