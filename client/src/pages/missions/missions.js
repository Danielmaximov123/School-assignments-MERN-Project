import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects } from "../../redux/actions/getSubjectsAction";
import { useNavigate } from "react-router-dom";
import MissionComp from "./mission";
import { getAllMissions } from "../../redux/actions/getMissionAction";

const Missions = ({ auth, user, users }) => {
  const missions = useSelector((state) => state.missions.missions);
  const missionLoading = useSelector((state) => state.missions.missionLoading);
  const [missionUser, setMissionUser] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'משימות - משימות הבית שלי'
 }, [])

  useEffect(() => {
    dispatch(getAllSubjects());
    dispatch(getAllMissions());
  }, [dispatch]);

  let progress = (
    <CircularProgress
      style={{ width: "6rem", height: "6rem", marginTop: "1rem" }}
    />
  );


  useEffect(() => {
    let data = missions.map(i => {
      let mission = []
      i.students.filter(j => auth.userId === j.studentId && mission.push(i))
      return mission
    })
    let dataCheck = data.filter(item => item.length !== 0)
    setMissionUser(dataCheck)
  }, [missionLoading])
  

  return (
    <Box>
      {auth?.userType !== "student" ? (
        <>
          <Box style={{ padding: "1rem 0.2rem" }}>
            <Button
              onClick={() => navigate("add-new")}
              endIcon={<LibraryAddIcon />}
              variant="contained"
            >
              יצירת משימה חדשה
            </Button>
          </Box>
        </>
      ) : null}

      {missionLoading ? (
        <Box style={{ textAlign: "center" }}>{progress}</Box>
      ) : (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
            }}
          >
            {auth?.userType !== "student" ? (
              <>
                {missions?.map((item) => {
                  return (
                      <Grid key={item?._id} item xs={2} sm={4} md={4}>
                      <MissionComp mission={item} user={user} />
                      </Grid>
                  );
                })}
              </>
            ) : (
              <>
                {missionUser?.map((item) => {
                  return (
                    <Grid key={item[0]?._id} item xs={2} sm={4} md={4}>
                      <MissionComp mission={item[0]} user={user} />
                    </Grid>
                  );
                })}
              </>
            )}
            { auth?.userType !== "student" &&
              missions.length === 0 && <Box style={{marginRight : 'auto' , marginLeft : 'auto'}}>
                <Typography variant="h4">
                  אין משימות
                </Typography>
              </Box>
            }
            { auth?.userType === "student" &&
              missionUser?.length === 0 && <Box style={{marginRight : 'auto' , marginLeft : 'auto'}}>
                <Typography variant="h4">
                  אין משימות
                </Typography>
              </Box>
            }
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Missions;
