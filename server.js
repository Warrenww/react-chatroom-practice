const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);

const port = process.env.PORT || 8000 ;
server.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var userDirectory = {};

io.on('connection', socket => {
  console.log(socket.id + " connected");

  socket.on("fake login",data => {
    if(userDirectory[data.userName]){
      if(data.password === userDirectory[data.userName].password){
        userDirectory[data.userName].socket = socket.id;
        socket.emit("login",{success:true,userName:data.userName});
      }
      else socket.emit("login",{success:false, msg:"Invalid password"});
    } else {
      socket.emit("login",{success:false,msg:"User not found"})
    }
  });

  socket.on("register",data => {
    if(userDirectory[data.userName]){
      socket.emit("register",{success:false,msg:"User already registered"});
    } else {
      userDirectory[data.userName] = {
        socket: socket.id,
        password: data.password
      }
      socket.emit("register",{success:true,userName:data.userName});
    }
  });

  socket.on("disconnect",()=>{
    console.log(socket.id + " disconnected");
  });
});
