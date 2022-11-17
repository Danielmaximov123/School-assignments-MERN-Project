import React, { useEffect } from 'react'
import { useState } from 'react';

const CountdownTimerDate = ({dateExpiry}) => {
const [expiryTime, setExpiryTime] = useState(new Date(dateExpiry));
const [countdownTime, setCountdownTime] = useState({
  countdownDays: "",
  countdownHours: "",
  countdownMinutes: "",
  countdownSeconds: "",
});

const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor(
        (remainingDayTime % (1000 * 60)) / 1000
      );
  
      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };
  
      setCountdownTime(runningCountdownTime);
  
      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
      }
    }, 1000);
  };
  
  useEffect(() => {
    countdownTimer();
  });


  return (
    <>
    {countdownTime.countdownDays} ימים {countdownTime.countdownHours} שעות {countdownTime.countdownMinutes} דקות ו- {countdownTime.countdownSeconds} שניות
    </>
  )
}

export default CountdownTimerDate