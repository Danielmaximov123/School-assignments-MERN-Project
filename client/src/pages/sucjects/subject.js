import { Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSubject from "./adminSubject";

const Subject = ({ subject , auth, users}) => {
  const missions = useSelector((state) => state.missions.missions);
  const missionLoading = useSelector((state) => state.missions.missionLoading);

  let getMission = missions.filter(m => m.subject === subject._id)
  let getStudents = users?.map(i=> i.subjects).filter(j => j.includes(subject._id))

  console.log(getStudents);
  
  return (
    <Grid
      id="gridSubject"
      item
      xs={12}
      md={4}
      style={{
        boxShadow:
          "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        borderRadius: "1rem",
        padding: "1rem",
        marginLeft : '1rem',
        marginBottom : '1rem'
      }}
    >
      {
        auth.userType === 'student' &&
        <>
        <Typography variant="h6">{subject?.title}</Typography>
      <Typography variant="subtitle1">{subject?.description}</Typography> <br/>
      <Typography variant="subtitle2">משימות : {getMission?.length}</Typography>
        </>
      }
      { auth.userType !== 'student' &&
      <>
      <AdminSubject subject={subject}/>
      <Chip style={{margin : '0.5rem'}} label={`משימות : ${getMission?.length}`} color="success" variant="outlined" />
      <Chip style={{margin : '0.5rem'}} label={`סטודנטים : ${getStudents?.length}`} color="success" variant="outlined" />
      </>
      }
    </Grid>
  );
};

export default Subject;
