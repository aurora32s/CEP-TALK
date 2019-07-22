//Module
var express=require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs=require('fs');
var ejs=require('ejs');
var multipart=require('connect-multiparty');

//clientid : Store nickname->socket.id
//socketid : Store socket.id->nickname
var clientid=[];
var socketid=[];
var message=[];
//Count the message number
var count=0;

//Connect DataBase
var connect=mysql.createConnection({
	user : 'root',
	password : '159789qw',
	database : 'CEP'
});


//Can Use req.body.-
app.use(bodyParser());
//Auto file store to public directory
app.use(express.static(__dirname+'/public'));
//Can Use req.file -> Store
app.use(multipart({uploadDir:__dirname+'/public'}));

//First Show Login Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.Login.html');
});

//Show SignUp Page
app.get('/signup',function(req,res){
	res.sendFile(__dirname + '/client.SignUp.html');
});

//Users want to signup
app.post('/SignUp',function(req,res){

	//if anyone is nothing
	if(req.body.email=="" || req.body.nickname=="" || req.body.password=="" || req.files.image.size == 0){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end('<script>alert("Emtpry One");document.location.href="/signup";</script>');
		return 0;
	}
	//Check about email or nickname already use
	connect.query('select email,nickname from REGIST where email=? OR nickname=?',
		[req.body.email,req.body.nickname],function(error,result){
			for(var i=0;i<result.length;i++){
				//if email already use
				//send the error message & send the signup page
				if(result[i].email == req.body.email){
					res.writeHead(200,{'Content-Type':'text/html'});
					res.end('<script>alert("Already Use ID");document.location.href="/signup";</script>');
					return 0;
				}
				//if nickname already use
				else if(result[i].nickname == req.body.nickname){
					res.writeHead(200,{'Content-Type':'text/html'});
					res.end('<script>alert("Aleady Use NickName");document.location.href="/signup";</script>');					
					return 0;
				}
			}
		var imageFile = req.files.image;
		var name=imageFile.name;
		//Insert the User Date Into DataBase
		connect.query('insert into REGIST(email,nickname,password,image) values(?,?,?,?)',
			[req.body.email,req.body.nickname,req.body.password,name],function(error,result){
				if(error){
					console.log('insert id error');
				}
				//Success signup & send the login page
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end('<script>alert("Success SignUp");document.location.href="/";</script>');
		});
	});

});

//Users want Login and use Chatting program
app.post('/Chat',function(req,res){
	//if anyone is nothing between email or password
	if(req.body.email=="" ||req.body.password==""){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end('<script>alert("Emtpry One");document.location.href="/";</script>');
		return 0;
	}
	//Check correct password?
	connect.query('select password,nickname,image from REGIST where email=?',
		[req.body.id],function(error,result){
			for(var i=0;i<result.length;i++){
				//correct password
				//send Chatting page
				if(result[i].password == req.body.password){
					fs.readFile('index.ejs','utf8',function(error,data){
						res.writeHead(200,{'Content-Type':'text/html'});
						res.end(ejs.render(data,{nickname:result[i].nickname,image:result[i].image}));
					});
					return 0;
				}
				//uncorrect password
				//send error message
				else{
					res.writeHead(200,{'Content-Type':'text/html'});
					res.end('<script>alert("Wrong Data");document.location.href="/";</script>');
					return 0;
				}
		}
		//There aren't email
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end('<script>alert("Wrong Data");document.location.href="/";</script>');
	});
});

io.on('connection', function(socket){

  socket.on('chat message', function(msg){
	console.log(msg.msg+"  "+msg.nickname);
	count=count+1;
	message[count]=msg.nickname;
	socket.emit('Self',count);
	socket.broadcast.emit('chat message',			
		{msg:msg.msg,count:count,client:msg.nickname,image:msg.image});
  });

  //Connect user
  socket.on('start',function(data){
    console.log('Connect   '+data);
    clientid[data]=socket.id;
    socketid[socket.id]=data;
    io.sockets.emit('user list',Object.keys(clientid));
    io.sockets.emit('adduser',data);
  });

  //Disconnect user
  socket.on('disconnect',function(){
     var nickname=socketid[socket.id];
     if(nickname != null){
	     io.sockets.emit('subuser',nickname);
	     delete socketid[socket.id];
	     delete clientid[nickname];
	     io.sockets.emit('user list',Object.keys(clientid));
     }
  });

  socket.on('emoticon',function(){
	connect.query('SELECT * FROM IMOTICON',function(error,result){
		socket.emit('emoticon',result);
	});
  });

  //remove the message
  socket.on('remove',function(data){
    var nickname=message[data];
    //if this message is my mesage
    //send remove all user
    if(socket.id == clientid[nickname]){
	socket.broadcast.emit('remove',data);
    }
  });

//during write
  socket.on('write',function(nickname){
	io.sockets.emit('write',nickname);
  });

  //stop write
  socket.on('finish',function(nickname){
	io.sockets.emit('finish',nickname);
  });

//user send imoticon
  socket.on('imoticon',function(data){
	count=count+1;
	message[count]=data.nickname;
	connect.query('SELECT image FROM IMOTICON WHERE id=?',[data.id],function(error,result){
		for(var i=0;i<result.length;i++){
			io.sockets.emit('icon',{icon:result[i].image,nickname:data.nickname,image:data.image,count:count});
		}
	});
  });
});

//Connect Server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
