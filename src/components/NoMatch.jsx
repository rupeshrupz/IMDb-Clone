import React from 'react'
import WrapperComponent from '../HOC/WrapperComponent'
import { Box, Typography } from '@mui/material'

const NoMatch = () => {
  return (
    <Box sx={{minHeight:"300px",display:"flex",alignItems:'center',justifyContent:"center"}}>
      <Typography sx={{fontSize:"40px", color:"gray"}}>
        No Match Found
      </Typography>
    </Box>
  )
}

export default WrapperComponent(NoMatch)