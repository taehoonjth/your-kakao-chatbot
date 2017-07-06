const should = require('should');
const request = require('supertest');
const app = require('./server.js');

describe('GET /keyboard API 기본 테스트', () => {
  it('오브젝트를 리턴해야 합니다.', (done) => {
    request(app)
      .get('/keyboard')
      .expect(200)
      .end((err, res) => {
        res.body.should.be.a.Object();
        if (err) throw err;
        done();
      })
  });
  it('리턴된 오브젝트는 type이라는 key를 갖고 있어야 합니다.', (done) => {
    request(app)
      .get('/keyboard')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('type');
        if (err) throw err;
        done();
      })
  });
  it("type의 값은 'text'(String)여야 합니다.", (done) => {
    request(app)
      .get('/keyboard')
      .expect(200)
      .end((err, res) => {
        res.body.type.should.be.exactly('text').and.be.a.String();
        if (err) throw err;
        done();
      })
  });
});

describe('POST /message API 기본 테스트', () => {
  var msg = {
    user_key: 'ironman',
    content: 'test'
  }
  it('오브젝트를 리턴해야 합니다.', (done) => {
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        res.body.should.be.a.Object();
        if (err) throw err;
        done();
      })
  });
  it('리턴된 오브젝트는 message이라는 key를 갖고 있어야 합니다.', (done) => {
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('message');
        if (err) throw err;
        done();
      })
  });
  it("message의 value는 Object여야 합니다.", (done) => {
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        res.body.message.should.be.a.Object();
        if (err) throw err;
        done();
      })
  });
  it("message는 'text'라는 key를 갖고 있어야 합니다.", (done) => {
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        res.body.message.should.have.property('text');
        if (err) throw err;
        done();
      })
  });
  it("'message.text'의 value는 String이어야 합니다.", (done) => {
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        res.body.message.text.should.be.a.String();
        if (err) throw err;
        done();
      })
  });
  it("'message.text'의 value는 '무슨 말인지 모르겠어. 미안.'이어야 합니다.", (done) => {
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        res.body.message.text.should.be.exactly('무슨 말인지 모르겠어. 미안.');
        if (err) throw err;
        done();
      })
  });
});

describe('POST /message 유저의 메시지에 맞는 반응 테스트', () => {
  it("유저가 '하이'라고 하면 '반가워, 나한테 시킬 일 있니?'라고 답해야 합니다.", (done) => {
    var msg = {
      user_key: 'ironman',
      content: '하이'
    }
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        res.body.message.text.should.be.exactly('반가워, 나한테 시킬 일 있니?').and.be.a.String();
        if (err) throw err;
        done();
      })
  });
  it("유저의 메시지에 '몇일'이라는 단어가 포함돼있으면 '오늘은 30일 이야.'의 형식으로 오늘 날짜를 알려줘야합니다.", (done) => {
    var msg = {
      user_key: 'ironman',
      content: '오늘 몇일이야?'
    }
    var date = new Date().getDate();
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        var result = res.body.message.text.indexOf(date);
        res.body.message.text.should.not.be.exactly(-1)
        if (err) throw err;
        done();
      })
  });
  it("유저의 메시지에 '원빈'이라는 단어가 포함돼있으면 원빈 사진을 보여줘야 합니다.", (done) => {
    var msg = {
      user_key: 'ironman',
      content: '원빈 사진 좀 보여줘'
    }
    var date = new Date().getDate();
    request(app)
      .post('/message')
      .send(msg)
      .expect(200)
      .end((err, res) => {
        res.body.message.photo.url.should.be.a.String();
        if (err) throw err;
        done();
      })
  });
});






















