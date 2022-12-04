import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import PublishIcon from '@mui/icons-material/Publish';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { getSubmitMissionTeacher } from '../../../../redux/actions/getMissionAction';
import { useEffect } from 'react';

const SubmitGradeAndNote = (props) => {
    const missionLoading = useSelector(state => state.missions.missionLoading)
    const dispatch = useDispatch()
    const [teacherNote, setTeacherNote] = useState('')
    const [grade, setGrade] = useState(null)

    useEffect(() => {
      if(teacherNote === '') {
        setTeacherNote(props?.mission?.teacherNote)
      }
      if(grade === null) {
        setGrade(props?.mission?.grade)
      }
    },[props])

    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(getSubmitMissionTeacher(props.mission.missionId , {teacherNote , grade , studentId : props.mission.studentId}))
      props?.setExpanded(false)
    }

    const handleChange = e => {
      const value = Math.max(1, Math.min(100, Number(e.target.value)));
      setGrade(value);
    };

    return (
    <Box onSubmit={handleSubmit} component='form' style={window.screen.width > 1000 ? {direction : 'rtl' , width: '75%'} : {direction : 'rtl'}}>
        <TextField
          style={{ direction: "rtl" ,  width : '40%' }}
          fullWidth={window.screen.width < 1000}
          variant="standard"
          inputProps={{ maxLength: 130 }}
          helperText={`130/${!teacherNote ? 0 : teacherNote?.length} תווים`}
          value={teacherNote || ""}
          onChange={(e) => setTeacherNote(e.target.value)}
          multiline
          minRows={3}
          maxRows={4}
          type="text"
          label="הערות"
        />
        {
          props.missionGrade && 
          <TextField
        style={window.screen.width < 1000 ? {direction: "rtl"} : { direction: "rtl" ,top: '2.9rem' , marginRight: '2rem' , width : '20%'}}
        required={props.mission.gradeReq}
        fullWidth={window.screen.width < 1000}
        variant="standard"
        value={grade || ''}
        onChange={(e) => handleChange(e)}
        label='ציון'
        type='number'
        InputProps={{ inputProps: { min: 0, max: 100 } }}
        />
        }
      <LoadingButton
          loading={missionLoading}
          fullWidth={window.screen.width < 1000}
          loadingPosition="end"
          style={window.screen.width < 1000 ? {margin : '1rem 0rem'} : {margin : '1rem 0rem' , width : '65%'}}
          endIcon={<PublishIcon />}
          variant="contained"
          color="success"
          type="submit"
        >
          הגשת ציון
        </LoadingButton>
    </Box>
  )
}

export default SubmitGradeAndNote