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
var app = require('../index').app;
var server = require('../index').server;

// 直接测试独立运行的服务
// var app = 'http://106.75.19.156';

// 模拟微信公共平台推送的消息
describe('WeChat Service', function() {
  // shutdown wechat server after all tests
  after(function(done) {
    done();

    if(typeof(server)!="undefined") {
      console.log('shutting down the server...');
      server.close();
      process.exit(0);
    }
  });

  describe('#msgType=text 明文消息', function() {

    it('张三给李四发了一条明文信息', function (done) {
      // var msg = '<xml><ToUserName><![CDATA[gh_d3e07d51b513]]></ToUserName><FromUserName><![CDATA[oPKu7jgOibOA-De4u8J2RuNKpZRw]]></FromUserName><CreateTime>1361374891</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[/:8-)]]></Content><MsgId>5847060634540564918</MsgId></xml>';
      var msg = "<xml><ToUserName><![CDATA[李四]]></ToUserName>\
          <FromUserName><![CDATA[张三]]></FromUserName>\
          <CreateTime>1515582311579</CreateTime>\
          <MsgType><![CDATA[text]]></MsgType>\
          <Content><![CDATA[明文消息，你认不认？]]></Content></xml>\
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

  describe('#msgType=text 使用消息模板', function() {

    it('张三给李四发了一条模板信息', function (done) {
      var info = {
        sp: 'to 李四',
        user: 'from 张三',
        type: 'text',
        text: '关键字'
      };
      chai.request(app)
        .post('/wechat' + tail())
        .send(template(info))
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          //response content
          console.log(res.text);
          done();
        });
    });
  });

  describe('#msgType=location', function() {
    it('张三给李四发了一条位置消息', function(done) { // <= Pass in done callback
      // var msg = '<xml><ToUserName><![CDATA[gh_d3e07d51b513]]></ToUserName><FromUserName><![CDATA[oPKu7jgOibOA-De4u8J2RuNKpZRw]]></FromUserName><CreateTime>1361374891</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[/:8-)]]></Content><MsgId>5847060634540564918</MsgId></xml>';
      var msg = "<xml><ToUserName><![CDATA[李四]]></ToUserName>\
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
});