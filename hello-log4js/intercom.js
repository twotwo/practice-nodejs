/**
 * pm2 install pm2-intercom
 * pm2 start intercom.js -n test-intercom
 */

const debug = require("debug")("pm2-tester")
debug.enable = true

process.on("message", function(packet) {
  if (packet.topic == "log4js:message") {
    console.log("Received packet", packet.data)
  }
})

//sender
var pm2 = require("pm2")
var neighborIds = []

pm2.connect(() => {
  // Find the IDs of who you want to send to
  pm2.list((err, processes) => {
    for (var i in processes) {
      // console.log("Id:", processes[i].pm_id, "Name:", processes[i].name)
      if (processes[i].name === "test-intercom") {
        neighborIds.push(processes[i].pm_id)
      }
    }

    // Call this once for each neighborIds
    pm2.sendDataToProcessId(
      neighborIds,
      {
        data: {
          some: "data"
        },
        topic: "log4js:message"
      },
      function(err, res) {
        console.log(err, res)
      }
    )
    console.log("Ids to send messages to:", neighborIds)
  })
})

setTimeout(() => {
  console.log("All done, shutdown cb returned.")
}, 5000)
