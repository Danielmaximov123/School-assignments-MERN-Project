import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminMissionDocument from './adminMissionDocument';
import SubmitGradeAndNote from './submitGradeAndNote';

const AccordionStudents = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const handleChange = (index) => (event, isExpanded) => {
        setExpanded(isExpanded ? `panel${index}` : false);
      };


    useEffect(() => {
      let d = new Date(props.mission?.submitDate)
      const formatDate =
      d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
      const formatMonth =
      d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
       const formatHour =
      d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
      const formatMinutes =
      d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
      
      setDate(`${formatDate}/${formatMonth}/${d.getFullYear()}`)
      setTime(`${formatHour}:${formatMinutes}`)
    },[props.mission])

  return (
    <Box>
        <Accordion
              style={{
                margin: "0.4rem",
                borderRadius: "0.5rem",
                "&::before": {
                  display: "none",
                },
              }}
              className={`panelAccordion-${props.index}`}
              expanded={expanded === `panel${props.index}`}
              onChange={
                props.mission?.completed ? handleChange(props.index) : null
              }
            >
              <AccordionSummary
                expandIcon={props.mission?.completed && <ExpandMoreIcon />}
                aria-controls={`panel${props.index}bh-content`}
                id={`panel${props.index}bh-header`}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {props.student?.fName} {props.student?.lName}
                </Typography>
                <Chip
                  style={{ margin: "0.3rem" }}
                  label={props.mission?.completed ? "הוגשה המשימה" : "לא הוגשה משימה"}
                  color={props.mission?.completed ? "success" : "error"}
                />
                <Chip
                  style={{ margin: "0.3rem" }}
                  label={props.mission?.grade ? props.mission?.grade : "טרם התקבל ציון"}
                  color={props.mission?.grade ? "success" : "error"}
                />

              </AccordionSummary>
              <AccordionDetails>
                <Box margin={1}>
                <Typography variant='caption'>
                  הוגש בתאריך {date} בשעה {time}
                </Typography>
                </Box>
                <Box display={{display : 'flex' , margin : '1rem'}}>
                  <Typography>הערות מהתלמיד :</Typography>
                  {!props.mission?.note ? <Typography variant='body2' color='#8080809c' marginLeft={1}>(אין הערה)</Typography> : <Typography marginLeft={1}>{props.mission?.note}</Typography>}
                </Box>
                <Box display={props.mission?.files.length === 0 ? {display : 'flex' , margin : '1rem'} : {margin : '1rem'}}>
                  <Typography>קבצים שהוגשו :</Typography>
                  {
                    props.mission?.files.length > 0 ? 
                    <AdminMissionDocument mission={props.mission} auth={props.auth}/> : <Typography variant='body2' color='#8080809c' marginLeft={1}>(אין קבצים)</Typography>
                  }
                </Box>
                <Box style={ {margin : '1rem'}}>
                  <Typography>הגשת ציון :</Typography>
                    <SubmitGradeAndNote mission={props.mission} auth={props.auth} student={props.student} missionGrade={props.missionGradeReq}/>
                </Box>
              </AccordionDetails>
            </Accordion>
    </Box>
  )
}

export default AccordionStudents