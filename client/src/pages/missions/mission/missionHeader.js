import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CountdownTimerDate from '../../../Countdown Timer Date';

const MissionHeader = (props) => {
    const [expiryDate, setExpiryDate] = useState(null)

    let progress = (
        <CircularProgress
          style={{ width: "6rem", height: "6rem", marginTop: "1rem" }}
        />
      );

      useEffect(() => {
        let d = new Date(props.mission?.deadlineDate)
        let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        let month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        let hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
        let minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
        setExpiryDate(`${day}/${month}/${d.getFullYear()} , ${hour}:${minutes}`)
      }, [props?.mission])


  return (
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
        <Typography style={{marginBottom: '1rem'}} variant='h4'>
          {props?.auth?.fName} , זו היא המשימה שלך
          </Typography>
        </Grid>
        <Grid item xs={6}>
        <Box
        style={{
          border: "1px solid rgba(2, 136, 209, 0.7)",
          textAlign: "center",
          borderRadius: "2rem",
          marginRight : 'auto',
          padding: '0rem 1rem'
        }}
      >
        {
            !props?.mission?.deadlineDate ? <Box style={{ textAlign: "center" }}>{progress}</Box> :
            <>
            <Typography color="#0288d1"  variant='subtitle1'>
           נותרו <CountdownTimerDate dateExpiry={props?.mission?.deadlineDate}/> להגשת המשימה <br/>
           בתאריך : {expiryDate}
        </Typography>
            </>
        }
            </Box>
        </Grid>
    </Grid>
  )
}

export default MissionHeader