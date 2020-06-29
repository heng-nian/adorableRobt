const vm = require("vm")

const ws = require("nodejs-websocket");

const method = require("./core/method");
const autopoint = require("./core/autopoint");
const analysis = require("./core/analysis");
const eventRobot = require("./core/eventRobot");
const config = require("./config");
const conn = ws.connect(`ws://${config.host}:${config.port}`, null, () => {
  conn.getLoginInfo().then(({ data }) => config.user = data);//new user info {name,qq}
});
Object.assign(conn, method, autopoint, analysis);//把方法合并到连接
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
conn.on("error", (err) => {
  console.log(err);
})

let jsEval = (json) => {
  // console.log(json);
  if (json.message.substr(0, 3) == "js:") {
    if (config.open != null) { if (!config.open[json.user_id]) return; }
    try {
      let msg = json.message.substr(3)
      msg = msg.replace(/&#91;/g, '[');
      msg = msg.replace(/&#93;/g, ']');
      msg = msg.replace(/&amp;/g, '&');
      msg = msg.replace(/&#44;/g, ',');
      let logs = '';
      let log = vm.runInNewContext(msg, {
        print: (str, auto = false) => { conn.print(str, auto) },
        log: (msg) => {
          if (typeof msg !== 'string') { msg = JSON.stringify(msg); }
          if (logs.length == 0) { logs += msg; return msg; }
          logs += '\n' + msg;
          return msg;
        }
      }, { timeout: 4 });
      conn.print(logs);
      // eval(msg);
    } catch (error) {
      conn.print([error.name, '\n', error.message].join(""));
    }
  }
}
let groupBan = (json) => {
  if (json.sender.role == 'owner' || json.sender.role == 'admin' || config.open == null || config.open[json.user_id]) {
    if (json.message.substr(0, 2) == "禁言") {
      let num = json.message.match(/ [0-9]+/) == null ? 1 : json.message.match(/ [0-9]+/)[0]
      num = parseInt(num);
      let CQs = analysis.CQextract(json.message);
      CQs.forEach(({ CQ, value }) => {
        if (CQ == 'at') conn.setGroupBan(json.group_id, value.qq, num);
      });
    }
  }
};
const immortality = require("./修仙/Immortality")
eventRobot.on('private', jsEval);
eventRobot.on('group', json => {
  jsEval(json); groupBan(json);
  immortality(json, conn);
});




//[CQ:at,qq=]