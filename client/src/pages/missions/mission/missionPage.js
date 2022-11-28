import { Box, CircularProgress, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import MissionDetails from './missionDetails'
import { Typography } from '@mui/material';
import MissionHeader from './missionHeader';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMission } from '../../../redux/actions/getMissionAction';
import MissionDocument from './missionDocument';
import MissionDetailsAdmin from './adminMissionPage/missionDetailsAdmin';
import SubmitMission from './submitMission';
import StudentsMission from './adminMissionPage/studentsMission';

const MissionPage = ({auth}) => {
    const { id } = useParams()
    const subjects = useSelector((state) => state.subjects.subjects);
    const missions = useSelector(state => state.missions.missions)
    const missionLoading = useSelector((state) => state.missions.missionLoading)

    
    let mission = missions?.find(mission => mission?._id === id)
    let subject = subjects?.find((i) => i._id === mission?.subject);
    
    let studentMission = []
    if(mission?.length !== 0) {
      mission?.students?.filter(item => item.studentId === auth.userId && studentMission.push(item))
    }

    let progress = (
      <CircularProgress
        style={{ width: "6rem", height: "6rem", marginTop: "1rem" }}
      />
    );

  return (
    <Box style={{ padding: "1rem 0.2rem" }}>
    {missionLoading ? 
      <Box style={{ textAlign: "center" }}>{progress}</Box> :
          <>
        <MissionHeader auth={auth} subject={subject} mission={mission}/>
        <Grid container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 2, sm: 6, md: 12 }}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
            }}
          >
            <Grid item xs={6}>
              {
                auth.userType === 'student' ?<MissionDetails auth={auth} subject={subject} studentMission={studentMission[0]} mission={mission}  /> :
                <MissionDetailsAdmin auth={auth} subject={subject} mission={mission}/>
              }
            </Grid>
            <Grid item xs={6}><MissionDocument mission={mission} auth={auth}/></Grid>
            {
              studentMission[0]?.completed ? null :
              <>
              {
                auth?.userType === 'student' ? <Grid style={{margin: 'auto'}} item xs><SubmitMission auth={auth} studentMission={studentMission[0]} mission={mission}/></Grid> : 
                
                  <Grid item xs={12}><StudentsMission auth={auth} mission={mission}/></Grid>
              }
              </>
            }
        </Grid>
            
          </>
    }
    </Box>
  )
}

export default MissionPage