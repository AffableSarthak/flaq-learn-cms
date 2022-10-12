import '../styles/globals.css'
import 'react-notion-x/src/styles.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (page: any) => (
    <Layout blogData={pageProps.blogData}>{page}</Layout>
  )

  return (
    <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
  )
}

export default MyApp
