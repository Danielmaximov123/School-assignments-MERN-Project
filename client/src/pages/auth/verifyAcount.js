import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import logo from "../../logo.svg";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  getAllUsers,
  getChangePasswordUser,
  getVerifyUser,
} from "./../../redux/actions/getUsersAction";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import ValidateComp from "./validate";
import PasswordsForm from "./passwordsForm";
import { getLoginAuth } from './../../redux/actions/getAuthAction';

const VerifyAccountComp = ({users}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [incompatiblePasswords, setIncompatiblePasswords] = useState(null);
  const [passwordLength, setPasswordLength] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const loading = useSelector((state) => state.users.usersLoading);
  const [timeLeft, setTimeLeft] = useState(5);
  let id = searchParams.get("id");

  let user = users.find((user) => user._id === id);

  useEffect(() => {
    password !== confirmPassword
      ? setIncompatiblePasswords(true)
      : setIncompatiblePasswords(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    password.match(/^(?=.*[A-Z]).*$/g)
      ? setUpperCase(true)
      : setUpperCase(false);
    password.match(/^(?=.*[a-z]).*$/g)
      ? setLowerCase(true)
      : setLowerCase(false);
    password.length >= 8 ? setPasswordLength(true) : setPasswordLength(false);
  }, [password]);

  useEffect(() => {
    if (incompatiblePasswords) {
      if (password !== confirmPassword) {
        return setIncompatiblePasswords(true);
      } else {
        return setIncompatiblePasswords(false);
      }
    }
  });


  const handleVerify = async (e) => {
    e.preventDefault();
    let passwordStatus = await dispatch(getChangePasswordUser(id, {password}));
    if(passwordStatus?.success) {
      await dispatch(getVerifyUser(id , { activated : true }))
      let data = { email : user?.email, password}
      toast.success("חשבונך הופעל בהצלחה !", {  position: toast.POSITION.BOTTOM_CENTER,});
      setTimeout(async () => {
        await dispatch(getLoginAuth(data))
      }, 5000)
    }
  };


  useEffect(() => {
    if(user?.activated) {
      if(timeLeft === 0) {
        navigate('/')
      } 
      const intervalId = setInterval(() => {
  
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  })

  let disableButton = passwordLength && upperCase && lowerCase ? false : true;

  return (
    <Box>
      <Box style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <img alt="logo" src={logo} style={{ width: "8%" }} />
      </Box>
      {!user?.activated && (
        <>
      <Typography
        variant="h4"
        sx={{
          px: 5,
          mt: 10,
          mb: 5,
          fontWeight: "600",
          letterSpacing: "0.2rem",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        הפעלת חשבון
      </Typography>
      
          <Box textAlign="center">
            <Typography variant="h5">
              שלום , {user?.fName} {user?.lName}
            </Typography>
            <Typography variant="h5">אנא בחר סיסמה והפעל את חשבונך</Typography>
          </Box>
          <Box
            component="form"
            style={{ width: "20%", marginLeft: "auto", marginRight: "auto" }}
            onSubmit={handleVerify}
          >
            <PasswordsForm
              password={password}
              setPassword={setPassword}
              incompatiblePasswords={incompatiblePasswords}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />
            <ValidateComp
              incompatiblePasswords={incompatiblePasswords}
              passwordLength={passwordLength}
              upperCase={upperCase}
              lowerCase={lowerCase}
            />
            <LoadingButton
              fullWidth
              endIcon={<HowToRegIcon />}
              loading={loading}
              disabled={disableButton || incompatiblePasswords ? true : false}
              type="submit"
              loadingPosition="end"
              variant="contained"
            >
              צור סיסמה והפעל את החשבון
            </LoadingButton>
          </Box>
        </>
      )}
      {
        user?.activated &&
        <>
        <Typography
        variant="h4"
        sx={{
          px: 5,
          mt: 10,
          mb: 5,
          fontWeight: "600",
          letterSpacing: "0.2rem",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        חשבונך הופעל בהצלחה !
      </Typography>
      <Box textAlign="center">
            <Typography variant="h5">
            {user?.fName} תועבר למערכת בעוד
            </Typography>
            <CircularProgress style={{ width: "6rem", height: "6rem", marginTop: "2rem" }} variant="determinate" value={timeLeft * 20} />
        <Typography style={{position: 'absolute' ,width: '100%', top: '21.5rem'}} variant="h4">{timeLeft}</Typography>
          <Box>
            <Typography variant="h6">
              במידה ועדיין לא הועברת <Link href="/">לחץ כאן !</Link>
            </Typography>
          </Box>
          </Box>
        </>
      }
    </Box>
  );
};

export default VerifyAccountComp;

