const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const fs = require('fs');

const port = process.env.PORT || 8000 ;
server.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});

var userDirectory = JSON.parse(fs.readFileSync("./DB/user.json"));
const fakeID = (n = 16) => {
  var s = String();
  for (let i = 0; i < n; i++) {

  }
};

var onlineUsers = [];
const updateUser = () => {
  fs.writeFileSync("./DB/user.json",JSON.stringify(userDirectory));
}


io.on('connection', socket => {
  console.log(socket.id + " connected");

  socket.on("fake login",data => {
    if(userDirectory[data.userName]){
      if(data.password === userDirectory[data.userName].password){
        userDirectory[data.userName].socket = socket.id;
        socket.emit("login",{success:true,userName:data.userName});
        onlineUsers.push([data.userName, socket.id]);
        updateUser();
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
        password: data.password,
        chatroom:[]
      }
      updateUser();
      socket.emit("register",{success:true,userName:data.userName});
      onlineUsers.push([data.userName, socket.id]);
    }
  });

  socket.on("join chat", (id) => {
    if(fs.existsSync("./DB/"+id+".json")){
      var chatHistory = JSON.parse(fs.readFileSync("./DB/"+id+".json"));
      socket.emit("join chat",{history: chatHistory});
      socket.join(id);
    } else {
      socket.emit("join chat",{error: "Chat room not exists"});
    }
  });

  socket.on("message", data => {
    if(!userDirectory[data.user]){
      socket.emit("alert",{msg: "login to send a message"});
      return;
    }
    var obj = {...data, date: new Date().getTime()},
        history = JSON.parse(fs.readFileSync("./DB/"+data.room+".json"));
    history.push(obj);
    fs.writeFileSync("./DB/"+data.room+".json", JSON.stringify(history));
    io.to(data.room).emit("message",obj);  
  });

  socket.on("disconnect",()=>{
    console.log(socket.id + " disconnected");
    console.log(onlineUsers);
    var index = onlineUsers.findIndex(x => x[1] === socket.id);
    if(index !== -1) {
      var temp = onlineUsers.splice(index,1);
      userDirectory[temp[0][0]].socket = null;
      updateUser();
    }
  });
});
