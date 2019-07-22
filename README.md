# CEP-TALK
CEP(Computer Programming Project) Talk : Realtime Chatting Program(Web , App) - javascript, html, css

## 1. WebPage - Chatting Program

### Language : javascript - Http, Css

### Server : Node.js[Linux]

### DataBase : MySql

(1) 기본 구조

![1](https://user-images.githubusercontent.com/22411296/61609729-02948000-ac92-11e9-871c-f79055e4c5b0.JPG)

(2) 데이터베이스

![2](https://user-images.githubusercontent.com/22411296/61609752-150eb980-ac92-11e9-8ecd-52f456496d4b.JPG)

(3) Login / Sign Up

![3](https://user-images.githubusercontent.com/22411296/61610329-ceba5a00-ac93-11e9-870a-deef2d146f5c.png)

(4) Main
![5](https://user-images.githubusercontent.com/22411296/61610892-5ce31000-ac95-11e9-93ff-41206c055f51.png)

- Nick name 설정
    1. 채팅방 접속시
        
        - Client : Socket.emit(‘start’,nickname);

        - Server
              Socket.on(‘start’,function(data){
	                clientid[data]=socket.id;
	                socketed[socket.id]=data;
	                io.sockets.emit(‘user list’,Object.keys(clientid));
	                io.sockets.emit(‘adduser’,data);
                  
                  //프로필 사진
                  Connect.query(‘select * FROM IMOTICON’,function(error,result){
	                  for(var i=0;i<result.length;i++){
		                  socket.emit(‘imoticon’,{id:result[i].id,icon:result[i].image});
	                  }
                  });
		  
 (5) Change Color
 ![6](https://user-images.githubusercontent.com/22411296/61611067-cbc06900-ac95-11e9-8bb2-d64689f920a6.png)

- Function to change Color
![6 5](https://user-images.githubusercontent.com/22411296/61611152-06c29c80-ac96-11e9-992c-78aa6156f861.PNG)

# 

## 2. Hybrid App - Chatting Program

### Language : javascript - Http, css

### Platform : Cordova

### Server : Node.js[Windows]

### DataBase : MySql



