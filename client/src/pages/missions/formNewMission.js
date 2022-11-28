import { Box, Button, Grid, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useSelector, useDispatch } from 'react-redux';
import SubjectSelectorMission from './subjectSelectorMission';
import UploadFile from './uploadFile';
import RadioGrade from './radioGrade';
import Deadline from './deadline';
import { useNavigate } from 'react-router-dom';
import PdfList from './pdfList';
import { getAddMission } from '../../redux/actions/getMissionAction';
import { LoadingButton } from '@mui/lab';
import { getAllMissions } from './../../redux/actions/getMissionAction';

const FormNewMission = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subject, setSubject] = useState('')
    const [deadlineDate, setDeadlineDate] = useState(null)
    const [grade, setGrade] = useState(null)
    const [filesDoc, setFilesDoc] = useState([])
    const subjects = useSelector(state => state.subjects.subjects)
    const missionLoading = useSelector(state => state.missions.missionLoading)
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(getAllMissions())
    },[dispatch])

    const handleAddNew = async (e) => {
        e.preventDefault()
        let studentsSubjects = users.map(item => {
          let data = []
          item.subjects.map(i => {
            data.push(i)
          })
          return { studentId : item._id , subjectId : data }
        }).flat(1)
        let students = studentsSubjects.filter(item => item.subjectId.includes(subject))
        let data = { title , description , deadlineDate ,grade : Boolean(grade) , subject , students }
        const form = new FormData();
        form.append('missionInfo' , JSON.stringify(data))
        for (let i = 0; i < filesDoc.length; i++) {
          form.append("file", filesDoc[i].file);
        }
        let send = await dispatch(getAddMission(form))
        if(send.success) {
          await dispatch(getAllMissions())
          navigate('/missions')
        }
    }

    
  return (
    <Box style={window.screen.width > 1000  ? {padding : '0rem 4rem' , width : '55%' , marginLeft : 'auto' , marginRight : 'auto' } : {padding : '0rem 4rem'}} component='form' onSubmit={handleAddNew}>
        <TextField
          style={{marginBottom : '0.5rem'}}
          required
          fullWidth
          variant="standard"
          value={title || ''}
          onChange={e => setTitle(e.target.value)}
          type="text"
          label="כותרת המשימה"
        />
        <TextField
          style={{marginBottom : '0.5rem'}}
          required
          fullWidth
          variant="standard"
          inputProps={{ maxLength : 130 }}
          helperText={`130/${description.length} תווים`}
          value={description || ''}
          onChange={e => setDescription(e.target.value)}
          multiline
          minRows={3}
          maxRows={4}
          type="text"
          label="הסבר על המשימה"
        />
        
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
          <SubjectSelectorMission subjects={subjects} setSubject={setSubject} subject={subject}/>
          </Grid>
          <Grid item xs={6}>
            <Deadline deadlineDate={deadlineDate} setDeadlineDate={setDeadlineDate}/>
          </Grid>
        </Grid>
        
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid style={{textAlign: 'center'}} item xs={6}>
            <RadioGrade grade={grade} setGrade={setGrade} />
          </Grid>
          <Grid item xs={6}>
        <UploadFile setFilesDoc={setFilesDoc} filesDoc={filesDoc}/>
          </Grid>
          </Grid>

          {
            Array.from(filesDoc).map((item) => {
                return <Grid key={item.id} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop="0.5rem">
                  <PdfList file={item} setOpen={setOpen} open={open} setFilesDoc={setFilesDoc} filesDoc={filesDoc}/>
            </Grid>
            })
        }
        <Box variant="span" textAlign='center'>
        <LoadingButton
          loading={missionLoading}
          loadingPosition='end'
          endIcon={<LibraryAddIcon />}
          variant="contained"
          color='success'
          type="submit"
        >
          הוסף משימה
        </LoadingButton>
            <Button style={{margin: '0.5rem'}} variant='contained' color="error" endIcon={<CloseIcon/>} onClick={() => navigate(-1)}>ביטול</Button>
        </Box>
    </Box>
  )
}

export default FormNewMission