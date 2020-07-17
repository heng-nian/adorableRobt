const vm = require("vm")

const core = require("./adorable");
const config = require("./adorable/config");
const conn = core();
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
  if (json.message.substr(0, 2) == "禁言") {
    if (json.sender.role == 'owner' || json.sender.role == 'admin' || config.open == null || config.open[json.user_id]) {
      let num = json.message.match(/ [0-9]+/) == null ? 1 : json.message.match(/ [0-9]+/)[0]
      num = parseInt(num);
      console.log(conn.analysis);
      let CQs = conn.analysis.CQextract(json.message);
      CQs.forEach(({ CQ, value }) => {
        if (CQ == 'at') conn.setGroupBan(json.group_id, value.qq, num);
      });
    }
  }
};
conn.on('private', jsEval);
conn.on('group', json => {
  jsEval(json); groupBan(json);
});




//[CQ:at,qq=]