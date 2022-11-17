import { Grid, Typography } from '@mui/material';
import login from './illustration_login.png'
import logo from '../../logo.svg'
import LoginFormComp from './LoginForm';

const LoginComp = () => {

  return (
    <div>
        <Grid style={{ height : '100vh'}} container>
        <Grid item xs={6} md={4} style={{boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'}}>
        <img alt='logo' src={logo} style={{width: '14%', marginRight: '2rem', marginTop: '1rem'}}/>
        <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 , fontWeight: '600' , fontSize : '2.4rem' , letterSpacing: '0.2rem', marginRight: '2rem', marginTop: '1rem' }}>
              הי, ברוכים השבים !
            </Typography>
            <img src={login} alt="login" />
        </Grid>
        <Grid item xs={6} md={8} style={{padding: '7rem 14rem 0rem 20rem'}}>
        <Typography style={{fontWeight : '700'}} variant="h4" gutterBottom>התחברות לממשק</Typography>
        <LoginFormComp/>
        </Grid>
        </Grid>
    </div>
  )
}

export default LoginComp