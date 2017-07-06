var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/keyboard', function (req, res) {
  var response = {
    "type": "text"
  };
  res.header("Content-Type",'application/json; charset=utf-8');
  res.send(JSON.stringify(response));
});

app.post('/message', function (req, res) {
  var response;
  var userMessage = req.body.content;
  if(userMessage === '하이') {
    response = {
      "message":{
        "text": "반가워, 나한테 시킬 일 있니?"
      }
    };
  } else if(userMessage.indexOf('몇일') !== -1) {
    response = {
      "message":{
        "text": `오늘은 ${new Date().getDate()}일 이야.`
      }
    };
  } else if(userMessage.indexOf('원빈') !== -1) {
    response = {
      "message":{
        "text": "자 여기 원빈 사진이야.",
        "photo": {
          "url": "https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/1hYk/image/AqQJUQkNYKq2MEC18kF2ml8wLBA",
          "width": 467,
          "height": 552
        }
      }
    };
  } else {
    response = {
      "message":{
        "text": "무슨 말인지 모르겠어. 미안."
      }
    };
  }
  res.header("Content-Type",'application/json; charset=utf-8');
  res.send(JSON.stringify(response));
});

app.post('/friend', (req, res) => {
    var user_key = req.body.user_key;
    console.log(`${user_key}님이 쳇팅방에 참가했습니다.`);
    res.header("Content-Type",'application/json; charset=utf-8');    
    res.send(JSON.stringify({success:true}));
});

app.delete('/friend', (req, res) => {
  var user_key = req.body.user_key;
  console.log(`${user_key}님이 쳇팅방을 차단했습니다.`);
  res.header("Content-Type",'application/json; charset=utf-8');
  res.send(JSON.stringify({success:true}));
});

app.delete('/chat_room/:user_key', (req, res) => {
  var user_key = req.params.user_key;
  console.log(`${user_key}님이 쳇팅방에서 나갔습니다.`);
  res.header("Content-Type",'application/json; charset=utf-8');
  res.send(JSON.stringify({success:true}));
});

app.listen(3000, function () {
  console.log('서버가 포트 3000을 듣고있습니다!')
});

module.exports = app;