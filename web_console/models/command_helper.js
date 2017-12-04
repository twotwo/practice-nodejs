var logFile = "/tmp/2017-12-04.log";

/*
 * 根据用户属性，生成对应查询命令
 */
exports.genCommand = function(user) {
    var cmd = '';
    cmd +="tail -n" + user.readLines||"10000";
    cmd +=" "+logFile;
    cmd +="|awk 'BEGIN{FS=\"\\\\\\\\x02\"} {if($3==\""+user.appId+"\"";
    //add devid
    if (user.devId != "")
        cmd +=" && $20==\""+user.devId+"\"";
    //add ip address
    if (user.ipAddress != "")
        cmd +=" && $7==\""+user.ipAddress+"\"";
    cmd +=") print $0}'";
    //add colType
    cmd +="|awk -v Col=\""+user.colType+"\" -f bin/trimcells.awk";
    return cmd;
}

/*
 * 把日志矩阵拆解成二维数组对象
 */
exports.splitLogs = function(user, data) {
    var logs = [];
    var lines = data.split("\n");
    for(var i=0; i<lines.length; i++) {
        log = new Object();
        line = lines[i].split("\\x02");
        if (user.colType==='c10' && line.length===10) {
            log.eventId = line[0];
            log.receiveTime = line[1];
            log.appId = line[2];
            log.uid = line[3];
            log.channelId = line[4];
            log.devId = line[5];
            log.accountId = line[6];
            log.roleId = line[7];
            log.roleName = line[8];
            log.eventValue = line[9];
            logs.push(log);
        }
    }

    return logs;
}
