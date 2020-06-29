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
  printAt(msg, auto = false) {
    return this.print(`[CQ:at,qq=${this.autoJson.user_id}]${msg}`, auto);
  }
}