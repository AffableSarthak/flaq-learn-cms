import { Box } from '@chakra-ui/react'
import CategoryPage from '../../components/blog/category'
import blogsToCategoryMap from '../../components/blog/utils/blogUtils'
import { getBlogsByCategory } from '../../src/api/query-database'
import { BlogPages } from '../../src/utils/parse-properties'

const Category = ({ BlogsByCategory }: { BlogsByCategory: BlogPages[] }) => {
  return (
    <div>
      <Box w="100%" h="100vh" bg="#040F03">
        <CategoryPage BlogsByCategory={blogsToCategoryMap(BlogsByCategory)} />
      </Box>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { category, priority } = context.query

  const categoryName = category.split('-').join(' ') + ' ' + priority

  const BlogsByCategory = await getBlogsByCategory(categoryName)

  return {
    props: { BlogsByCategory },
  }
}
export default Category
