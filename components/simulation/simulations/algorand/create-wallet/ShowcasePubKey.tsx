import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'
import shallow from 'zustand/shallow'
import ToolTip from '../../../../common/ToolTip'
import RenderBlock from '../../../layout/main/RenderBlock'
import { useCreateWalletStore } from '../../../store/algorand/createWalletStore'
import { BlockType, SimulationBlockType } from '../../../types'

export interface AllOptions {
  word: string
  index: number
  isSelected: boolean
}

function ShowcasePubKey() {
  const {
    seedPhrase,
    publicKey,
    showPublicKey,
    setShowPublicKey,
  } = useCreateWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      publicKey: state.publicKey,
      showPublicKey: state.showPublicKey,
      setShowPublicKey: state.setShowPublicKey,
    }),
    shallow,
  )

  // util functions
  const jumble = () => {
    const words = seedPhrase.split(' ')
    const jumbled = words.sort(() => Math.random() - 0.5)
    return jumbled.join(' ')
  }
  const toast = useToast()
  // state
  const [allOptions, setAllOptions] = React.useState<AllOptions[]>([])
  const [selectedList, setSelectedList] = React.useState<Array<string>>([])

  useEffect(() => {
    ;(() => {
      const jumbledVlaues = jumble()
      const tempAllOtpions: AllOptions[] = []
      seedPhrase.split(' ').forEach((word: any, index: any) => {
        tempAllOtpions.push({
          word,
          index,
          isSelected: false,
        })
      })
      setAllOptions(tempAllOtpions)
    })()

    return () => {
      setAllOptions([])
      setSelectedList([])
    }
  }, [])

  // Actions
  // 1. select word
  const selectWord = useCallback(
    (selectedWordObj: AllOptions) => {
      const tempAllOptions = [...allOptions]
      const tempSelectedList = [...selectedList]
      tempAllOptions[selectedWordObj.index].isSelected = true
      tempSelectedList.push(selectedWordObj.word)
      setAllOptions(tempAllOptions)
      setSelectedList(tempSelectedList)
    },
    [allOptions, selectedList],
  )

  // 2. unselect word
  const unselectWord = useCallback(
    (selectedWordObj: AllOptions) => {
      const tempAllOptions = [...allOptions]
      const tempSelectedList = [...selectedList]
      tempAllOptions[selectedWordObj.index].isSelected = false
      tempSelectedList.splice(tempSelectedList.indexOf(selectedWordObj.word), 1)
      setAllOptions(tempAllOptions)
      setSelectedList(tempSelectedList)
    },
    [allOptions, selectedList],
  )

  // 3. submit
  const submitHandler = useCallback(() => {
    if (selectedList.join(' ') === seedPhrase) {
      toast({
        title: 'Success',
        description: 'Seed Phrase backup is correct',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })

      setShowPublicKey(true)
    } else {
      toast({
        title: 'Failed',
        description: 'Seed Phrase backup is incorrect',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      setShowPublicKey(false)
    }
  }, [selectedList, toast])

  const isUserDataAvailable = () => {
    return seedPhrase.length !== 0
  }

  const renderPublicKey = () => {
    const simData: BlockType[] = [
      {
        paraBlock: [
          {
            textItems: [
              {
                linkItems: ['Wallet: Your Crypto Storage'],
                text:
                  'You now have access to your public key which you can use to buy crypto, sell crypto, mint NFTs, and so much more. Your wallet is now ready for use! We repeat: Don’t share your seed phrase. Don’t share your private key. Go on, and start your web3 journey!',
              },
            ],
            paraTitle: ' Congrats, your wallet is created! ',
          },
        ],
      },
    ]

    return (
      <>
        <Box>
          <RenderBlock block={simData} />
        </Box>
        <Box
          borderWidth={'0.5px'}
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          p={10}
        >
          <Center mb={2}>
            <Box>
              <Text fontFamily={'Druk Wide Bold '}>Public key</Text>
            </Box>
          </Center>

          <ToolTip text="This is your crypto identity!">
            <Center>
              <Box
                style={{
                  borderImage: 'linear-gradient(60deg, #a6ebc9, #005704)',
                  borderImageSlice: 1,
                }}
                borderRadius={'8px'}
                border="1px solid transparent"
                textAlign="center"
                as="samp"
                px="2"
                py="4"
                maxW={'80vw'}
              >
                {publicKey}
              </Box>
            </Center>
          </ToolTip>
        </Box>
      </>
    )
  }

  return (
    <Center my="8">
      {isUserDataAvailable() ? (
        <>
          <Flex flexDirection={'column'} alignItems={'center'}>
            <Box width={'fit-content'}>
              <RenderSelectedWords selectedList={selectedList} />

              <RenderAllWords
                allOptions={allOptions}
                selectWord={selectWord}
                unselectWord={unselectWord}
              />
              <RenderButton
                selectedList={selectedList}
                submitHandler={submitHandler}
              />
            </Box>
            <Box w={{ base: '90vw', md: '60vw', lg: '70vw' }} boxShadow={'sm'}>
              {showPublicKey ? renderPublicKey() : null}
            </Box>
          </Flex>
        </>
      ) : (
        <Center>
          <Box>
            <Text color="#a6ebc9">
              Create a wallet to get your secret recovery phrase in previous
              step
            </Text>
          </Box>
        </Center>
      )}
    </Center>
  )
}

const RenderSelectedWords = ({
  selectedList,
}: {
  selectedList: Array<string>
}) => {
  return (
    <Center>
      <Box
        minH={{ base: '267px', md: '300px' }}
        border={'1px solid #d6d9dc'}
        borderRadius="6px"
        w="96%"
      >
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          gap={1}
          m={8}
        >
          {selectedList.map((word, index) => (
            <GridItem key={index}>
              <Button
                border={'1px solid #037dd619'}
                borderRadius="4px"
                color="#ffffff"
                display={'flex'}
                justifyContent={'center'}
                alignItems="center"
                alignContent="center"
                width="120px"
                h="41px"
              >
                {word}
              </Button>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Center>
  )
}

const RenderAllWords = ({
  allOptions,
  selectWord,
  unselectWord,
}: {
  allOptions: AllOptions[]
  selectWord: (selectedWordObj: AllOptions) => void
  unselectWord: (selectedWordObj: AllOptions) => void
}) => {
  return (
    <Center>
      <Box minH="140px" mt="5" w="fit-content">
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          gap={1}
        >
          {allOptions.map((wordObj, index) => (
            <GridItem key={index}>
              <Button
                border={'1px solid #a6ebc9'}
                bg={`${wordObj.isSelected ? '#a6ebc9' : 'transparent'}`}
                color={`${wordObj.isSelected ? '#000000' : '#ffffff'}`}
                borderRadius={'4px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems="center"
                alignContent="center"
                width="120px"
                h="41px"
                onClick={() => {
                  if (wordObj.isSelected) {
                    unselectWord(wordObj)
                  } else {
                    selectWord(wordObj)
                  }
                }}
                variant={'primarybtn'}
              >
                {wordObj.word}
              </Button>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Center>
  )
}

const RenderButton = ({
  selectedList,
  submitHandler,
}: {
  selectedList: Array<string>
  submitHandler: () => void
}) => {
  return (
    <Box my="5" mx="5" textAlign={'center'}>
      <Button
        px="12"
        variant={'primarybtn'}
        disabled={selectedList.length !== 25}
        onClick={submitHandler}
      >
        Verify Seed Phrase
      </Button>
    </Box>
  )
}

export default ShowcasePubKey
