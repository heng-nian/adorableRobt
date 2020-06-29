const ws = require("nodejs-websocket");

const method = require("./method");
const autopoint = require("./autopoint");
const analysis = require("./analysis");
const eventRobot = require("./eventRobot");
const config = require("./config");
module.exports = function (connect = `ws://${config.host}:${config.port}`, auto = null, callback = () => { }) {
  const conn = ws.connect(connect, auto, () => {
    conn.getLoginInfo().then(({ data }) => config.user = data);//new user info {name,qq}
    callback(config.user);
  });
  Object.assign(conn, method, autopoint, { analysis }, { eventRobot });//把方法合并到连接
  conn.on("text", function (jsonString) {
    let json = JSON.parse(jsonString);
    if (json.echo) conn.keyUUID.get(json.echo) ? conn.keyUUID.get(json.echo)(json) : conn.keyUUID.delete(json.echo);
    if (json.message_type) { conn.autoJson = json; }
    if (json.message_type == "private") {
      eventRobot.emit("private", json);
    }
    if (json.message_type == "group") {
      eventRobot.emit("group", json);
    }
    if (json.message_type == "discuss") {
      eventRobot.emit("discuss", json);
    }
    if (json.meta_event_type == 'heartbeat') {
      eventRobot.emit("heartbeat", json);
    }
    // console.log(json);
  });
  return conn;
}
