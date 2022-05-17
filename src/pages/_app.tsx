import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MediaQueryProvider } from 'components/organisms/MediaQueryProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueryProvider>
      <Component {...pageProps} />
    </MediaQueryProvider>
  )
}

export default MyApp
