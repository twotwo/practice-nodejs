/**
 * Test Case based on Jest&SuperTest
 * 
 * [Receiving standard messages](https://mp.weixin.qq.com/wiki?id=mp1421140453)
 */
process.env.NODE_ENV = 'dev';

//HTTP assertions made with SuperTest
const request = require('supertest');

//微信服务辅助支持
var tail = require('../libs/support').tail;
var template = require('../libs/support').template;

// 启动要测试的微信服务程序
const app = require('../index').app;
const server = require('../index').server;

// 直接测试独立运行的服务
// var app = 'http://localhost:3003';

// 模拟微信公共平台推送过来的消息
describe('WeChat Service: Receiving standard messages', function() {

  // shutdown wechat server after all tests
  afterAll(function() {

    if(typeof(server)!="undefined") {
      server.close();
      console.log('shutting down the server...');
    }
  });

  describe('模拟消息处理', function() {

    test('#msgType=text 任意消息', function (done) {

      var info = {
        sp: 'to 李四',
        user: '张三',
        type: 'text',
        text: '关键字'
      };
      // set timeout time in ms
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000*60;
      request(app)
      .post('/wechat'+tail())
      .send(template(info))
      .expect(200)
      .then(function(res) {
        // expect(res.statusCode).toBe(200);
        //response content
        console.log('jest.resp = '+res.text);
        // expect(res.text).toMatch("<ToUserName><![CDATA[张三]]></ToUserName>");
        done();
      });
    });

    test('#msgType=text 关键字回复(ABCD)', function (done) {

      var info = {
        sp: 'to 李四',
        user: '张三',
        type: 'text',
        text: 'ABCD'
      };
      request(app)
      .post('/wechat'+tail())
      .send(template(info))
      .expect(200)
      .then(function(res) {
        // expect(res.statusCode).toBe(200);
        //response content
        console.log('jest.resp = '+res.text);
        // expect(res.text).toMatch("<ToUserName><![CDATA[张三]]></ToUserName>");
        done();
      });
    });

  });
});