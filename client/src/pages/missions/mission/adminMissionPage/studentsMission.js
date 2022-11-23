import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccordionStudents from "./accordionStudents";

const StudentsMission = ({ mission }) => {
  const [completed, setCompleted] = useState(null);
  const [grade, setGrade] = useState(null)
  const [query, setQuery] = useState('')
  const users = useSelector((state) => state.users.users);
  const [showOnlyGrade, setShowOnlyGrade] = useState(false)
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false)
  const [showCompletedAndGrade, setShowCompletedAndGrade] = useState(false)
  const [showOnlySearch, setShowOnlySearch] = useState(false)

let studentMission = mission?.students.map((i) => {
  let user = users.find(j => j._id === i.studentId)
  return { _id : i._id , title : mission?.title , description : mission?.description , files : i?.files , grade : i?.grade , completed : i?.completed , subject : mission?.subject , deadlineDate : mission?.deadlineDate , fullName : `${user?.fName} ${user?.lName}` , studentId : i?.studentId , teacherNote : i?.teacherNote , note : i?.note , submitDate : i?.submitDate }
})

  let withGrade = studentMission?.filter((i) => grade ? i.grade : !i.grade);
  let withCompleted = studentMission?.filter((i) => completed ? i.completed : !i.completed);
  let withCompletedAndGrade = studentMission?.filter(
    (i) => completed && grade ? i.completed && i.grade : !i.completed && !i.grade
  );
  let withQuery = studentMission?.filter((i) => i?.fullName?.toLowerCase()?.includes(query) )
  
    useEffect(() => {
      if(completed !== null) {
        setShowOnlyCompleted(true)
        setShowOnlyGrade(false)
        setShowOnlySearch(false)
        setShowCompletedAndGrade(false)
      } else if(grade !== null) {
        setShowOnlyCompleted(false)
        setShowOnlyGrade(true)
        setShowOnlySearch(false)
        setShowCompletedAndGrade(false)
      } else if(grade !== null && completed !== null) {
        setShowOnlyCompleted(false)
        setShowOnlyGrade(false)
        setShowOnlySearch(false)
        setShowCompletedAndGrade(true)
      } else if(query !== '') {
        setShowOnlyCompleted(false)
        setShowOnlyGrade(false)
        setShowOnlySearch(true)
        setShowCompletedAndGrade(false)
      } else {
        setShowOnlyCompleted(false)
        setShowOnlyGrade(false)
        setShowOnlySearch(false)
        setShowCompletedAndGrade(false)
      }
    },[completed , grade , query])

  return (
    <Box
      sx={{
        height: "auto",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "0.625rem",
        padding: "1rem",
        backgroundColor: "rgb(255, 255, 255)",
      }}
    >
      <Typography style={{ textAlign: "center", margin: "1rem" }} variant="h5">
        סטודנטים במשימה
      </Typography>
      <TextField variant="standard" label="חיפוש לפי שם" value={query || ''} onChange={e => setQuery(e.target.value)}/>
      <Chip
        label="הגישו משימה"
        color={completed === null ? undefined : completed ? "success" : "error"}
        style={{margin : '0.8rem'}}
        onClick={() => {
          completed === null
            ? setCompleted(true)
            : completed
            ? setCompleted(false)
            : setCompleted(null);
        }}
      />
      <Chip
        label="קיים ציון"
        color={grade === null ? undefined : grade ? "success" : "error"}
        onClick={() => {
          grade === null
            ? setGrade(true)
            : grade
            ? setGrade(false)
            : setGrade(null);
        }}
      />
      {!query && completed === null && grade === null &&
      <>
            <Chip style={{margin : '0.8rem'}} variant="outlined" color="info" label={`${mission?.students?.length} תוצאות`} />
      {mission?.students.map((mission, index) => {
        let student = users.find((i) => i._id === mission.studentId);
        return (
          <Fragment key={index}>
            <AccordionStudents index={index} mission={mission} student={student}/>
          </Fragment>
        );
      })}
      </>
      }
      {showOnlyCompleted &&
      <>
            <Chip style={{margin : '0.8rem'}} variant="outlined" color="info" label={`${withCompleted.length} תוצאות`} />
      {withCompleted?.map((mission, index) => {
        let student = users.find((i) => i._id === mission.studentId);
        return (
          <Fragment key={index}>
            <AccordionStudents index={index} mission={mission} student={student}/>
          </Fragment>
        );
      })}
      </>
      }
      {showOnlyGrade &&
      <>
            <Chip style={{margin : '0.8rem'}} variant="outlined" color="info" label={`${withGrade.length} תוצאות`} />
      {withGrade.map((mission, index) => {
        let student = users.find((i) => i._id === mission.studentId);
        return (
          <Fragment key={index}>
            <AccordionStudents index={index} mission={mission} student={student}/>
          </Fragment>
        );
      })}
      </>
      }
      {showCompletedAndGrade &&
      <>
      <Chip style={{margin : '0.8rem'}} variant="outlined" color="info" label={`${withCompletedAndGrade.length} תוצאות`} />
      {withCompletedAndGrade.map((mission, index) => {
        let student = users.find((i) => i._id === mission.studentId);
        return (
          <Fragment key={index}>
            <AccordionStudents index={index} mission={mission} student={student}/>
          </Fragment>
        );
      })}
      </>
      }
      {showOnlySearch &&
      <>
      <Chip style={{margin : '0.8rem'}} variant="outlined" color="info" label={`${withQuery.length} תוצאות`} />
      {withQuery.map((mission, index) => {
        let student = users.find((i) => i._id === mission.studentId);
        return (
          <Fragment key={index}>
            <AccordionStudents index={index} mission={mission} student={student}/>
          </Fragment>
        );
      })}
      </>
      }
    </Box>
  );
};

export default StudentsMission;
