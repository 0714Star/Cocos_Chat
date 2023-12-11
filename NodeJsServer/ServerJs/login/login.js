let http = require('http');
const ResultData = require('../../common/ResultData');
const JsonResultUtil = require('../../utils/JsonResultUtil');
const { serverPort } = require('../../common/commonConst');
const _db = require('../mysqlServer/db');
const NotifyCenter = require('../NotifyCenter');
// 创建一个连接
let db = new _db();

/**
 * 前端使用JSON格式上传信息！
 */
let serverHttp = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //响应设置跨域允许


    /**
     * 接收到的信息
     */
    let receivedData = ""; //接收到的信息
    //数据接收中
    req.on('data', function(chunk) {
        receivedData += chunk;
    });

    //数据接收完毕
    req.on("end", function() {
        receivedData = JsonResultUtil.RequestPrase(receivedData);

        console.log("接收到信息：", receivedData)
        res.setHeader("Access-Control-Allow-Origin", "*"); //响应设置跨域允许

        try {
            if (receivedData["type"] === "login") {
                // 前端请求 data 如下
                // type: "login",
                // username: username,
                // password: password
                let username = receivedData.username;
                let password = receivedData.password;
                // 连接数据库
                //db.connect();
                db.login(username, password, res);
                // 查询结果
            } else if (receivedData["type"] === "register") {
                // 前端请求 data 如下
                // type: "register",
                // username: username,
                // password: password,
                // nickname: nickname
                let username = receivedData.username;
                let password = receivedData.password;
                let nickname = receivedData.nickname;
                // 连接数据库
                // 控制权交给 db 
                db.register(username, password, nickname, res);
                // 结果
            }
            //启用
            // else if (receivedData["type"] === "updateUser") {
            //     // 前端请求 data 如下
            //     // "type": "updateUser",
            //     // "username": username,
            //     // "nickname": newnickname
            //     let username = receivedData.username;
            //     let nickname = receivedData.nickname;
            //     db.updateUser(username, nickname, res)
            // }
        } catch (error) {
            console.log("数据库出问题了！", error)
                //数据库出问题了
            res.end(JsonResultUtil.ResultStringify(new ResultData("500", "服务器连接数据库出问题了QAQ", {
                type: receivedData["type"]
            }, false)))
        }

    });
})

let loginServerRun = function() {
    try {
        serverHttp.listen(serverPort.loginPort, function() {
            console.log(`登陆注册服务已在${serverPort.loginPort}端口开启`);
            db.connect();
        })
    } catch (error) {
        console.log("loginServerRunError:", error)
    }
}


console.log("开始监听！！！login")
NotifyCenter.on("myEvent", function(a, b) {
    console.log("监听到事件了！！", a, b)
})
module.exports = {
    loginServerRun // 直接运行 
}