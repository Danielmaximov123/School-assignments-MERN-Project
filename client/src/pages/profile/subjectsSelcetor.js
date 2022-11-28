import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SelectorSubjects = (props) => {
  const subjects = useSelector(state => state.subjects.subjects)
  const [selectedOptions, setSelectedOptions] = useState([])

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
  let equal = subjects.find(i => i._id === props.subjects.subjectId)

  const removeOption = (id) => {
    let data = selectedOptions.filter( i => i._id !== id)
    setSelectedOptions(data)
  };

  const handleChange = (event, values) => {
    setSelectedOptions(values)
  };

  useEffect(() => {
    let data = []
    selectedOptions.map(i => data.push(i._id))
    props.setSubjects(data)
  },[selectedOptions])

  return (
    <>
      {
        !subjects ? 'loading' :
        <Autocomplete
        id="subjects"
        multiple={true}
        style={{ marginTop: "0rem" }} 
        value={selectedOptions}
        getOptionLabel={(subjects) => `${subjects?.title}`}
        options={subjects === undefined ? progress : subjects}
        noOptionsText={"לא נמצאו נושאי לימוד..."}
        renderTags={(values) =>
          values.map((value) => (
            <Chip
              style={{margin : '0.3rem'}}
              key={value._id}
              label={value.title}
              onDelete={() => removeOption(value._id)}
            />
          ))
        }
        renderOption={(props, subjects) => (
          <Box
            component="li"
            {...props}
            key={subjects?._id}
            data-id={subjects?._id}
            id={subjects?._id}
            value={subjects.title}
          >
            {subjects?.title}
          </Box>
        )}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField required variant="standard" {...params} label="נושאי לימוד" />
        )}
      />
      }
    </>
  );
};

export default SelectorSubjects;
