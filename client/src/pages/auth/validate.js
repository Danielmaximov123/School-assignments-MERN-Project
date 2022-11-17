import { Typography } from '@mui/material'
import { green, grey } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ValidateComp = ({incompatiblePasswords , passwordLength , upperCase , lowerCase}) => {
  return (
    <>
            {
                incompatiblePasswords ? 
              <Typography variant='span' style={{marginBottom : "0.5rem" , display: 'flex'}}>
              <CancelIcon color='error'/>
              <Typography variant='span' style={{verticalAlign : "super"}}>סיסמאות אינן תואמות</Typography>
              </Typography>
              : null
        }
            <Typography variant='span' style={{marginBottom : "0.5rem" , display: 'flex'}}>
              <CheckCircleIcon sx={passwordLength ? { color: green[400] } : { color: grey[400] }}/>
              <Typography variant='span' style={{verticalAlign : "super"}}>מינימום 8 תווים</Typography>
              </Typography>
              <Typography variant='span' style={{marginBottom : "0.5rem" , display: 'flex'}}>
              <CheckCircleIcon sx={upperCase ? { color: green[400] } : { color: grey[400] }}/>
              <Typography style={{verticalAlign : "super"}}>מינימום אות 1 גדולה</Typography>
              </Typography>
              <Typography variant='span' style={{marginBottom : "0.8rem" , display: 'flex'}}>
              <CheckCircleIcon sx={lowerCase ? { color: green[400] } : { color: grey[400] }}/>
              <Typography  variant='span' style={{verticalAlign : "super"}}>מינימום אות 1 קטנה</Typography>
              </Typography>
    </>
  )
}

export default ValidateComp