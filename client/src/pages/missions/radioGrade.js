import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const RadioGrade = (props) => {
  return (
    <FormControl required>
  <FormLabel id="demo-controlled-radio-buttons-group">ציון</FormLabel>
  <RadioGroup
    row
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={props.grade || ''}
    onChange={e => props.setGrade(e.target.value)}
  >
    <FormControlLabel onChange={(e) => props.setGrade(e.target.value)} value={true} control={<Radio size='small' />} label="כן" />
    <FormControlLabel onChange={(e) => props.setGrade(e.target.value)} value={false} control={<Radio size='small' />} label="לא" />
  </RadioGroup>
</FormControl>
  )
}

export default RadioGrade