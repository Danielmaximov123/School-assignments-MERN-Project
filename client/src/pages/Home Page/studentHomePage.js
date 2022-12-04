import { Box, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SubjectIcon from "@mui/icons-material/Subject";
import AssignmentIcon from '@mui/icons-material/Assignment';
import BlindsIcon from '@mui/icons-material/Blinds';
import { Link, useNavigate } from "react-router-dom";
import classesStyle from './studentHomePageCss'

const StudentHomePage = ({auth , user}) => {
  const missions = useSelector((state) => state.missions.missions);
  const subjects = useSelector((state) => state.subjects.subjects);
  const missionLoading = useSelector((state) => state.missions.missionLoading);
  const usersLoading = useSelector((state) => state.users.usersLoading);
  const navigate = useNavigate()
  const [color, setColor] = useState(false);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);

  let progress = <CircularProgress color="inherit" style={{ width: "2rem", height: "2rem" }}/>

  let userMissionLength = missions.map((i) => {
    return i?.students.map((j , n) => {
        return j?.studentId
    })
  }).map(i => i[0]).filter(i => i?.includes(auth.userId)).length

  let missionData = []
  let userMissionOpen = missions.map((i) => {
    let date = new Date(i.deadlineDate)
    let getDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let getMonth = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let getHours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let getMinutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    let deadlineDate = `${getDay}/${getMonth}/${date.getFullYear()} , ${getHours}:${getMinutes}`
    return i.students.map((j , n) => {
        missionData.push({ title : i?.title , description : i?.description , completed : j?.completed , studentId : j?.studentId , missionId : i?._id , deadlineDate : deadlineDate , subjectId : i?.subject })
        return { completed : j?.completed , studentId : j?.studentId , missionId : i?._id }
    })
  }).map(i => i[0]).filter(i => i?.studentId.includes(auth?.userId)).filter(i => !i?.completed).length

  let userMissions = missionData?.filter(i => i.studentId.includes(auth?.userId) && !i?.completed)

  let userMission = userMissions.length >= 5 ? userMissions.slice(0 , 5) : userMissions
  return (
    <Box>
    <Box
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 12, md: 12 }}
        style={{
          marginLeft: "auto",
          marginTop: "auto",
        }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Box
            sx={classesStyle.firstBox}
            onMouseEnter={() => setColor(true)}
            onMouseLeave={() => setColor(false)}
          >
            <Box
              style={classesStyle.firstCardBox}
            >
              <AssignmentIcon
                style={{ fontSize: "3rem", color: color ? "#eee" : "#242550" }}
              />
            </Box>
            <Typography
              variant="body1"
              style={{
                fontWeight: "600",
                letterSpacing: "0.1rem",
                fontSize: color ? "2.5rem" : '2rem',
                textAlign: "center",
                color: color ? "#eee" : "#242550",
                transition: '0.5s'
              }}
            >
              {missionLoading ? progress : userMissionLength}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "400",
                letterSpacing: "0.1rem",
                fontSize: color ? "1.2rem" : '1rem',
                textAlign: "center",
                color: color ? "#eee" : "#242550",
                transition: '0.5s'
              }}
            >
              משימות
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            sx={classesStyle.secondBox}
            onMouseEnter={() => setColor1(true)}
            onMouseLeave={() => setColor1(false)}
          >
            <Box
              textAlign="center"
              style={classesStyle.secondCardBox}
            >
              <BlindsIcon
                style={{ fontSize: "3rem", color: color1 ? "#eee" : "#242550" }}
              />
            </Box>
            <Typography
              variant="body1"
              style={{
                fontWeight: "600",
                letterSpacing: "0.1rem",
                fontSize: color1 ? "2.5rem" : '2rem',
                textAlign: "center",
                color: color1 ? "#eee" : "#242550",
                transition: '0.5s'
              }}
            >
              {missionLoading ? progress : userMissionOpen}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "400",
                letterSpacing: "0.1rem",
                fontSize: color1 ? "1.2rem" : '1rem',
                textAlign: "center",
                color: color1 ? "#eee" : "#242550",
                transition: '0.5s',
              }}
            >
              משימות פתוחות
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            sx={classesStyle.thirdBox}
            onMouseEnter={() => setColor2(true)}
            onMouseLeave={() => setColor2(false)}
          >
            <Box
              textAlign="center"
              style={classesStyle.thirdCardBox}
            >
              <SubjectIcon
                style={{ fontSize: "3rem", color: color2 ? "#eee" : "#242550" }}
              />
            </Box>
            <Typography
              variant="body1"
              style={{
                fontWeight: "600",
                letterSpacing: "0.1rem",
                fontSize: color2 ? "2.5rem" : '2rem',
                textAlign: "center",
                color: color2 ? "#eee" : "#242550",
                transition: '0.5s'
              }}
            >
              {usersLoading ? progress : user?.subjects?.length ? user?.subjects?.length : 0}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "400",
                letterSpacing: "0.1rem",
                fontSize: color2 ? "1.2rem" : '1rem',
                textAlign: "center",
                color: color2 ? "#eee" : "#242550",
                transition: '0.5s',
              }}
            >
              נושאי לימוד
            </Typography>
          </Box>
        </Grid>
      </Grid>    
    </Box>
    <Box style={{marginTop : '1.5rem' , width : window.screen.width > 1000 && '60%' , marginLeft : 'auto' , marginRight : 'auto'}}>
    {
      userMission?.length > 0 &&
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="caption table">
            {userMission?.length > 4 && <caption style={{textAlign : 'left'}}><Link to='/missions'>לכל המשימות...</Link></caption>}
                <TableHead>
                    <TableRow>
                        <TableCell align="center">משימה</TableCell>
                        <TableCell align="center">נושא</TableCell>
                        <TableCell align="center">מועד הגשה</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        userMission.sort((a , b) => new Date(b.deadlineDate) - new Date(a.deadlineDate)).map((row , index) => {
                            return <TableRow style={{cursor : 'pointer'}} onClick={() => navigate(`/missions/${row?.missionId}`)} key={index}
                            >
                                <TableCell component="th" scope="row" align="center">{row?.title}</TableCell>
                                <TableCell align="center">{subjects?.find(i => i._id === row?.subjectId)?.title}</TableCell>
                                <TableCell align="center">{row?.deadlineDate === '01/01/1970 , 02:00' ? 'אין' : row?.deadlineDate}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    }
    </Box>
    </Box>
  );
};

export default StudentHomePage;
