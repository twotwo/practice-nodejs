var express = require('express');
//微信公共平台自动回复消息接口服务中间件
var wechat = require('wechat');
//微信配置参数，参见./conf/wechat.json.sample
var config = require('./conf/wechat.json');

if (process.env.NODE_ENV==='dev') {
  config.checkSignature =false;
}

var app = express();
//使用package.jsond的config.port设置服务端口
app.set('port', (process.env.npm_package_config_port||3000))

var logger = require('morgan');
app.use(logger('dev'));

/**
 * 腾讯微信服务请求到$host:$port/wechat，交给wechat函数进行处理
 */
app.use('/wechat', wechat(config, function (req, res, next) {
  //微信消息xml字串
  console.log('srv get '+req.weixin_xml);
  
  // 微信消息对象：req.weixin
  var message = req.weixin;
  console.log('msg from '+message.FromUserName);
  console.log('msg type '+message.MsgType);
  //微信消息结构: https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140453

  // 后续可以根据MsgType对消息进行第一级分发
  if(message.MsgType === 'event') {
    console.log('event = '+message.Event);
  } else if (message.MsgType === 'text') {

    console.log('content = '+message.Content);
  }

  res.reply([
    {
      title: '开通微信订阅号',
      description: '如何开通微信订阅号及开发入门指引',
      picurl: 'https://pic1.zhimg.com/v2-41aafc28712fb8d7b10fa11106fe4746_r.jpg',
      url: 'http://172.16.100.90/confluence/pages/viewpage.action?pageId=21660328'
    }
  ]);
}));

var debug = require('debug')('sign');
/**
 * 生成前端wx.config所需签名信息
 */
app.get('/sign', function(req, res) {
  res.send('Hello World!')
})

/**
 * `express.static` 是Express中内置的中间件函数，基于 serve-static
 * 负责提供 Express 应用程序的静态资源
 */
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//luanch express web service
var server = app.listen(app.get('port'), function() {
    console.log("wechat app is running at localhost:" + app.get('port'))
})


//add for unit testing
module.exports = {
  server : server,
  app : app
};