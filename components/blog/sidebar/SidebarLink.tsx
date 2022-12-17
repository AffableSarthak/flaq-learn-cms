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
        >
          <AccordionItem>
            <AccordionButton
              fontSize={"xs"}
              textAlign={"center"}
              fontWeight={"600"}
              backgroundColor="#020F02"
              py={"2"}
              _hover={{
                backgroundColor: "#020F02",
                outline: "1px solid #70FFE9",
              }}
              borderRadius={"sm"}
              backdropFilter="blur(100px)"
              w="full"
            >
              {menu.category}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Box pb="2">
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
