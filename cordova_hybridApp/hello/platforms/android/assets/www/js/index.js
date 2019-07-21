/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */	
    // Application Constructor
	
    document.addEventListener('deviceready',onDeviceReady, false);
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
   function onDeviceReady() {
	   
	    document.addEventListener("backbutton", onBackKeyDown);
		document.addEventListener('volumeupbutton',textSizeUp);
		document.addEventListener('volumedownbutton',textSizeDown);
		document.getElementById("mic").addEventListener("click",audioCapture);
		document.getElementById("address").addEventListener("click",onContacts);
		document.getElementById("camera").addEventListener("click",cameraTakePicture);
		document.getElementById("GetPhoto").addEventListener("click",cameraGetPicture);
		document.getElementById("video").addEventListener("click",videoCapture);
		document.getElementById("GetVideo").addEventListener("click",cameraGetVideo);
		document.getElementById("my_profile").addEventListener("click",changeLoginProfile); //로그인화면에서 프사설정
		document.getElementById("profile").addEventListener("click",changeProfile); //패널창에서 프로필 사진 바꾸기
		//document.getElementById("login").addEventListener("click",uploadProfile);
		window.addEventListener('batterystatus', function(status){	//디바이스의 배터리 상태 변화 정보
			var now=5; //배터리를 몇퍼센트 이하로 할지
			if(status.level<now){
				var fileBtn = document.getElementById("file"); 
				if(status.level==now-1){ //최초 비활성화시 알림창
					navigator.notification.alert("Battery Level Low! you can't use it! try charge your device!" 
												,alertDismissed , '알림','닫기'); //메시지 출력 후 
					function alertDismissed(){
						//do someting
					}
				}
				fileBtn.className = "ui-state-disabled"; //비활성화
			}
			else{
				var fileBtn = document.getElementById("file"); 
				fileBtn.className = "ui-state-enabled"; //활성화
			}
		},false);
		
        this.receivedEvent('deviceready');
   }
   
    function onBackKeyDown() {
	    //'종료,취소' -> 취소,종료 순으로 출력됨.
		navigator.notification.confirm('앱을 종료하시겠습니까?', onConfirm, '알림','종료,취소' );
		navigator.notification.beep(1);
		function onConfirm(buttonIndex) {
			if(buttonIndex == 1){//종료
				navigator.app.exitApp();
			}
		    if(buttonIndex == 2) {
		    }
		}
	}
	
	function audioCapture() {
	   var options = {
		  limit: 1,
		  duration: 10
	   };
	   navigator.device.capture.captureAudio(onSuccess, onError, options);

	   function onSuccess(mediaFiles) {
		   
		  var i, path, len;	
		  for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			 path = mediaFiles[i].fullPath;
		  }
		  uploadAudio(path);
	   }
	   function onError(error) {
		  navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
	   }
	}
	
	function uploadAudio(mediaFiles){
		var options=new FileUploadOptions();
		options.fileKey="file";
		options.fileName=mediaFiles.substr(mediaFiles.lastIndexOf('/')+1);
		options.mimeType="audio/m4a";
			
		options.params={'nickname':nickname};
			
		function success(message){};
		function fail(error){};
		
		var ft=new FileTransfer();
		ft.upload(mediaFiles,encodeURI('http://202.31.200.143/uploadAudio'),success,fail,options);
	}
	
	function changeLoginProfile(){
		var change1 = document.getElementById("profile");
		var options =  {
			quality: 100,
			destinationType: Camera.DestinationType.DATA_URI,
			sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
			mediaType: Camera.MediaType.PICTURE,
			targetWidth:300,
			targetHeight:300
		};
		navigator.camera.getPicture(onSuccess,onFail,options);
		function onSuccess(imageURI){
			plugins.crop(function success(data){ //사진 자르는 플러그인 
			var change = document.getElementById("my_profile");
			change.src = data;
			change1.src=data;
			},
			function fail(){
    
			}, imageURI,{quality:100});
			
			availableProfile=true;
			image=imageURI;
		}
  
		function onFail(message){
			//alert("Failed because : " + message)
		}
	}
	
	function changeProfile(){
		var change1 = document.getElementById("profile");
		var options =  {
			quality: 100,
			destinationType: Camera.DestinationType.DATA_URI,
			sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
			mediaType: Camera.MediaType.PICTURE,
			targetWidth:300,
			targetHeight:300
		};
		navigator.camera.getPicture(onSuccess,onFail,options);
		function onSuccess(imageURI){
			plugins.crop(function success(data){ //사진 자르는 플러그인 
			var change = document.getElementById("my_profile");
			change.src = data;
			change1.src=data;
			},
			function fail(){
    
			}, imageURI,{quality:100});
			
			image=imageURI;
			uploadProfile();
		}
  
		function onFail(message){
			//alert("Failed because : " + message)
		}
	}
	
	function uploadProfile(){
			var options=new FileUploadOptions();
			options.fileKey="file";
			options.fileName=image.substr(image.lastIndexOf('/')+1);
			options.mimeType="image/jpeg";
			
			options.params={'nickname':nickname};
			
			function success(message){
				$('#client').empty();
				socket.emit('uploaduserlist');};
			function fail(error){};
		
			var ft=new FileTransfer();
			ft.upload(image,encodeURI('http://202.31.200.143/uploadProfile'),success,fail,options);
	}
	
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
			//alert('Failed because: ' + message);
		}
	}
	
	function cameraGetPicture(){
		navigator.camera.getPicture(onSuccess,onFail, {
			quality: 100,
			destinationType: Camera.DestinationType.DATA_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			mediaType: Camera.MediaType.PICTURE,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth:200,
			targetHeight:200
		});
		//alert('click');
		function onSuccess(imageURL){
			uploadImage(imageURL);
		}
		function onFail(message){
			//alert("Failed because : " + message)
		}
	}
	function uploadImage(imageURL){
		
		var options=new FileUploadOptions();
		options.fileKey="file";
		options.fileName=imageURL.substr(imageURL.lastIndexOf('/')+1);
		options.mimeType="image/jpeg";
		
		options.params={'nickname':nickname};
			
		function success(message){
		};
		function fail(error){
		};
		
		var ft=new FileTransfer();
		ft.upload(imageURL,encodeURI('http://202.31.200.143/uploadImage'),success,fail,options);
	}
	
	function videoCapture(){
		var list = document.getElementById('messages');
		
		navigator.device.capture.captureVideo(onSuccess, onError, {
			limit: 1,
			destinationType: Camera.DestinationType.FILE_URL,
			duration: 10});
		
		function onSuccess(mediaFiles) {
			var i, path;
			var len=mediaFiles.length;
			uploadVideo(mediaFiles[0].fullPath);
		}
		function onError(error) {}
	}
		
	function cameraGetVideo(){
		navigator.camera.getPicture(onSuccess,onFail, {
			quality: 100,
			destinationType: Camera.DestinationType.FILE_URL,
			sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
			mediaType: Camera.MediaType.VIDEO
		});
		function onSuccess(imageData){
			uploadVideo(imageData);
		}
		
		function onFail(message){}
	}
		
	function uploadVideo(imageURL){
		var options=new FileUploadOptions();
		options.fileKey="file";
		options.fileName=imageURL.substr(imageURL.lastIndexOf('/')+1);
		options.mimeType="video/mp4";
		
		options.params={'nickname':nickname};
		
		function success(message){};
		function fail(error){};
		
		var ft=new FileTransfer();
		ft.upload(imageURL,encodeURI('http://202.31.200.143/uploadVideo'),success,fail,options);
	}
	
	
	function textSizeUp(){
		var up = document.getElementById("messages");
		var currentSize = up.style.fontSize;
		var num = parseFloat(currentSize);
		var unit = currentSize.slice(-2);
 
		if(num<14){
			num*=1.1;
			var changedSize = num + unit;
			up.style.fontSize=changedSize;
		}
		else{
			alert("maximum FontSize");
		}
	}
	
	function textSizeDown() {
		var down = document.getElementById("messages");
		var currentSize = down.style.fontSize;
		var num = parseFloat(currentSize);
		var unit = currentSize.slice(-2);
		 
		if(num>8){
			num/=1.1;
			var changedSize = num + unit;
			down.style.fontSize=changedSize;
		}
		else{
			alert("minimum FontSize");
		}
	}
	
	function onContacts(){
	
		navigator.contactsPhoneNumbers.list(onSuccess,onError);
		
		function onSuccess(contacts) {
			
			var list=document.getElementById("contacts");
			$(list).empty();
			for(var i = 0; i < contacts.length; i++) {
				$(list).append('<li id="address'+i+'"><img src="img/user.png"/>'+
					contacts[i].displayName+"    "+
					contacts[i].phoneNumbers[0].number+'</li>');
			}
			
		};
		
		function onError(contactError) {
			alert('onError!');
		};
		
	}
	