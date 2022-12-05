import { Box, Chip, CircularProgress, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classesStyle from "./studentHomePageCss";
import GroupIcon from '@mui/icons-material/Group';
import SubjectIcon from "@mui/icons-material/Subject";
import AssignmentIcon from "@mui/icons-material/Assignment";

const AdminHomePage = ({auth , user}) => {
  const users = useSelector((state) => state.users.users);
  const missions = useSelector((state) => state.missions.missions);
  const subjects = useSelector((state) => state.subjects.subjects);
  const missionLoading = useSelector((state) => state.missions.missionLoading);
  const subjectsLoading = useSelector((state) => state.subjects.subjectsLoading);
  const usersLoading = useSelector((state) => state.users.usersLoading);
  const navigate = useNavigate();
  const [color, setColor] = useState(false);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);

  let progress = (
    <CircularProgress
      color="inherit"
      style={{ width: "2rem", height: "2rem" }}
    />
  );

  return (
    <Box>
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

              <Link to='/students'>
            <Box style={classesStyle.firstCardBox}>
              <GroupIcon
                style={{ fontSize: "3rem", color: color ? "#eee" : "#242550" }}
                />
            </Box>
            <Typography
              variant="body1"
              style={{
                fontWeight: "600",
                letterSpacing: "0.1rem",
                fontSize: color ? "2.5rem" : "2rem",
                textAlign: "center",
                color: color ? "#eee" : "#242550",
                transition: "0.5s",
              }}
            >
              {usersLoading ? progress : users.filter(i => !i._id.includes(auth.userId)).length}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "400",
                letterSpacing: "0.1rem",
                fontSize: color ? "1.2rem" : "1rem",
                textAlign: "center",
                color: color ? "#eee" : "#242550",
                transition: "0.5s",
              }}
              >
              סטודנטים
            </Typography>
              </Link>
            {color ||
              window.screen.width < 1000 ? 
                <Box textAlign='center' margin={1}>
                  <Link to="/new-user">
                <Chip
                  clickable
                  style={{ transition: "0.5s" }}
                  variant="filled"
                  color="success"
                  label="סטודנט חדש"
                  />
                  </Link>
                <Link to='/students'>
                <Box textAlign='center'>
              <Typography variant="caption" style={{color: color ? "#eee" : "#242550", transition: "0.5s" }}>
                (לחץ כדי לראות את כל הסטודנטים)
              </Typography>
              </Box>
                </Link>
                </Box> 
                : null
              } 
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            sx={classesStyle.secondBox}
            onMouseEnter={() => setColor1(true)}
            onMouseLeave={() => setColor1(false)}
          >
            <Link to='/missions'>
            <Box
              textAlign="center"
              style={classesStyle.secondCardBox}
            >
              <AssignmentIcon
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
                {missionLoading ? progress : missions.length}
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
              משימות
            </Typography>
            </Link>
            {color1 ||
              window.screen.width < 1000 ? 
                <Box textAlign='center' marginTop={1}>
                  <Link to='/missions/add-new'>
                <Chip
                  style={{ transition: "0.5s" }}
                  clickable
                  variant="filled"
                  color="success"
                  label="משימה חדשה"
                  />
                  </Link>
                  <Link to='/missions'>
                <Box textAlign='center'>
              <Typography variant="caption" style={{color: color1 ? "#eee" : "#242550", transition: "0.5s" }}>
                (לחץ כדי לראות את כל המשימות)
              </Typography>
              </Box>
                  </Link>
                </Box> : null
              }
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            sx={classesStyle.thirdBox}
            onMouseEnter={() => setColor2(true)}
            onMouseLeave={() => setColor2(false)}
          >
            <Link to='/subjects'>
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
                {subjectsLoading ? progress : subjects.length}
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
              נושאים
            </Typography>
            </Link>
            {color2 ||
              window.screen.width < 1000 ? 
                <Box textAlign='center' marginTop={1}>
                  <Link to='/subjects/add-new'>
                <Chip
                  style={{ transition: "0.5s" }}
                  clickable
                  variant="filled"
                  color="success"
                  label="נושא חדש"
                  />
                  </Link>
                  <Link to='/subjects'>
                <Box textAlign='center'>
              <Typography variant="caption" style={{color: color2 ? "#eee" : "#242550", transition: "0.5s" }}>
                (לחץ כדי לראות את כל הנושאים)
              </Typography>
              </Box>
                  </Link>
                </Box> : null
              }
              
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default AdminHomePage;
