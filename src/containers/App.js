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
import Styles from '../styles/Style';
import io from 'socket.io-client';

function App(props) {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const classes = Styles();

  useEffect(()=>{
    if(socket){

    } else {
      setSocket(io.connect());
    }
  });

  return (
    <div className={classes.app + " NoSrollBar"}>
      <Router>
        <Navigation user={user} />
        <Switch>
          <Route exact path="/setting" render={
            () => (<Setting socket={socket} user={user} updateUser={setUser}/>)
          } />
          <Route exact path="/login" render={
            () => (<Login socket={socket} user={user} setUser={setUser} updateUser={setUser}/>)
          } />
          <Route exact path="/register" render={
            () => (<Register socket={socket} user={user} setUser={setUser} updateUser={setUser}/>)
          } />
          <Route path="/" components={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
