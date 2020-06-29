const analysis = require("../core/analysis");

let Immortality = {};
let state = ["凡人", "炼气", "筑基", "金丹", "元婴", "化神", "渡劫（合道）", "地仙",
  "天仙", "金仙", "太乙金仙", "大罗金仙", "准圣", "混元大罗金仙（圣人）", "天道", "大道"]
module.exports = function (json, conn) {
  if (json.message == "修仙") {
    if (Immortality[json.user_id] == undefined) {
      Immortality[json.user_id] = {
        name: json.sender.nickname,
        state: { name: "凡人", lv: 0 },
        energy: { number: 0, time: null },
        ability: [],
        book: [],
        group_id: json.group_id,
        age: json.sender.age,
        Sect: {},
      }
    }
    conn.getGroupInfo(json.group_id).then(({ data }) => {
      let info = Immortality[json.user_id]
      info.Sect = data;
      conn.print(`[CQ:at,qq=${json.user_id}]
      名字:${info.name}
      年龄:${info.age}
      修为:${info.state.name}
      灵气:${info.energy.number}
      法术:${info.ability.join(",")}
      功法:${info.book.join(",")}
      门派:${info.Sect.group_name}
    `)
    })
  }
  /*---------------------------------------------*/
  if (json.message == "呼吸" && Immortality[json.user_id]) {
    if ((new Date() - Immortality[json.user_id].energy.time) / 1000 > 60 * 5 || Immortality[json.user_id].energy.time == null) {
      Immortality[json.user_id].energy.time = new Date();
      Immortality[json.user_id].energy.number += Math.round(Math.random() * 10) * (Immortality[json.user_id].state.lv + 1);
      conn.print(`[CQ:at,qq=${json.user_id}]
    当前灵气值:${Immortality[json.user_id].energy.number}`)
    } else {
      conn.print(`[CQ:at,qq=${json.user_id}]请5分钟后在吸收灵气吧`)
    }
    return;
  }
  if (json.message == "破境" && Immortality[json.user_id]) {
    if (Immortality[json.user_id].energy.number > (Immortality[json.user_id].state.lv + 1 * 10)) {
      Immortality[json.user_id].energy.number -= (Immortality[json.user_id].state.lv + 1 * 10)
      Immortality[json.user_id].state.lv += 1;
      Immortality[json.user_id].state.name = state[Immortality[json.user_id].state.lv];
      conn.print(`[CQ:at,qq=${json.user_id}]破境成功`)
    } else {
      if (Immortality[json.user_id].energy.number == 0) {
        conn.setGroupBan(json.group_id, json.user_id, 60 * 5);
        conn.print(`[CQ:at,qq=${json.user_id}]破境失败`)
      } else {
        let num = Math.round(Math.random() * (Immortality[json.user_id].state.lv + 1 * 2));
        if (num == 1) {
          Immortality[json.user_id].state.lv += 1;
          Immortality[json.user_id].state.name = state[Immortality[json.user_id].state.lv];
          Immortality[json.user_id].energy.number = 0;
          conn.print(`[CQ:at,qq=${json.user_id}]破境成功`)
        }
      }
    }
    conn.print(`[CQ:at,qq=${json.user_id}]
    当前灵气值:${Immortality[json.user_id].energy.number}`)
    return;
  }
}