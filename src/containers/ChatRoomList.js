import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SlideSnackbar from '../components/Snackbar';
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";
import Styles from '../styles/Style';

function ChatRoomList(props){
  const classes = Styles();

  return(
    <div className={classes.page}>

    </div>
  )
}

export default ChatRoomList;
