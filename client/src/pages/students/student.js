import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditStudentProfile from './EditStudentProfile';
import StudentPhoto from './StudentPhoto';

const StudentComp = ({users}) => {
  const { id } = useParams()
  let user = users.find(user => user._id === id)

  useEffect(() => {
    document.title = `${user.fName} ${user.lName} - משימות הבית שלי`
 }, [user])


  return (
    <Box style={{ height: '25.45rem', width: '100%' , marginLeft : 'auto' , marginRight : 'auto' , textAlign : 'center' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={4}>
          <Box style={{
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              borderRadius: "1rem",
              padding: "3rem",
            }}>
          <StudentPhoto user={user} />
          </Box>
        </Grid>
        <Grid item xs>
          <Box
            style={{
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              borderRadius: "1rem",
              padding: "3rem",
            }}
          >
            <EditStudentProfile user={user} /> 
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StudentComp