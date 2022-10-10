import Link from 'next/link'
import { NotionRenderer } from 'react-notion-x'
import Home from '../index'
import {
  getRecordDataForPage,
  queryDatabase,
} from '../../src/api/query-database'
import { BlogPages, parseProperties } from '../../src/utils/parse-properties'

const Blog = ({
  recordMap,
  blogData,
}: {
  recordMap: any
  blogData: BlogPages[]
}) => {
  console.log({ recordMap })

  return (
    <div>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        showTableOfContents={true}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
        pageAside={<Home blogData={blogData} />}
      />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { slug } = context.query
  console.log(slug)
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
