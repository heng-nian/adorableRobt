const analysis = require("../core/analysis");

const action = require("./action")
const state = require("./state.js");
const user = require("./user");
let immortality = {
  sects: {},//门派
  user: {}//用户
};
module.exports = function (json, conn) {
  if (json.message == "修仙") {
    conn.getGroupInfo(json.group_id).then(({ data }) => {
      // {
      //   group_id: 711372560,
      //   group_name: 'Mc-connect：新手之地(外)',
      //   max_member_count: 500,最大人数
      //   member_count: 314  当前人数
      // }
      conn.printAt(user(json, data, immortality));
    });
  };
  if (json.message == "修仙之旅") action.修仙之旅(conn);
  

  if (json.message == "呼吸") {
    if (immortality.user[json.user_id] == undefined) return conn.printAt("您还没有使用 <修仙> 开始你的长生之旅呢~");
    action.呼吸(immortality.user[json.user_id], conn);
  }
  if (json.message.substr(0, 2) == "拳击") {
    if (immortality.user[json.user_id] == undefined) return conn.printAt("您还没有使用 <修仙> 开始你的长生之旅呢~");
    let it = analysis.CQextractAUTO(json.message, 'at');
    if (it.length == 0) return conn.printAt("您在原地瞎挥拳了一段时间");
    action.拳击(json, immortality.user[json.user_id], immortality.user[it[0].value.qq], conn);
  }
}