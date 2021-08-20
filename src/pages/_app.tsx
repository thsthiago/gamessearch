import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Slider } from '../components/Slider'
import { GlobalStyles } from '../styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <main>
        <Slider />
        <Component {...pageProps} />
      </main>
    </>
  )
}
export default MyApp
