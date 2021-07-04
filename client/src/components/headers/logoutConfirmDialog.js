import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogoutConfirmDialog(props) {

  const { confirmDialog, setConfirmDialog} = props;

  return (
    <div>
      <Dialog
        open={confirmDialog.isOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to Log out!"}</DialogTitle>
        <DialogActions>
          <Button onClick={()=>setConfirmDialog({...confirmDialog, isOpen:false})} color="primary">
            No
          </Button>
          <Button onClick={confirmDialog.onConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}