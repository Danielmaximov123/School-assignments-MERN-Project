import {
  Box,
  CircularProgress,
  Grid,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import bcrypt from "bcryptjs";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PasswordIcon from '@mui/icons-material/Password';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from "react-toastify";
import NewPasswordComp from './newPassword';

const ChangePassword = ({user}) => {
  const [pass, setPass] = useState({ password : "" , confirm : ""})
  const [showPass, setShowPass] = useState({ password : false , confirm : false});
  const [loading, setLoading] = useState(false)
  const [change, setChange] = useState(false)
  const [validate, setValidate] = useState(<IconButton size="large" type="submit" variant="contained" >
  <PasswordIcon fontSize="large"/>
</IconButton>)



  const validatePassword = async (e) => {
    e.preventDefault()
    await setLoading(true)
    let checkPass = await bcrypt.compareSync( pass.password , user.password)
    if(checkPass === true) {
      await setValidate(<Tooltip title="הסיסמה אומתה רשאים לשנות סיסמה" placement="left"><Box style={{padding : '0.75rem' , width: 'fit-content'}}><PasswordIcon fontSize="large" color="success"/></Box></Tooltip>)
      toast.success("הסיסמה אומתה" , {position : toast.POSITION.BOTTOM_RIGHT})
      setChange(true)
      await setLoading(false)
    } else {
      await setValidate(<IconButton size="large" type="submit" variant="contained" >
      <Tooltip title="הסיסמה לא אומתה, אנא נסו שוב" placement="left"><CancelIcon fontSize="large" color="error"/></Tooltip>
    </IconButton>)
      toast.error("הסיסמה לא אומתה, אנא נסו שוב" , {position : toast.POSITION.BOTTOM_RIGHT})
      await setLoading(false)
    }
    
  };

  useEffect(() => {
    if(loading) {
      setValidate(<CircularProgress color="success" sx={{width: '1.875rem', height: '1.875rem'}} />)
    }
  },[loading])

  return (
    <Box
      style={{ padding: '3rem 3rem 0rem 0rem' }}
    >
    <Box
      component="form"
      onSubmit={validatePassword}
    >
        <Typography variant="h5" style={{fontSize : '1.2rem' , fontWeight : '600' , marginBottom : '0.8rem'}}>
          אמת את סיסמתך
        </Typography>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <TextField
            name="password"
            label="סיסמה ישנה"
            variant="standard"
            fullWidth
            type={showPass.password ? "text" : "password"}
            onChange={e => setPass({...pass, password : e.target.value})}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      showPass.password
                        ? setShowPass({...showPass, password : false})
                        : setShowPass({...showPass, password : true})
                    }
                    edge="end"
                  >
                    {!showPass.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="password"
            label="אמת סיסמה ישנה"
            variant="standard"
            fullWidth
            type={showPass.confirm ? "text" : "password"}
            onChange={e => setPass({...pass, confirm : e.target.value})}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      showPass.confirm
                        ? setShowPass({...showPass, confirm : false})
                        : setShowPass({...showPass, confirm : true})
                    }
                    edge="end"
                  >
                    {!showPass.confirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={4} style={{marginTop : 'auto'}}>{validate}</Grid>
      </Grid>
    </Box>
      {
        change &&
        <Box style={{padding : '1rem 0rem'}}>
        <Typography variant="h5" style={{fontSize : '1.2rem' , fontWeight : '600' , marginBottom : '0.8rem' }}>
               צור סיסמה חדשה
            </Typography>
            <NewPasswordComp user={user}/>
        </Box>
      }
    </Box>
  );
};

export default ChangePassword;
