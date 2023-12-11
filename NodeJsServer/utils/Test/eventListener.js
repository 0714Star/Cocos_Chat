const NotifyCenter = require("../../ServerJs/NotifyCenter");

let { loginServerRun } = require('../../ServerJs/login/login')
loginServerRun();
loginServerRun();
NotifyCenter.emit("myEvent", "参数1哈", 222)
console.log("执行了emit")