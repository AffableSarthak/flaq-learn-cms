import Image from 'next/image'
import Link from 'next/link'
import { Header, NotionRenderer } from 'react-notion-x'
import React from 'react'
import {
  getRecordDataForPage,
  queryDatabase,
} from '../../src/api/query-database'
import { parseProperties } from '../../src/utils/parse-properties'
import * as types from 'notion-types'
import { Box, Flex } from '@chakra-ui/react'
interface MyHeadingProps {
  children: React.PropsWithChildren<React.ReactChild>
}

const Blog = ({ recordMap }: { recordMap: any }) => {
  // TODO: Show an error comopnent or link to a error page.
  if (recordMap === null) {
    return 'Oh shit, record map is undefined'
  }

  return (
    <div>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        // TODO: Enable this when the sidebar is added.
        showTableOfContents={true}
        disableHeader={true}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { slug } = context.query
  // console.log("slug", context);
  const recordMap = await getRecordDataForPage(slug)
  const database = await queryDatabase()
  const blogData = parseProperties(database!)

  return {
    props: {
      recordMap: recordMap ? recordMap : null,
      blogData,
    },
  }
}

export default Blog
