import { Grid, Typography } from "@mui/material";
import login from "./illustration_login.png";
import logo from "../../logo.svg";
import LoginFormComp from "./LoginForm";
import { useEffect } from "react";

const LoginComp = () => {

  useEffect(() => {
    document.title = `התחברות למערכת - משימות הבית שלי`
 }, [])

  return (
    <div>
      <Grid
        style={{ height: "100vh" }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid
          item
          xs
          style={
            window.screen.width > 1000
              ? {
                  boxShadow:
                    "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                }
              : {
                  boxShadow:
                    "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                  textAlign: "center",
                }
          }
        >
          <img
            alt="logo"
            src={logo}
            style={{ width: "14%", marginRight: "2rem", marginTop: "2rem" }}
          />
          <Typography
            variant="h3"
            sx={{
              px: 5,
              mt: 10,
              mb: 5,
              fontWeight: "600",
              fontSize: "2.4rem",
              letterSpacing: "0.2rem",
              marginRight: "2rem",
              marginTop: "1rem",
            }}
          >
            הי, ברוכים השבים !
          </Typography>
          <img src={login} alt="login" />
        </Grid>
        <Grid
          item
          xs
          style={
            window.screen.width >= 1000
              ? { padding: "10rem 14rem 4rem 20rem" }
              : { padding: "7rem 8rem 4rem 8rem" }
          }
        >
          <Typography style={{ fontWeight: "700" }} variant="h4" gutterBottom>
            התחברות למערכת
          </Typography>
          <LoginFormComp/>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginComp;
