const { serverPort } = require('../common/commonConst');
let { loginServerRun } = require('./login/login')
let { talkServerRun } = require('./Talk/talk_ws')

/**
 * 运行登陆服务
 * http
 */
loginServerRun()

/**
 * 聊天服务
 * WebSocket
 */

talkServerRun()