import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { AccordianBlockType, BlockType } from "../../types";
import { renderBlockTitle } from "./RenderBlock";
import { RenderListBlock } from "./RenderListBlock";
import RenderParaBlock from "./RenderParaBlock";

export const RenderAccordianBlock = ({
  block,
}: {
  block: AccordianBlockType[];
}) => {
  const renderAccordianPanel = (accordianPanel: BlockType[]) => {
    return accordianPanel.map((b, index) => {
      const { accordianBlock, blockTitle, listBlock, paraBlock } = b;
      return (
        <Box key={index}>
          <>{blockTitle ? renderBlockTitle(blockTitle) : <></>}</>
          <>{paraBlock ? <RenderParaBlock block={paraBlock} /> : <></>}</>
          <>{listBlock ? <RenderListBlock block={listBlock} /> : <></>}</>
          <>
            {accordianBlock ? (
              <RenderAccordianBlock block={accordianBlock} />
            ) : (
              <></>
            )}
          </>
        </Box>
      );
    });
  };

  const renderAccordianItem = () => {
    return block.map((item, index) => {
      const { accordianTitle, accordianPanel } = item;
      return (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton
              fontWeight={"black"}
              fontSize={"md"}
              _expanded={{
                bg: "#a6ebc9",
                color: "#040F03 ",
              }}
            >
              <Box flex="1" textAlign="left">
                {accordianTitle}
              </Box>
              <AccordionIcon fontSize={"2xl"} />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {renderAccordianPanel(accordianPanel)}
          </AccordionPanel>
        </AccordionItem>
      );
    });
  };

  return (
    <>
      <Accordion allowToggle borderColor={"green.900"} color={"#a6ebc9"}>
        {renderAccordianItem()}
      </Accordion>
    </>
  );
};
