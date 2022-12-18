import { Box, Center, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { ImageType, ParaBlockType, TextType } from "../../types";
import { formatMentionText } from "./RenderBlock";

function RenderParaBlock({ block }: { block: ParaBlockType[] }) {
  const renderParaTitle = (paraTitle: string) => {
    return (
      <Box mb={2}>
        <Text fontSize={"3xl"} fontWeight={"semibold"} color="#ffffff">
          {paraTitle}
        </Text>
      </Box>
    );
  };

  const renderParaTextItems = (textItems: TextType[]) => {
    return textItems.map((item, index) => {
      const { text, linkItems } = item;

      return (
        <>
          <Box key={index} mb={2}>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              lineHeight={"1.8"}
              textAlign={"justify"}
            >
              {formatMentionText(text, linkItems)}
            </Text>
          </Box>
        </>
      );
    });
  };

  const renderImage = (image: ImageType) => {
    const { src, width, height, alt } = image;
    return (
      <>
        <Center m={2}>
          <Box>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              style={{
                borderRadius: "10px",
              }}
            />
          </Box>
        </Center>
      </>
    );
  };

  const renderParagraphs = () => {
    return block.map((b, index) => {
      const { textItems, image, paraTitle } = b;
      return (
        <>
          <Box key={index} mb={2}>
            <>{paraTitle ? <>{renderParaTitle(paraTitle)}</> : <></>}</>
            <>{renderParaTextItems(textItems)}</>
            <>{image ? <>{renderImage(image)}</> : <></>}</>
          </Box>
        </>
      );
    });
  };

  return (
    <>
      <Box mb={4}>{renderParagraphs()}</Box>
    </>
  );
}

export default RenderParaBlock;
