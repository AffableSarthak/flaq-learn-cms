import Image from 'next/image'
import Link from 'next/link'
import { NotionRenderer } from 'react-notion-x'
import React from 'react'
import {
  getRecordDataForPage,
  queryDatabase,
} from '../../src/api/query-database'
import {
  BlogPages,
  getBlogRoutes,
  parseProperties,
} from '../../src/utils/parse-properties'
import Page404 from '../../components/fallback/Page404'
import PageHead from '../../components/seo/PageHead'
import BlogLayout from '../../components/blog/BlogLayout'
interface MyHeadingProps {
  children: React.PropsWithChildren<React.ReactChild>
}

const CategoryItem = ({
  recordMap,
  blogData,
}: {
  recordMap: any
  blogData: BlogPages[]
}) => {
  if (recordMap === null) {
    return <Page404 />
  }

  return (
    <div>
      <PageHead blogData={blogData} recordMap={recordMap} />
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
  const database = await queryDatabase()
  const blogRoutes = getBlogRoutes(database!)
  const blogData = parseProperties(database!)

  const currentRoute = blogRoutes.find((route) => route.url === slug)
  if (!currentRoute) {
    return {
      notFound: true,
    }
  }

  const recordMap = await getRecordDataForPage(currentRoute.pageId)

  return {
    props: {
      recordMap: recordMap ? recordMap : null,
      blogData,
    },
  }
}

CategoryItem.PageLayout = BlogLayout

export default CategoryItem
