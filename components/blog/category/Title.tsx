import {
    Box,
    Button,
    Flex,
    Highlight,
    Text,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import categoryInfo from "../data/categoryInfo";

type Props = {
    category: string[]
};

const Title = ({ category }: Props) => {

    const desc = categoryInfo.find(
        (a) => a.name.toLowerCase() === category.join(" ").toLowerCase()
    );

    return (
        <Box mt="12" mb="3">
            <Box position={"relative"} w="full">
                <Text
                    my="3"
                    fontFamily={"Druk Wide Bold"}
                    fontWeight={"700"}
                    fontSize={{ base: "3xl", md: "5xl" }}
                    as="h1"
                >
                    <Highlight
                        query={category[category.length - 1]}
                        styles={{
                            color: "#70FFE9",
                            my: "3",
                            fontFamily: "Druk Wide Bold",
                            fontWeight: "700",
                        }}
                    >
                        {category.join(" ")}
                    </Highlight>
                </Text>
                <Flex align={"center"} justifyContent={"space-between"}>
                    <Text
                        color="#9999A5"
                        fontSize={{ md: "md", base: "sm" }}
                        fontFamily={"Poppins"}
                        fontWeight={500}
                    >
                        {desc?.desc}
                    </Text>
                    {/* {category.join("-") === "Dive-Into-Web3" && (
                        <Box>
                            <Button
                                w="10rem"
                                _hover={{
                                    bg: "#70ffe9",
                                    outline: "0.5px solid #ffffff",
                                }}
                                color="#000000"
                                bg="#70ffe9"
                            >
                                <Link href={`${category.join("-")}/quiz`}>Quiz Me</Link>
                            </Button>
                        </Box>
                    )} */}
                </Flex>
            </Box>
        </Box>
    );
};

export default Title;
