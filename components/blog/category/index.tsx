import {
  Box,
  Container,
  Grid,
  GridItem,
  Highlight,
  Show,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import Navbar from '../../common/Navbar'
import Image from 'next/image'
import web3icon from '../../../public/img/blog/web3Icon.svg'
import blogcover from '../../../public/img/blog/blogcover.svg'
import LooperGroup from '../../../public/img/blog/LooperGroup.svg'
import { getBlogUrl } from '../../../src/utils/parse-properties'
import Page404 from '../../fallback/Page404'
import { category_utils, MenuListProps } from '../utils/blogUtils'
import Link from 'next/link'
import categoryInfo from '../data/categoryInfo'

type Props = {
  BlogsByCategory: MenuListProps[]
}

const CategoryPage = ({ BlogsByCategory }: Props) => {
  if (BlogsByCategory.length === 0) {
    return <Page404 />
  }
  const category = category_utils(BlogsByCategory[0].category).split(' ')

  const desc = categoryInfo.find(
    (a) => a.name.toLowerCase() === category.join(' ').toLowerCase(),
  )

  return (
    <Box position={'relative'} bg="#040F03" maxWidth={'100%'}>
      <Container pb="16" maxW="1200px">
        <Navbar />
        <Box mt="12">
          <Box position={'relative'} w="fit-content">
            <Text
              my="3"
              lineHeight={'5.7rem'}
              fontFamily={'Druk Wide Bold'}
              fontWeight={'700'}
              fontSize={{ base: '3xl', md: '7xl' }}
              as="h1"
            >
              <Highlight
                query={category[category.length - 1]}
                styles={{
                  color: '#70FFE9',
                  my: '3',
                  lineHeight: '5.7rem',
                  fontFamily: 'Druk Wide Bold',
                  fontWeight: '700',
                }}
              >
                {category.join(' ')}
              </Highlight>
            </Text>
            <Text
              color="#9999A5"
              fontSize={{ md: 'md', base: 'sm' }}
              fontFamily={'Poppins'}
              fontWeight={500}
            >
              {desc?.desc}
            </Text>
            <Box
              right={{ md: '-90px', base: '5px' }}
              top={{ md: '-18px', base: '-55px' }}
              position={'absolute'}
            >
              <Image src={web3icon} width="90" height="90" />
            </Box>
          </Box>
        </Box>
        <Box my="8">
          <Grid
            templateColumns={{
              xl: 'repeat(3, 1fr)',
              base: 'repeat(1, 1fr)',
            }}
            justifyItems="center"
            gap={6}
          >
            {BlogsByCategory.map((blogData, key) => {
              return (
                <>
                  {blogData.blogs.map((val, key) => {
                    return (
                      <Link
                        href={`/${category
                          .join('-')
                          .toLowerCase()
                          .split(' ')
                          .join('-')}/${getBlogUrl(val.url)}`}
                        passHref
                        key={key}
                      >
                        <a>
                          <GridItem
                            borderRadius={'2xl'}
                            bg="#393953"
                            w={{ md: '392px', base: '350px' }}
                            h={{ md: '440px', base: '392px' }}
                          >
                            <Box>
                              <Image
                                src={
                                  val.coverImage !== null
                                    ? val.coverImage
                                    : blogcover
                                }
                                width="392"
                                height="220"
                              />
                            </Box>
                            <Box py="4" px="6">
                              <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent={'space-between'}
                                alignItems={'left'}
                                flexWrap="wrap"
                                h={{ md: '175px', base: '120px' }}
                              >
                                <Box>
                                  <Text
                                    fontSize={'md'}
                                    fontWeight={400}
                                    fontFamily={'Space Mono'}
                                  >
                                    Article
                                  </Text>
                                  <Text
                                    fontSize={{ md: '24px', base: '16px' }}
                                    fontWeight={700}
                                    fontFamily={'Poppins'}
                                  >
                                    {val.title}
                                  </Text>
                                </Box>
                                <Box alignSelf={'auto'}>
                                  <Text
                                    fontSize={'md'}
                                    fontWeight={400}
                                    fontFamily={'Space Mono'}
                                  >
                                    {
                                      [
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                        'August',
                                        'September',
                                        'October',
                                        'November',
                                        'December',
                                      ][new Date(val.published_on).getMonth()]
                                    }{' '}
                                    {'  '}
                                    {new Date(val.published_on).getDate()},
                                    {new Date(val.published_on).getFullYear()}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                          </GridItem>
                        </a>
                      </Link>
                    )
                  })}
                </>
              )
            })}
          </Grid>
        </Box>
      </Container>
      <Box position={'absolute'} bottom={-1} right={0}>
        <Show above="md">
          <Image src={LooperGroup} width="171" height="221" />
        </Show>
        <Show below="md">
          <Image src={LooperGroup} width="100" height="130" />
        </Show>
      </Box>
    </Box>
  )
}

export default CategoryPage
