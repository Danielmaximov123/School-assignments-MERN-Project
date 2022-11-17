import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import FormNewSubject from './FormNewSubject';

const NewSubject = (props) => {

  return (
    <>
          <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction : 'rtl' , textAlign : 'center' , minHeight : 450 }}
      >
        <DialogTitle id="alert-dialog-title">
          {props.user.fName} , איזה נושא {props.user.gender === 10 ? 'תרצה' : "תרצי"} להוסיף ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText component='div' id="alert-dialog-description">
            <FormNewSubject props={props}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewSubject