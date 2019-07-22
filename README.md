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

(3) Login

![3](https://user-images.githubusercontent.com/22411296/61609885-7171d900-ac92-11e9-92af-fe90c710b9b7.png)


<Code>
  - Client
  
      <form action=“/Chat” method=“POST”>
	      <input type=“text” name=“id” placeholder=“아이디”/><br/>
	      <input type=“password” name=“password” placeholder=“비밀번호”/><br/>
	      <Button>로그인</Button>
      </form>
      
      <form action=“/signup” method=“GET”>
	      <Button>회원가입</Button>
      </form>

  - Server
      1. 데이터베이스 검사 : Connect.query(‘select * from REGIST where email=?’,[req,body.id],function(error,result){});
      
      2. 아이디와 비밀번호 검사
      
      		If(result[i].password == req.body.password){
			
			fs.readFile(‘index.ejs’,’utf8’,function(error,data){
				
				res.writeHead(200,{‘Content-Type’:’text/html’});
				res.end(ejs.render(data,{nickname:result[i].nickname,image:result[i].image}));
			}
		}

      3
# 

## 2. Hybrid App - Chatting Program

### Language : javascript - Http, css

### Platform : Cordova

### Server : Node.js[Windows]

### DataBase : MySql



