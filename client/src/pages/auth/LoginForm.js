import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginAuth } from '../../redux/actions/getAuthAction';
import { Link } from 'react-router-dom';

const LoginFormComp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const email = useRef(null)
    const password = useRef(null)
    const authLoading = useSelector(state => state.auth.authLoading)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data = {
          email : email.current.value,
          password : password.current.value,
        }
        dispatch(getLoginAuth(data))
      }

  return (
    <>
    <Box component="form" onSubmit={handleSubmit}>
    <Stack spacing={3}>
        <TextField name="email" label="דואר אלקטרוני" inputRef={email}/>
        <TextField
          name="password"
          label="סיסמא"
          type={showPassword ? 'text' : 'password'}
          inputRef={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)} edge="end">
                  {!showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link to='/forget-password' variant="subtitle2" underline="hover">
          שכחת סיסמא ?
        </Link>
      </Stack>
      <LoadingButton
          onClick={handleSubmit}
          fullWidth
          endIcon={<KeyIcon />}
          loading={authLoading}
          type='submit'
          loadingPosition="end"
          variant="contained"
        >
          התחברות
        </LoadingButton>
    </Box>
    </>
  )
}

export default LoginFormComp