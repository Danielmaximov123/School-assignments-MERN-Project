import { Box, Grid, Tab, Tabs } from "@mui/material";
import UploadPhoto from "./uploadPhoto";
import EditProfile from "./edit profile";
import { useEffect, useState } from "react";
import ChangePassword from './ChangePassword';
import { useSelector } from 'react-redux';

const MyProfileComp = ({ auth , user }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const userLoading = useSelector(state => state.users.usersLoading)

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  useEffect(() => {
    document.title = `הפרופיל שלי - משימות הבית שלי`
 }, [])

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={4}>
          <UploadPhoto auth={auth} />
        </Grid>
        <Grid item xs>
          <Box
            style={{
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              borderRadius: "1rem",
              padding: "3rem",
            }}
          >
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="פרטים אישיים" tabIndex={0}/>
              <Tab label="שינוי סיסמה" tabIndex={1}/>
            </Tabs>
            { tabIndex === 0 && <EditProfile user={user} /> }
            { tabIndex === 1 && <ChangePassword user={user} userLoading={userLoading}/> }
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyProfileComp;
