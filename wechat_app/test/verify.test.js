/**
 * Test Case based on Jest&SuperTest
 * 
 * [Verify that the message is really from the WeChat server](https://mp.weixin.qq.com/wiki?id=mp1421135319)
 */
process.env.NODE_ENV = 'dev';
var debug = require('debug')('wechat.verify');
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

// 模拟微信公共平台服务器验证
describe('WeChat Service: Verify the service', function() {

  // shutdown wechat server after all tests
  afterAll(function() {

    if(typeof(server)!="undefined") {
      server.close();
      debug('shutting down the server...');
    }
  });

  /**
   * https://mp.weixin.qq.com/wiki?id=mp1421135319
   * 
   * 1）将token、timestamp、nonce三个参数进行字典序排序 
   * 2）将三个参数字符串拼接成一个字符串进行sha1加密 
   * 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
   */
  describe('#接入验证', function() {
    var config = require('../conf/wechat.json');
    test('模拟微信公共平台发送的验证消息', function (done) {
        request(app)
        .get('/wechat' + tail(config.checkSignature))
        .expect(200)
        .then(function(res) {
          //response content
          debug('jest.resp = '+res.text);
        //   expect(res.text).toMatch("<ToUserName><![CDATA[张三]]></ToUserName>");
          done();
        });
    });
  });

});