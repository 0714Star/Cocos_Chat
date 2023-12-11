import { EventDispatcher } from "../../TalkSystem/EventDispatcher";
import { ResultData } from "../Common/ResultData";
import { EventName } from "../Itf";
import { DataMgr } from "../Mgr/DataMgr";
import { SceneMgr } from "../Mgr/SceneMgr";
/**
 * 对所有 响应后 返回的结果进行处理
 */
export class ResponseServie {

    /**
     * 处理登陆
     * 返回
     * type, username , nickName ,avatar
     */
    static login(resData: ResultData<any>) {
        console.log("resData:", resData.data)
        let resCode = resData.code
        if (resCode === "200") {
            DataMgr.Instance._userData = resData.data
            // 界面跳转 至 聊天界面 
            SceneMgr.loadScene("chat", function () { })
        } else if (resCode === "401") {
            // 用户已存在
            alert(" 用户已存在" + resData.message || "message为空")
        }

    }

    /**
     * 处理注册
     */
    static register(resData: ResultData<any>) {
        // 弹出注册成功
        let resCode = resData.code
        if (resCode === "200") {
            alert("注册成功！")
        } else if (resCode === "401") {
            // 用户已存在
            alert("用户已存在:" + resData.message || "message 为空")
        } else if (resCode === "500") {
            // 注册失败
            alert("注册失败:" + resData.message || "message为空")
        }
    }

    /**
     * 更新本地信息
     * type: "updateUser",username: username,nickname: nickname,
     */
    static updateUser(resData: ResultData<any>) {
        // 弹出更新成功
        let resCode = resData.code
        if (resCode === "200") {
            // 更新渲染
            EventDispatcher.instance.target.emit(EventName.UserDataUpData, resData.data)

        } else if (resCode === "500") {
            console.log("更新失败", resData)
            // 更新失败
            alert("更新失败：" + resData.message || "message为空！")
        }
    }
}