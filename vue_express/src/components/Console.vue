<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2><a href="/">Index</a></h2>

    <form action="/console" method="post">
      <!-- text -->
      <p>应用ID(AppID) <input type="text" name="appId" v-model="appId"> </p>
      <p>渠道ID(ChannelID) <input type="text" name="channelId" v-model="channelId"> </p>
      <p>手机信息(IMEI/IDFA) <input type="text" name="devId" v-model="devId"> </p>
      <p>设备标识(UID) <input type="text" name="uid" v-model="uid"> </p>
      <p>IP地址 <input type="text" name="ipAddress" v-model="ipAddress"> </p>
      <p>data: {{ $data }}</p>
      <input type="submit" name="submit" value="Submit">
    </form>


  </div>
</template>

<script>
export default {
  name: 'Console',
  data () {
    return {
      msg: 'Console',
      appId      : '',
      channelId  : '300001',
      devId  : '',
      uid   : '',
      ipAddress: '',
      columns: 'c17',
    }
  }
}
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

.rTable {
  display: table;
  width: 100%;
}
.rTableRow {
  display: table-row;
}
.rTableHeading {
  display: table-header-group;
  background-color: #ddd;
}
.rTableCell, .rTableHead {
  display: table-cell;
  padding: 3px 10px;
  border: 1px solid #999999;
}
.rTableHeading {
  display: table-header-group;
  background-color: #ddd;
  font-weight: bold;
}
.rTableFoot {
  display: table-footer-group;
  font-weight: bold;
  background-color: #ddd;
}
.rTableBody {
  display: table-row-group;
}
</style>
