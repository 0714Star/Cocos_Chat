import { ResponseServie } from "../script/Client/ResponseServie";
import { ResultData } from "../script/Common/ResultData";
import { EventName } from "../script/Itf";
import { EventDispatcher } from "./EventDispatcher";

export enum clientEnum {
    selfSend,
    otherSend,
}

export interface sendData {
    senderType: clientEnum,
    sendUserName: string,
    senderNickName: String,
    message: String,
    avatar: string
}
const url = "ws://127.0.0.1:226"
export class SocketClient {

    private static _instance: SocketClient = null;
    private ws: WebSocket = null;
    public static Instance(): SocketClient {
        if (this._instance == null) {
            this._instance = new SocketClient()
            this._instance._createWebSocket();
        }
        return this._instance
    }

    private _createWebSocket() {
        this.ws = new WebSocket(url)
        this.ws.onopen = () => {
            console.log("连接成功")
        }
        //客户端接受到消息
        this.ws.onmessage = (e) => {
            console.log(e, "@message")
            let trueResultAny = e.data // 这里包了两层！ // Result<any>结构
            trueResultAny = this.handlerReceive(trueResultAny)
            if (trueResultAny.code != "200") {
                alert(trueResultAny.message)
            } else {
                // 处理正确的响应
                this.messageHandler(trueResultAny);
            }


        }
        this.ws.onclose = () => {
            console.log("连接关闭")
        }
        this.ws.onerror = () => {
            console.log("连接出错")
        }
    }

    public send__(sendData: any) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(
                this.handlerSubmit(sendData)
            )
        }
    }
    /**
     * 处理事件
     * @param data response.data
     */
    messageHandler(resultData: ResultData<any>) {
        let data = resultData.data
        // TODO
        if (data["type"] === "sendMessage") {
            console.log("客户端接收到消息:" + data.senderType + "," + data.senderName + "," + data.message)
            EventDispatcher.instance.target.emit(EventName.renderMessage, data)
        }
        else if (data["type"] === "updateUser") {
            // 更新这里的DialogItem 信息
            ResponseServie.updateUser(resultData)
        }

    }
    /**
     * 关闭连接
     */
    public async closeConnect() {
        await this.ws.close();
    }
    handlerSubmit(anyData: any) {
        return JSON.stringify(anyData)
    }
    handlerReceive(anyData: any) {
        return JSON.parse(anyData)
    }


}


