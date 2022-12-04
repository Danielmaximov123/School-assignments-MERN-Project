import { Box, Typography } from '@mui/material';
import AdminHomePage from './adminHomePage';
import StudentHomePage from './studentHomePage';
import { useSelector } from 'react-redux';

const HomePageComp = ({auth , user}) => {

  return (
    <Box>
      <Box style={{ padding: "1rem 0.2rem" }}>
      <Typography variant='h5' style={{ fontWeight : '700' , letterSpacing: '0.1rem'}}>
      שלום , {auth?.fName} !
      </Typography>
      </Box>
      {
        auth?.userType === 'student' ? 
        <>
          <StudentHomePage auth={auth} user={user}/>
        </> :
        <>
          <AdminHomePage auth={auth} user={user}/>
        </>
      }
    </Box>
  )
}

export default HomePageComp