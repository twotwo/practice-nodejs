process.env.NODE_ENV = 'dev';

//HTTP integration testing with Chai assertions
var chai = require('chai')
  , chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;

//微信服务辅助支持
var tail = require('./support').tail;
var template = require('./support').template;

// 启动要测试的微信服务程序
var app = require('../index');
// var app = 'http://106.75.19.156';

// 模拟微信公共平台推送的消息
describe('Test WeChat Service', function(){  

  it('msgType=text', function (done) {
    var info = {
      sp: 'nvshen',
      user: '张三',
      type: 'text',
      text: '测试中'
     };
     chai.request(app)
      .post('/wechat' + tail())
      .send(template(info))
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        //response content
        // console.log(res.text);
        done();
      });
  });

  it('msgType=location', function(done) { // <= Pass in done callback
    // var msg = '<xml><ToUserName><![CDATA[gh_d3e07d51b513]]></ToUserName><FromUserName><![CDATA[oPKu7jgOibOA-De4u8J2RuNKpZRw]]></FromUserName><CreateTime>1361374891</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[/:8-)]]></Content><MsgId>5847060634540564918</MsgId></xml>';
    var msg = "<xml><ToUserName><![CDATA[nvshen]]></ToUserName>\
        <FromUserName><![CDATA[张三]]></FromUserName>\
        <CreateTime>1362161914</CreateTime>\
        <MsgType><![CDATA[location]]></MsgType>\
        <Location_X>30.283878</Location_X>\
        <Location_Y>120.063370</Location_Y>\
        <Scale>15</Scale>\
        <Label><![CDATA[]]></Label>\
        <MsgId>5850440872586764820</MsgId>\
        </xml>";
    chai.request(app)
    .post('/wechat' + tail())
    .send(msg)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      //response content
      // console.log(res.text);
      done();
    });
  });

});

// describe('Close Server', function(){
//   it('send a plan text, read content', function(done) {
//     console.log('nothing to do...');
//   });
//   after(function() {
//     // runs after all tests in this block
//     // close server
//     app.close();
//   });
// });