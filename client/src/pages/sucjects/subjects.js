import { Box, Button, Grid } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NewSubject from "./newSubject";
import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';
import Subject from "./subject";

const Subjects = ({ auth, user }) => {
  const [open, setOpen] = useState(false)
  const subjects = useSelector(state => state.subjects.subjects)


  return (
<Box>
{user?.userType === "admin" || user?.userType === "teacher" ? (
        <>
        <Box style={{padding: '1rem 0.2rem'}}>
          <Button onClick={() => setOpen(true)} endIcon={<LibraryAddIcon/>} variant="contained">נושא חדש</Button>
        </Box>
        <NewSubject open={open} setOpen={setOpen} user={user}/>
        </>
      ) : null}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto'}}>
      {
        subjects?.map(item => {
          return(
            <Fragment key={item?._id}>
              <Subject subject={item}/>
            </Fragment>
          )
        })
      }
      </Grid>
</Box>
  );
};

export default Subjects;
