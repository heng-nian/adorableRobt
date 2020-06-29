# adorableRobt

## 使用方法

**下载安装酷Q air/pro 下载CQHTTP插件使用并配置ws**
### **安装node.js环境 打开命令行窗口 cd进程序目录 输入**
```npm install ```
### **然后启动程序**
```node main```
因为是一个小项目，没有必要将项目方法包装成一个框架，
不过因为代码简单 所以想写机器人的可以参考这些代码。
## 关于代码
简单的包装了一下代码，以后我自己需要用到机器人相关的只需要把里面的core文件夹拿出来当作一个npm模块使用就好了
### 关于方法的使用
```javascript
const core = require("./core");
const conn = core(`ws://127.0.0.1:6700`);
conn.on("error", (err) => {
  console.log(err);
})
conn.eventRobot.on('private', json => {
  // 私聊事件
  conn.print('你好')
};
conn.eventRobot.on('group', json => {
  //群事件
  conn.printAt('你好')
});
```
## conn.analysis.CQextract(<message>); 解析文本CQ码 返回解析数据
## 具体文档懒得写