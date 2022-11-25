import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import DocumentAdmin from './missionDocumentAdmin'

const AdminMissionDocument = ({ mission , auth }) => {
  return (
    <Box>
    <TableContainer style={{direction : 'rtl' , width: '50%'}} component={Paper}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell style={{textAlign: 'center'}}>שם קובץ</TableCell>
        <TableCell style={{textAlign: 'center'}}>תצוגה מקדימה</TableCell>
        <TableCell style={{textAlign: 'center'}}>הורדה</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {mission?.files?.map((row) => (
        <TableRow
          key={row._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
        >
          <DocumentAdmin document={row} auth={auth}/>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </Box>
  )
}

export default AdminMissionDocument