import { Grid, Typography } from "@mui/material";
import React from "react";

const Subject = ({ subject }) => {
  
  return (
    <Grid
      id="gridSubject"
      item
      xs={3.75}
      style={{
        boxShadow:
          "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        borderRadius: "1rem",
        textAlign: "center",
        padding: "1rem",
        marginLeft : '1rem',
        marginBottom : '1rem'
      }}
    >
      <Typography variant="h6">{subject?.title}</Typography>
      <Typography variant="span">{subject?.description}</Typography>
      
    </Grid>
  );
};

export default Subject;
