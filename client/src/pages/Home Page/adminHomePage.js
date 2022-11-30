import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMissions } from './../../redux/actions/getMissionAction';

const AdminHomePage = () => {
    const students = useSelector(state => state.users.users)

    

  return (
    <Box
      sx={{
        direction: "rtl",
        height: "auto",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "0.625rem",
        padding: "1rem",
        backgroundColor: "rgb(255, 255, 255)",
      }}
    >
        AdminHomePage
    </Box>
  )
}

export default AdminHomePage