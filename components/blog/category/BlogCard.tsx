import {
    Box,
    Flex,
    GridItem,
    Text,
} from "@chakra-ui/react";
import React from "react";
import blogcover from "../../../public/img/blog/blogcover.svg";
import { BlogPages } from "../../../src/utils/parse-properties";
import Link from "next/link";

type Props = {
    val: BlogPages,
    link: string,
    priority: number,
    index: number
};

const BlogCard = ({ val, link, priority, index }: Props) => {
    return (
        <Link
            href={link}
            passHref
        >
            <a>
                <GridItem
                    borderRadius={"2xl"}
                    overflow={"hidden"}
                    w={{ md: "388px", base: "300px" }}
                    h={{ md: "220px", base: "170px" }}
                    border={'2px solid #5EA579'}
                    position='relative'
                    backgroundImage={val.coverImage ? val.coverImage : blogcover}
                    backgroundSize='contain'
                    backgroundRepeat='no-repeat'
                    backgroundPosition='center'
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45))'
                    }}
                >
                    <Flex
                        flexDir={'column'}
                        justifyContent={'flex-end'}
                        h='full'
                        p={6}
                        position='relative'
                    >
                        <Text color='gray.300' fontFamily={'Space Mono'}>
                            Article
                        </Text>
                        <Box mt={2}>
                            <Text
                                fontSize={{ md: "24px", base: "16px" }}
                                fontWeight={700}
                                fontFamily={"Poppins"}
                            >
                                {val.title}
                            </Text>
                            <Text
                                fontSize={"md"}
                                fontWeight={400}
                                fontFamily={"Space Mono"}
                            >
                                {
                                    [
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December",
                                    ][new Date(val.published_on).getMonth()]
                                }{" "}
                                {"  "}
                                {new Date(val.published_on).getDate()},{" "}
                                {new Date(val.published_on).getFullYear()}
                            </Text>
                        </Box>
                    </Flex>
                </GridItem>
            </a>
        </Link >
    );
};

export default BlogCard;
