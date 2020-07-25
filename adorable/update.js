const fs = require("fs");
const axios = require("axios");

// axios.get("https://api.github.com/repos/heng-nian/adorableRobt/contents/main.js").then(data => {
//   console.log(data.data);
//   let file = new Buffer.from(data.data.content, 'base64').toString('utf8');

//   console.log(file);
// })
module.exports = function update(name, project) {
  let api = `https://api.github.com/repos/${name}/${project}`
  axios.get(api).then(data => {
    console.log(data.data.contents_url);
    let config = JSON.parse(fs.readFileSync("./adorable/config.json").toString())
    if (config.updated_at) {
      console.log("更新");
    } else {
      console.log(">>");
    }
    config.updated_at = data.data.updated_at;
    fs.writeFileSync("./adorable/config.json", config);
  }).catch(err => {
    console.log("error:失败");
    // console.log(err);
  })

  // axios.get("https://api.github.com/repos/heng-nian/adorableRobt/contents").then(data => {
  //   console.log(data.data);
  // })
  /*
  name
  path
  url
  type

  */
}