import { Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewPDF from "./../../previewPDF";

const PdfSubmitMissionList = (props) => {
  let file = props.file;
  let setOpen = props.setOpen;

  const onDelete = (id) => {
    let filter = props.files.filter((i) => i.id !== id);
    props.setFiles(filter);
  };

  return (
    <>
      <Grid item xs={8}>
        <Typography
          variant="span"
          style={{ fontSize: "1rem", verticalAlign: "super" }}
        >
          {file?.file.name}
        </Typography>
      </Grid>

        <Grid item xs={2}>
          <Tooltip placement="top" title={file.file.type === "application/pdf" ? 'תצוגה מקדימה' : 'אין תצוגה מקדימה'}>
            <PreviewIcon
              color={file.file.type === "application/pdf" ? "success" : 'disabled'}
              onClick={() => file.file.type === "application/pdf" && setOpen(true)}
              style={file.file.type === "application/pdf" ? {
                margin: "0rem 0.4rem",
                fontSize: "1.7rem",
                cursor: "pointer",
              } : {margin: "0rem 0.4rem",
              fontSize: "1.7rem"
              }}
            />
          </Tooltip>
          {file.file.type === "application/pdf" && <PreviewPDF setOpen={setOpen} open={props.open} file={file} /> }
        </Grid>
      <Grid item xs={2}>
        <Tooltip placement="top" title="מחק">
          <DeleteIcon
            color="error"
            style={{ fontSize: "1.7rem", cursor: "pointer" }}
            onClick={() => onDelete(file.id)}
          />
        </Tooltip>
      </Grid>
    </>
  );
};

export default PdfSubmitMissionList;
