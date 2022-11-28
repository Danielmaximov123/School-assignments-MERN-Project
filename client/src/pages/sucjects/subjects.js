import { Box, Button, Grid } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NewSubject from "./newSubject";
import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';
import Subject from "./subject";

const Subjects = ({ auth, user , users }) => {
  const [open, setOpen] = useState(false)
  const subjects = useSelector(state => state.subjects.subjects)

  let userSubjects = subjects.map(i => {
    let data = []
    user?.subjects.filter(j => {
      if(j.subjectId === i._id) {
        data.push(i)
      }
    })
    return data
  }).filter(s => s.length !== 0 ? s[0] : !s)

  return (
<Box>
{auth?.userType !== 'student' ? (
        <>
        <Box style={{padding: '1rem 0.2rem'}}>
          <Button onClick={() => setOpen(true)} endIcon={<LibraryAddIcon/>} variant="contained">נושא חדש</Button>
        </Box>
        <NewSubject open={open} setOpen={setOpen} user={user}/>
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
        }) : userSubjects[0]?.map(item => {
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
