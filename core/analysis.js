module.exports = {
  arrThis(arr, auto) {
    let arrs = [];
    for (let i in arr) {
      if (typeof arr[i] == 'object') {
        arrs.push(this.arrThis(arr[i], auto));
      } else arrs.push(auto(arr[i]))
    }
    return arrs;
  },
  CQArr(strs) {
    if (typeof strs == 'object') { return this.arrThis(strs, this.CQArr); }
    return strs.match(/\[CQ:[A-z]+,([A-z]+=[A-z0-9\/.\=\?\\\-\_\:]+,?)+\]/g);
  },
  CQinfo(auto) {
    if (typeof auto == 'object') { return this.arrThis(auto, this.CQinfo); }
    let arr = auto.slice(1, -1).split(',')
    let value = {}
    for (let i = 1; i < arr.length; i++) {
      let v = arr[i].indexOf("=")
      value[arr[i].substr(0, v)] = arr[i].slice(v + 1);
    }
    return { CQ: arr[0].substr(3), value: value }
  },
  CQextract(auto) {
    return this.CQinfo(this.CQArr(auto))
  }
}