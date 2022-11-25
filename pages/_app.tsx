import type { AppProps } from 'next/app'
import '../styles/index.css'
import Layout from '../components/layouts/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
