import { Box, Button, Center, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'

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
      <Box border="2px" mx={10} my={5} p={5}>
        {selectedList.map((word, index) => (
          <Text fontSize={'2xl'} key={index}>
            {word}
          </Text>
        ))}
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
    <>
      {allOptions.map((wordObj, index) => (
        <Button
          key={index}
          onClick={() => {
            if (wordObj.isSelected) {
              unselectWord(wordObj)
            } else {
              selectWord(wordObj)
            }
          }}
          m={1}
          colorScheme={wordObj.isSelected ? 'green' : 'blue'}
        >
          {wordObj.word}
        </Button>
      ))}
    </>
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
    <Center>
      <Button
        colorScheme="blue"
        disabled={selectedList.length !== 12}
        onClick={submitHandler}
      >
        Submit
      </Button>
    </Center>
  )
}

function ShowcasePublicKey() {
  const mmnonic =
    'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'

  // util functions
  const jumble = () => {
    const words = mmnonic.split(' ')
    const jumbled = words.sort(() => Math.random() - 0.5)
    return jumbled.join(' ')
  }

  // state
  const [allOptions, setAllOptions] = React.useState<AllOptions[]>([])
  const [selectedList, setSelectedList] = React.useState<Array<string>>([])

  useEffect(() => {
    ;(() => {
      const jumbledVlaues = jumble()
      const tempAllOtpions: AllOptions[] = []
      jumbledVlaues.split(' ').forEach((word, index) => {
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
    if (selectedList.join(' ') === mmnonic) {
      alert('correct')
    } else {
      alert('incorrect')
    }
  }, [selectedList])

  return (
    <>
      <div>
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
      </div>
    </>
  )
}

export default ShowcasePublicKey
