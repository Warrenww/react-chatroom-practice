import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// icons
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import logo from '../resources/logo.svg';
import Styles from '../styles/Style';

function Navigation(props){
  const classes = Styles();
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleCollapse = (event) => {
    setOpen(!open);
    event.stopPropagation();
  }
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
        {['CreateChatRoom', 'ChatRoom','Setting'].map((text, index) => (
          <div>
            {
              text === 'ChatRoom' ?
              <div>
                <ListItem button key={text} onClick={toggleCollapse}>
                    <ListItemText primary={text} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/chatroom" className={classes.link}>
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="public channel" />
                        </ListItem>
                      </Link>
                  </List>
                </Collapse>
              </div> :
              <Link to={text} key={index} className={classes.link}>
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
              </Link>
            }
            <Divider />
          </div>
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
            <img src={logo} alt="logo"  style={{height: "60px"}}/>
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
        {sideList()}
      </Drawer>
    </div>
  );
}

export default Navigation;
