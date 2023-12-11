const mysql = require('mysql')
const JsonResultUtil = require('../../utils/JsonResultUtil');
const ResultData = require('../../common/ResultData');
const NotifyCenter = require('notificationcenter-jxufe-xhy');

/**
 * 连接数据库
 */
class db {
    constructor() {
        this._connection = mysql.createConnection({
            host: '127.0.0.1',
            user: "root",
            password: '0714@Xhy',
            database: 'nodejs'
        });
        //this.connect();
        this.multiplyConnection = false

    };

    //连接 1 次
    connect() {
        if (this.multiplyConnection === false) {
            this._connection.connect((err) => {
                if (err) {
                    console.error('数据库连接失败:', err);
                } else {
                    console.log('数据库连接成功');
                }
            });
            this.multiplyConnection = true;
        }

    };
    //断开连接的函数
    end() {
        this._connection.end();
    };


    //登录
    login(username, password, res) {
        console.log("数据库开始验证登录！");
        res.setHeader("Access-Control-Allow-Origin", "*");
        //判断账号密码是否在数据库中有存在

        let selectSql = "SELECT * FROM user WHERE username = ? AND password = ?";
        //console.log("SELECT * FROM user WHERE username = " + username + " AND password = " + password);
        let selectParms = [username, password];
        this._connection.query(selectSql, selectParms, function(err, result) {
            //console.log("shujuku")
            if (err) {
                console.log("db:select - " + err);
                return;
            }
            if (result.length > 0) {
                console.log("登陆成功")
                    //用户存在并且密码正确
                res.end(JsonResultUtil.ResultStringify(new ResultData("200", "登陆成功！", {
                    type: "login",
                    username: username,
                    password: password,
                    nickname: result[0]["nickname"],
                    avatar: result[0]["avatar"] || "head0" //照片路径 
                }, true)));
                console.log("login返回给前端的username,nickename:", username, " | ", result[0]["nickname"])
            } else {
                res.end(JsonResultUtil.ResultStringify(new ResultData("401", "密码错误！", {
                    type: "login",
                    username: username,
                    password: password,
                    nickname: null,
                }, true)));
                console.log("密码错误！")
            }
        })
    };

    //注册
    register(username, password, nickname, res) {
        console.log("数据库开始插入用户！");
        res.setHeader("Access-Control-Allow-Origin", "*");

        //检测用户是否已经存在数据库中了
        let selectSql = "SELECT * FROM user WHERE username = ?";
        let sqlParam = [username]
        this._connection.query(selectSql, sqlParam, function(err, result) {
            if (err) {
                console.log("db:select - " + err);
                return;
            }
            if (result.length > 0) {
                console.log("db:" + username + "用户已经存在！");
                res.end(JsonResultUtil.ResultStringify(new ResultData("401", `${username}已经存在`, {}, true)));
                return;
            }

            let addSql = `INSERT INTO user (username, password, nickname) VALUES (?,?,?)`;
            let addPars = [username, password, nickname];
            this._connection.query(addSql, addPars, function(err, result) {
                if (err) {
                    console.log("db:insert - " + err);
                }
                if (result.affectedRows > 0) {
                    //插入成功
                    res.end(JsonResultUtil.ResultStringify(new ResultData("200", "注册成功", {
                        type: "register",
                    }, true)));
                } else {
                    console.log("插入失败")
                        //插入成功
                    res.end(JsonResultUtil.ResultStringify(new ResultData("500", "注册失败", {
                        type: "register",
                    }, true)));
                }
                console.log("插入个数： ", result.affectedRows)

            });
        });
    };


    /**
     * @desprated 弃用
     * 更新用户信息
     * @param {string} username 
     * @param {string} nickname 
     * @param {*} res 
     */
    updateUser(username, nickname, res) {
        console.log("更新！", username, nickname)
        let sqlquery = "UPDATE user set nickname = ? WHERE username = ?"
        let sqlParams = [nickname, username]
        this._connection.query(sqlquery, sqlParams, function(error, result) {
            if (error) {
                console.log("更新用户出错:", error)
                res.end(JsonResultUtil.ResultStringify(new ResultData("500", "更新出错", {
                    type: "updateUser"
                }, false)))
                return
            }
            if (result.affectedRows > 0) {
                res.end(JsonResultUtil.ResultStringify(new ResultData("200", "更新成功 ", {
                    type: "updateUser",
                    username: username,
                    nickname: nickname,
                }, true)))
            }
        })
    }

    /**
     * 更新数据
     * WebSocket 响应
     * @param {string} username 
     * @param {string} nickname 
     * @param {*} conn 
     */
    socketUpdateUser(data, username, nickname, conn, talkServer) {
        console.log("更新！", username, nickname)
        let sqlquery = `UPDATE user SET nickname = ? WHERE username = ?`
        let sqlParams = [nickname, username]
        this._connection.query(sqlquery, sqlParams, function(error, result) {
            if (error) {
                console.log("更新用户出错:", error)
                conn.sendText(JsonResultUtil.ResultStringify(new ResultData("500", "更新用户出错", {
                    type: "updateUser"
                }, true)))
                return
            }
            if (result.affectedRows > 0) {
                // 聊天信息广播
                NotifyCenter.emit("updateUserData", {
                    type: "updateUser",
                    updateUserName: username,
                    newNickName: nickname
                }, conn)
            }
        })
    }
}

module.exports = db