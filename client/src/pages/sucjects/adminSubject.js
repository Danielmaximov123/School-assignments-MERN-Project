import { Box, Button, IconButton, TextField } from '@mui/material'
import { useEffect , useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import SyncIcon from '@mui/icons-material/Sync';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { getDeleteSubject, getUpdateSubject } from '../../redux/actions/getSubjectsAction';

const AdminSubject = ({subject}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const subjectsLoading = useSelector(state => state.subjects.subjectsLoading)

    useEffect(() => {
        if(title === '') {
            setTitle(subject?.title)
        }
        if(description === '') {
            setDescription(subject?.description)
        }
    },[subject])

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = { title , description }
        dispatch(getUpdateSubject(subject?._id , data))
      }
  
      const handleReset = () => {
        setTitle(subject.title)
        setDescription(subject.description)
      }

  return (
    <>
    <IconButton color="error" onClick={() => dispatch(getDeleteSubject(subject?._id))} style={{float: 'left'}}>
        <DeleteIcon/>
    </IconButton>
    <Box component='form' onSubmit={handleSubmit}>
        <TextField
        variant='standard'
        style={{marginBottom : '0.5rem'}}
        label="שם נושא"
        fullWidth
        value={title || ''}
        onChange={e => setTitle(e.target.value)}
        />
        <TextField
        variant='standard'
        style={{marginBottom : '0.5rem'}}
        fullWidth
        value={description || ''}
        multiline
        label="תיאור"
        onChange={e => setDescription(e.target.value)}
        />
        <Box style={{textAlign : 'center'}}>
        <LoadingButton
          loading={subjectsLoading}
          style={window.screen.width < 1000 ? {width: '40%' , margin : '0.3rem'} : {width: '40%' , margin : '0.3rem'}}
          loadingPosition='end'
          endIcon={<SyncIcon />}
          variant="contained"
          color='success'
          type="submit"
        >
          עדכן קורס
        </LoadingButton>
        <Button onClick={e => handleReset(e)} style={window.screen.width < 1000 ? {width: '40%'} : {width: '35%'}} variant="contained" color='warning' endIcon={<RestartAltIcon/>}>
          ברירת מחדל
        </Button>
        </Box>
    </Box>
    </>
  )
}

export default AdminSubject