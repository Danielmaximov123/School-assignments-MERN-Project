import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionStudents = ({index , mission , student}) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
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
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
    </Box>
  )
}

export default AccordionStudents