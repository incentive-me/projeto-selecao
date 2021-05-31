import { Provider } from 'next-auth/client'

import GlobalStyle from "../styles/globalStyle"

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
      <GlobalStyle />
    </Provider>
  )
}

export default MyApp
