let debug = require('debug')('command');

/**
 * 根据用户属性，生成对应查询命令
 * @param {*} user 
 */
exports.genCommand = function(user) {
    var cmd = '';
    cmd +="tail -n" + user.readLines;
    cmd +=" "+user.logFile;
    cmd +="|awk 'BEGIN{FS=\"\\\\\\\\x02\"} {if($8==\""+user.channelId+"\"";
    //add appId
    if (user.appId != "")
        cmd +=" && $3==\""+user.appId+"\"";
    //add devId
    if (user.devId != "")
        cmd +=" && $20==\""+user.devId+"\"";
    //add uid
    if (user.uid)
        cmd +=" && $4~\""+user.uid+"\"";
    //add ip address
    if (user.ipAddress != "")
        cmd +=" && $7==\""+user.ipAddress+"\"";
    cmd +=") print $0}'";
    //max 50 records 
    cmd +="|tail -n50";
    return cmd;
}

// https://nodejs.org/docs/latest-v8.x/api/child_process.html#child_process_child_process_exec_command_options_callback
const { exec } = require('child_process');

/**
 * 执行本地命令，increased maxBuffer to 500KB
 * @param {*} command 
 * @param {*} callback function(error, stdout, stderr, cost)
 */
exports.execute = function(command, callback) {
    let start_point = Date.now(); // in milliseconds
    exec(command, 
      {maxBuffer: 1024 * 500}, 
      function(error, stdout, stderr) { 
        callback(error, stdout, stderr, Date.now()-start_point); 
      });
  };


/**
 * 把日志矩阵拆解成日志数组对象
 * 
 * @param {*} data logs reading from Statis Sdk.
 */
exports.formatLogs = function(data) {
    var logs = [];
    var lines = data.split("\n");
    for(var i=0; i<lines.length; i++) {
        log = {};
        try {
            line = lines[i].split("\\x02");
            debug('split to %d', line.length);
            if(line.length < 17) continue;
            log.receiveTime = line[0];
            log.logVer = line[1];
            log.appID = line[2];
            log.uid = line[3];
            //去掉后13位的时间戳
            log.uid = log.uid.substring(0,log.uid.length-13);
            log.sdkVer = line[4];
            log.logTime = line[5];
            log.ipAddr = line[6];
            log.channelID = line[7];
            log.gameVer = line[8];
            log.osName = line[9];
            log.osVer = line[10];
            log.countryCode = line[11];
            log.SP = line[12];
            log.macAddr = line[13];
            log.imei = line[14];
            log.imsi = line[15];
            log.dtn = line[16];
        } catch(error) {
            debug('formatLogs: line = %d, error = %S', i, error);
        }
        logs.push(log);
    }
    return logs;
}