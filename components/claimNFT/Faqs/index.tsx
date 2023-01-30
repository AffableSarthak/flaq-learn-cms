import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading,
  Flex,
  Img,
} from "@chakra-ui/react";

const Faqs: { question: string; answer: string }[] = [
  { question: "Is minting free?", answer: "" },
  { question: "How many NFTs can I mint?", answer: "" },
  { question: "Can I mint myself", answer: "" },
  { question: "I Like Mints", answer: "" },
];

export default function Faq() {
  return (
    <Flex
      position={"relative"}
      flexDirection="column"
      alignItems="center"
      overflow={"hidden"}
    >
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        backgroundImage="/img/claimNft/Grid.svg"
        backgroundSize={"cover"}
        backgroundPosition="center"
        h={["230px", "unset"]}
        w={["full", "600px", "800px"]}
      >
        <Heading
          fontSize={["30px", "60px"]}
          fontWeight={700}
          fontFamily="Poppins"
          color="white"
          mb={[6, 0]}
          mt={["160px", 0]}
        >
          FAQs
        </Heading>
        <Heading
          fontSize={"60px"}
          fontWeight={700}
          fontFamily="Poppins"
          color="#37483F"
          mt={10}
          display={["none", "block"]}
        >
          FAQs
        </Heading>
        <Heading
          fontSize={"60px"}
          fontWeight={700}
          fontFamily="Poppins"
          color="#111613"
          mt={10}
          mb={"102px"}
          display={["none", "block"]}
        >
          FAQs
        </Heading>
      </Flex>
      <Flex justifyContent={"center"} position={"relative"} w="full">
        <Box w={["272px", "800px"]} mb={["55px", "353px"]} zIndex={2}>
          {Faqs.map((faq, index) => (
            <Accordion key={index} allowMultiple>
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize={"18"}
                        fontFamily="Poppins"
                        py={6}
                      >
                        {faq.question}
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
          ))}
        </Box>
        <Img
          src="/img/claimNft/Blob1.png"
          position={"absolute"}
          top={100}
          right={-28}
          width={"200px"}
          height={"150px"}
          display={["block", "none"]}
          zIndex={1}
        />
      </Flex>
      <Img
        src="/img/claimNft/Blob2.png"
        position={"absolute"}
        top={0}
        left={10}
        width={"300px"}
        height={"288px"}
        display={["none", "none", "none", "block"]}
      />
    </Flex>
  );
}
