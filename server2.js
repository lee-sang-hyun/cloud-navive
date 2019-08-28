var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

var port = process.env.PORT || 3002;
server.listen(port, function(){
  console.log('Server runnig...');
});


app.get('/',function(req, res){
  res.sendFile(__dirname + '/client1.html');
});


io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length)
  
  //Disconnect
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length)
  });

  //Send Message
  socket.on('send message', function(data){
      console.log(data);
      io.sockets.emit('new message', {msg: data});
  });
});

