import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ShowDetails = ({ ques, children }) => {
  return (
    <Box className="showDetails" pb={1}>
      <Typography variant="overline">{ques}</Typography>
      {children}
    </Box>
  )
}

export default ShowDetails
