import React from 'react'
import { TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

const PasswordsForm = (props) => {

  return (
    <>
            <TextField
              style={{ marginBottom: "1rem" }}
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              required
              fullWidth
              variant="standard"
              label="סיסמה"
              error={props.incompatiblePasswords ? true : false}
              type={props.showPassword ? "text" : "password"}
              inputProps={{ minLength: 8 , maxLength : 36 }}
              InputProps={{endAdornment: 
                <IconButton onClick={props.showPassword ? () =>  props.setShowPassword(false) : () =>   props.setShowPassword(true)}>
                  { props.showPassword ? <VisibilityOff/> : <Visibility/> }
                </IconButton>}}
            />
            <TextField
              style={{ marginBottom: "1rem" }}
              value={props.confirmPassword}
              onChange={(e) => props.setConfirmPassword(e.target.value)}
              required
              fullWidth
              variant="standard"
              label="אמת סיסמה"
              error={props.incompatiblePasswords ? true : false}
              type={props.showConfirmPassword ? "text" : "password"}
              inputProps={{ minLength: 8 , maxLength : 36 }}
              InputProps={{endAdornment: 
                <IconButton onClick={props.showConfirmPassword ? () =>  props.setShowConfirmPassword(false) : () =>   props.setShowConfirmPassword(true)}>
                  { props.showConfirmPassword ? <VisibilityOff/> : <Visibility/> }
                </IconButton>}}
            />
    </>
  )
}

export default PasswordsForm