import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getAddUser } from "../../redux/actions/getUsersAction";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "./../../redux/actions/getUsersAction";
import { toast } from "react-toastify";
import SelectorSubjects from "./subjectsSelcetor";

const NewUser = () => {
  const fName = useRef("");
  const lName = useRef("");
  const email = useRef("");
  const phoneNumber = useRef("");
  const [userType, setUserType] = useState("");
  const [gender, setgender] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      fName: fName.current.value,
      lName: lName.current.value,
      email: email.current.value,
      phoneNumber: phoneNumber.current.value,
      userType,
      gender,
      subjects
    };
    let noStudent = data.userType === 'student' && data.subjects === []
    let check =
      data.fName === "" ||
      data.lName === "" ||
      data.email === "" ||
      data.phoneNumber === "" ||
      data.userType === "" ||
      data.gender === "" ||
      noStudent
    if (check) {
      toast.error("אנא מלא את הטופס במלואו !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      let user = await dispatch(getAddUser(data));
      if(user) {
        await dispatch(getAllUsers())
        navigate("/students");
      }
    }
  };

  let types = [
    { key: "teacher", value: "מרצה" },
    { key: "student", value: "תלמיד" },
  ];

  let genderType = [
    { key: 10, value: "זכר" },
    { key: 20, value: "נקבה" },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          px: 5,
          mt: 10,
          mb: 5,
          fontWeight: "600",
          letterSpacing: "0.2rem",
          marginTop: "1rem",
          marginBottom: '1rem',
          textAlign: "center",
        }}
      >
        משתמש חדש
      </Typography>
      <Box
        component="form"
        style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}
        onSubmit={handleSubmit}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
          <TextField
            required
            fullWidth
            variant="standard"
            inputRef={fName}
            type="text"
            label="שם פרטי"
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            required
            fullWidth
            variant="standard"
            inputRef={lName}
            type="text"
            label="שם משפחה"
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            required
            fullWidth
            variant="standard"
            inputRef={email}
            type="email"
            label="דואר אלקטרוני"
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            required
            fullWidth
            variant="standard"
            inputRef={phoneNumber}
            type="text"
            label="מספר טלפון"
          />
          </Grid>
          <Grid item xs={6}>
          <FormControl
            required
            variant="standard"
            fullWidth
          >
            <InputLabel id="demo-simple-select-standard-label">מין</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            >
              <MenuItem disabled={true} value="Select Season">
                בחר
              </MenuItem>
              {genderType?.map((item, i) => {
                return (
                  <MenuItem key={i} value={item.key}>
                    {item.value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl
            required
            variant="standard"
            fullWidth
          >
            <InputLabel id="demo-simple-select-standard-label">
              סוג משתמש
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem disabled value="Select Season">
                בחר
              </MenuItem>
              {types?.map((item, i) => {
                return (
                  <MenuItem key={i} value={item.key}>
                    {item.value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          </Grid>
              {
                userType === 'student' &&
                <Grid item xs={12} style={{ marginBottom: "1rem" }} >
                <SelectorSubjects setSubjects={setSubjects} subjects={subjects} />
              </Grid>
              }
        </Grid>

        <LoadingButton
          onClick={handleSubmit}
          style={userType !== 'student' ? {marginTop : '1rem'} : null}
          fullWidth
          endIcon={<PersonAddIcon />}
          loading={false}
          type="submit"
          loadingPosition="end"
          variant="contained"
        >
          צור משתמש חדש
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default NewUser;
