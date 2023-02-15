import {
  Box,
  HStack,
  Stack,
  Text,
  Button,
  Flex,
  Avatar,
  Tabs,
  TabList,
  Tab,
  Input,
  MenuItem,
  MenuList,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdKeyboardBackspace, MdOutlineSwapVert } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  SlippageValues,
  TokenState,
  useSwapTokenStore,
} from "../../../store/solana/swapTokenStore";

export default function TransactionForm() {
  const {
    handleScreen,
    setSelectedSwapTo,
    balance,
    networkMetadata,
    swapFromVal,
    slippageOptions,
    setSlippage,
    setSwapFromVal,
  } = useSwapTokenStore();

  const { swapFromToken, tokenList } = networkMetadata;

  const [selected, setSelected] = useState<TokenState>({
    icon: "",
    name: "",
    symbol: "",
    multiplier: 0,
  });

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
              <Avatar
                src={swapFromToken?.icon}
                name={swapFromToken?.name}
                size="sm"
              />
              <Text fontWeight={"medium"} fontFamily="Poppins">
                {swapFromToken?.symbol}
              </Text>
            </HStack>
            <Input
              type={"number"}
              value={swapFromVal}
              placeholder="enter amount"
              w="140px"
              fontSize={"sm"}
              border={0}
              outline="none"
              focusBorderColor={"#1A1A1A"}
              textAlign="right"
              px={0}
              onChange={(e) => setSwapFromVal(parseFloat(e.target.value))}
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
              {selected.name.length == 0 ? (
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
                    <Avatar src={selected.icon} name={selected.name} />
                    <Box textAlign={"start"}>
                      <Text fontWeight={"medium"} fontFamily="Space Mono">
                        {selected.symbol}
                      </Text>
                      <Text fontFamily={"Space Mono"}>
                        {selected.multiplier}
                      </Text>
                    </Box>
                  </HStack>
                  <Stack overflowX="auto" pl="6">
                    <Text fontFamily={"Space Mono"}>
                      {isNaN(swapFromVal * selected.multiplier)
                        ? 0
                        : (swapFromVal * selected.multiplier).toFixed(2)}
                    </Text>
                  </Stack>
                </HStack>
              )}
            </MenuButton>
            <MenuList w="290px" bg="#1A1A1A" px={2}>
              {tokenList.map((token, index) => (
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
                    overflowX={"auto"}
                    py="2"
                  >
                    <HStack alignItems={"center"}>
                      <Avatar src={token.icon} name={token.name} />
                      <Box>
                        <Text fontWeight={"medium"} fontFamily="Space Mono">
                          {token.name}
                        </Text>
                        {/* <Text fontFamily={"Space Mono"}>{token.value}</Text> */}
                        <Text fontFamily={"Space Mono"}>
                          {token.multiplier}
                        </Text>
                      </Box>
                    </HStack>
                    <Stack>
                      <Text fontFamily={"Space Mono"}>
                        {isNaN(swapFromVal * selected.multiplier)
                          ? 0
                          : (swapFromVal * selected.multiplier).toFixed(2)}
                      </Text>
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
            <Tabs variant="soft-rounded" defaultIndex={1}>
              <TabList gap={2}>
                {slippageOptions.map((slippage, index) => (
                  <Tab
                    key={index}
                    bg="#1A1A1A"
                    color={"white"}
                    _focus={{ bg: "#97fce9", color: "black" }}
                    _selected={{ bg: "#97fce9", color: "black" }}
                    py={2}
                    px={4}
                    fontWeight={400}
                    onClick={() => {
                      setSlippage(slippage as SlippageValues);
                    }}
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
          isDisabled={
            swapFromVal >= balance ||
            swapFromVal === 0 ||
            selected.name.length === 0 ||
            isNaN(swapFromVal)
          }
          onClick={() => {
            setSelectedSwapTo(selected);
            handleScreen(2);
          }}
        >
          {!isNaN(swapFromVal) && swapFromVal !== 0
            ? swapFromVal >= balance
              ? `insufficient ${swapFromToken?.symbol} balance`
              : selected.name.length === 0
              ? "select a coin"
              : "preview swap"
            : "enter an amount"}
        </Button>
      </Stack>
    </>
  );
}
