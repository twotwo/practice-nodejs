/**
 * Test Case based on Jest&SuperTest
 */
process.env.NODE_ENV = 'dev';

//HTTP assertions made with SuperTest
const request = require('supertest');

//微信服务辅助支持
var tail = require('./support').tail;
var template = require('./support').template;

// 启动要测试的微信服务程序
const app = require('../index').app;
const server = require('../index').server;

// 直接测试独立运行的服务
// var app = 'http://106.75.19.156';

// 模拟微信公共平台推送的消息
describe('WeChat Service', function() {

  // shutdown wechat server after all tests
  afterAll(function() {

    if(typeof(server)!="undefined") {
      server.close();
      console.log('shutting down the server...');
    }
  });

  describe('#msgType=text 明文消息', function() {

    test('张三给李四发了一条明文信息', function (done) {
      // var msg = '<xml><ToUserName><![CDATA[gh_d3e07d51b513]]></ToUserName><FromUserName><![CDATA[oPKu7jgOibOA-De4u8J2RuNKpZRw]]></FromUserName><CreateTime>1361374891</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[/:8-)]]></Content><MsgId>5847060634540564918</MsgId></xml>';
      var msg = "<xml><ToUserName><![CDATA[李四]]></ToUserName>\
          <FromUserName><![CDATA[张三]]></FromUserName>\
          <CreateTime>1515582311579</CreateTime>\
          <MsgType><![CDATA[text]]></MsgType>\
          <Content><![CDATA[明文消息，你认不认？]]></Content></xml>\
          </xml>";
      request(app)
      .post('/wechat' + tail())
      .send(msg)
      .expect(200)
      .then(function(res) {
        //response content
        // console.log('jest.resp = '+res.text);
        expect(res.text).toMatch("<ToUserName><![CDATA[张三]]></ToUserName>");
        done();
      });
    });

  });

  describe('#msgType=text 使用消息模板', function() {

    test('张三给李四发了一条模板信息', function (done) {
      var info = {
        sp: 'to 李四',
        user: 'from 张三',
        type: 'text',
        text: '关键字'
      };
      request(app)
        .post('/wechat' + tail())
        .send(template(info))
        .expect(200)
        .then(function(res) {
          expect(res.text).toMatch("<ToUserName><![CDATA["+info.user+"]]></ToUserName>");
          done();
        });
    });
  });

  describe('#msgType=location', function() {
    test('张三给李四发了一条位置消息', function(done) { // <= Pass in done callback
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
      
    request(app)
    .post('/wechat' + tail())
    .send(msg)
    .expect(200)
    .then(function(res) {
        done();
      });
    });
  });

});