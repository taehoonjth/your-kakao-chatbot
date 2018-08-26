var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/keyboard', function (req, res) {

});

app.post('/message', function (req, res) {

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