# CEP-TALK
CEP(Computer Programming Project) Talk : Realtime Chatting Program(Web , App) - javascript, html, css

### 서버는 server code 참조
##

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

![2_2](https://user-images.githubusercontent.com/22411296/61613031-29a37f80-ac9b-11e9-949c-652fa4b51537.PNG)

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
	- 카메라 플러그인에는 사진촬영만 되기 때문에 미디어 capture 플러그인을 사용함. 
	- 기능 창에서 비디오모양 버튼을 누르면 동영상 촬영이 바로 가능함. 촬영이 끝나고 저장을 누르면 서버로 전송. 
	- 서버로부터 전송된 비디오를 채팅창에 띄워줌. 
	- 옵셥을 통해 동영상 최대 촬영 시간을 정할 수 있음.
	
	- plugin : cordova-plugin-media-capturefunction
	
	- index.js
		onDeviceReady() {    
			document.getElementById("video").addEventListener("click",videoCapture);  
		}
		
	- index.js
		function videoCapture(){    
			var list = document.getElementById('messages');  
			navigator.device.capture.captureVideo(
				onSuccess, 
				onError, 
				{ limit: 1,  destinationType: Camera.DestinationType.FILE_URL,duration: 10}
			);         
			function onSuccess(mediaFiles) { uploadVideo(mediaFiles[0].fullPath); } 
			function onError(error) {}   
		}
		** 비디오 파일의 URL을 비디오 파일을 서버로 업로드 하는 함수인 uploadVideo()로 전달
	
	- index.html : 서버로부터 전송된 비디오 업로드
		// video태그를 사용하여 채팅창에 올리기. 재생 조절가능.  
		var profileURL="http://202.31.200.143/"+data.image; 
		fileURL="http://202.31.200.143/"+data.file; 
		$('#messages').append(‘<li><video width="320" height="176" controls> <source src ="'+fileURL+'" type="video/mp4" > </video></li>)

(4) 동영상 앨범에서 가져오기
	- mediaType Name을 VIDEO로 설정하여 앨범을 불러올 때 동영상 파일만 불러옴. sourceType Name을 SAVEDPHOTOALBUM로 설정하여 디바이스의 앨범에서 가져오 도록 함.
	- 선택된 비디오를 서버로 전송 
	- 서버로부터 전송된 비디오를 채팅창에 띄어줌.

	- plugin : cordova-plugin-camera
	
	- index.js
		function onDeviceReady() {     
			document.getElementById("GetVideo").addEventListener("click",cameraGetVideo);  
		}
		
	- index.js
		function cameraGetVideo(){ 
			navigator.camera.getPicture(onSuccess,onFail, 
				{   quality: 100,   destinationType: Camera.DestinationType.FILE_URL,  
				sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,  
				mediaType: Camera.MediaType.VIDEO //video만 }
			); 
			function onSuccess(imageData){   uploadVideo(imageData); }
			function onFail(message){}
		}
		**동영상 촬영과 같은 방식으로 채팅창에 띄어줌.




