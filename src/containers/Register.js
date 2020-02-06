import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SlideSnackbar from '../components/Snackbar';
import { Link } from "react-router-dom";
import {Redirect} from 'react-router-dom';
import Styles from '../styles/Style';

function Register(props){
  const classes = Styles();
  const socket = props.socket,
        user = props.user;

  const [open, setOpen] = useState(false);
  const [errorMsg, setMsg] = useState(null);

  const register = () => {
    var userName = document.getElementById("userName").value,
        password1 = document.getElementById("password").value,
        password2 = document.getElementById("password-check").value;

    if(!userName || !password1 || !password2){
      setOpen(true);
      setMsg(`Please enter your
        ${userName ? "" : "user name"}
        ${(!userName && (!password1 || !password2)) ? "and" : ""}
        ${(!password1 || !password2) ? "password" : ""}`)
    }
    if(password1 !== password2){
      setOpen(true);
      setMsg("Password not identical");
      return;
    }

    socket.emit("register", {userName, password:password1});
  }

  useEffect(() =>{
    if(socket){
      socket.on("register",res => {
        if(res.success){
          props.setUser({name:res.userName});
        } else {
          setOpen(true);
          setMsg(res.msg);
        }
      });
    }
  });

  return(
    <div className={classes.page}>
      { user ?
        <Redirect to='/' />:
        <div className={classes.container}>
          <h1 className={classes.title}>Register</h1>
          <form className={classes.form}>
            <TextField
            id="userName"
            label="Username"
            fullWidth
            margin="normal"
            />
            <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            />
            <TextField
            id="password-check"
            label="re-enter password"
            type="password"
            fullWidth
            margin="normal"
            />
            <Button variant="contained" onClick={register} style={{marginTop:10}}>Register</Button>
            <Link to="/login" className={classes.link} style={{marginTop:10}}> Login </Link>
            <SlideSnackbar setOpen={setOpen} open={open} msg={errorMsg} />
          </form>
        </div>
      }
    </div>
  )
}

export default Register;
