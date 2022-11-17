import { Box, Chip, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MissionDetails = ({user , subject , studentMission}) => {
    const mission = useSelector(state => state.missions.missionSingle)

  return (
    <Box
      sx=
      {{
        direction: "rtl",
        height: "auto",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "0.625rem",
        padding: "1rem",
        backgroundColor: "rgb(255, 255, 255)",
      }}>
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
        <Box margin='2rem' textAlign='center'>
        <Chip label={studentMission?.completed ? 'הוגשה המשימה' : 'לא הוגשה משימה'} color={studentMission?.completed ? 'success' : 'error'} />
        </Box>
    </Box>
  );
};

export default MissionDetails;
