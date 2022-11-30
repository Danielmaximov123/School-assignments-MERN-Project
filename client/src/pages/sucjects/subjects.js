import { Box, Button, Grid } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NewSubject from "./newSubject";
import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';
import Subject from "./subject";
import { useNavigate } from 'react-router-dom';

const Subjects = ({ auth, user , users }) => {
  const subjects = useSelector(state => state.subjects.subjects)
  const navigate = useNavigate()

  let userSubjects = user?.subjects.map(i => {
    let usersSubjects = []
    subjects.filter(j => j._id.includes(i) && usersSubjects.push(j))
    return usersSubjects
  }).filter(s => s.length !== 0 ? s[0] : !s).map(item => {
    return item[0]
  })

  let usersSubjects = [...new Map(userSubjects?.map((m) => [m._id, m])).values()]
  return (
<Box>
{auth?.userType !== 'student' ? (
        <>
        <Box style={{padding: '1rem 0.2rem'}}>
          <Button onClick={() => navigate('add-new')} endIcon={<LibraryAddIcon/>} variant="contained">נושא חדש</Button>
        </Box>
        </>
      ) : null}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto'}}>
      { auth?.userType !== 'student' ?
        subjects?.map(item => {
          return(
            <Fragment key={item?._id}>
              <Subject users={users} auth={auth} subject={item}/>
            </Fragment>
          )
        }) : usersSubjects?.map(item => {
          return(
            <Fragment key={item?._id}>
              <Subject users={users} auth={auth} subject={item}/>
            </Fragment>
          )
        })
      }
      </Grid>
</Box>
  );
};

export default Subjects;
