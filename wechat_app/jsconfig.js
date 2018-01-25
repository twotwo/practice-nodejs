/**
 * Config接口权限验证的签名生成
 * 
 * 参考[附录1-JS-SDK使用权限签名算法](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
 */
var WechatAPI = require('wechat-api');
var config = require('./conf/wechat.json');
var debug = require('debug')('wechat.jsapi');

/**
 * start from here
 * 
 */
if(process.argv.length <4 ) {
    console.log('DEBUG=wechat* node menu.js appid appsecret');
    debug('argv => %O',process.argv)
    process.exit(0);
}
let appid = process.argv[2];
let appsecret = process.argv[3];

debug('appid = %s, appsecret = %s', appid, appsecret);

var api = new WechatAPI(appid, appsecret);

// 覆盖原来的调用参数
// WechatAPI.patch("getMenu", "https://api.weixin.qq.com/cgi-bin/menu/get", true);

/**
 * 获取js sdk所需的有效js ticket
 */
api.getTicket(function (err, result) {

    debug('getTicket');
    /**
     * 未认证的订阅号返回以下错误：
     * WeChatAPIError: api unauthorized; code: 48001
     */
    if (err) {
        debug('err => %o', err);
    } else {
        //get menu
        debug('ticket => %j', result);
        return result;
    }
});

/**
 * [getJsConfig](http://doxmate.cool/node-webot/wechat-api/api.html#api_js_exports_getJsConfig)
 */
var param = {
    debug: false,
    jsApiList: ['onMenuShareTimeline',
                'onMenuShareAppMessage', 
                'onMenuShareQQ',
                'onMenuShareWeibo', 
                'onMenuShareQZone'],
    url: 'http://game.feiliu.com/wechat/index.html?from=singlemessage&isappinstalled=0'
   };
api.getJsConfig(param, function (err, result) {

    debug('getJsConfig');
    /**
     * 未认证的订阅号返回以下错误：
     * WeChatAPIError: api unauthorized; code: 48001
     */
    if (err) {
        debug('err => %o', err);
    } else {
        //get menu
        debug('config => %j', result);
        return result;
    }
});