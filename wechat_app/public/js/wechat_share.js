/**
 * 参考： http://blog.csdn.net/lwpoor123/article/details/78678304
 */

var wsConfig = {
    timestamp: '',
    nonceStr: '',
    signature: '',

    ws_title: '',
    ws_summary: '',
    ws_link: '',
    ws_imgurl:'',
    wxconfig: function () {
        wx.config({
            debug: wsConfig.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wsConfig.appId, // 必填，公众号的唯一标识
            timestamp: wsConfig.timestamp, // 必填，生成签名的时间戳
            nonceStr: wsConfig.nonceStr, // 必填，生成签名的随机串
            signature: wsConfig.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        console.log('debug = '+wsConfig.debug);
        console.log('appId = '+wsConfig.appId);
        console.log('timestamp = '+wsConfig.timestamp);
        console.log('nonceStr = '+wsConfig.nonceStr);
        console.log('signature = '+wsConfig.signature);
    },
    wxready: function () {
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: wsConfig.ws_title,//分享标题
                desc: wsConfig.ws_summary,//分享摘要
                link: wsConfig.ws_link,//分享链接
                imgUrl: wsConfig.ws_imgurl,//分享图片
                trigger: function (res) {
                },
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });

            wx.onMenuShareAppMessage({
                title: wsConfig.ws_title,
                desc: wsConfig.ws_summary,
                link: wsConfig.ws_link,
                imgUrl: wsConfig.ws_imgurl,
                trigger: function (res) {
                },
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            //新加分享到qq,微博,qq空间

            wx.onMenuShareQQ({
                title: wsConfig.ws_title,
                desc: wsConfig.ws_summary,
                link: wsConfig.ws_link,
                imgUrl: wsConfig.ws_imgurl,
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });

            wx.onMenuShareWeibo({
                title: wsConfig.ws_title,
                desc: wsConfig.ws_summary,
                link: wsConfig.ws_link,
                imgUrl: wsConfig.ws_imgurl,
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });


            wx.onMenuShareQZone({
                title: wsConfig.ws_title,
                desc: wsConfig.ws_summary,
                link: wsConfig.ws_link,
                imgUrl: wsConfig.ws_imgurl,
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        });
    },
    wxerror: function () {
        wx.error(function (res) {
            alert("接口验证失败，详细信息：\n" + JSON.stringify(res));
        });
    },

    init: function () {
        wsConfig.wxconfig();
        wsConfig.wxready();
        wsConfig.wxerror();
    }

}