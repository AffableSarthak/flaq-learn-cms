import { Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

type Props = {}

const ReadProgressBar = (props: Props) => {
  const [width, setWidth] = useState(0)
  // scroll function
  const scrollHeight = () => {
    var el = document.getElementById('box') || document.body,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight
    var percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100
    // store percentage in state
    setWidth(percent)
  }

  useEffect(() => {
    const el = document.getElementById('box') || document.body
    el.addEventListener('scroll', scrollHeight)
    return () => el.removeEventListener('scroll', scrollHeight)
  })

  return (
    <Box
      width={`${width}%`}
      position="fixed"
      height="4px"
      zIndex="102"
      borderRadius="0px 2px 0px 0px"
      background=" linear-gradient(90deg, rgb(48, 130, 61,1) 0%, rgb(27, 111, 36,1) 100%, rgb(15, 68, 20,1) 100% )"
    ></Box>
  )
}

export default ReadProgressBar
