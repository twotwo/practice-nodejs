let debug = require('debug')('command');

/**
 * 根据用户属性，生成对应查询命令
 * @param {*} form 
 */
exports.genCommand = function(form) {
    let cmd = ''; //合成可执行的cmd
    let options = []; //用户选择参数集
    cmd +="tail -n" + form.readLines;
    cmd +=" "+form.logFile;

    //add appId $3
    if (form.appId != "")
      options.push("$3==\""+form.appId+"\"");
    //add uid $4
    if (form.uid != "")
      options.push("$4~\""+form.uid+"\"");
    //add ipAddress $7
    if (form.ipAddress != "")
      options.push("$7==\""+form.ipAddress+"\"");
    //add channelId $8
    if (form.channelId != "")
      options.push("$8==\""+form.channelId+"\"");
    //add devId $20
    if (form.devId != "")
      options.push("$20==\""+form.devId+"\"");

    //拼接awk命令
    if(options.length>0) {
      cmd +="|awk 'BEGIN{FS=\"\\\\\\\\x02\"} {if("+options.shift();
      if(options.length>0) {
        cmd +=" && ";
        cmd += options.join(' && ');
      }
      cmd +=") print $0}'"; //结束awk命令拼接
    } 
    cmd +="|tail -n50"; //max 50 records
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
            if(line.length != 47) continue;
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
            log.brandName = line[17];
            log.serial = line[18];
            log.devID = line[19];
            log.idfa = line[20];
            log.idfv = line[21];
            log.screen = line[22];
            log.lang = line[23];
            log.gps = line[24];
            log.net = line[25];
            log.machine = line[26];
            log.accountID = line[27];
            log.accountName = line[28];
            log.accountType = line[29];
            log.serverID = line[30];
            log.roleLevel = line[31];
            log.roleID = line[32];
            log.roleName = line[33];
            log.jailBreak = line[34];
            log.isTest = line[35];
            log.ds1 = line[36];
            log.ds2 = line[37];
            log.ds3 = line[38];
            log.ds4 = line[39];
            log.reserv1 = line[40];
            log.reserv2 = line[41];
            log.reserv3 = line[42];
            log.reserv4 = line[43];
            log.reserv5 = line[44];
            log.eventID = line[45];
            log.eventValue = line[46];
        } catch(error) {
            debug('formatLogs: line = %d, error = %S', i, error);
        }
        logs.push(log);
    }
    return logs.reverse();
}