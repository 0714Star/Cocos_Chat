const { serverPort } = require('../../common/commonConst')
let ws = require('nodejs-websocket');
const JsonResultUtil = require('../../utils/JsonResultUtil');
const ResultData = require('../../common/ResultData');

const _db = require('../mysqlServer/db');
const NotifyCenter = require('notificationcenter-jxufe-xhy');
const db = new _db();

/**
 * 建立长连接 用于对话聊天窗口
 */
let talkServer = ws.createServer(function(conn) {
    conn.on('text', function(data) {
        data = JSON.parse(data);
        if (data["type"] && data["type"] == "updateUserData") {
            //前端请求 data
            // type: "updateUserData",
            // updateUserName: DataMgr.Instance._userData.username,
            // newNickName: newNickName

            // 请求数据库 修改数据
            // 响应权限交给 数据库
            db.socketUpdateUser(data, data.updateUserName, data.newNickName, conn, talkServer)
            return;
        }
        console.log("收到消息!", data.type)
        if (data["type"] && data["type"] == "sendMessage") {
            // 聊天信息广播
            let clients = talkServer.connections;
            for (client of clients) {
                if (client === conn) {
                    continue;
                }
                // 消息发回
                console.log("消息发回")
                client.sendText(JsonResultUtil.ResultStringify(new ResultData("200", "消息来了", data, true))) //JSON.stringify(data)
                console.log("发给客户端的信息是data:", typeof(data), data)
            }
        }

    });
    conn.on('close', function(code, resaon) {
        console.log(code, "--reason--", resaon)
        console.log("连接关闭")
    })
})

/**
 * 通知其他用户有关updateNews对象的更新
 */
NotifyCenter.on("updateUserData", function(updateNews, conn) {
    let clients = this.connections;
    console.log("更新用户的新信息:", updateNews)
    for (client of clients) {
        if (client === conn) {
            conn.sendText(JsonResultUtil.ResultStringify(new ResultData("200", "更新成功", updateNews, true))); //JSON.stringify(data)
        } else {
            client.sendText(JsonResultUtil.ResultStringify(new ResultData("200", "更新用户信息", updateNews, true))); //JSON.stringify(data)
        }
    }
}, talkServer)
let talkServerRun = function() {
    try {
        talkServer.listen(serverPort.chatPort, function() {
            console.log(`talkServer正在监听${serverPort.chatPort}端口`)
        })
    } catch (e) {
        console.log("talkServerRunError!:", e)
    }
}

module.exports = {
    talkServerRun
}