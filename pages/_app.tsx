import "react-notion-x/src/styles.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import "../styles/notion.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
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


type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<any>;
  };
};


function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
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

  return (
    <ChakraProvider theme={theme}>

      {/* if the layout is provided then it will use that layout otherwise not */}
      {Component.PageLayout ? (
        <Component.PageLayout blogData={pageProps.blogData}>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </ChakraProvider>
  );
}

export default MyApp;
