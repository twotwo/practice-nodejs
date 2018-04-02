<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2><a href="/">Index</a></h2>
  
    <form id="head" action="/console" method="post">
      <!-- text -->
      <p>应用ID(AppID) <input type="text" name="appId" v-model="head.appId"> </p>
      <p>渠道ID(ChannelID) <input type="text" name="channelId" v-model="head.channelId"> </p>
      <p>手机信息(IMEI/IDFA) <input type="text" name="devId" v-model="head.devId"> </p>
      <p>设备标识(UID) <input type="text" name="uid" v-model="head.uid"> </p>
      <p>IP地址 <input type="text" name="ipAddress" v-model="head.ipAddress"> </p>
      <p>data: {{ $data }}</p>
      <p v-on:click="submit()">查询</p>
    </form>
    <div class="tableBox" id="table">
      <p>{{show_column ? '全部字段' : '精简字段'}} <input type="checkbox" v-model="show_column"></p>
      <div class="tableBox clear">
        <dl v-for="item in columns" :key="item.id" v-show="item.showAll">
          <dt><p>{{item.name}}</p></dt>
          <dd>
            <p v-for="arr_item in item.arr" :key="arr_item.id" v-html="arr_item">{{arr_item}}</p>
          </dd>
        </dl>
      </div>
  
    </div>
  </div>
</template>

<script>
  import {
    doGet,
    doPost
  } from "../util/axios"
  
  let head = {
    appId: '',
    channelId: '300001',
    devId: '',
    uid: '',
    ipAddress: '',
    columns: 'c17',
  }
  
  //日志对应的字段
  let columns = [{
    "name": "eventID",
    "showAll": true,
    "arr": []
  }, {
    "name": "appID",
    "showAll": true,
    "arr": []
  }, {
    "name": "uid",
    "showAll": true,
    "arr": []
  }, {
    "name": "receiveTime",
    "showAll": true,
    "arr": []
  }, {
    "name": "logVer",
    "showAll": true,
    "arr": []
  }, {
    "name": "sdkVer",
    "showAll": true,
    "arr": []
  }, {
    "name": "logTime",
    "showAll": true,
    "arr": []
  }, {
    "name": "ipAddr",
    "showAll": true,
    "arr": []
  }, {
    "name": "channelID",
    "showAll": true,
    "arr": []
  }, {
    "name": "gameVer",
    "showAll": true,
    "arr": []
  }, {
    "name": "osName",
    "showAll": true,
    "arr": []
  }, {
    "name": "osVer",
    "showAll": true,
    "arr": []
  }, {
    "name": "countryCode",
    "showAll": true,
    "arr": []
  }, {
    "name": "SP",
    "showAll": true,
    "arr": []
  }, {
    "name": "macAddr",
    "showAll": true,
    "arr": []
  }, {
    "name": "imei",
    "showAll": true,
    "arr": []
  }, {
    "name": "imsi",
    "showAll": true,
    "arr": []
  }, {
    "name": "dtn",
    "showAll": true,
    "arr": []
  }, {
    "name": "brandName",
    "showAll": true,
    "arr": []
  }, {
    "name": "serial",
    "showAll": true,
    "arr": []
  }, {
    "name": "devID",
    "showAll": true,
    "arr": []
  }, {
    "name": "idfa",
    "showAll": true,
    "arr": []
  }, {
    "name": "idfv",
    "showAll": true,
    "arr": []
  }, {
    "name": "screen",
    "showAll": true,
    "arr": []
  }, {
    "name": "lang",
    "showAll": true,
    "arr": []
  }, {
    "name": "gps",
    "showAll": true,
    "arr": []
  }, {
    "name": "net",
    "showAll": true,
    "arr": []
  }, {
    "name": "machine",
    "showAll": true,
    "arr": []
  }, {
    "name": "accountID",
    "showAll": true,
    "arr": []
  }, {
    "name": "accountName",
    "showAll": true,
    "arr": []
  }, {
    "name": "accountType",
    "showAll": true,
    "arr": []
  }, {
    "name": "serverID",
    "showAll": true,
    "arr": []
  }, {
    "name": "roleLevel",
    "showAll": true,
    "arr": []
  }, {
    "name": "roleID",
    "showAll": true,
    "arr": []
  }, {
    "name": "roleName",
    "showAll": true,
    "arr": []
  }, {
    "name": "jailBreak",
    "showAll": true,
    "arr": []
  }, {
    "name": "isTest",
    "showAll": true,
    "arr": []
  }, {
    "name": "ds1",
    "showAll": true,
    "arr": []
  }, {
    "name": "ds2",
    "showAll": true,
    "arr": []
  }, {
    "name": "ds3",
    "showAll": true,
    "arr": []
  }, {
    "name": "ds4",
    "showAll": true,
    "arr": []
  }, {
    "name": "reserv1",
    "showAll": true,
    "arr": []
  }, {
    "name": "reserv2",
    "showAll": true,
    "arr": []
  }, {
    "name": "reserv3",
    "showAll": true,
    "arr": []
  }, {
    "name": "reserv4",
    "showAll": true,
    "arr": []
  }, {
    "name": "reserv5",
    "showAll": true,
    "arr": []
  }, {
    "name": "eventValue",
    "showAll": true,
    "arr": []
  }]
  
  export default {
    name: 'Console',
    data() {
      return {
        msg: 'Console',
        columns: columns,
        show_column: true,
        head: head,
        body: {}
      }
    },
    methods: {
      details() {
        console.log('details() ' + this.$data);
      },
      submit() {
        doPost('/console/query', this.$data.head)
          .then(resp => {
            let logs = resp.data.body;
            console.log("logs = "+logs);
            logs.forEach( log => {
              columns.forEach( column => {
                column.arr.unshift(log[column.name]);
              });
            });
          })
          .catch((err) => {
            console.log(err)
          });
      }
    },
    // computed: {
    //   show: function() {
    //     return this.columns;
    //   }
    // }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    padding: 50px;
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  }
  
  a {
    color: #00B7FF;
  }
  
  .scrollBox {
    /* width: 98%;
      overflow-x: scroll;
      margin: 20px auto; */
  }
  
  .tableBox {
    display: table;
  }
  
  .tableBox dl {
    display: table-cell;
    text-align: center;
    border: 1px solid #000;
    border-bottom: none
  }
  
  .tableBox dl p {
    height: 40px;
    padding: 5px;
    border-bottom: 1px solid #000;
  }
  
  .tableBox dl dd p {
    height: 60px;
  }
  
  .tableBox dl dd p span {
    display: block;
    width: 100%;
    font-size: 12px;
    line-height: normal
  }
  
  .tableBox dl dt {
    background: burlywood;
    padding: 0 10px;
    border-bottom: 1px solid #000;
  }
  
  .tableBox dl dt p {
    border: none;
    font-weight: 600;
  }
</style>
