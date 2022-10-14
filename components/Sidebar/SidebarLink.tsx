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
import React, { useEffect } from "react";
import { BlogPages } from "../../src/utils/parse-properties";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { slug } = router.query;
  const [activeAccordion, setActiveAccordion] = React.useState(-1);
  useEffect(() => {
    menuList.forEach((menu, index) => {
      menu.blogs.forEach((blog) => {
        if (blog.pageId === slug) {
          console.log("active", index);
          setActiveAccordion(index);
        }
      });
    });
  }, [activeAccordion, menuList]);

  return (
    <Box w="full">
      <Accordion allowMultiple>
        {menuList.map((menu, tabkey) => (
          <AccordionItem key={tabkey}>
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
                      color={`#37352F`}
                      key={blog.pageId}
                      fontFamily="Segoe UI"
                      fontWeight={"600"}
                      px="2"
                      borderRadius={"2"}
                      py="1"
                      bg={`${slug === blog.pageId ? "#E2E2E1" : ""}`}
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
