import {
  Grid,
  Tooltip, Typography
} from "@mui/material";
import React from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import PreviewPDF from "./previewPDF";
import DeleteIcon from "@mui/icons-material/Delete";

const PdfList = (props) => {
  let file = props.file;
  let setOpen = props.setOpen;
  let open = props.open;

  const onDelete = (id) => {
    let filter = props.filesDoc.filter((i) => i.id !== id);
    props.setFilesDoc(filter);
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
        <Tooltip placement="top" title="תצוגה מקדימה">
        <PreviewIcon
          color="success"
          onClick={() => setOpen(true)}
          style={{
            margin: "0rem 0.4rem",
            fontSize: "1.7rem",
            cursor: "pointer",
          }}
        />
      </Tooltip>
      <PreviewPDF setOpen={setOpen} open={open} file={file} />
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

export default PdfList;
