//Module
var express=require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var multipart=require('connect-multiparty');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  console.log("connect");
  
  socket.on('sendMessage', function(msg){
	  console.log(msg)
	socket.emit('receiveMessage',msg);
  });
});

//Connect Server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
