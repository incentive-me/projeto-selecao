import Layout from '@/components/layout'
import { fontSans } from '@/lib/fonts'
import '../styles/globals.css'
import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

type NextPageWithLayout = {
  getLayout?: (page: React.ReactNode) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType & NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>)

  return (
    <>
      <Head>
        <title>Pagamentos</title>
      </Head>
      <style jsx global>
        {`
          :root {
            --font-sans: ${fontSans.style.fontFamily};
          }
        `}
      </style>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
