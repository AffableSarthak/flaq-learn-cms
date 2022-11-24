import { Box } from '@chakra-ui/react'
import HomePage from '../components/blog/Homepage'
import { queryDatabase } from '../src/api/query-database'
import { getAllCategories } from '../src/utils/parse-properties'
interface IAllCategories {
  category: string
  priority: number
  slug: string
}
const Home = ({ allCategories }: { allCategories: IAllCategories[] }) => {
  return (
    <div>
      <Box w="100%" h="100vh" bg="#040F03">
        <HomePage allCategories={allCategories} />
      </Box>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const database = await queryDatabase()

  // sort the categories by priority
  const allCategories = getAllCategories(database!).sort((a, b) =>
    a.priority > b.priority ? 1 : -1,
  )

  return {
    props: {
      allCategories,
    },
  }
}
