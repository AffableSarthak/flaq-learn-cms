import "react-notion-x/src/styles.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import "../styles/notion.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import theme from "../theme";

// google analytics import scripts
import * as gtag from "../lib/ga";

const isProduction = process.env.NODE_ENV === "production";
//Binding event for loading bar animation
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // to track events on page change
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);


  const getLayout = (page: any) => (
    <Layout blogData={pageProps.blogData}>{page}</Layout>
  );

  return (
    <ChakraProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default MyApp;
