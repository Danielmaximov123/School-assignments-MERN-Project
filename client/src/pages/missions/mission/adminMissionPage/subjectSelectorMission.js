import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const SubjectSelector = (props) => {
  const subjects = useSelector((state) => state.subjects.subjects);

  return (
          <FormControl
            required
            variant="standard"
            fullWidth  
          >
            <InputLabel id="demo-simple-select-standard-label">
              בחר קורס
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              style={{textAlign : 'right' , marginBottom : '0.5rem'}}
              value={props?.subject}
              onChange={(e) => props.setSubject(e.target.value)}
            >
              <MenuItem style={{width : '100%' , direction : 'rtl'}} disabled value="בחר קורס">
                בחר
              </MenuItem>
              {subjects?.map((item, i) => {
                return (
                  <MenuItem style={{width : '100%' , direction : 'rtl'}} key={i} value={item._id}>
                    {item.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
  )
}

export default SubjectSelector