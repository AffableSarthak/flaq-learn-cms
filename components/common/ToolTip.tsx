import { Tooltip } from '@chakra-ui/react'
import React from 'react'

function ToolTip({
  text,
  children,
}: {
  text: string
  children: React.ReactNode
}) {
  return (
    <Tooltip label={text} hasArrow bg="#a6ebc9" color="black">
      {children}
    </Tooltip>
  )
}

export default ToolTip
