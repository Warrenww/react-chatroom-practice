import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SlideSnackbar from '../components/Snackbar';
import NotLogin from '../components/NotLogin';
import {Redirect} from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import Styles from '../styles/Style';



function ChatRoom(props){
  const classes = Styles();
  const { id } = useParams();
  const socket = props.socket,
        user = props.user;

  useEffect(()=>{
      if(socket){
        socket.emit()
      }
  });

  return (
    <div className={classes.page}>
      { user ?
        <div>
        </div>:
        <div className={classes.container}>
          <NotLogin />
        </div>
      }
    </div>
  );
}

export default ChatRoom;
