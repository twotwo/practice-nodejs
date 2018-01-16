/**
 * Test Case based on Jest&SuperTest
 * 
 * [Receiving event pushes](https://mp.weixin.qq.com/wiki?id=mp1421140454)
 */
process.env.NODE_ENV = 'dev';

//HTTP assertions made with SuperTest
const request = require('supertest');

//微信服务辅助支持
var tail = require('../libs/support').tail;
var template = require('../libs/support').template;

//微信服务辅助支持
var tail = require('../libs/support').tail;
var template = require('../libs/support').template;

// 启动要测试的微信服务程序
const app = require('../index').app;
const server = require('../index').server;

// 直接测试独立运行的服务
// var app = 'http://localhost:3003';

// 模拟微信公共平台推送的消息
describe('WeChat Service: Receiving event pushes', function() {

  // shutdown wechat server after all tests
  afterAll(function() {

    if(typeof(server)!="undefined") {
      server.close();
      console.log('shutting down the server...');
    }
  });

  describe('模拟 关注/取消关注事件', function() {
    //// select wechat_id, open_id from wechat_user where wechat_id=7 limit 1\G

    test('#msgType=event, Event=subscribe(订阅)', function (done) {

      var info = {
        sp: 'to 李四',
        user: '张三',
        type: 'event',
        event: 'subscribe'
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

    test('#msgType=event, unsubscribe(取消订阅)', function (done) {

      var info = {
        sp: 'to 李四',
        user: '张三',
        type: 'event',
        event: 'unsubscribe'
      };
      request(app)
      .post('/wechat'+tail())
      .send(template(info))
      .expect(200)
      .then(function(res) {
        // expect(res.statusCode).toBe(200);
        //response content
        console.log('jest.resp = '+res.text);
        done();
      });
    });

  });

});