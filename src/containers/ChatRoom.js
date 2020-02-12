import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SlideSnackbar from '../components/Snackbar';
import NotLogin from '../components/NotLogin';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

import SendIcon from '@material-ui/icons/Send';
import Styles from '../styles/Style';

function ChatRoom(props){
  const classes = Styles();
  const { id } = useParams();
  const socket = props.socket,
        user = props.user,
        alert = props.alert;
  const [history, setHistory] = useState({
    error:null,
    history:null
  });
  var input_ref, holder_ref;

  const chatroomPanel = (data) => (
    <div>
      {
        data.error == null ?
        <div className={classes.chatroom}>
          <div className={classes.messageHolder} ref={el => holder_ref = el}>
            {
              data.history?
              data.history.map((data, index) => (
                <div key={index}>
                  {createMessage(data)}
                </div>
              )):null
            }
          </div>
          <Divider />
          <div style={{display:"flex", padding: "0 5px"}}>
            <TextField style={{flex:1}} inputRef={(ref) => input_ref = ref} placeholder="Type some text here..."/>
            <IconButton size="small" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </div>

        </div> :
        <Redirect to="/" />
      }
    </div>
  );

  const sendMessage = () => {
    if(input_ref.value){
      if(user){
        socket.emit('message',{
          room: id || 'public_channel',
          user: user.name,
          msg: input_ref.value,
        });
        input_ref.value = "";
      }
      else {
        console.log("QWQ");
        input_ref.value = "";
        alert("login to send message");
      }
    }
  };
  const createMessage = (data) => {
    let tempU = user || {};
    if(data){
      return(
        <div className={data.user === tempU.name ? classes.message_my : classes.message}>
          <Avatar>{data.user.substring(0,2)}</Avatar>
          <div className={classes.messageContent}>{data.msg}</div>
          <div className={data.user === tempU.name ? classes.messageTime_my : classes.messageTime}>{data.date}</div>
        </div>
      );
    }
  };
  const initSocket = () => {
    socket.on('join chat',(data) => {
      setHistory(data);
    });
    socket.on("message", msg => {
      if(history.history){
        let temp = Array.from(history.history);
        temp.push(msg);
        setHistory({...history, history: temp});
      }
    });
  }
  useEffect(()=>{
      if(socket){
        initSocket();
        if(history.history === null){
          socket.emit('join chat',(id || 'public_channel'));
        }
      }
      if(input_ref){
        input_ref.onkeypress = (event) => {
          if(event.key === 'Enter') {
            sendMessage();
          }
        };
      }
      if(holder_ref.lastChild){
        holder_ref.lastChild.scrollIntoView();
      }
  });

  return (
    <div className={classes.page}>
      { user ?
        <div className={classes.container}>
          {chatroomPanel(history)}
        </div>:
        <div className={classes.container}>
          {chatroomPanel(history) || <NotLogin />}
        </div>
      }
    </div>
  );
}

export default ChatRoom;
