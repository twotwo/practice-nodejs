process.env.NODE_ENV = 'dev';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

var tail = require('./support').tail;

// 模拟微信公共平台推送的消息
describe('WeChat Test', function(){  
  describe('send a plan text', function(){  
      it('send a plan text, read content', function(done) {
        var msg = '<xml><ToUserName><![CDATA[gh_d3e07d51b513]]></ToUserName><FromUserName><![CDATA[oPKu7jgOibOA-De4u8J2RuNKpZRw]]></FromUserName><CreateTime>1361374891</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[/:8-)]]></Content><MsgId>5847060634540564918</MsgId></xml>';
        chai.request(server)
            .post('/wechat' + tail())
            .send(msg)
            .end( function(err, res){  
              if (err) throw err;
              res.should.have.status(200);
              console.log('res.body = '+res.body);
              done();
          });
      })  
  })
})  