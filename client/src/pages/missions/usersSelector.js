import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const UsersSelector = (props) => {
  const users = useSelector((state) => state.users.users);

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

  let students = users.filter((stud) => stud.userType === "student");

  let equal = students.find((i) => i._id === props.students.studentId);

  return (
    <>
      <Autocomplete
        id="users"
        multiple={true}
        style={{ marginTop: "0rem" }}
        value={equal || undefined}
        getOptionLabel={(students) => `${students?.fName} ${students?.lName}`}
        options={students === undefined ? progress : students}
        onChange={(e) =>
          props.setStudents([
            ...props?.students,
            { studentId: e?.target?.id, complete: false },
          ])
        }
        noOptionsText={"לא נמצאו סטודנטים..."}
        renderOption={(props, students) => (
          <Box
            component="li"
            style={{ direction: "rtl" }}
            {...props}
            key={students?._id}
            data-id={students?._id}
            id={students?._id}
            value={students.title}
          >
            {students?.fName} {students?.lName}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            style={{ marginBottom: "0.5rem" }}
            variant="standard"
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "users-selector",
              required: students.length === 0
            }}
            required
            label="סטודנטים"
          />
        )}
      />
    </>
  );
};

export default UsersSelector;
