import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

const GenderComp = (props) => {

    let genderType = [
        { key: 10, value: "זכר" },
        { key: 20, value: "נקבה" }
      ]


  return (
    <>
            <FormControl
          required
          variant="standard"
          fullWidth
        >
          <InputLabel id="demo-simple-select-standard-label">
            מין
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            displayEmpty
            value={props.gender === 10 ? genderType[0].key : genderType[1].key}
            onChange={(e) => props.setGender(e.target.value)}
          >
            {genderType?.map((item) => {
              return (
                <MenuItem style={{direction : 'rtl'}} key={item.key} value={item.key}>
                  {item.value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
    </>
  )
}

export default GenderComp