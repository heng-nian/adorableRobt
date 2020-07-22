# adorableRobt

## 使用方法

**下载安装酷Q air/pro 下载CQHTTP插件使用并配置ws**
### **安装node.js环境 打开命令行窗口 cd进程序目录 输入**
```npm install ```
### **然后启动程序**
```node main```
adorable这是我写的一个非常简单易用的机器人框架
## 关于代码
简单的包装了一下代码，以后我自己需要用到机器人相关的只需要把里面的adorable文件夹拿出来当作一个npm模块使用就好了
### 关于方法的使用
```javascript
const adorable = require("./adorable");
const conn = adorable(`ws://127.0.0.1:6700`);
conn.on("error", (err) => {
  console.log(err);
})
conn.on('private', json => {
  // 私聊事件
  conn.print('你好')
};
conn.on('group', json => {
  //群事件
  conn.printAt('你好')//前缀带上艾特 默认at上一个说话的人
});
```
# 事件 Event
## 订阅方法 
```javascript
conn.on('private', json => {
  // 私聊事件
  conn.print('你好')
};
```
*private 私聊事件*
*group 群聊事件*
*discuss 讨论组消息事件*
*heartbeat 心跳包事件*
*groupIncrease  群成员减少事件*
*groupDecrease 群成员增加事件*

# conn.analysis 解析CQ方法
*conn.analysis.CQextract(<message:string>); 解析文本CQ码 返回解析数据*


# 常用方法
*conn.print(<msg>) 在上次触发群聊事件群发送消息*
*conn.printAt(<msg>,[qq:number|qq:array]) 与print相同 但消息头会带上at*

# method 
*sendPrivateMsg(<qq:number>,<msg:string>,[cq:boolean]) 发送私聊*
*sendGroupMsg(<qqGroup:number>,<msg:string>,[cq:boolean]) 发送群聊* 
*setGroupBan(<qqGroup:number>,<qq:number>,[time:number]) 群聊禁言*
*方法其实和CQHTTP的一样，只不过使用了驼峰命名法*

## 具体文档懒得写