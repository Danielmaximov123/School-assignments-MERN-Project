import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

const SubjectSelectorMission = (props) => {

  return (
          <FormControl
            required
            variant="standard"
            fullWidth
            
          >
            <InputLabel id="demo-simple-select-standard-label">
              נושא לימוד
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              style={{textAlign : 'right' , marginBottom : '0.5rem'}}
              value={props.subject}
              onChange={(e) => props.setSubject(e.target.value)}
            >
              <MenuItem style={{width : '100%' , direction : 'rtl'}} disabled value="Select Season">
                בחר
              </MenuItem>
              {props.subjects?.map((item, i) => {
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

export default SubjectSelectorMission