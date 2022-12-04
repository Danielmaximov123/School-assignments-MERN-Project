import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { useEffect } from 'react';
import FormNewSubject from './FormNewSubject';

const NewSubject = (props) => {

  useEffect(() => {
    document.title = `נושאי חדש - משימות הבית שלי`
 }, [])

  return (
    <Box style={{ height: 300, width: '100%' , marginLeft : 'auto' , marginRight : 'auto' }}>
  <Typography style={{textAlign : 'center' , marginBottom: '1rem'}} variant='h4'>
    {props.user?.fName} , {props.user?.gender === 10 ? "תוסיף" : "תוסיפי"} נושא חדש
  </Typography>
  <FormNewSubject props={props}/>
</Box>
  )
}

export default NewSubject