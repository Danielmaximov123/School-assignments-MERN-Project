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

const MissionPage = ({auth}) => {
    const dispatch = useDispatch()
    const params = useParams()
    const subjects = useSelector((state) => state.subjects.subjects);
    const mission = useSelector(state => state.missions.missionSingle)
    const missionLoading = useSelector((state) => state.missions.missionLoading)

    let subject = subjects.find((i) => i._id === mission?.subject);

    useEffect(() => {
          dispatch(getMission(params.id))
    },[dispatch])

    console.log(missionLoading);

    let studentMission = []
    if(mission.length !== 0) {
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
                mission && <MissionDetails auth={auth} subject={subject} studentMission={studentMission[0]}  /> 
              }
            </Grid>
            <Grid item xs={6}><MissionDocument mission={mission} auth={auth}/></Grid>
            <Grid item xs={12}><MissionDetails/></Grid>
            <Grid></Grid>
        </Grid>
          </>
    }
    </Box>
  )
}

export default MissionPage