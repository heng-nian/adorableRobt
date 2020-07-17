const uuidV4 = require("uuid").v4;
module.exports = {
  keyUUID: new Map(),//异步容器
  sendRobot(event, params, uuid = uuidV4()) {
    this.sendText(JSON.stringify({
      action: event,
      params: params,
      echo: uuid
    }));
    return new Promise((res, rej) => {
      this.keyUUID.set(uuid, (json) => {
        res(json);
        this.keyUUID.delete(uuid);
      });
    })
  },
  sendPrivateMsg(id, msg, auto = false) {//私聊
    return this.sendRobot("send_private_msg", {
      user_id: id,
      message: msg,
      auto_escape: auto,
    });
  },
  sendGroupMsg(id, msg, auto = false) {
    return this.sendRobot("send_group_msg", {
      group_id: id,
      message: msg,
      auto_escape: auto,
    });
  },
  sendDiscussMsg(id, msg, auto = false) {
    return this.sendRobot("send_discuss_msg", {
      discuss_id: id,
      message: msg,
      auto_escape: auto,
    });
  },
  deleteMsg(id) {
    return this.sendRobot("delete_msg", {
      message_id: id,
    });
  },
  sendLike(id, num) {
    return this.sendRobot("send_like", {
      user_id: id,
      times: num
    });
  },
  setGroupKick(id, qq, auto = false) {
    return this.sendRobot("set_group_kick", {
      group_id: id,
      user_id: qq,
      reject_add_request: auto,
    });
  },
  setGroupBan(id, qq, auto = 0) {
    return this.sendRobot("set_group_ban", {
      group_id: id,
      user_id: qq,
      duration: auto,
    });
  },
  setGroupAnonymousBan(id, anonymous, flag, auto = 0) {
    return this.sendRobot("set_group_anonymous_ban", {
      group_id: id,
      anonymous: anonymous,
      anonymous_flag: flag,
      duration: auto,
    });
  },
  setGroupWholeBan(id, enable = true) {
    return this.sendRobot("set_group_whole_ban", {
      group_id: id,
      enable: enable
    });
  },
  setGroupAdmin(id, qq, enable = true) {
    return this.sendRobot("set_group_admin", {
      group_id: id,
      user_id: qq,
      enable: enable
    });
  },
  setGroupAnonymous(id, enable = true) {
    return this.sendRobot("set_group_anonymous", {
      group_id: id,
      enable: enable
    });
  },
  setGroupCard(id, qq, card) {
    return this.sendRobot("set_group_card", {
      group_id: id,
      user_id: qq,
      card: card
    });
  },
  setGroupLeave(id, auto = false) {
    return this.sendRobot("set_group_leave", {
      group_id: id,
      is_dismiss: auto
    });
  },
  setGroupSpecialTitle(id, qq, title, duration = -1) {
    return this.sendRobot("set_group_special_title", {
      group_id: id,
      user_id: qq,
      special_title: title,
      duration: duration
    });
  },
  setDiscussLeave(id) {
    return this.sendRobot("set_discuss_leave", {
      discuss_id: id
    });
  },
  setFriendAddRequest(flag, approve, remark) {
    return this.sendRobot("set_friend_add_request", {
      flag: flag,
      approve: approve,
      remark: remark
    });
  },
  setGroupAddRequest(flag, sub, approve, reason = '') {
    return this.sendRobot("set_group_add_request", {
      flag: flag,
      sub_type: sub,
      approve: approve,
      reason: reason
    });
  },
  getLoginInfo() {
    return this.sendRobot("get_login_info", {});
  },
  getStrangerInfo(id, no_cache = false) {
    return this.sendRobot("get_stranger_info", {
      user_id: id,
      no_cache: no_cache,
    });
  },
  getFriendList() {
    return this.sendRobot("get_friend_list", {});
  },
  getGroupList() {
    return this.sendRobot("get_group_list", {});
  },
  getGroupInfo(id, no_cache = false) {
    return this.sendRobot("get_group_info", {
      group_id: id,
      no_cache: no_cache
    });
  },
  getGroupMemberInfo(id, qq, no_cache = false) {
    return this.sendRobot("get_group_member_info", {
      group_id: id,
      user_id: qq,
      no_cache: no_cache
    });
  },
  getGroupMemberList(id) {
    return this.sendRobot("get_group_member_list", {
      group_id: id,
    });
  }
}