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

- Function to change Color

# 

## 2. Hybrid App - Chatting Program

### Language : javascript - Http, css

### Platform : Cordova

### Server : Node.js[Windows]

### DataBase : MySql

1. 어플리케이션 기본 화면

![2_1](https://user-images.githubusercontent.com/22411296/61611840-dda30b80-ac97-11e9-8244-5976536bbaba.PNG)

(1) Splash 화면 : 어플리케이션 실행 시 로딩화면을 띄어줌.

	- plugin 추가 : cordova plugin add cordova-plugin-splashscreen

	- config.xml
		<preference name="SplashScreen" value="splash" /> 
		<preference name="SplashMaintainAspectRatio" value="true" /> 
		<preference name="SplashScreenDelay" value="3500" /> 
		
		* splash screen 유지 시간: 3500초
		* 너무 작게 설정하면 Splash Screen과 채팅 화면 간에 빈 화면이 나오는 term이 생김.
		
	- index.html<javascript> : navigator.splashscreen.hide( );

2. 기본 기능

(1) 사진 촬영하기 : 사용자가 사진을 촬영하여 그 결과를 채팅창에 업로드 해주는 기능

	- plugin :  cordova-plugin-camera

	- index.js
		function onDeviceReady() {     
			document.getElementById("camera").addEventListener("click",cameraTakePicture); 
		}
		
	- index.js
		function cameraTakePicture(){ 
			//alert("hello"); 
			navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 100, 
				destinationType: Camera.DestinationType.DATA_URI,
				targetWidth:200, 
				targetHeight:200 
			}); 
			function onSuccess(imageURL) { 
				uploadImage(imageURL); 
			} 
			function onFail(message) { 
				//alert('Failed because: ' + message); } 
			}
			
			//결과 이미지의 URL을 이미지를 서버로 업로드 해주는 uploadImage( )함수로 전달
	
	- index.html : 이미지를 받아오는 함수
		var profileURL="http://202.31.200.143/"+data.image; 
		fileURL="http://202.31.200.143/"+data.file; 
		$('#messages').append('<li><img id=image src='+profileURL+'> '+data.nickname+ ':'+'<img onClick="downloadFile" src='+fileURL+'></li>');

(2) 사진 앨범에서 가져오기 : 사진 앨범에서 채팅창에 전송하고 싶은 사진을 선택하여 다른 사용자들에게 전송하는 기능

	- plugin : cordoava-plugin-camera
	
	- index.js
		function onDeviceReady() {    
			document.getElementById("GetPhoto").addEventListener("click",cameraGetPicture); 
		}
		
	- index.js
		function cameraGetPicture(){ 
			navigator.camera.getPicture(
				onSuccess,
				onFail, 
				{ quality: 100, 
				destinationType: Camera.DestinationType.DATA_URI, 
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
				mediaType: Camera.MediaType.PICTURE,
				encodingType: Camera.EncodingType.JPEG, 
				targetWidth:200, 
				targetHeight:200 }
			); 
			//alert('click'); 
			function onSuccess(imageURL){ 
				uploadImage(imageURL); 
			} 
			function onFail(message){ //alert("Failed because : " + message) } 
		}
		//결과 이미지의 URL을 이미지를 서버로 업로드 해주는 uploadImage( )함수로 전달
		//사진 촬영과 같은 방식으로 채팅창에 띄어줌.

(3) 동영상 촬영하기

(4) 동영상 앨범에서 가져오기




