import React from 'react'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Fragment } from 'react';
import Document from './document';
import UploadFileUpdate from './adminMissionPage/uploadFile';

const MissionDocument = ({mission , auth}) => {

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
        <Typography style={{ textAlign: "center" , margin : '1rem'}} variant="h5">
            קבצים
        </Typography>
        <Box>
        <TableContainer style={{direction : 'rtl'}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{textAlign: 'center'}}>שם קובץ</TableCell>
            <TableCell style={{textAlign: 'center'}}>תצוגה מקדימה</TableCell>
            <TableCell style={{textAlign: 'center'}}>הורדה</TableCell>
            { auth?.userType !== 'student' && <TableCell style={{textAlign: 'center'}}>מחיקה</TableCell> }
          </TableRow>
        </TableHead>
        <TableBody>
          {mission?.files?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <Document document={row} auth={auth}/>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    {
      auth?.userType !== 'student' && <Box>
      <UploadFileUpdate mission={mission}/>
    </Box>
    }
    </Box>
  )
}

export default MissionDocument