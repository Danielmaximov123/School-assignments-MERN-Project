import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import DocumentAdmin from './missionDocumentAdmin'

const AdminMissionDocument = ({ mission , auth }) => {
  return (
    <Box>
    <TableContainer style={window.screen.width > 1000 ? {direction : 'rtl' , width: '50%'} : {direction : 'rtl'}} component={Paper}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell style={{textAlign: 'center'}}>שם קובץ</TableCell>
        <TableCell style={{textAlign: 'center'}}>תצוגה מקדימה</TableCell>
        <TableCell style={{textAlign: 'center'}}>הורדה</TableCell>
        <TableCell style={{textAlign: 'center'}}>מחיקה</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {mission?.files?.map((row) => (
        <TableRow
          key={row._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
        >
          <DocumentAdmin mission={mission} document={row} auth={auth}/>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </Box>
  )
}

export default AdminMissionDocument