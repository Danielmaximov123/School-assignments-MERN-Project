import { Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import KeyIcon from "@mui/icons-material/Key";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getForgetPassword } from "../../redux/actions/getUsersAction";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const usersLoading = useSelector((state) => state.users.usersLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await dispatch(getForgetPassword(email))
    console.log(data);
    if(data.success) {
      navigate('/sign-in')
    }
  };

  return (
    <Box
      style={
        window.screen.width >= 1000
          ? { margin: "7rem auto", width: "20%" }
          : { margin: "7rem 15rem" }
      }
    >
      <Link to="/sign-in" variant="subtitle2" underline="hover">
        חזרה להתחברות
      </Link>
      <Typography style={{ fontWeight: "700" }} variant="h4" gutterBottom>
        שכחתי סיסמה
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          value={email || ""}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          label="דואר אלקטרוני"
          type='email'
        />
        <Typography
          style={{
            fontWeight: "400",
            textAlign: "center",
            margin: "0.5rem auto",
            padding: "0rem 2rem",
            color: "gray",
          }}
          variant="subtitle1"
        >
          לאחר מילוי הטופס ישלח למייל קישור לאיפוס הסיסמה
        </Typography>
        <LoadingButton
          onClick={handleSubmit}
          fullWidth
          loading={usersLoading}
          endIcon={<KeyIcon />}
          type="submit"
          loadingPosition="end"
          variant="contained"
        >
          שלחו לי איפוס ססימה
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
