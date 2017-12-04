var users = exports.users = [];

users.push({ name: '张三', id: 0 });
users.push({ name: '李四', id: 1 });
users.push({ name: '王二', id: 2 });
users.push({ name: '老刘', id: 3 });

var logs = [];

logs.push({ clientTime: '2017-11-20 22:59:53', serverTime: '2017-11-20 23:01:13', deviceId: 0 });
logs.push({ clientTime: '2017-11-20 22:59:54', serverTime: '2017-11-20 23:01:14', deviceId: 1 });
logs.push({ clientTime: '2017-11-20 22:59:55', serverTime: '2017-11-20 23:01:15', deviceId: 2 });
logs.push({ clientTime: '2017-11-20 22:59:56', serverTime: '2017-11-20 23:01:16', deviceId: 3 });

exports.loadLogs = function(appId) {
    for(var i=0;i<logs.length;i++) {
        logs[i].appId = appId;
    }
    return logs;
}