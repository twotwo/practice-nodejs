/**
 * 主动调用微信公共平台接口 之 自定义菜单
 */
var WechatAPI = require('wechat-api');
var config = require('./conf/wechat.json');
var api = new WechatAPI(config.appid, config.appsecret);

//http://doxmate.cool/node-webot/wechat-api/api.html#api_menu_exports_getMenu
var result = api.getMenu(function (err, result) {
    //expect(result).to.have.property('errcode', 0);
    //expect(result).to.have.property('errmsg', 'ok');
    
    /**
     * 未认证的订阅号返回以下错误：
     * WeChatAPIError: api unauthorized; code: 48001
     */
    if (err) {
        console.log('err: '+err);
        if(result) {
            console.log('code: '+result.errcode);
        }
    } else {
        console.log(result.errmsg); //ok
        console.log(result.errcode); //0
    }
});
console.log('getMenu: '+result);

// /**
//  * 创建菜单
//  */
// var menu = JSON.stringify(require('./conf/menu.json'));
// api.createMenu(menu, function (err, result) {

// //   expect(result).to.have.property('errcode', 0);
// //   expect(result).to.have.property('errmsg', 'ok');
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result.errmsg); //ok
//         console.log(result.errcode); //0
//     }
// });

