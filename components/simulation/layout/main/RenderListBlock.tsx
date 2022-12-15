import { Box, Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { ListBlockType, TextType } from "../../types";
import { formatMentionText } from "./RenderBlock";
import { HiHashtag } from "react-icons/hi";

export const RenderListBlock = ({ block }: { block: ListBlockType[] }) => {
  const renderListTitle = (listTitle: string) => {
    return (
      <Box
        mb={4}
        key={listTitle}
        borderRadius="4px"
        w="fit-content"
        px="6"
        bg="#172118"
        border="2px solid #424242"
        lineHeight={"2.5rem"}
      >
        <Text
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight={"400"}
          color="#F2FFEA"
        >
          {listTitle}
        </Text>
      </Box>
    );
  };

  const renderListTextItems = (textItems: TextType[]) => {
    return textItems.map((item, index) => {
      const { text, linkItems } = item;
      return (
        <Box key={index}>
          <List spacing={3}>
            <Flex>
              <ListIcon as={HiHashtag} color="green.500" />
              <ListItem textAlign={"justify"}>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  lineHeight={"1.8"}
                  textAlign={"justify"}
                >
                  {formatMentionText(text, linkItems)}
                </Text>
              </ListItem>
            </Flex>
          </List>
        </Box>
      );
    });
  };

  const renderAllLists = () => {
    return block.map((b, index) => {
      const { listTitle, textItems } = b;
      return (
        <Box key={index}>
          <Box>{renderListTitle(listTitle)}</Box>
          <Box>{renderListTextItems(textItems)}</Box>
        </Box>
      );
    });
  };

  return (
    <>
      <Box>{renderAllLists()}</Box>
    </>
  );
};
