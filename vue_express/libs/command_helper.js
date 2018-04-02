let debug = require('debug')('helper:command');

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
    //add eventId $46
    if (form.eventId != "")
      options.push("$46==\""+form.eventId+"\"");

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
      callback(error, stdout.trim(), stderr, Date.now()-start_point); 
    });
};

/**
 * 日志数据格式化
 * @param {*} line 
 */
exports.formatLog = function(line) {

  let log = {};
  try {
    values = line.split("\\x02");
    debug('formatLog() split to %d pieces', values.length);
    if(values.length != 47) {
      return 'params.length != 47';
    }
    log.receiveTime = values[0];
    log.logVer = values[1];
    log.appID = values[2];
    log.uid = values[3];
    //去掉后13位的时间戳
    log.uid = log.uid.substring(0,log.uid.length-13);
    log.sdkVer = values[4];
    log.logTime = values[5];
    log.ipAddr = values[6];
    log.channelID = values[7];
    log.gameVer = values[8];
    log.osName = values[9];
    log.osVer = values[10];
    log.countryCode = values[11];
    log.SP = values[12];
    log.macAddr = values[13];
    log.imei = values[14];
    log.imsi = values[15];
    log.dtn = values[16];
    log.brandName = values[17];
    log.serial = values[18];
    log.devID = values[19];
    log.idfa = values[20];
    log.idfv = values[21];
    log.screen = values[22];
    log.lang = values[23];
    log.gps = values[24];
    log.net = values[25];
    log.machine = values[26];
    log.accountID = values[27];
    log.accountName = values[28];
    log.accountType = values[29];
    log.serverID = values[30];
    log.roleLevel = values[31];
    log.roleID = values[32];
    log.roleName = values[33];
    log.jailBreak = values[34];
    log.isTest = values[35];
    log.ds1 = values[36];
    log.ds2 = values[37];
    log.ds3 = values[38];
    log.ds4 = values[39];
    log.reserv1 = values[40];
    log.reserv2 = values[41];
    log.reserv3 = values[42];
    log.reserv4 = values[43];
    log.reserv5 = values[44];
    log.eventID = values[45];
    log.eventValue = values[46];
  } catch(error) {
    debug('formatLogs: values = %d, error = %S', i, error);
  }
  debug('formatLog() log = %S', log);
  return log;
}

/**
 * 把日志矩阵拆解成日志数组对象
 * 
 * @param {*} data logs reading from Statis Sdk.
 */
exports.formatLogs = function(data) {
  let logs = [];
  let lines = data.split("\n");
  for(var i=0; i<lines.length; i++) {
    let log = exports.formatLog(lines[i]);
    if(typeof(log) === 'object') {
			logs.push(log);
		}
  }
  return logs;
}