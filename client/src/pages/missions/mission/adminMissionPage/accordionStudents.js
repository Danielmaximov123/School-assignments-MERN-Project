import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminMissionDocument from './adminMissionDocument';

const AccordionStudents = ({index , mission , auth , student}) => {
    const [expanded, setExpanded] = useState(false);
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    useEffect(() => {
      let d = new Date(mission?.submitDate)
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
    },[mission])

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
              className={`panelAccordion-${index}`}
              expanded={expanded === `panel${index}`}
              onChange={
                mission?.completed ? handleChange(`panel${index}`) : null
              }
            >
              <AccordionSummary
                expandIcon={mission?.completed && <ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {student?.fName} {student?.lName}
                </Typography>
                <Chip
                  style={{ margin: "0.3rem" }}
                  label={mission?.completed ? "הוגשה המשימה" : "לא הוגשה משימה"}
                  color={mission?.completed ? "success" : "error"}
                />
                <Chip
                  style={{ margin: "0.3rem" }}
                  label={mission?.grade ? mission?.grade : "טרם התקבל ציון"}
                  color={mission?.grade ? "success" : "error"}
                />

              </AccordionSummary>
              <AccordionDetails>
                <Box margin={1}>
                <Typography variant='caption'>
                  הוגש בתאריך {date} בשעה {time}
                </Typography>
                </Box>
                <Box display={{display : 'flex' , margin : '1rem'}}>
                  <Typography>הערות מהתלמד :</Typography>
                  {!mission?.note ? <Typography variant='body2' color='#8080809c' marginLeft={1}>(אין הערה)</Typography> : <Typography marginLeft={1}>{mission?.note}</Typography>}
                </Box>
                <Box display={mission?.files.length === 0 ? {display : 'flex' , margin : '1rem'} : {margin : '1rem'}}>
                  <Typography>קבצים שהוגשו :</Typography>
                  {
                    mission?.files.length > 0 ? 
                    <AdminMissionDocument mission={mission} auth={auth}/> : <Typography variant='body2' color='#8080809c' marginLeft={1}>(אין קבצים)</Typography>
                  }
                </Box>
                <Box style={ {margin : '1rem'}}>
                  <Typography>הגשת ציון :</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
    </Box>
  )
}

export default AccordionStudents