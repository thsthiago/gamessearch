import { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import { Slider, Header } from '@/components'
import { GameProvider } from '@/context'
import { GlobalStyles } from '@/styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  return (
    <GameProvider>
      <GlobalStyles />
      <Header />
      <main>
        {pathname === '/' && <Slider />}
        {pathname === '/favoritos' && <Slider />}
        <Component {...pageProps} />
      </main>
    </GameProvider>
  )
}
export default MyApp
