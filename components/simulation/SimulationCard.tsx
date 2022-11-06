import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { Block, ListType, SimKey, simulationProps } from './SimulationProps'
import Airdrop from './solana/create-wallet/Airdrop'
import BackupSeedPhrase from './solana/create-wallet/BackupSeedPhrase'
import GenKeyPair from './solana/create-wallet/GenKeyPair'
import ShowcasePublicKey from './solana/create-wallet/ShowcasePublicKey'

type Props = {
  currentSimulation: simulationProps
  simulationHeader: string
}

const SimulationCard = ({ currentSimulation, simulationHeader }: Props) => {
  const { renderBlocks } = currentSimulation

  const renderSimulation = (simkey: SimKey) => {
    switch (simkey) {
      case SimKey.GenKeyPair:
        return <GenKeyPair />
      case SimKey.BackupSeedPhrase:
        return <BackupSeedPhrase />
      case SimKey.ShowcasePublicKey:
        return <ShowcasePublicKey />
      case SimKey.Airdrop:
        return <Airdrop />
      default:
        return <></>
    }
  }

  const renderList = (list: ListType[] | undefined): ReactNode => {
    if (list !== undefined) {
      return list.map((item, index) => {
        const { head, body, image, simKey } = item
        return (
          <Box key = {index}>
            <Box mt={4} mb={10}>
              <Text as="samp" fontSize="2xl">
                {head}
              </Text>
              <Flex>
                <Box width={image !== undefined ? '60vw' : '100vw'}>
                  <Text as="samp">{body}</Text>
                </Box>
                <Spacer />
                {image && (
                  <Box ml={4}>
                    <Image
                      src={image}
                      height="141px"
                      width="248px"
                      style={{ borderRadius: '25px' }}
                    />
                  </Box>
                )}
              </Flex>
              {simKey && renderSimulation(simKey)}
            </Box>
          </Box>
        )
      })
    }
  }

  const renderUiForBlocks = (blocks: Block[]): ReactNode => {
    return blocks.map((block: Block,key) => {
      const { image, subHeader, list } = block
      return (
        <Box key={key }>
          <Box>
            <Text as="samp" fontSize="4xl">
              {subHeader}
            </Text>
          </Box>
          <Box>{renderList(list)}</Box>
        </Box>
      )
    })
  }

  return (
    <>
      <Box h="100%" boxShadow={'sm'} p={5}>
        <Box>
          <Text as="samp" fontSize="6xl">
            {simulationHeader}
          </Text>
        </Box>
        <Box>{renderUiForBlocks(renderBlocks)}</Box>
      </Box>
    </>
  )
}

export default SimulationCard
