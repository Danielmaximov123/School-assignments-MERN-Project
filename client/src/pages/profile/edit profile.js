import { LoadingButton } from "@mui/lab";
import {
  Box,
  TextField,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCities } from "../../redux/actions/getVariousAction";
import SelectorCity from './City';
import GenderComp from './Gender';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { getUpdateUser } from "../../redux/actions/getUsersAction";


const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState()
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState()
  const cities = useSelector((state) => state.various.cities);

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

  useEffect(() => {
        setFName(user?.fName)
        setLName(user?.lName)
        setEmail(user?.email)
        setPhoneNumber(user?.phoneNumber)
        setGender(user?.gender)
        setCity(user?.city)
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { fName , lName , email , phoneNumber , gender , city }
    dispatch(getUpdateUser(user._id , data))
  };

  return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{padding : '3rem'}}
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
</Grid>
      <LoadingButton
          onClick={handleSubmit}
          fullWidth
          endIcon={<SaveAsIcon />}
          loading={false}
          type="submit"
          loadingPosition="end"
          variant="contained"
        >
          שמור שינויים
        </LoadingButton>
    </Box>
  );
};

export default EditProfile;
