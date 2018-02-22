# 微信登录

微信支持基于OAuth2的第三方账号登录。主要对应以下两种使用场景：
* 在微信中进行网页授权
* 浏览器中微信扫码登录

前者需要在微信公共账号中进行授权，后者需要在微信开放平台上设置。

## 微信中进行网页授权@[微信公众平台](https://mp.weixin.qq.com)
* [微信公众平台-微信网页授权](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842)

### 设置网页授权回调域名
* 获得条件：订阅号无法开通此接口；服务号必须通过微信认证
* 公众平台官网中的“开发 - 接口权限 - 网页服务 - 网页帐号 - 网页授权获取用户基本信息”的配置选项中，修改授权回调域名
* 填写域名：注意仅填域名，而不是url

### 公众平台测试账号
开发 - 开发者工具 - 公众平台测试账号：沙盒号回调地址支持域名和ip，正式公众号回调地址只支持域名

## 浏览器中微信扫码登录@[微信开放平台](https://open.weixin.qq.com)
* [Wechat Login Development Guide for Website Applications](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&id=open1419316505)

![时序图](https://res.wx.qq.com/open/zh_CN/htmledition/res/img/pic/web-wxlogin/12168b9.png)

### 前置准备工作
* 在[微信开放平台](https://open.weixin.qq.com)上注册开发者账号
* 在 首页 / 网站应用开发 下，创建应用 //需要上传网站信息登记表扫描件
* 网站应用通过审核，获得AppID和AppSecret
* 申请 微信登录功能，通过审核

