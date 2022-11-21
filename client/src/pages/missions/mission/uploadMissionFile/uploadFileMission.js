import { Box, Button, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadFileMission = (props) => {

  const onChange = e => {
    let id = Math.floor(Math.random() * 100)
    Array.from(e.target.files).map((item) => {
        return props.setFiles([...props.files , {id , file : item}])
    })
}

  return (
    <Box textAlign='center'>
        <Button
          variant="contained"
          component="label"
          style={{direction : 'rtl'}}
          endIcon={<CloudUploadIcon />}
        >
          להוסיף מסמכים
          <input
            hidden
            accept={".pdf"}
            type="file"
            onChange={(e) => onChange(e)}
          />
        </Button>{" "}
    </Box>
  )
}

export default UploadFileMission