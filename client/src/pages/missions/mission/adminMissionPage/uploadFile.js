import { Box, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch } from 'react-redux';
import { getAddFileToMission } from "../../../../redux/actions/getMissionAction";

const UploadFileUpdate = ({mission}) => {
  const dispatch = useDispatch()

const onChange = e => {
    let form = new FormData()
    form.append('file' , e.target.files[0])
    dispatch(getAddFileToMission(mission._id , form))
}

  return (
    <Box style={{textAlign: 'center', marginTop: '0.5rem'}}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          להוסיף מסמכים
          <input
            hidden
            accept={".pdf"}
            type="file"
            onChange={(e) => onChange(e)}
          />
        </Button>{" "}
        <br />
    </Box>
  );
};

export default UploadFileUpdate;
