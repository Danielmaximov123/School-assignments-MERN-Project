import { LoadingButton } from "@mui/lab";
import { Alert, Box, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PasswordsForm from "./passwordsForm";
import ValidateComp from "./validate";
import LockResetIcon from "@mui/icons-material/LockReset";
import { toast } from "react-toastify";
import { getLoginAuth } from "../../redux/actions/getAuthAction";
import { getChangePasswordUser } from "../../redux/actions/getUsersAction";

const ResetPassword = ({ users }) => {
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let token = searchParams.get("token");
  let user = users.find((user) => user._id === id);
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
  const usersLoading = useSelector((state) => state.users.usersLoading);
  const [tokenExp, setTokenExp] = useState(false);

  useEffect(() => {
    document.title = `סיסמה חדשה - משימות הבית שלי`
 }, [])

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

  let interval = setInterval(() => {
    if (token) {
      const { exp } = jwtDecode(token);
      if ( exp * 1000 < Date.now()) {
        setTokenExp(true);
      }
    } else {
      clearInterval(interval);
    }
  }, [10000]);

  let disableButton = passwordLength && upperCase && lowerCase ? false : true;


  const handleReset = async (e) => {
    e.preventDefault();
    let passwordStatus = await dispatch(
      getChangePasswordUser(id, { password })
    );
    if (passwordStatus?.success) {
      let data = { email: user?.email, password };
      toast.success("הסיסמה אופסה בהצלחה !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setTimeout(async () => {
        await dispatch(getLoginAuth(data));
        toast.success("התחברות בוצעה בהצלחה !", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
      }, 2000);
    }
  };

  return (
    <Box style={{margin : '7rem'}}>
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
        איפוס סיסמה
      </Typography>
      <Box textAlign="center">
        <Typography variant="h5">
          שלום , {user?.fName} {user?.lName}
        </Typography>
        <Typography variant="h5">אנא בחר סיסמה חדשה !</Typography>
      </Box>

      <Box
        component="form"
        style={window.screen.width >= 1000 ? { width: "20%", marginLeft: "auto", marginRight: "auto" } : { width: "50%", marginLeft: "auto", marginRight: "auto" }}
        onSubmit={handleReset}
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
        {
            tokenExp ? <>
            <Alert severity="warning">תם הזמן לאיפוס סיסמה, <Link to='/forgot-password'>אנא שלח איפוס סיסמה חדש</Link></Alert>
            </> : 
            <ValidateComp
            incompatiblePasswords={incompatiblePasswords}
            passwordLength={passwordLength}
            upperCase={upperCase}
            lowerCase={lowerCase}
      />
        }
        <LoadingButton
          fullWidth
          endIcon={<LockResetIcon />}
          loading={usersLoading}
          disabled={disableButton || incompatiblePasswords || tokenExp ? true : false}
          type="submit"
          loadingPosition="end"
          variant="contained"
        >
          צור סיסמה חדשה
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ResetPassword;
