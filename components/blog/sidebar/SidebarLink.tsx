import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BlogPages, getBlogUrl } from "../../../src/utils/parse-properties";
import Link from "next/link";
import { BsPen } from "react-icons/bs";
interface MenuListProps {
  category: string;
  blogs: BlogPages[];
}
const SidebarLink = ({
  menuList,
  closeDrawer,
}: {
  menuList: MenuListProps[];
  closeDrawer: () => void;
}) => {
  return (
    <Box w="full">
      {menuList.map((menu, tabkey) => (
        <Accordion
          defaultIndex={menu.blogs.length > 3 ? 1 : 0}
          w="full"
          key={tabkey}
          my="1"
          allowToggle
          variant={"unstyled"}
        >
          <AccordionItem
            borderBottomWidth="0"
            borderTopWidth="0"
            my="0"
            borderRadius={"4px"}
            py="2"
            sx={{
              ":last-of-type": {
                borderBottomWidth: "0",
              },
            }}
          >
            <AccordionButton
              fontSize={"0.9rem"}
              textAlign={"center"}
              fontWeight={"600"}
              backgroundColor="#1A1A1A"
              border="1px solid #000000"
              py={"2"}
              _hover={{
                backgroundColor: "#1A1A1A ",
                outline: "1px solid #040F03",
              }}
              borderRadius={"sm"}
              backdropFilter="blur(100px)"
              w="full"
              color={"#F2FFEA"}
              lineHeight={"1.4rem"}
              justifyContent={"space-between"}
            >
              <Text>{menu.category}</Text>
              <AccordionIcon fontSize={"2rem"} />
            </AccordionButton>
            <AccordionPanel>
              <Box pb="2" borderLeft={"2px solid #ffffff"}>
                {menu.blogs.map((blog, key) => (
                  <Box
                    key={key}
                    py="1"
                    cursor={"pointer"}
                    onClick={closeDrawer}
                  >
                    <Link
                      href={`/${menu.category
                        .toLowerCase()
                        .split(" ")
                        .join("-")}/${getBlogUrl(blog.url)}`}
                      passHref
                    >
                      <Flex
                        fontSize="14px"
                        key={blog.pageId}
                        fontFamily="Poppins"
                        fontWeight={"600"}
                        px="2"
                        borderRadius={"50"}
                        py="1"
                      >
                        {blog.icon ? (
                          <Text px="1">{blog.icon}</Text>
                        ) : (
                          <Box p="1.5">
                            <BsPen />
                          </Box>
                        )}
                        <Text>{blog.title}</Text>
                      </Flex>
                    </Link>
                  </Box>
                ))}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};

export default SidebarLink;
