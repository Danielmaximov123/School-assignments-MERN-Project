import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getDeleteUser } from './../../redux/actions/getUsersAction';
import { useNavigate } from 'react-router-dom';

const DeletePopUp = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(state => state.users.users)
    let user = users.find(i => i._id === props.user)

    useEffect(() => {
      if(!user) {
        navigate('/missions')
      }
    },[user])

  return (
    <>
        <Dialog
        open={props?.user !== null ? true : null}
        onClose={() => props.setOpen(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction : 'rtl'}}
      >
        <DialogTitle id="alert-dialog-title">
          האם אתה רוצה למחוק את {user?.fName} {user?.lName} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            כל הנתונים של {user?.fName} {user?.lName} כולל המטלות והמידע שלו ימחקו.
            במידה ואתם בטוחים נא ללחוץ על הכפתור "כן" במידה ומתחרטים ללחוץ "לא"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='success' endIcon={<DeleteIcon/>} onClick={() => { props.setOpen(null) ; dispatch(getDeleteUser(user?._id)) }}>כן</Button>
          <Button variant='contained' color="error" endIcon={<CloseIcon/>} onClick={() => props.setOpen(null)}>לא</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeletePopUp