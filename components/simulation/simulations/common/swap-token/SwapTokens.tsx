import {
  Box,
  HStack,
  Stack,
  Text,
  Button,
  Flex,
  Avatar,
  Divider,
  Tabs,
  TabList,
  Tab,
  Input,
  Select,
  MenuItem,
  Image,
  MenuList,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  MdKeyboardBackspace,
  MdOutlineKeyboardArrowRight,
  MdOutlineSwapVert,
} from "react-icons/md";
import { GrCircleInformation } from "react-icons/gr";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useSwapStore } from "../../../store/solana/swapTokenStore";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function TransactionForm() {
  const {
    handleScreen,
    handleAmount,
    amount,
    balance,
    logo,
    networkType,
  } = useSwapStore();

  const slippages: number[] = [0.1, 0.5, 1.5];

  const [selected, setSelected] = useState({
    img: "",
    network: "",
    value: 0,
    price: 0,
  });

  const TokenList = [
    {
      img: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
      network: "solana",
      value: 56.67,
      price: 34.03,
    },
    {
      img: "",
      network: "usdc",
      value: 1910,
      price: 1.01,
    },
    {
      img: "",
      network: "serum",
      value: 0,
      price: 0.0,
    },
  ];

  return (
    <>
      <HStack
        w="full"
        px={6}
        pb={6}
        pt={14}
        alignItems="center"
        borderBottom={"1px"}
        borderColor="gray.800"
      >
        <Box mr={2} cursor="pointer" onClick={() => handleScreen(0)}>
          <MdKeyboardBackspace fontSize={"24px"} />
        </Box>
        <HStack alignItems={"center"}>
          <Text fontWeight="semibold" fontFamily={"Poppins"}>
            Swap Tokens
          </Text>
        </HStack>
      </HStack>
      <Stack py={6} px={7}>
        <Box px={4} py={6} rounded="xl" bg="#1A1A1A" w="full">
          <Text color={"#9999A5"} fontSize="sm" fontFamily={"Poppins"}>
            Swap from
          </Text>
          <HStack alignItems={"center"} justifyContent="space-between" mt={2}>
            <HStack alignItems={"center"}>
              <Avatar src={logo} name={networkType} size="sm" />
              <Text fontWeight={"medium"} fontFamily="Poppins">
                {networkType}
              </Text>
              {/* <Box ml={6}>
                <MdOutlineKeyboardArrowRight />
              </Box> */}
            </HStack>
            <Input
              type={"number"}
              placeholder="enter amount"
              w="140px"
              fontSize={"sm"}
              border={0}
              outline="none"
              focusBorderColor={"#1A1A1A"}
              textAlign="right"
              px={0}
              onChange={(e) => handleAmount(parseFloat(e.target.value))}
            />
          </HStack>
        </Box>
        <Flex justifyContent={"center"}>
          <MdOutlineSwapVert fontSize={"24px"} color="#97FCE9" />
        </Flex>
        <Box px={4} py={6} mb={6} rounded="xl" bg="#1A1A1A" w="full">
          <Text color={"#9999A5"} fontSize="sm" fontFamily={"Poppins"}>
            swap to
          </Text>
          {/* <HStack alignItems={"center"} justifyContent="space-between" mt={2}>
            <HStack alignItems={"center"}>
              <Avatar src={logo} name={networkType} size="sm" />
              <Text fontWeight={"medium"} fontFamily="Poppins">
                USDC
              </Text>
              <Box ml={6}>
                <MdOutlineKeyboardArrowRight />
              </Box>
            </HStack>
            <Text fontFamily="Poppins">11393.31</Text>
          </HStack> */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              w="full"
              mt={4}
              display="flex"
              alignItems={"center"}
              bg="transparent"
              px={0}
              _hover={{
                bg: "transparent",
              }}
              _active={{
                bg: "transparent",
              }}
            >
              {selected.network.length == 0 ? (
                <Text fontSize={"sm"} textAlign={"start"}>
                  Choose a coin
                </Text>
              ) : (
                <HStack
                  alignItems={"center"}
                  justifyContent="space-between"
                  w="full"
                >
                  <HStack alignItems={"center"}>
                    <Avatar src={selected.img} name={selected.network} />
                    <Box textAlign={"start"}>
                      <Text fontWeight={"medium"} fontFamily="Space Mono">
                        {selected.network}
                      </Text>
                      <Text fontFamily={"Space Mono"}>{selected.value}</Text>
                    </Box>
                  </HStack>
                  <Stack>
                    <Text fontFamily={"Space Mono"}>${selected.price}</Text>
                  </Stack>
                </HStack>
              )}
            </MenuButton>
            <MenuList w="290px" bg="#1A1A1A" px={2}>
              {TokenList.map((token, index) => (
                <MenuItem
                  key={index}
                  mt={index > 0 ? 2 : 0}
                  bg="#101010"
                  border="1px"
                  borderColor={"#151515"}
                  rounded="xl"
                  onClick={() => {
                    setSelected(token);
                  }}
                >
                  <HStack
                    alignItems={"center"}
                    justifyContent="space-between"
                    w="full"
                  >
                    <HStack alignItems={"center"}>
                      <Avatar src={token.img} name={token.network} />
                      <Box>
                        <Text fontWeight={"medium"} fontFamily="Space Mono">
                          {token.network}
                        </Text>
                        <Text fontFamily={"Space Mono"}>{token.value}</Text>
                      </Box>
                    </HStack>
                    <Stack>
                      <Text fontFamily={"Space Mono"}>${token.price}</Text>
                    </Stack>
                  </HStack>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
        <Box>
          <HStack gap={2}>
            <Text color="#9999A5" fontFamily={"Poppins"} fontWeight={500}>
              slippage tolerance
            </Text>
            <IoIosInformationCircleOutline color="#9999A5" />
          </HStack>
          <HStack mt={4}>
            <Tabs variant="soft-rounded">
              <TabList gap={2}>
                {slippages.map((slippage, index) => (
                  <Tab
                    key={index}
                    bg="#1A1A1A"
                    color={"white"}
                    _focus={{ bg: "white", color: "black" }}
                    py={2}
                    px={4}
                    fontWeight={400}
                  >
                    {slippage}%
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          </HStack>
        </Box>
      </Stack>
      <Stack px={4} pb={14} h="full" justifyContent="flex-end">
        <Button
          w="full"
          py={4}
          bg="#97FCE9"
          color="black"
          _hover={{ bg: "#97FCE9" }}
          // disabled={
          //   validateAddress === false ||
          //   validateAmount === false ||
          //   totalAmount > balance
          // }
          onClick={() => {
            handleScreen(2);
          }}
        >
          Preview Swap
        </Button>
      </Stack>
    </>
  );
}
