import type { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import { Header } from '../components/Header'
import { Slider } from '../components/Slider'
import { GlobalStyles } from '../styles/global'
import { GameProvider } from '../hooks'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  return (
    <GameProvider>
      <GlobalStyles />
      <Header />
      <main>
        {pathname === '/' ? (
          <Slider />
        ) : (
          pathname === '/favoritos' && <Slider />
        )}

        <Component {...pageProps} />
      </main>
    </GameProvider>
  )
}
export default MyApp
