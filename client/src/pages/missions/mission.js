import {
  Box,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import GradingIcon from "@mui/icons-material/Grading";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { getDeleteMission, getMission } from "./../../redux/actions/getMissionAction";
import { Link } from "react-router-dom";
import { pink } from "@mui/material/colors";

const MissionComp = ({ mission, user }) => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.subjects);
  const [expiryDate, setExpiryDate] = useState(null)

  let subject = subjects.find((i) => i._id === mission?.subject);

  useEffect(() => {
    let d = new Date(mission.deadlineDate)
    let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    let month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    let minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    setExpiryDate(`${day}/${month}/${d.getFullYear()} , ${hour}:${minutes}`)
  }, [mission])
  
  let getDateNow = new Date();
  let checkUntilDate = new Date(mission?.deadlineDate) >= getDateNow;

  return (
    <Box
      sx={{
        direction: "rtl",
        height: "auto",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "0.625rem",
        padding: "1rem",
        backgroundColor: "rgb(255, 255, 255)",
      }}
    >
      <Link onClick={() => dispatch(getMission(mission._id))} to={mission._id} state={{ user, mission , subject , expiryDate }}>
        <ListItemText
          primary={
            <Typography style={{ textAlign: "center" }} variant="h6">
              {mission?.title}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              style={{
                margin: "0",
                fontFamily: "Heebo,sans-serif",
                fontWeight: "400",
                textAlign: "center",
                fontSize: "0.875rem",
                lineHeight: "1.43",
                color: "rgba(0, 0, 0, 0.6)",
                display: "block",
              }}
            >
              {subject?.title}
            </Typography>
          }
        />
      </Link>
      <Box style={{ height: "3rem" }}>
        <Typography style={{ textAlign: "center" }} variant="subtitle2">
          {mission?.description}
        </Typography>{" "}
      </Box>
      <Box
        style={{
          marginTop: "2.5rem",
          border: checkUntilDate ? "1px solid rgba(2, 136, 209, 0.7)" : "1px solid #d32f2f",
          textAlign: "center",
          borderRadius: "2rem",
          padding : '0.5rem 0.5rem 0.5rem'
        }}
      >
        {
            mission?.deadlineDate === null ? <>
            <Typography color="error" variant="subtitle2">
              אין
            </Typography>
            </> : 
            <>
            {checkUntilDate ?
        <Typography color='primary'  variant="subtitle2">
          מועד אחרון להגשה : {expiryDate}
        </Typography> : <Typography color='error' variant="subtitle2">
        זמן ההגשה תם ! 
        { user?.userType === 'student' && ' נא לפנות אל המרצה' }
        </Typography>
        }
            </>
        }

      </Box>
      <List style={{ textAlign: "center"  }}>
        {user?.userType !== "student" ? (
          <ListItemIcon style={{minWidth: '2rem'}}>
            <IconButton
              onClick={() => dispatch(getDeleteMission(mission._id))}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemIcon>
        ) : null}
        <ListItemIcon style={{minWidth: '2rem'}}>
          <Tooltip
            placement="bottom"
            title={
              mission.files.length > 0
                ? "קבצים מצורפים במשימה"
                : "אין קבצים מצורפים"
            }
          >
            <AttachFileIcon
              color={mission.files.length > 0 ? "secondary" : ""}
            />
          </Tooltip>
        </ListItemIcon>
        <ListItemIcon style={{minWidth: '2rem'}}>
          <Tooltip
            placement="bottom"
            title={
              mission?.url !== null
                ? "קישור לסרטון"
                : "אין קישור לסרטון"
            }
          >
            <OndemandVideoIcon
              sx={mission?.url !== null && { color: pink[500] }}
            />
          </Tooltip>
        </ListItemIcon>
        <ListItemIcon style={{minWidth: '2rem'}}>
          <Tooltip
            placement="bottom"
            title={mission.grade ? "כולל ציון" : "לא כולל ציון"}
          >
            <GradingIcon color={mission.grade ? "success" : ""} />
          </Tooltip>
        </ListItemIcon>
      </List>
    </Box>
  );
};

export default MissionComp;
