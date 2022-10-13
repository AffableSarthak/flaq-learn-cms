import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import { BlogPages } from '../../src/utils/parse-properties';
import SidebarContent from './SidebarContent';

type DesktopSidebarProps = {
    openSidebar: boolean;
    cycleOpenSidebar: () => void;
    blogData: BlogPages[];
    onClose: Function;
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0,
      staggerDirection: 1,
    },
  },
};
const DesktopSidebar = ({openSidebar,blogData,cycleOpenSidebar,onClose }: DesktopSidebarProps) => {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      {openSidebar && (
        <motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 305,
            height: "100vh",
          }}
          transition={{ bounce: 0 }}
          exit={{
            width: 0,
            transition: { delay: 0.1, duration: 0.1, bounce: 0 },
          }}
        >
          <motion.div
            className="container"
            style={{
              height: "100vh",
            }}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
          >
            <Box
              px="4"
              bgColor="#FBFBFA"
              borderRight={"2px solid #ebebe1"}
              mx="1"
              left={0}
              w="298px"
              top={0}
              minH="100%"
            >
              <SidebarContent
                closeDrawer={onClose}
                blogData={blogData}
                isSidebarOpen={openSidebar}
                toggleSidebar={cycleOpenSidebar}
              />
            </Box>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default DesktopSidebar