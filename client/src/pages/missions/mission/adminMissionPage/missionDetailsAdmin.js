import { Box, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import SubjectSelector from './subjectSelectorMission';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import SyncIcon from '@mui/icons-material/Sync';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeadilneDateAdmin from './deadilneDateAdmin';
import { getUpdateMission } from './../../../../redux/actions/getMissionAction';

const MissionDetailsAdmin = (props) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState(null)
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const missionLoading = useSelector(state => state.missions.missionLoading)
    const [deadlineDate, setDeadlineDate] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
      if(title === '') {
        setTitle(props?.mission?.title)
      }
      if(description === '') {
        setDescription(props?.mission?.description)
      }
      if(subject === '') {
        setSubject(props?.mission?.subject)
      }
      if(deadlineDate === null) {
        setDeadlineDate(props?.mission?.deadlineDate)
      }
      if(url === null) {
        setUrl(props?.mission?.url)
      }
    },[props])

    const handleSubmit = (e) => {
      e.preventDefault()
      let data = { title , description , subject , deadlineDate , url}
      dispatch(getUpdateMission(props?.mission?._id , data))
    }

    const handleReset = () => {
      setTitle(props?.mission?.title)
      setDescription(props?.mission?.description)
      setSubject(props?.mission?.subject)
      setDeadlineDate(props?.mission?.deadlineDate)
      setUrl(props?.mission?.url)
    }

  return (
    <Box
    sx=
    {{
      height: "auto",
      boxShadow:
        "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
      borderRadius: "0.625rem",
      padding: "1rem",
      backgroundColor: "rgb(255, 255, 255)",
    }}>
        <Box component='form' onSubmit={handleSubmit}>
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
        <SubjectSelector setSubject={setSubject} subject={subject} mission={props.mission}/>
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
        <TextField
          style={{marginBottom : '0.5rem'}}
          fullWidth
          variant="standard"
          value={url || ''}
          onChange={e => setUrl(e.target.value)}
          type="text"
          label="סרטון להסבר"
        />
          <DeadilneDateAdmin deadlineDate={deadlineDate} setDeadlineDate={setDeadlineDate}/> 
        <Box style={{textAlign : 'center' , marginTop : '1rem'}}>
        <LoadingButton
          loading={missionLoading}
          style={window.screen.width < 1000 ? {width: '40%' , margin : '0.3rem'} : {width: '25%' , margin : '0.3rem'}}
          loadingPosition='end'
          endIcon={<SyncIcon />}
          variant="contained"
          color='success'
          type="submit"
        >
          עדכן משימה
        </LoadingButton>
        <Button onClick={e => handleReset(e)} style={window.screen.width < 1000 ? {width: '40%'} : {width: '25%'}} variant="contained" color='warning' endIcon={<RestartAltIcon/>}>
          ברירת מחדל
        </Button>
        </Box>
        </Box>
    </Box>
  )
}

export default MissionDetailsAdmin