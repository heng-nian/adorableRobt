module.exports = function (user, sects, immortality) {
  if (immortality.sects[sects.group_id]) { immortality.sects[sects.group_id].group_name = sects.group_name; }
  else { immortality.sects[sects.group_id] = sects; }
  if (immortality.user[user.user_id] == undefined) {
    immortality.user[user.user_id] = {
      name: user.sender.nickname,
      qq: user.user_id,
      group: user.group_id,
      state: { name: "凡人", lv: 0 },
      energy: { spirit: 10, hp: 10, hpMix: 10 },
      spiritStone: 0,
      ability: [],
      secretScript: [],
      time: {}
    }
  }
  let info = immortality.user[user.user_id]
  return `
  姓名:${info.name}
  修为:${info.state.name}
  生命:${info.energy.hp}
  灵气:${info.energy.spirit}
  灵石:${info.spiritStone}
  法术:${info.ability.join(",")}
  功法:${info.secretScript.join(",")}
  门派:${immortality.sects[info.group].group_name}`

}