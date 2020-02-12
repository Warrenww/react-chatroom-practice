import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from './Navigation';
import Home from './Home';
import Setting from './Setting';
import Register from './Register';
import Login from './Login';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import SlideSnackbar from '../components/Snackbar';
import Styles from '../styles/Style';
import io from 'socket.io-client';

function App(props) {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    msg: "",
    open: false,
    setOpen: (open) => {setSnackbar({...snackbar, open: open})},
    severity: "",
  });
  const classes = Styles();

  const alert = (msg, serverity) => {
    setSnackbar({...snackbar, msg, serverity, open: true});
  }

  useEffect(()=>{
    if(socket){
      socket.on('alert',(err) => {
        snackbar.setOpen(true);
        setSnackbar({...snackbar, msg: err.msg});
      });
    } else {
      setSocket(io.connect());
    }
  });

  return (
    <div className={classes.app + " NoSrollBar"}>
      <Router>
        <Navigation user={user} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/setting" render={
            () => (<Setting socket={socket} user={user} setUser={setUser}/>)
          } />
          <Route exact path="/login" render={
            () => (<Login socket={socket} user={user} setUser={setUser}/>)
          } />
          <Route exact path="/register" render={
            () => (<Register socket={socket} user={user} setUser={setUser}/>)
          } />
          <Route exact path="/ChatRoomList" render={
            () => (<ChatRoomList socket={socket} user={user} />)
          } />
          <Route exact path="/ChatRoom/:id" render={
            () => (<ChatRoom socket={socket} alert={alert} user={user} />)
          } />
          <Route exact path="/ChatRoom" render={
            () => (<ChatRoom socket={socket} alert={alert} user={user} />)
          } />
        </Switch>
      </Router>
      <SlideSnackbar {...snackbar} />
    </div>
  );
}

export default App;
