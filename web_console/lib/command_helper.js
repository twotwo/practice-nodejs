/**
 * 根据用户属性，生成对应查询命令
 * @param {*} user 
 */
exports.genCommand = function(user) {
    var cmd = '';
    cmd +="tail -n" + user.readLines||"10000";
    cmd +=" "+user.logFile;
    cmd +="|awk 'BEGIN{FS=\"\\\\\\\\x02\"} {if($8==\""+user.channelId+"\"";
    //add appId
    if (user.appId != "")
        cmd +=" && $3==\""+user.appId+"\"";
    //add devId
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

// https://nodejs.org/docs/latest-v8.x/api/child_process.html#child_process_child_process_exec_command_options_callback
const { exec } = require('child_process');

/**
 * 执行本地命令，increased maxBuffer to 500KB
 * @param {*} command 
 * @param {*} callback function(error, stdout, stderr)
 */
exports.execute = function(command, callback) {
  exec(command, 
    {maxBuffer: 1024 * 500}, 
    function(error, stdout, stderr) { 
      callback(error, stdout, stderr); 
    });
};

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
            log.eventValue = line[9]||'&quot;';
            logs.push(log);
        }
    }

    return logs;
}
