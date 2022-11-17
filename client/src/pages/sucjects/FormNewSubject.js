import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useDispatch } from 'react-redux';
import { getAddSubject } from '../../redux/actions/getSubjectsAction';
import { useNavigate } from 'react-router-dom';

const FormNewSubject = ({props}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleAddNew = (e) => {
        e.preventDefault()
        let data = { title , description }
        dispatch(getAddSubject(data))
        props.setOpen(false)
    }

  return (
    <Box style={{padding : '0rem 4rem'}} component='form' onSubmit={handleAddNew}>
        <TextField
          style={{marginBottom : '0.5rem'}}
          required
          fullWidth
          variant="standard"
          value={title || ''}
          onChange={e => setTitle(e.target.value)}
          type="text"
          label="שם נושא"
        />
        <TextField
          style={{marginBottom : '0.5rem'}}
          required
          fullWidth
          variant="standard"
          value={description || ''}
          onChange={e => setDescription(e.target.value)}
          multiline
          minRows={3}
          maxRows={4}
          type="text"
          label="תיאור"
        />
        <Box variant="span" textAlign='center'>
            <Button style={{margin: '0.5rem'}} variant='contained' color="success" endIcon={<LibraryAddIcon/>} type="submit">הוסף נושא</Button>
            <Button style={{margin: '0.5rem'}} variant='contained' color="error" onClick={() => props.setOpen(false)} endIcon={<CloseIcon/>} >ביטול</Button>
        </Box>
    </Box>
  )
}

export default FormNewSubject