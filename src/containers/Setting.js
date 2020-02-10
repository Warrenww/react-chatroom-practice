import React, {useState, useEffect} from 'react';
import Styles from '../styles/Style';
import TextField from '@material-ui/core/TextField';
import NotLogin from '../components/NotLogin';

function Setting(props){
  const socket = props.socket,
        user = props.user;

  const classes = Styles();

  const handleNameChange = (e) => { props.setUser({name:e.target.value}); }
  const handleAgeChange = (e) => { props.setUser({...user,age:e.target.value}); }

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
          <NotLogin />
        }
      </div>
    </div>
  )
}

export default Setting;
