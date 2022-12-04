import { Dialog, DialogContent, DialogContentText, DialogTitle, Box, Typography } from '@mui/material';
import FormNewMission from './formNewMission';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const NewMission = (props) => {

  useEffect(() => {
    document.title = 'משימה חדשה - משימות הבית שלי'
 }, [])
  
  return (
    <Box style={{ height: 300, width: '100%' , marginLeft : 'auto' , marginRight : 'auto' }}>
  <Typography style={{textAlign : 'center' , marginBottom: '1rem'}} variant='h4'>
    {props.user?.fName} , {props.user?.gender === 10 ? "מלא" : "מלאי"} את טופס המשימה
  </Typography>
  <FormNewMission props={props}/>
</Box>
  )
}

export default NewMission