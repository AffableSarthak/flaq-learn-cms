import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import theme from "../theme";
type Props = {};

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
