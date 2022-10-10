import { queryDatabase } from '../src/api/query-database'
import styles from '../styles/Home.module.css'
import { parseProperties, BlogPages } from '../src/utils/parse-properties'
import Link from 'next/link'

const Home = ({ blogData }: { blogData: BlogPages[] }) => {
  return (
    <>
      <div className={styles.container}>
        <Link href="/">Home</Link>
        {blogData.map((blog: BlogPages) => (
          <Link href={`/blog/${blog.pageId}`}>{blog.title}</Link>
        ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const database = await queryDatabase()
  const blogData = parseProperties(database!)

  return {
    props: {
      blogData,
    },
  }
}

export default Home
