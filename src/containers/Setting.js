import React, {useState, useEffect} from 'react';
import {Alert, AlertTitle} from '@material-ui/lab';
import Styles from '../styles/Style';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

function Setting(props){
  const socket = props.socket,
        user = props.user;

  const classes = Styles();

  const handleNameChange = (e) => { props.updateUser({name:e.target.value}); }
  const handleAgeChange = (e) => { props.updateUser({age:e.target.value}); }

  return(
    <div className={classes.page}>
      <div className={classes.container}>
        <h1>Settings</h1>
        {
          user ?
          <form className={classes.form}>
            <TextField
            label="Name"
            fullWidth
            margin="normal"
            onChange={handleNameChange}
            defaultValue={user.name}
            />
            <TextField
            label="Age"
            type="number"
            fullWidth
            margin="normal"
            onChange={handleAgeChange}
            />
          </form> :
          <Alert severity="warning">
            <AlertTitle>You are not login</AlertTitle>
            Please login to set up you information.
          </Alert>
        }
      </div>
    </div>
  )
}

export default Setting;
