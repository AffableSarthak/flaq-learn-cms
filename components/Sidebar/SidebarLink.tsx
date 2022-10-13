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
import { BlogPages } from "../../src/utils/parse-properties";
import Link from "next/link";
interface MenuListProps {
  category: string;
  blogs: BlogPages[];
}
const SidebarLink = ({
  menuList,
  closeDrawer,
}: {
  menuList: MenuListProps[];
  closeDrawer: ()=>void;
}) => {
    return (
      <Box w="full">
        <Accordion defaultIndex={[0]} allowToggle>
          {menuList.map((menu,key) => (
              <AccordionItem key={ key}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {menu.category}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {menu.blogs.map((blog, key) => (
                  <Box key={key} cursor={"pointer"} onClick={closeDrawer}>
                    <Link href={`/blog/${blog.pageId}`}>
                      <Flex
                        fontSize="14px"
                        color="#37352F"
                        key={blog.pageId}
                        fontFamily="Segoe UI"
                        fontWeight={"600"}
                        px="2"
                        borderRadius={"2"}
                        py="1"
                        _hover={{
                          bg: "#E2E2E1",
                        }}
                      >
                        <Text px="1">{blog.icon}</Text>
                        <Text>{blog.title}</Text>
                      </Flex>
                    </Link>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
};

export default SidebarLink;
