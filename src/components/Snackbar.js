import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import {Alert} from '@material-ui/lab';
import Styles from '../styles/Style';

/**

open : (Boolean) the Snackbar open state decelared in  parent component
setOpen : (hook) function to change the Snackbar open state

---optional---
msg : (string) the message to display
severity : (string) error/ warning/ info/ success


**/



function SlideSnackbar(props) {
  const { msg,
          open,
          setOpen,
          severity,
          position,
          ...others} = props;

  const handleClose = () => {
    setOpen(false);
  };

  var anchor = position || {};
  anchor.vertical = anchor.vertical || "bottom";
  anchor.horizontal = anchor.horizontal || "center";
  
  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        anchorOrigin={anchor}
      >
        <Alert onClose={handleClose} variant="filled" severity={severity || "error"}>
          {msg || "Testing message"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SlideSnackbar;
