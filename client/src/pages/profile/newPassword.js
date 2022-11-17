import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch } from 'react-redux';
import { getChangePasswordUser } from '../../redux/actions/getUsersAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewPasswordComp = ({user}) => {
    const [newPass, setNewPass] = useState('')
    const [showNewPass, setShowNewPass] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChangePass = async (e) => {
        e.preventDefault()
        let status = await dispatch(getChangePasswordUser(user._id , {password : newPass}))
        if(status.success) {
          toast.success(status.message , {position : toast.POSITION.BOTTOM_RIGHT})
            navigate('/')
        }
    }

  return (
    <>
        <Box component="form" onSubmit={handleChangePass}>
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={8}>
  <TextField
            name="password"
            label="סיסמה חדשה"
            variant="standard"
            fullWidth
            type={showNewPass ? "text" : "password"}
            onChange={e => setNewPass(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      showNewPass
                        ? setShowNewPass(false)
                        : setShowNewPass(true)
                    }
                    edge="end"
                  >
                    {!showNewPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
  </Grid>
  <Grid item xs={4} style={{marginTop: 'auto'}}>
  <IconButton disabled={newPass === "" ? true : false} size='large' type='submit'><CheckCircleIcon fontSize='large' color='success'/></IconButton>
  </Grid>
    </Grid>
        </Box>
    </>
  )
}

export default NewPasswordComp