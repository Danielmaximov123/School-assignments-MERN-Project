import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getDeleteUser } from './../../redux/actions/getUsersAction';

const DeletePopUp = (props) => {
    const dispatch = useDispatch()

  return (
    <>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction : 'rtl'}}
      >
        <DialogTitle id="alert-dialog-title">
          האם אתה רוצה למחוק את {props.user.fName} {props.user.lName} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            כל הנתונים של {props.user.fName} {props.user.lName} כולל המטלות והמידע שלו ימחקו.
            במידה ואתם בטוחים נא ללחוץ על הכפתור "כן" במידה ומתחרטים ללחוץ "לא"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='success' endIcon={<DeleteIcon/>} onClick={() => { props.setOpen(false) ; dispatch(getDeleteUser(props?.user?._id)) }}>כן</Button>
          <Button variant='contained' color="error" endIcon={<CloseIcon/>} onClick={() => props.setOpen(false)}>לא</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeletePopUp