import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../resources/logo.svg';
import Styles from '../styles/Style';

function Navigation(props){
  const classes = Styles();
  const [state, setState] = useState(false);
  const toggleDrawer = open => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState(open);
  };
  const sideList = () => (
    <div
      className={classes.Navlist}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['CreateChatRoom', 'ChatRoom'].map((text, index) => (
          <Link to={text} key={index} className={classes.link}>
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Setting'].map((text, index) => (
          <Link to={text} key={index} className={classes.link}>
            <ListItem button key={text}>
                <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="fixed" className={classes.navigation}>
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src={logo}  style={{height: "60px"}}/>
          </Link>
          <Typography variant="h6" className={classes.Navtitle}>
            ChatRoom Example
          </Typography>
          <Link to='/login' className={classes.link}>
            {props.user?
              <Button color="inherit">Hi {props.user.name}</Button> :
              <Button color="inherit">Login</Button>
            }
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

export default Navigation;
