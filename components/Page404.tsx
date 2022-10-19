import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from 'react'

type Props = {}

const Page404 = (props: Props) => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      bg="#161B20"
      h="100vh"
      maxWidth="100%"
    >
      <Box textAlign={"center"}>
        <Box
          textShadow={
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
          }
        >
          <Text fontSize={"6rem"} textDecorationThickness={"1px black"}>
            404
          </Text>
        </Box>
        <Text fontSize={"2rem"} textDecorationThickness={"1px black"}>
          OH OH! You have lost
        </Text>
        <Button
          mt="2"
          variant={"outline"}
          _hover={{
            bg: "#f2f2f2",
            color: "#161B20",
          }}
        >
          <Link href="/">Go Home</Link>
        </Button>
      </Box>
    </Box>
  );
}

export default Page404;