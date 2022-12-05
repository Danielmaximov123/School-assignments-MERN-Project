import { Box, Chip, Link, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MissionDetails = ({ subject, studentMission, mission }) => {
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
      <ListItemText
        primary={
          <Typography style={{ textAlign: "center" }} variant="h5">
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
      <Box style={{ height: "2rem" }}>
        <Typography
          variant="subtitle2"
          style={{
            textAlign: "center",
          }}
        >
          {mission?.description}
        </Typography>
      </Box>
      <Box style={{ direction: "rtl", margin: "2rem", textAlign: "center" }}>
        <Link target='_blank' href={mission.url} style={{textDecoration: 'none'}}>
        <Chip
          clickable
          style={{ margin: "0.3rem" }}
          label={mission?.url ? "סרטון הסבר" : "אין סרטון הסבר"}
          color={mission?.url ? "success" : "error"}
          />
        </Link>
        <Chip
          style={{ margin: "0.3rem" }}
          label={studentMission?.completed ? "הוגשה המשימה" : "לא הוגשה משימה"}
          color={studentMission?.completed ? "success" : "error"}
        />
        <Chip
          style={{ margin: "0.3rem" }}
          label={
            studentMission?.grade ? studentMission?.grade : "טרם התקבל ציון"
          }
          color={studentMission?.grade ? "success" : "error"}
        />
      </Box>
    </Box>
  );
};

export default MissionDetails;
