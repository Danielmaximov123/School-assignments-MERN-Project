import React from 'react'
import { Toolbar, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = () => {
    const drawerWidth = 300

  return (
    <Box
    component='main'
    style={{ flexGrow: 1, padding: 3, width: `calc(100% - ${drawerWidth}px)` , float: 'left' }}
  >

      <Toolbar style={{minHeight : '1.875rem'}}/>
      <Box style={{margin: '1rem 2rem'}}>
      <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout