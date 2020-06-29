const EventEmitter = require("events");
class EventRobot extends EventEmitter { }//继承eventEmitter方法
const eventRobot = new EventRobot();
module.exports = eventRobot