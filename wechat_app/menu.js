/**
 * 主动调用微信公共平台接口 之 自定义菜单
 */
var WechatAPI = require('wechat-api');
var config = require('./conf/wechat.json');
var debug = require('debug')('wechat.menu');

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

function getMenu() {
    //http://doxmate.cool/node-webot/wechat-api/api.html#api_menu_exports_getMenu
    api.getMenu(function (err, result) {

        debug('getMenu');
        /**
         * 常见错误：
         * 
         * 1. 未认证的订阅号 WeChatAPIError: api unauthorized; code: 48001
         * 
         * 2. 从未加入白名单的地址访问
         * WeChatAPIError: invalid ip xxxx, not in whitelist; code: 40164
         */
        if (err) {
            debug('err => %o', err);
        } else {
            //get menu
            debug('menu => %j', result);
            return result;
        }
    });
};


/**
 * 创建菜单
 */
function createMenu() {
    debug('createMenu');

    var menu = JSON.stringify(require('./conf/menu.json'));
    api.createMenu(menu, function (err, result) {

        if (err) {
            debug('err => %o', err);
        } else {
            debug('createMenu => %j', result);
            // expect(result).to.have.property('errcode', 0);
            // expect(result).to.have.property('errmsg', 'ok');
        }
    });
}

/**
 * 删除菜单
 */
function removeMenu() {
    debug('removeMenu');
    api.removeMenu(function (err, result) {

        if (err) {
            debug('err => %o', err);
        } else {
            debug('removeMenu => %j', result);
        }
    });
}

console.log('press "get"/"create"/"remove"/"leave"');

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

process.stdout.write('> ');
rl.on('line', function(line){
    
    if(line === 'get') {
        getMenu();
    } else if (line === 'create') {
        createMenu();
    } else if (line === 'remove') {
        removeMenu();
    } else if (line === 'leave') {
        process.exit(0);
    } else {
        process.exit(0);
    }
    process.stdout.write('> ');
})