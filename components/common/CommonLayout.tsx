import { Box, Container } from '@chakra-ui/react';
import React from 'react'
import Footer from './Footer';
import Image from 'next/image';
import Header from './Header';

type Props = {
    children: React.ReactNode
}

const CommonLayout = ({ children}: Props) => {
  return (
    <div>
      <Box w="100%" h="100vh" bg="#040F03">
        <Box position={"relative"} bg="#040F03" maxWidth={"100%"}>
          <Container pb="16" mb="16" maxW="1200px">
            <Header
              secondaryLink={{
                name: "Simulation",
                link: "/simulation",
              }}
              showNavlinks={false}
              showSearch={true}
              homeLink={"/"}
              showMenu={false}
            />
            {children}
            <Footer />
          </Container>
          {/* <Box position={"absolute"} bottom={-1} right={0}>
            <Image src={LooperGroup} width="100%" height="100%" />
          </Box> */}
        </Box>
      </Box>
    </div>
  );
}