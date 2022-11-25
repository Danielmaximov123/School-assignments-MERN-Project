import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import UploadFileMission from "./uploadMissionFile/uploadFileMission";
import PdfSubmitMissionList from "./uploadMissionFile/pdfSubList";
import PublishIcon from "@mui/icons-material/Publish";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { getSubmitMissionStudent } from "../../../redux/actions/getMissionAction";
import { useParams } from 'react-router-dom';

const SubmitMission = ({ studentMission , auth}) => {
  const missionLoading = useSelector((state) => state.missions.missionLoading);
  const { id } = useParams()
  const dispatch = useDispatch()
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ note, files });
    const form = new FormData();
        form.append('missionInfo' , JSON.stringify({note , missionStudentId : studentMission.studentId}))
        for (let i = 0; i < files.length; i++) {
          form.append("file", files[i].file);
        }
        await dispatch(getSubmitMissionStudent(id  , form))
  };

  const handleReset = () => {
    setFiles([]);
    setNote("");
  };

  return (
    <Box
      sx={{
        direction: "rtl",
        textAlign: "center",
        height: "auto",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "0.625rem",
        padding: "1rem",
        backgroundColor: "rgb(255, 255, 255)",
      }}
    >
      <Typography style={{ textAlign: "center" , margin : '1rem' }} variant="h5">
        הגשת משימה
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          style={{ marginBottom: "0.5rem", direction: "rtl" }}
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
              style={{ direction: "rtl" }}
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
      <Box style={{direction : 'rtl'}}>
      <LoadingButton
          loading={missionLoading}
          loadingPosition="end"
          style={{margin : '1rem'}}
          endIcon={<PublishIcon />}
          variant="contained"
          color="success"
          type="submit"
        >
          הגש משימה
        </LoadingButton>
        <Button
          onClick={(e) => handleReset(e)}
          variant="contained"
          color="warning"
          endIcon={<RestartAltIcon />}
        >
          ברירת מחדל
        </Button>
      </Box>
      </Box>
    </Box>
  );
};

export default SubmitMission;
