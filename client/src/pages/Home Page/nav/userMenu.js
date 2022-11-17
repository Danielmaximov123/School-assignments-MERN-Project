import {  Divider, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import PersonAddAlt from '@mui/icons-material/PersonAddAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';

const UserMenuComp = ({selectedIndex}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch({ type : 'LOG_OUT_USER' })
        navigate('my-profile')
    }

  return (
    <>
    <List style={{padding : 0}}>
        <ListItem>
            <ListItemButton style={{borderRadius : '0.563rem' , padding: '0.5rem 0.2rem'}} selected={selectedIndex === 4} onClick={() => navigate('my-profile')}>
                    <ListItemIcon style={{minWidth: '2.5rem'}}>
                    <AccountCircleIcon style={{fontSize: '2rem'}}/>
                  </ListItemIcon>
                  <Typography style={selectedIndex === 4 ? {fontSize : '1.1rem' , fontWeight : '600'} : {fontSize : '1.1rem' , padding : 0}}>הפרופיל שלי</Typography>
            </ListItemButton>
        </ListItem>
    <Divider style={{width: '44%', marginLeft: 'auto', marginRight: 'auto', background: 'linear-gradient(229deg, transparent, #10c6cc42, transparent)', padding: '0.0589rem', borderColor: 'rgb(0 0 0 / 0%)'}}/>
    <ListItem>
            <ListItemButton style={{borderRadius : '0.563rem' , padding: '0.5rem 0.2rem'}} selected={selectedIndex === 5} onClick={() => navigate('new-user')}>
                    <ListItemIcon style={{minWidth: '2.5rem'}}>
                    <PersonAddAlt style={{fontSize: '1.5rem'}}/>
                  </ListItemIcon>
                  <Typography style={selectedIndex === 5 ? {fontSize : '1rem' , fontWeight : '600'} : {fontSize : '1rem' , padding : 0}}>משתמש חדש</Typography>
            </ListItemButton>
        </ListItem>
    <ListItem>
            <ListItemButton style={{borderRadius : '0.563rem' , padding: '0.5rem 0.2rem'}} selected={selectedIndex === 6} onClick={handleLogOut}>
                    <ListItemIcon style={{minWidth: '2.5rem'}}>
                    <Logout style={{fontSize: '1.5rem'}}/>
                  </ListItemIcon>
                  <Typography style={selectedIndex === 6 ? {fontSize : '1rem' , fontWeight : '600'} : {fontSize : '1rem' , padding : 0}}>להתנתק</Typography>
            </ListItemButton>
        </ListItem>
    </List>
    </>
  )
}

export default UserMenuComp