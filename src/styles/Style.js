import {makeStyles} from '@material-ui/core/styles';

const theme = {
  background: {
    gradient: "linear-gradient(120deg, #8f1553,#0c518a)",
    transparent:{
      black: "rgba(0,0,0,0.5)",
      white: "rgba(255,255,255,0.5)",
    }
  },
  spacing:{
    sm: "1rem",
    md: "3rem",
    lg: "5rem",
  },
  fontSize:{
    sm: "16px",
    md: "20px",
    lg: "24px"
  }
};

const Styles = makeStyles(() => ({
    root:{

    },
    app:{
      minHeight: "100vh",
      maxHeight: "100vh",
      overflow: "scroll",
      background: theme.background.gradient,
    },
    page:{
      marginTop: 90,
      display:"flex",
      flexDirection: "column",
    },
    container: {
      padding: theme.spacing.md,
      background: theme.background.transparent.white,
      borderRadius: 20,
      margin:theme.spacing.sm + " auto",
      display:"flex",
      flexDirection: "column",
      maxWidth: "90%",
    },
     form:{
      margin:"auto",
      display: "flex",
      flexDirection: "column",
      fontSize: theme.fontSize.md,
      textAlign: "center",
    },
     formGroup:{
      display:"flex",
      padding: theme.spacing.sm,
    },
    navigation: {
      background: theme.background.transparent.black,
      backdropFilter: 'blur(5px)'
    },
    Navtitle: {
      flexGrow: 1,
    },
    navigation: {
      background: 'rgba(0,0,0,.5)',
      backdropFilter: 'blur(5px)'
    },
    Navlist: {
      width: 250,
    },
    NavfullList: {
      width: 'auto',
    },
    link:{
      color: 'inherit',
      textDecoration: 'none'
    },
    chatroom:{
      width: 300,
      border: "1px solid #555",
      height: "calc(80vh - 120px)",
      display: "flex",
      flexDirection: "column",
      borderRadius: 10,
      padding: "10px 0",
    },
    messageHolder:{
      flex: 1,
      overflowY: "scroll",
      scrollBehavior: "smooth",
    },
    message:{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "5px 10px",
      position: "relative",
    },
    message_my:{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "5px 10px",
      position: "relative",
      flexDirection: "row-reverse",
    },
    messageContent:{
      borderRadius: 30,
      background: theme.background.transparent.white,
      minWidth: 30,
      padding: "5px 10px",
      maxWidth: "75%",
      margin: 10
    },
    messageTime:{
      fontSize: 12,
      position: "absolute",
      bottom: 0,
      right: 10,
    },
    messageTime_my:{
      fontSize: 12,
      position: "absolute",
      bottom: 0,
      left: 10,
    }
}));

export default Styles;
