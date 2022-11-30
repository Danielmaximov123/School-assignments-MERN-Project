import { Box, CircularProgress, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMissions } from "./../../redux/actions/getMissionAction";
import SubjectIcon from "@mui/icons-material/Subject";
import AssignmentIcon from '@mui/icons-material/Assignment';
import BlindsIcon from '@mui/icons-material/Blinds';

const StudentHomePage = ({auth , user}) => {
  const missions = useSelector((state) => state.missions.missions);
  const missionLoading = useSelector((state) => state.missions.missionLoading);
  const usersLoading = useSelector((state) => state.users.usersLoading);
  const [color, setColor] = useState(false);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);

  let progress = <CircularProgress color="inherit" style={{ width: "2rem", height: "2rem" }}/>

  let userMissionLength = missions.map((i) => {
    return i.students.map((j , n) => {
        return j.studentId
    })
  }).map(i => i[0]).filter(i => i.includes(auth.userId)).length

  let missionData = []
  let userMissionOpen = missions.map((i) => {
    return i.students.map((j , n) => {
        missionData.push({ completed : j.completed , studentId : j.studentId , missionId : i._id , deadlineDate : i.deadlineDate })
        return { completed : j.completed , studentId : j.studentId , missionId : i._id }
    })
  }).map(i => i[0]).filter(i => i.studentId.includes(auth.userId)).filter(i => !i.completed).length

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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{
          marginLeft: "auto",
          marginTop: "auto",
        }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Box
            sx={{
                paddingBottom: "2rem",
                paddingTop: "2rem",
                borderRadius: "0.75rem",
                backgroundColor: "#CFF5E7",
                transition: '0.5s',
                "&:hover": {
                  color: "white",
                  zIndex: "-1",
                  backgroundColor: "#0d4c927a",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            onMouseEnter={() => setColor(true)}
            onMouseLeave={() => setColor(false)}
          >
            <Box
              textAlign="center"
              style={{
                margin: "auto auto 24px",
                display: "flex",
                borderRadius: "50%",
                WebkitBoxAlign: "center",
                alignItems: "center",
                width: "4rem",
                height: "4rem",
                WebkitBoxPack: "center",
                justifyContent: "center",
                color: "#242550",
                backgroundImage:
                  "linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)"
              }}
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
                fontSize: color ? "1.5rem" : '1rem',
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
            sx={{
                paddingBottom: "2rem",
                paddingTop: "2rem",
                borderRadius: "0.75rem",
                backgroundColor: "#a0e4cb",
                transition: '0.5s',
                "&:hover": {
                  color: "white",
                  zIndex: "-1",
                  backgroundColor: "#0d4c927a",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            onMouseEnter={() => setColor1(true)}
            onMouseLeave={() => setColor1(false)}
          >
            <Box
              textAlign="center"
              style={{
                margin: "auto auto 24px",
                display: "flex",
                borderRadius: "50%",
                WebkitBoxAlign: "center",
                alignItems: "center",
                width: "4rem",
                height: "4rem",
                WebkitBoxPack: "center",
                justifyContent: "center",
                color: "#242550",
                backgroundImage:
                  "linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
              }}
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
                fontSize: color1 ? "1.5rem" : '1rem',
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
            sx={{
              paddingBottom: "2rem",
              paddingTop: "2rem",
              borderRadius: "0.75rem",
              backgroundColor: "#59C1BD",
              transition: '0.5s',
              "&:hover": {
                color: "white",
                zIndex: "-1",
                backgroundColor: "#0d4c927a",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            onMouseEnter={() => setColor2(true)}
            onMouseLeave={() => setColor2(false)}
          >
            <Box
              textAlign="center"
              style={{
                margin: "auto auto 24px",
                display: "flex",
                borderRadius: "50%",
                WebkitBoxAlign: "center",
                alignItems: "center",
                width: "4rem",
                height: "4rem",
                WebkitBoxPack: "center",
                justifyContent: "center",
                color: "#242550",
                backgroundImage:
                  "linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
              }}
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
              {usersLoading ? progress : user?.subjects?.length}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "400",
                letterSpacing: "0.1rem",
                fontSize: color2 ? "1.5rem" : '1rem',
                textAlign: "center",
                color: color2 ? "#eee" : "#242550",
                transition: '0.5s',
              }}
            >
              נושאי לימוד
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={8}>
            <Box>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>משימה</TableCell>
                                <TableCell>נושא</TableCell>
                                <TableCell>מועד הגשה</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
      </Grid>
              
    </Box>
  );
};

export default StudentHomePage;
