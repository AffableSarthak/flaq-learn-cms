import '../styles/globals.css'
import 'react-notion-x/src/styles.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import Router from "next/router";
import NProgress from "nprogress"; 
import "nprogress/nprogress.css"; 

//Binding event for loading bar animation
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());  

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (page: any) => (
    <Layout blogData={pageProps.blogData}>{page}</Layout>
  )

  return (
    <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
  )
}

export default MyApp
