import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  Text,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { Spinner } from "@chakra-ui/react";
type Props = {};

const Search = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [defualtFallback, setDefaultFallback] = React.useState(true);
  const [searchResultsLoading, setSearchResultsLoading] = React.useState(false);

  const handleCleanUpOnClose = () => {
    setSearchQuery("");
    setDefaultFallback(true);
    setSearchResults([]);
    setSearchResultsLoading(false);
    onClose();
  };

  React.useEffect(() => {
    if (searchQuery.length === 0) {
      setDefaultFallback(true);
      setSearchResultsLoading(false);
      return;
    }

    setSearchResultsLoading(true);
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
          setSearchResultsLoading(false);
          return Promise.reject(error);
        })
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setDefaultFallback(false);
          setSearchResultsLoading(false);
        });
    }, 2000);

    return () => {
      clearTimeout(getData);
      setDefaultFallback(true);
      setSearchResults([]);
      setSearchResultsLoading(false);
    };
  }, [searchQuery]);

  return (
    <>
      <HStack onClick={onOpen} cursor="pointer">
        <Text
          fontWeight={"700"}
          fontSize={"20px"}
          fontFamily={"Druk Wide Bold"}
          color="#FFFFFF"
        >
          search
        </Text>
        <IconButton
          m="2"
          display={"flex"}
          alignItems={"center"}
          backdropBlur="md"
          justifyContent={"center"}
          position="static"
          variant={"unstyled"}
          fontSize="2xl"
          color={"#63D247"}
          aria-label="Search"
          icon={<BsSearch />}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={handleCleanUpOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p="0">
            <InputGroup>
              <InputLeftElement height={"100%"} pointerEvents="none">
                {searchResultsLoading ? <Spinner /> : <BsSearch />}
              </InputLeftElement>
              <Input
                variant={"SearchBar"}
                size="lg"
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </InputGroup>
            {searchResults.length > 0 ? (
              <Box h="50%" bg="#0a3b0c" borderRadius={"4px"}>
                <Flex direction={"column"}>
                  {searchResults.map(
                    (data: { title: string; url: string }, key) => {
                      return (
                        <Link passHref href={`/blog/${data.url}`} key={key}>
                          <Box
                            p="2"
                            cursor={"pointer"}
                            onClick={() => {
                              onClose();
                              setSearchResults([]);
                            }}
                            _hover={{
                              bg: "#005704",
                            }}
                          >
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
                          </Box>
                        </Link>
                      );
                    }
                  )}
                </Flex>
              </Box>
            ) : (
              <Box bg="#0a3b0c">
                <Text
                  py="8"
                  textAlign={"center"}
                  color="#ffffff"
                  lineHeight="18px"
                  fontSize={"14px"}
                >
                  {defualtFallback
                    ? "Please enter a search query"
                    : "No results found"}
                </Text>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
