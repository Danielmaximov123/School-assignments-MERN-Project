import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const SelectorSubjects = (props) => {
  const subjects = useSelector(state => state.subjects.subjects)

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
  
  return (
    <>
      {
        !subjects ? 'loading' :
        <Autocomplete
        id="subjects"
        multiple={true}
        style={{ marginTop: "0rem" }} 
        value={equal || undefined}
        getOptionLabel={(subjects) => `${subjects?.title}`}
        options={subjects === undefined ? progress : subjects}
        onChange={(e) =>
          props.setSubjects([...props?.subjects, {subjectId : e?.target?.id , title : e.target.innerText}])
        }
        noOptionsText={"לא נמצאו ערים..."}
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
        renderInput={(params) => (
          <TextField required variant="standard" {...params} label="נושאי לימוד" />
        )}
      />
      }
    </>
  );
};

export default SelectorSubjects;
