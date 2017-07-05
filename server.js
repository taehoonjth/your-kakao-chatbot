const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/keyboard', function (req, res) {
  res.header("Content-Type",'application/json; charset=utf-8');
  var response = {
    "type": "text"
  };
  res.json(response);
});
app.post('/message', function (req, res) {
  var response;
  var userMessage = req.body.content;
  if(userMessage === '하이') {
    response = {
      "message":{
        "text": "반가워 나한테 시킬거 있니?"
      }
    };
  } else if(userMessage.indexOf('몇일') !== -1) {
    response = {
      "message":{
        "text": `오늘은 ${new Date().getDate()}일 이야.`
      }
    };
  } else if(userMessage.indexOf('얼굴') !== -1) {
    response = {
      "message":{
        "text": "내 얼굴 보고 놀라지마.",
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
        "text": "무슨 말인지 모르겠다. 미안."
      }
    };
  }
  res.header("Content-Type",'application/json; charset=utf-8');
  res.json(response);
});
app.listen(3000, function () {
  console.log('서버가 포트 3000을 듣고있습니다!')
});