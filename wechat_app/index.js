var express = require('express');
//微信公共平台自动回复消息接口服务中间件
var wechat = require('wechat');
//微信配置参数，参见./conf/wechat.json.sample
var config = require('./conf/wechat.json');

var app = express();
//使用package.jsond的config.port设置服务端口
app.set('port', (process.env.npm_package_config_port||3000))

/**
 * 腾讯微信服务请求到$host:$port/wechat，交给wechat函数进行处理
 */
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上 
  var message = req.weixin;
  console.log('msg from '+message.FromUserName);
  console.log('msg type '+message.MsgType);
  //微信消息结构: https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140453

  // 后续可以根据MsgType对消息进行第一级分发
  if(message.MsgType === 'event') {
    console.log('event '+message.Event);
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

//luanch express web service
app.listen(app.get('port'), function() {
    console.log("wechat app is running at localhost:" + app.get('port'))
})