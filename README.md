# CEP-TALK
CEP(Computer Programming Project) Talk : Realtime Chatting Program(Web , App) - javascript, html, css

### 서버는 server code 참조

### 웹 채팅은 하이브리드 앱이랑 비슷하니, 하이브리드 앱 정보만 
##

(1) 기본 구조

![1](https://user-images.githubusercontent.com/22411296/61609729-02948000-ac92-11e9-871c-f79055e4c5b0.JPG)

(2) 데이터베이스

![2](https://user-images.githubusercontent.com/22411296/61609752-150eb980-ac92-11e9-8ecd-52f456496d4b.JPG)

##

## 1. WebPage - Chatting Program

### Language : javascript - Http, Css

### Server : Node.js[Linux]

### DataBase : MySql
##

## 2. Hybrid App - Chatting Program

### Language : javascript - Http, css

### Platform : Cordova

### Server : Node.js[Windows]

### DataBase : MySql

1. 어플리케이션 기본 화면

![2_1](https://user-images.githubusercontent.com/22411296/61611840-dda30b80-ac97-11e9-8244-5976536bbaba.PNG)

(1) Splash 화면 : 어플리케이션 실행 시 로딩화면을 띄어줌.


2. 기본 기능

![2_2](https://user-images.githubusercontent.com/22411296/61613031-29a37f80-ac9b-11e9-949c-652fa4b51537.PNG)

(1) 사진 촬영하기 : 사용자가 사진을 촬영하여 그 결과를 채팅창에 업로드 해주는 기능

(2) 사진 앨범에서 가져오기 : 사진 앨범에서 채팅창에 전송하고 싶은 사진을 선택하여 다른 사용자들에게 전송하는 기능

(3) 동영상 촬영하기
	
	- 카메라 플러그인에는 사진촬영만 되기 때문에 미디어 capture 플러그인을 사용함. 
	- 기능 창에서 비디오모양 버튼을 누르면 동영상 촬영이 바로 가능함. 촬영이 끝나고 저장을 누르면 서버로 전송. 
	- 서버로부터 전송된 비디오를 채팅창에 띄워줌. 
	- 옵셥을 통해 동영상 최대 촬영 시간을 정할 수 있음.
	
(4) 동영상 앨범에서 가져오기
	
	- mediaType Name을 VIDEO로 설정하여 앨범을 불러올 때 동영상 파일만 불러옴. sourceType Name을 SAVEDPHOTOALBUM로 설정하여 디바이스의 앨범에서 가져오 도록 함.
	- 선택된 비디오를 서버로 전송 
	- 서버로부터 전송된 비디오를 채팅창에 띄어줌.
	

![2_3](https://user-images.githubusercontent.com/22411296/61613072-4770e480-ac9b-11e9-9bff-7bd61c65b0e5.PNG)

(5) 녹음
	
	-plugin meda capture을 사용하여 10초미만의 1개의 파일만을 선택하거나 녹음할 수 있게 옵션을 지정
	-녹음이 끝난 후 파일을 서버로 upload -서버로부터 전송된 녹음 파일을 append를 사용하여 채팅창에 띄워줌

(6) 프로필 사진 변경 : 
	
	- 로그인을 할 때 자신의 프로필 사진을 지정하거나 채팅 도중 자신의 프로필 사진을 변경하고 싶을 경우 
	자신의 프로필 사진을 클릭하면 앨범에서 사진을 선택하는 창이 뜬다. 
	- 원하는 사진을 클릭한 후 확인 버튼을 누르면 자신의 프로필 사진이 변경 되는 기능
	- crop plugin을 사용하여 사진을 자신이 원하는 크기만큼 잘라서 사용 가능 
	- 사진 선택이 완료되면 Image URL을 서버의 데이터베이스에서 프로필 사진을 업로드 해주는 uploadProfile( ) 로 전달한다.

(7) 파일 전송 : 앞에서 보았던 여러 파일과 데이터들을 서버로 전송하는 기능

	- 파일들에 대한 함수가 비슷하므로 한 번에 설명

	- plugin : cordova-plugin-file-transfer
	
	- function uploadFile(imageURL){ 
		var options=new FileUploadOptions(); 
		options.fileKey="file";  // 서버에서 file의 변수명을 결정 -> 서버에서 req.files.file 로 사용
		options.fileName=imageURL.substr(imageURL.lastIndexOf('/')+1);  // 다른 파일들과 구별할 파일의 이름 설정
		
		options.mimeType="video/mp4"; //파일의 mimeType을 설정 -> 오디오 : “audio/m4a” , 비디오 : “video/mp4” 
						이미지 : “image/jpeg” , 카카*톡에서 직접 파일들을 전송하여 확장자 확인
		options.params={'nickname':nickname}; //서버에 nickname도 함께 전달 ( 프로필 사진을 받아오기 위해서)
									서버에서는 req.body.nickname으로 사용
		
		function success(message){}; function fail(error){};
		
		var ft=new FileTransfer();   
		ft.upload(imageURL,encodeURI('http://202.31.200.143/uploadVideo'),success,fail,option s);  
		//(데이터 URL, 서버 URI, 옵션)을 순서대로 넣어줌
		
	- 이미지, 동영상, 오디오 전송 시 서버 부분    
		app.post(‘/URL’,function(req,res){      
			var filename=path.basename(req.files.file.path);  //파일의 이름만 받아온다.
			io.sockets.emit(...,{file:filename ,nickname: req.body.nickname, image: ...}; //다른 사용자들에게 파일 전송    			   res.status(204).end( );   
		}
		
	- 파일을 서버에 업로드 하는 부분
		app.use(express.static(__dirname+’/pulic’)); 
		app.use(multipart({uploadDir:__dirname+’/public’})); 에 의해서 자동으로 pulic 폴더 안에 저장된다.
		
	- 프로필 사진 업로드
		app.post(‘/uploadProfile’,function(req,res){   
			var filename=path.basename(req.files.file.path);   
			connect.query(‘UPDATE REGIST SET image=? WHERE nickname=?’,[filename,req.body.nickname]); //query문을 사용하여 데이터베이스를 업데이트 해준다.    
			res.status(204).end( ); 
			}
		);
		
(8) Geolocation & Google map
	
	-Geolocation으로 현재 자신의 위치를 위도와 경도로 받아와서 구글 맵 상에서 확인 하고 확인한 
	자신의 위치를 채팅방에 이미지 형식으로 업로드 하여 다른 사용자에게 자신의 위치를 알려주는 기능
	- 구글맵 이미지를 screen shot해서 채팅창에 업로드하기 위해 screenshot 플러그 인을 사용하려
	하였으나 구글 맵의 transparent 성질 때문에 구글 맵을 제외한 부분 만이 캡쳐 되는 등 난항을 겪었습니다. 
	- map option에서 back-ground에 색을 지정 해보기도 하고 교수님께서 조언해주셨던 z-index로
	위치를 조절하는 등 많은 방법을 시도하였으나 생각대로 되지 않았습니다. 며칠 동안 검색을 이용해
	방법을 찾던 중 구글 맵 자체에서 toDataURL이라는 함수를 지원하는 것을 알게 되어 성공할 수 있었습니다.
	
![2_4](https://user-images.githubusercontent.com/22411296/61614230-2a89e080-ac9e-11e9-81e4-a49523113a70.PNG)

(9) weather information
	
	- 사용자의 위치를 plugin geolocation을 사용하여 위치정보를 확인 후 사용자가 
	위치한 곳의 날씨의 정보를 json형식으로 불러옴. 
	- openweathermap사이트의 URL에 lat와 lon에 위도와 경도정보를 입력하고 appid에 
	사이트에서 부여받은 API key값을 입력하면 사용자의 날씨 정보를 json형식으로 받 아옴. 
	- ajax를 사용하여 json형식으로 파일 불러오기가 성공을 하면 날씨의 정보에 따라 미리 
	지정해 두었던 메시지(문구)를 출력시키고 나의 현재 위치의 날씨 이미지를 출력해 주는 기능
	
(10) 연락처 전송 기능

	- 사용자의 디바이스에서 연락처 정보를 가져와 listview 형식으로 사용자에게 보여줌 
	- 사용자는 원하는 연락처를 클릭하게 되면 연락처를 다른 사용자에게 전송할 것인 지 아니면
	직접 전화를 할 것인지 선택하는 dialog창이 뜨게 된다.



