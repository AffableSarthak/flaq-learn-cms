import { Box, Button, Container, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from 'react'

type Props = {}

const Page404 = (props: Props) => {
  return (
    <Container
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      bg="#020f02"
      h="100vh"
      color="rgba(255, 255, 255, 0.9)"
      maxWidth="100%"
      w="100%"
    >
      <Box textAlign={"center"}>
        <Box
          textShadow={
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
          }
        >
          <Text fontSize={"4rem"} textDecorationThickness={"1px black"}>
            404
          </Text>
        </Box>
        <Text fontSize={"2rem"} textDecorationThickness={"1px black"}>
          The page you are looking for doesn&apos;t exist.
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
    </Container>
  );
}

export default Page404;