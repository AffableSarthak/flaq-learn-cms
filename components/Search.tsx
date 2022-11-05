import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  Text,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { BsSearch } from "react-icons/bs";

type Props = {};

const Search = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  React.useEffect(() => {
    const getData = setTimeout(() => {
      fetch("/api/notion-search", {
        method: "POST",
        body: JSON.stringify({
          query: searchQuery,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res;
          }
          const error: any = new Error(res.statusText);
          error.response = res;
          return Promise.reject(error);
        })
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          console.log(searchResults);
          console.log("success");
        });
    }, 2000);

    return () => clearTimeout(getData);
  }, [searchQuery]);
  return (
    <>
      <IconButton
        m="2"
        display={"flex"}
        alignItems={"center"}
        backdropBlur="md"
        justifyContent={"center"}
        bg="#005704"
        position="static"
        variant={"unstyled"}
        color="#A6EBC9"
        onClick={onOpen}
        fontSize="3xl"
        aria-label="Search"
        icon={<BsSearch />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p="0">
            <InputGroup>
              <InputLeftElement
                height={"100%"}
                pointerEvents="none"
                children={<BsSearch />}
              />
              <Input
                variant={"SearchBar"}
                size="lg"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Box p="2" bg="#005704">
              <Flex direction={"column"}>
                {searchResults.map(
                  (data: { title: string; url: string }, key) => {
                    return (
                      <Box key={key} p="1">
                        <Box my="1">
                          <Text
                            color="#ffffff"
                            lineHeight="18px"
                            fontSize={"14px"}
                            fontWeight={"500"}
                          >
                            {data.title}
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            color="#ffffff"
                            lineHeight="19px"
                            fontSize={"13px"}
                            fontWeight={"400"}
                          >
                            A cryptocurrency is a digital currency. It does not
                            exist physically, and is therefore, intangible.
                            Famous examples of cryptocurrencies include Solana,
                            Bitcoin, Ethereum, and Litecoin.
                          </Text>
                        </Box>
                      </Box>
                    );
                  }
                )}
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
