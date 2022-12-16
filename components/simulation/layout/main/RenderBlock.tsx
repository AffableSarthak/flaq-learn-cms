import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { BlockType } from "../../types";
import links from "../../utils/links";
import { RenderAccordianBlock } from "./RenderAccordianBlock";
import { RenderListBlock } from "./RenderListBlock";
import RenderParaBlock from "./RenderParaBlock";

export const formatMentionText = (text: string, values: string[]) => {
  const regex = new RegExp(/\[\[(.*?)\]\]/);
  if (!values.length) return text;
  const split = text.split(regex);
  return (
    <div>
      {
        // @ts-ignore
        split.reduce((prev: string, current: string, i: number) => {
          if (!i) return [current];

          return prev.concat(
            // @ts-ignore
            values.includes(current) ? (
              <Link color="teal.500" href={links[current]} target="_blank">
                <b> {current}</b>
              </Link>
            ) : (
              current
            )
          );
        }, [])
      }
    </div>
  );
};

export const renderBlockTitle = (title: string) => {
  return (
    <Box>
      <Text
        color="#B5E8CC"
        fontSize={{
          base: "1rem",
          md: "2rem",
        }}
        fontWeight={"600"}
      >
        {title}
      </Text>
    </Box>
  );
};

function RenderBlock({ block }: { block: BlockType[] }) {
  const renderBlocks = (block: BlockType[]) => {
    return block.map((b, index) => {
      const { accordianBlock, blockTitle, listBlock, paraBlock } = b;
      return (
        <Flex flexDirection={"column"} gap={2} key={index}>
          <Box>{blockTitle ? renderBlockTitle(blockTitle) : <></>}</Box>
          <Box>{paraBlock ? <RenderParaBlock block={paraBlock} /> : <></>}</Box>
          <Box>{listBlock ? <RenderListBlock block={listBlock} /> : <></>}</Box>
          <Box>
            {accordianBlock ? (
              <RenderAccordianBlock block={accordianBlock} />
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      );
    });
  };

  return <Box my={4}>{renderBlocks(block)}</Box>;
}

export default RenderBlock;
