function random(mix, min = 0) {
  return Math.round(Math.random() * (mix - min) + min)
}
module.exports = {
  修仙之旅(conn) {
    let help = [""]
    for (let i in this) help.push(i);
    return conn.printAt(help.join("\n"));
  },
  呼吸(user, conn) {
    if (user.energy.呼吸time == undefined || (new Date() - user.energy.呼吸time) / 1000 > 60 * 5) {
      user.energy.呼吸time = new Date();
      user.energy.spirit += random(5);
      return conn.printAt(["当前灵气值", user.energy.spirit].join(""));
    } else {
      return conn.printAt("周围的灵气已经吸光啦~ 5分钟后在呼吸吧");
    }
  },
  拳击(json, user, it, conn) {
    if (it == undefined) { return conn.printAt("它还没有开始修仙 你这样子是欺负人呢~"); }
    let hurt = Math.round((user.energy.spirit * (user.state.lv + 1)) / it.state.lv);
    if (hurt >= it.energy.hp) {
      conn.setGroupBan(json.group_id, it.qq, 60);
      it.energy.hp = it.energy.hpMix;
      return conn.printAt("你狠狠的揍了它一顿");
    } else {
      it.energy.hp -= hurt
      return conn.printAt("你轻轻的揍了它一顿");
    }
  }
}