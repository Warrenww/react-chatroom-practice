import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import {Alert} from '@material-ui/lab';
import Styles from '../styles/Style';

function SlideSnackbar(props) {
  const {msg, open, setOpen, severity,  ...others} = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
      >
        <Alert onClose={handleClose} variant="filled" severity={severity || "error"}>
          {msg || "I love snacks"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SlideSnackbar;
