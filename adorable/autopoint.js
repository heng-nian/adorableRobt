module.exports = {
  autoJson: null,
  print(msg, auto = false) {
    if (this.autoJson == null) return;
    if (typeof msg !== 'string') msg = JSON.stringify(msg)
    if (this.autoJson.group_id) {
      return this.sendGroupMsg(this.autoJson.group_id, msg, auto);
    } else if (this.autoJson.user_id) {
      return this.sendPrivateMsg(this.autoJson.user_id, msg, auto);
    }
  },
  printAt(msg, at = this.autoJson.user_id) {
    if (typeof at == 'object') {
      let str = ''
      for (i in at) str += `[CQ:at,qq=${at[i]}]`;
      at = str;
    } else {
      at = `[CQ:at,qq=${at}]`;
    }
    return this.print(`${at}${msg}`, false);
  }
}