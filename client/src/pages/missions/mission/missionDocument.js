import React from 'react'
import { Box, Typography } from '@mui/material';

const MissionDocument = () => {
  return (
    <Box
    sx=
    {{
      direction: "rtl",
      height: "auto",
      boxShadow:
        "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
      borderRadius: "0.625rem",
      padding: "1rem",
      backgroundColor: "rgb(255, 255, 255)",
    }}>
        <Typography style={{ textAlign: "center" }} variant="h5">
            קבצים
        </Typography>
    
    </Box>
  )
}

export default MissionDocument