import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SlideSnackbar from '../components/Snackbar';
import NotLogin from '../components/NotLogin';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import SendIcon from '@material-ui/icons/Send';
import Styles from '../styles/Style';



function ChatRoom(props){
  const classes = Styles();
  const { id } = useParams();
  const socket = props.socket,
        user = props.user;
  const [data, setData] = useState({
    error:null,
    history:null
  });

  const chatroomPanel = (data) => (
    <div>
      {
        data.error == null ?
        <div className={classes.chatroom}>
          <div className={classes.messageHolder}>
            {
              data.history?
              data.history.map((data, index) => (
                <div className={classes.message} key={index}>
                  {data.message}
                </div>
              )):null
            }
          </div>
          <Divider />
          <div style={{display:"flex", padding: "0 5px"}}>
            <TextField style={{flex:1}} id="standard-basic" placeholder="Type some text here..."/>
            <IconButton size="small">
              <SendIcon />
            </IconButton>
          </div>

        </div> :
        <Redirect to="/" />
      }
    </div>
  );

  useEffect(()=>{
      if(socket){
        if(data.history === null){
          socket.emit('join chat',(id || 'public_channel'));
        }
        socket.on('join chat',(data) => {
          setData(data);
          console.log(data);
        });
      }
  });

  return (
    <div className={classes.page}>
      { user ?
        <div className={classes.container}>
          {chatroomPanel(data)}
        </div>:
        <div className={classes.container}>
          {chatroomPanel(data) || <NotLogin />}
        </div>
      }
    </div>
  );
}

export default ChatRoom;
