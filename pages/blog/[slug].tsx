import Image from 'next/image'
import Link from 'next/link'
import { NotionRenderer } from 'react-notion-x'
import React from 'react'
import {
  getRecordDataForPage,
  queryDatabase,
} from '../../src/api/query-database'
import { parseProperties } from '../../src/utils/parse-properties'
import Page404 from '../../components/Page404'
import PageHead from '../../components/PageHead'
interface MyHeadingProps {
  children: React.PropsWithChildren<React.ReactChild>
}

const Blog = ({ recordMap }: { recordMap: any }) => {
  if (recordMap === null) {
    return <Page404 />
  }
  return (
    <div>
      <PageHead recordMap={recordMap} />
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
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
  const pageId = slug.split('-')[slug.split('-').length - 1]
  const recordMap = await getRecordDataForPage(pageId)
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
