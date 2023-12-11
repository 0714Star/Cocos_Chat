import { ResultData } from '../Common/ResultData';
import { serverUrl } from '../Common/commonConst'
import { ResponseServie } from './ResponseServie';
/**
 * 处理请求
 */
export class ReqServer {
    private static _instance: ReqServer = new ReqServer();

    public static get Instance(): ReqServer {
        return this._instance;
    }

    private http = new XMLHttpRequest(); // 通用请求
    private url = serverUrl.loginUrl // 登陆的窗口
    private createServer() {
        if (this.http.readyState === XMLHttpRequest.OPENED) {
            // 已经使用过了需要创建一个新的
            this.http = new XMLHttpRequest();
        }
    }

    /**
     * 标识传输状态
     * 默认未开始传输 即 可以进行请求
     */
    private isLoginIng: boolean = false
    /**
     * 客户端进行登陆
     * @param username 用户名
     * @param password 密码
     * @returns bool类型 是否登陆成功
     */
    public clientLogin(username: string, password: string) {

        if (this.isLoginIng === false) {
            this.http.open("POST", this.url, false) //是否为异步请求
            this.isLoginIng = true // 开始发送数据

            let self = this
            // 设置 接收到状态改变的回调函数
            this.http.onreadystatechange = function () {
                //// 接收 响应数据完成
                if (this.readyState === XMLHttpRequest.DONE) { // 传输
                    self.isLoginIng = false

                    //处理登陆
                    let respData: ResultData<any> = JSON.parse(this.responseText)
                    ResponseServie.login(respData)
                    console.log("DONE", self.isLoginIng, respData)
                    return true;
                }
                //  send方法已经被调用了 可以进行下一次send了
                else if
                    (this.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                    self.isLoginIng = false
                    console.log("HEADERS_RECEIVED:", self.isLoginIng)

                    // self.createServer(); // 创建服务
                }
            }

            const loginRequestData = {
                "type": "login",
                "username": username,
                "password": password
            }

            try {
                this.http.send(JSON.stringify(loginRequestData))

            } catch (error) {
                console.log("服务器忘记打开了，消息发不过去！", error)
                self.isLoginIng === false
            }
        }

        return true;
    }

    isRegister: boolean = false;
    /**
     * 账号注册
     * @param username 用户名
     * @param password 密码
     * @param nickname 用户昵称
     * @returns bool类型 是否注册成功 
     */
    public clientRegister(username: string, password: string, nickname: string) {
        if (this.isRegister === false) {
            this.http.open("POST", this.url, false) // 发送同步类型的请求，即不需要等待
            this.isRegister = true // 开始发送数据

            let self = this
            // 设置 接收到状态改变的回调函数
            this.http.onreadystatechange = function () {
                //// 接收 响应数据完成
                if (this.readyState === XMLHttpRequest.DONE) { // 传输
                    self.isRegister = false
                    //处理注册
                    let respData: ResultData<any> = JSON.parse(this.responseText);
                    ResponseServie.register(respData)
                }
                //  send方法已经被调用了 可以进行下一次send了
                else if
                    (this.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                    self.isRegister = false
                }
            }
            const registerRequestData = {
                "type": "register",
                "username": username,
                "password": password,
                "nickname": nickname
            }
            try {
                this.http.send(JSON.stringify(registerRequestData))
            } catch (error) {
                console.log("服务器忘记打开了，消息发不过去！", error)
                self.isRegister === false
            }
        }

        return true
    }

    isUpload: boolean = false
    /**
     * 更新用户
     * 通过 **账号** 索引
     * @param username 
     * @param newnickname 
     */
    public UpdateUser(username: string, newnickname: string) {
        if (this.isUpload === false) {
            this.http.open("POST", this.url, false) // 发送同步类型的请求，即不需要等待
            this.isUpload = true // 开始发送数据

            let self = this
            // 设置 接收到状态改变的回调函数
            this.http.onreadystatechange = function () {
                //// 接收 响应数据完成
                if (this.readyState === XMLHttpRequest.DONE) { // 传输
                    self.isUpload = false
                    //处理更新数据
                    let respData: ResultData<any> = JSON.parse(this.responseText);
                    ResponseServie.updateUser(respData)
                }
                //  send方法已经被调用了 可以进行下一次send了
                else if
                    (this.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                    self.isUpload = false
                }
            }
            const updateRequestData = {
                "type": "updateUser",
                "username": username,
                "nickname": newnickname
            }
            try {
                this.http.send(JSON.stringify(updateRequestData))
            } catch (error) {
                console.log("服务器忘记打开了，消息发不过去！", error)
                self.isUpload === false
            }
        }

        return true
    }
}


