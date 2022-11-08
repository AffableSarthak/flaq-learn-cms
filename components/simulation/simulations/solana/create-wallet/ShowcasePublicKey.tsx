import { Box, Button, Center, Grid, GridItem, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'
import { useCreateWalletStore } from '../../../store/create-wallet'

export interface AllOptions {
  word: string
  index: number
  isSelected: boolean
}

const RenderSelectedWords = ({
  selectedList,
}: {
  selectedList: Array<string>
}) => {
  return (
    <Center>
      <Box
        minH={'155px'}
        border={'1px solid #d6d9dc'}
        borderRadius="6px"
        w="100%"
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={2} p="2" px="4">
          {selectedList.map((word, index) => (
            <GridItem
              border={'1px solid #037dd619'}
              borderRadius="4px"
              color="#037dd6"
              display={'flex'}
              justifyContent={'center'}
              alignItems="center"
              alignContent="center"
              width="128px"
              h="41px"
              key={index}
            >
              {word}
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
      <Box h="140px" mt="5" w="fit-content">
        <Grid templateColumns="repeat(4, 1fr)" gap={2} p="2" px="4">
          {allOptions.map((wordObj, index) => (
            <GridItem
              border={'1px solid #037dd6'}
              bg={`${wordObj.isSelected ? '#037dd6' : '#ffffff'}`}
              color={`${wordObj.isSelected ? '#ffffff' : '#037dd6'}`}
              borderRadius={'4px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems="center"
              alignContent="center"
              width="128px"
              h="41px"
              key={index}
              onClick={() => {
                if (wordObj.isSelected) {
                  unselectWord(wordObj)
                } else {
                  selectWord(wordObj)
                }
              }}
            >
              {wordObj.word}
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
    <Box my="5" mx="5" textAlign={'left'}>
      <Button
        borderRadius={'100px'}
        px="12"
        bg="#037dd6"
        color="#ffffff"
        _hover={{
          _disabled: {
            bg: '#037dd6',
          },
        }}
        disabled={selectedList.length !== 12}
        onClick={submitHandler}
      >
        Submit
      </Button>
    </Box>
  )
}

function ShowcasePublicKey() {
  const userWalletDetails = useCreateWalletStore(
    (state: { userWalletDetails: any }) => state.userWalletDetails,
  )
  const { seedPhrase, publicKey } = userWalletDetails

  // util functions
  const jumble = () => {
    const words = seedPhrase.split(' ')
    console.log(words)
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
      jumbledVlaues.split(' ').forEach((word: any, index: any) => {
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
        description: 'Mnemonic is correct',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Failed',
        description: 'Mnemonic is incorrect',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [selectedList, toast])

  return (
    <Center my="8">
      <Box w="fit-content">
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
    </Center>
  )
}

export default ShowcasePublicKey
