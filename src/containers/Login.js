import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SlideSnackbar from '../components/Snackbar';
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";
import Styles from '../styles/Style';

function Login(props){
  const classes = Styles();
  const socket = props.socket,
        user = props.user;
  var input_ref = [];

  const [open, setOpen] = useState(false);
  const [errorMsg, setMsg] = useState(null);

  const login = () => {
    var userName = document.getElementById("userName").value,
        password = document.getElementById("password").value;

    if(!userName || !password){
      setMsg(`Please enter ${userName? "" : "user name"} ${(!userName && !password) ? "and" : ""} ${password ? "" : "password"}`);
      setOpen(true);
      return;
    }
    socket.emit("fake login",{userName,password});
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      login();
    }
  }

  useEffect(()=>{
    if(socket){
      socket.on("login",(res)=>{
        if(res.success) props.setUser({name:res.userName});
        else{
          setOpen(true);
          setMsg(res.msg);
        }
      });
    }
    input_ref.map(x => x.onkeypress = handleKeyPress);
  });

  return(
    <div className={classes.page}>
      { user ?
        <Redirect to='/' />:
        <div className={classes.container}>
          <h1 className={classes.title}>Logins</h1>
          <form className={classes.form}>
            <TextField
            id="userName"
            label="Username"
            fullWidth
            margin="normal"
            inputRef={el => input_ref.push(el)}
            />
            <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            inputRef={el => input_ref.push(el)}
            />
            <Button variant="contained" onClick={login} style={{marginTop:10}}>Login</Button>
            <Link to="/register" className={classes.link} style={{marginTop:10}}>Register</Link>
            <SlideSnackbar setOpen={setOpen} open={open} msg={errorMsg} />
          </form>
        </div>
      }
    </div>
  )
}

export default Login;
