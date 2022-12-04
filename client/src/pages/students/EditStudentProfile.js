import { Box, CircularProgress, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateUser } from '../../redux/actions/getUsersAction';
import { getAllCities } from '../../redux/actions/getVariousAction';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { LoadingButton } from '@mui/lab';
import GenderComp from './../profile/Gender';
import SelectorCity from '../profile/City';
import SelectorSubjects from '../profile/subjectsSelcetor';
import { getUpdateSubjectsUserMission } from '../../redux/actions/getMissionAction';

const EditStudentProfile = ({user}) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState()
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState()
  const [subjects, setSubjects] = useState([])
  const cities = useSelector((state) => state.various.cities);
  const loading = useSelector(state => state.users.usersLoading)


  useEffect(() => {
    setFName(user?.fName)
    setLName(user?.lName)
    setEmail(user?.email)
    setPhoneNumber(user?.phoneNumber)
    setGender(user?.gender)
    setCity(user?.city)
    setSubjects(user?.subjects)
}, [user]);

let progress = (
  <CircularProgress
    style={{
      width: "1.7rem",
      height: "1.7rem",
      marginRight: "auto",
      marginLeft: "auto",
    }}
  />
);

useEffect(() => {
  dispatch(getAllCities());
}, [dispatch]);

const handleSubmit = (e) => {
  e.preventDefault();
  let data = { fName , lName , email , phoneNumber , gender , subjects , city }
  dispatch(getUpdateUser(user._id , data))
  dispatch(getUpdateSubjectsUserMission({studentId : user?._id , subjects}))
};


  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
    style={{padding : '3rem 3rem 0rem'}}
  >
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
<Grid item xs={6} >
<TextField
        fullWidth
        variant="standard"
        label="שם פרטי"
      value={fName || ''}
      onChange={(e) => setFName(e.target.value)}
      />
</Grid>
<Grid item xs={6}>
<TextField
        fullWidth
        variant="standard"
        label="שם משפחה"
      value={lName || ''}
      onChange={(e) => setLName(e.target.value)}
      />
</Grid>
<Grid item xs={6}>
<TextField
        fullWidth
        variant="standard"
        label="דואר אלקטרוני"
      value={email || ''}
      onChange={(e) => setEmail(e.target.value)}
      />
</Grid>
<Grid item xs={6}>
<TextField
        fullWidth
        variant="standard"
        label="מספר טלפון"
      value={phoneNumber || ''}
      onChange={(e) => setPhoneNumber(e.target.value)}
      />
</Grid>
<Grid item xs={6}>
  <GenderComp setGender={setGender} gender={gender}/>
</Grid>
<Grid item xs={6}>
{cities.length !== 0 ? (
    <>
      <SelectorCity
        progress={progress}
        cities={cities}
        setCity={setCity}
        city={city}
        user={user}
      />
    </>
  ) : null}
</Grid>
<Grid item xs={12}>
    <SelectorSubjects user={user} setSubjects={setSubjects} subjects={subjects} />
</Grid>
</Grid>
  <LoadingButton
      onClick={handleSubmit}
      fullWidth
      endIcon={<SaveAsIcon />}
      loading={loading}
      type="submit"
      style={{margin : '1rem auto 0rem'}}
      loadingPosition="end"
      variant="contained"
    >
      שמור שינויים
    </LoadingButton>
</Box>
  )
}

export default EditStudentProfile