/**
 * 参考： http://blog.csdn.net/lwpoor123/article/details/78678304
 */

var wxfxConfig = {
    timeStamp: '',
    nonceStr: '',
    signature: '',

    zm_title: '',
    zm_summary: '',
    zm_link: '',
    zm_imgurl:'',
    wxconfig: function () {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxfxConfig.appId, // 必填，公众号的唯一标识
            timestamp: wxfxConfig.timeStamp, // 必填，生成签名的时间戳
            nonceStr: wxfxConfig.nonceStr, // 必填，生成签名的随机串
            signature: wxfxConfig.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    },
    wxready: function () {
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: wxfxConfig.zm_title,//分享标题
                desc: wxfxConfig.zm_summary,//分享摘要
                link: wxfxConfig.zm_link,//分享链接
                imgUrl: wxfxConfig.zm_imgurl,//分享图片
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
                title: wxfxConfig.zm_title,
                desc: wxfxConfig.zm_summary,
                link: wxfxConfig.zm_link,
                imgUrl: wxfxConfig.zm_imgurl,
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
                title: wxfxConfig.zm_title,
                desc: wxfxConfig.zm_summary,
                link: wxfxConfig.zm_link,
                imgUrl: wxfxConfig.zm_imgurl,
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });

            wx.onMenuShareWeibo({
                title: wxfxConfig.zm_title,
                desc: wxfxConfig.zm_summary,
                link: wxfxConfig.zm_link,
                imgUrl: wxfxConfig.zm_imgurl,
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });


            wx.onMenuShareQZone({
                title: wxfxConfig.zm_title,
                desc: wxfxConfig.zm_summary,
                link: wxfxConfig.zm_link,
                imgUrl: wxfxConfig.zm_imgurl,
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
        wxfxConfig.wxconfig();
        wxfxConfig.wxready();
        wxfxConfig.wxerror();
    }

}