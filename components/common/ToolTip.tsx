import { Tooltip } from '@chakra-ui/react'
import React from 'react'

function ToolTip({
  text,
  children,
  isDark
}: {
  text: string
  children: React.ReactNode
  isDark?: boolean
}) {
  return (
    <Tooltip label={text} hasArrow bg={isDark ? '#70ffe9' : "#a6ebc9"} color="black">
      {children}
    </Tooltip>
  )
}

export default ToolTip
