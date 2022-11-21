import { Box, TextField, Typography , Grid } from "@mui/material";
import { useState } from "react";
import UploadFileMission from "./uploadMissionFile/uploadFileMission";
import PdfSubmitMissionList from "./uploadMissionFile/pdfSubList";

const SubmitMission = ({ studentMission }) => {
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false)

  

  return (
    <Box
      sx={{
        direction: "rtl",
        height: "auto",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "0.625rem",
        padding: "1rem",
        backgroundColor: "rgb(255, 255, 255)",
      }}
    >
      <Typography style={{ textAlign: "center" }} variant="h5">
        הגשת משימה
      </Typography>
      <Box component="form">
        <TextField
          style={{ marginBottom: "0.5rem" }}
          fullWidth
          variant="standard"
          inputProps={{ maxLength: 130 }}
          helperText={`130/${note.length} תווים`}
          value={note || ""}
          onChange={(e) => setNote(e.target.value)}
          multiline
          minRows={3}
          maxRows={4}
          type="text"
          label="הערות"
        />
        <UploadFileMission files={files} setFiles={setFiles} />
        {Array.from(files).map((item) => {
          return (
            <Grid
              key={item.id}
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              marginTop="0.5rem"
              style={{direction: "rtl"}}
            >
              <PdfSubmitMissionList
                file={item}
                setOpen={setOpen}
                open={open}
                setFiles={setFiles}
                files={files}
              />
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
};

export default SubmitMission;
