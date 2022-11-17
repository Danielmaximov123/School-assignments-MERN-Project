import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import logo from '../../../logo.svg'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import UserMenuComp from './userMenu';

const drawerWidth = 300;

const NavSection = ({auth , user}) => {
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(null)

    useEffect(() => {
        switch (window.location.pathname) {
          case "/missions":
            setSelectedIndex(1)
            break
          case "/subjects":
            setSelectedIndex(2)
            break
          case "/students":
            setSelectedIndex(3)
            break
          case "/my-profile":
            setSelectedIndex(4)
            break
          case "/add-student":
            setSelectedIndex(5)
            break
          default:
            setSelectedIndex(null)
            break
        }
      }, [window.location.pathname])
    
  return (
    <div>
    <Box sx={{ display: 'flex' }}>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth , borderRight: '1px dashed rgba(145, 158, 171, 0.24)' }
          }}
          open
        >
            <img onClick={() => navigate('/')} alt='logo' src={logo} style={{cursor : 'pointer' ,width: '20%', marginRight: 'auto', marginLeft: 'auto' , marginTop: '2rem' }}/>
            
            <Box style={{backgroundColor : '#EDEFF1' , padding : '0.5rem' , margin : '1rem 1rem' , borderRadius : '0.563rem'}}>
                <Accordion style={{ backgroundColor : 'transparent' , border : '0' , boxShadow : 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography textAlign='center' variant='h5'>{user?.fName} {user?.lName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserMenuComp selectedIndex={selectedIndex}/>
        </AccordionDetails>
      </Accordion>
            </Box>
            <Divider style={{width: '74%', marginLeft: 'auto', marginRight: 'auto', background: 'linear-gradient(229deg, transparent, #10c6cc42, transparent)', padding: '0.0589rem', borderColor: 'rgb(0 0 0 / 0%)'}}/>
            <List>
              <ListItem>
            <ListItemButton style={{borderRadius : '0.563rem'}} selected={selectedIndex === 1} onClick={() => navigate('missions')}>
                    <ListItemIcon>
                    <InboxIcon style={{fontSize: '2rem'}}/>
                  </ListItemIcon>
                  <Typography style={selectedIndex === 1 ? {fontSize : '1.1rem' , fontWeight : '600'} : {fontSize : '1.1rem'}}>משימות</Typography>
            </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton style={{borderRadius : '0.563rem'}} selected={selectedIndex === 2} onClick={() => navigate('subjects')}>
                    <ListItemIcon>
                    <MailIcon style={{fontSize: '2rem'}}/>
                  </ListItemIcon>
                  <Typography style={selectedIndex === 2 ? {fontSize : '1.1rem' , fontWeight : '600'} : {fontSize : '1.1rem'}}>נושאים</Typography>
                </ListItemButton>
              </ListItem>
            {
              auth?.userType === "admin" || auth?.userType === "teacher" ?
              <ListItem>
              <ListItemButton style={{borderRadius : '0.563rem'}} selected={selectedIndex === 3} onClick={() => navigate('students')}>
                  <ListItemIcon>
                  <MailIcon style={{fontSize: '2rem'}}/>
                </ListItemIcon>
                <Typography style={selectedIndex === 3 ? {fontSize : '1.1rem' , fontWeight : '600'} : {fontSize : '1.1rem'}}>סטודנטים</Typography>
              </ListItemButton>
            </ListItem> : null
            }
          </List>
        </Drawer>
      </Box>
    </Box>
    </div>
  )
}

export default NavSection