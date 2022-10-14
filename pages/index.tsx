import Image from 'next/image'
import Link from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import { NotionRenderer } from 'react-notion-x'
import { getRecordDataForPage, queryDatabase } from '../src/api/query-database'
import { parseProperties } from '../src/utils/parse-properties'

const Home = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
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
        showTableOfContents={true}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
        disableHeader={true}
      />
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const database = await queryDatabase()
  const blogData = parseProperties(database!)

  const rootPageId = '9f83939fc49b41378b18f6a63338a136'
  const recordMap = await getRecordDataForPage(rootPageId)

  return {
    props: {
      blogData,
      recordMap: recordMap ? recordMap : null,
    },
  }
}
