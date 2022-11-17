import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import PreviewPDF from './previewPDF';

const UploadFile = (props) => {
  const [open, setOpen] = useState(false)

const onChange = e => {
    let id = Math.floor(Math.random() * 100)
    Array.from(e.target.files).map((item) => {
        return props.setFilesDoc([...props.filesDoc , {id , file : item}])
    })
}


  return (
    <Box style={{textAlign: 'center', marginTop: '0.5rem'}}>
        <Button
          disabled={props.filesDoc.length === 5 ? true : false}
          variant="contained"
          component="label"
          endIcon={<UploadFileIcon />}
        >
          לעלות מסמכים
          <input
            hidden
            accept={".pdf"}
            type="file"
            onChange={(e) => onChange(e)}
          />
        </Button>{" "}
        <br />
        <Typography variant="subtitle1" fontSize="0.8rem" textAlign="center" color='#2A8BED'>
          עד 5 קבצים
        </Typography>
    </Box>
  );
};

export default UploadFile;
