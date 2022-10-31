import Head from "next/head";
import React from "react";

import { getPageImageUrls, getBlockTitle, getPageProperty } from "notion-utils";
type Props = {
  recordMap: any;
};

const PageHead = (props: Props) => {
  const keys = Object.keys(props.recordMap?.block || {});
  const block = props?.recordMap?.block?.[keys[0]]?.value;
  const title = getBlockTitle(block, props.recordMap) || "Flaq Academy";
  const description =
    getPageProperty<string>("Description", block, props.recordMap) ||
    "Learn Web3 with Flaq Academy";
    const imageUrl = getPageImageUrls(props.recordMap, {
      mapImageUrl(url, block) {
        return url;
      },
  });
  return (
    <Head>
      {/* common tags */}
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="robots" content="index,follow" />
      <meta property="og:type" content="website" />

      {/* title */}
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      {/* description */}
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      {/* Image */}
      {imageUrl && (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={imageUrl[0]} />
          <meta property="og:image" content={imageUrl[0]} />
        </>
      )}
    </Head>
  );
};

export default PageHead;
