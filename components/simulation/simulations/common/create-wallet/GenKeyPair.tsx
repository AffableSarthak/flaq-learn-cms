import React from "react";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import ToolTip from "../../../../common/ToolTip";

interface GenKeyPairProps {
  seedPhrase: string;
  generateKey: () => void;
}

const GenKeyPair = (props: GenKeyPairProps) => {
  const { seedPhrase, generateKey } = props;
  const isUserDataAvailable = () => {
    return seedPhrase.length !== 0;
  };
  return (
    <Box>
      <Center my="8">
        <ToolTip text="click here to start test running web3!">
          <Button variant={"primarybtn"} onClick={generateKey}>
            Create New Wallet
          </Button>
        </ToolTip>
      </Center>

      {isUserDataAvailable() && (
        <Flex direction="column" gap={4}>
          <Box
            borderWidth={"0.5px"}
            borderColor="whiteAlpha.200"
            borderRadius="2xl"
            p={10}
          >
            <Center mb={2}>
              <Box>
                <Text fontFamily={"Druk Wide Bold "}>
                  Secret Recovery Phrase
                </Text>
              </Box>
            </Center>

            <ToolTip text="don’t share this w anyone!">
              <Center>
                <Box
                  style={{
                    borderImage: "linear-gradient(60deg, #a6ebc9, #005704)",
                    borderImageSlice: 1,
                  }}
                  borderRadius={"8px"}
                  border="1px solid transparent"
                  textAlign="center"
                  as="samp"
                  px="2"
                  py="4"
                >
                  {seedPhrase}
                </Box>
              </Center>
            </ToolTip>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default GenKeyPair;
