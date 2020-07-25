const vm = require("vm")
const fs = require("fs")

const core = require("./adorable");
// const config = require("./adorable/config");
const config = JSON.parse(fs.readFileSync("./adorable/config.json").toString());
const conn = core.connect();
conn.on("error", (err) => {
  // console.log(err);
})
let js_ = true
let jsEval = (json) => {
  // console.log(json);
  if (json.message.substr(0, 1) == "说") {
    conn.print(json.message.substr(1))
  }
}
let groupBan = (json) => {
  if (json.message.substr(0, 2) == "禁言") {
    if (json.sender.role == 'owner' || json.sender.role == 'admin' || config.open == null || config.open[json.user_id]) {
      let num = json.message.match(/ [0-9]+/) == null ? 1 : json.message.match(/ [0-9]+/)[0]
      num = parseInt(num);
      let CQs = conn.analysis.CQextract(json.message);
      CQs.forEach(({ CQ, value }) => {
        if (CQ == 'at') conn.setGroupBan(json.group_id, value.qq, num);
      });
    }
  }
};
conn.on('private', jsEval);
conn.on('group', json => {
  jsEval(json);
  groupBan(json);
  if (json.message == "复读机") { conn.print("复读机") }
});
conn.on('groupDecrease', json => {
  console.log('groupDecrease', json);
});
conn.on('groupIncrease', json => {
  console.log('groupIncrease', json);
});

// core.update('heng-nian', 'adorableRobt');
//[CQ:at,qq=]