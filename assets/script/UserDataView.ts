import { _decorator, Component, EditBox, Label, Node } from 'cc';
import { ReqServer } from './Client/ReqServer';
import { DataMgr } from './Mgr/DataMgr';
import { EventDispatcher } from '../TalkSystem/EventDispatcher';
import { EventName } from './Itf';
import { SocketClient } from '../TalkSystem/SocketClient';
const { ccclass, property } = _decorator;

@ccclass('UserDataView')
export class UserDataView extends Component {

    @property(Label)
    OldNickName: Label = null
    @property(EditBox)
    NewNickNameEd: EditBox = null
    protected start(): void {
        EventDispatcher.instance.target.on(EventName.UserDataUpData, (userdata) => {
            // 刷新显示
            if (this.NewNickNameEd.string !== this.OldNickName.string && this.NewNickNameEd.string != "" && this.NewNickNameEd.string != null) {
                console.log("刷新自己的显示显示UserDataView")
                this.OldNickName.string = this.NewNickNameEd.string
                alert("更新成功!")
            }
        })
    }
    protected onEnable(): void {
        this.OldNickName.string = DataMgr.Instance._userData.nickname
    }

    /**
     * 更新新昵称
     */
    submit() {
        let newNickName = this.NewNickNameEd.string
        console.log("submit!")
        // 更新数据库
        //ReqServer.Instance.UpdateUser(DataMgr.Instance._userData.username, newNickName)
        SocketClient.Instance().send__({
            type: "updateUserData",
            updateUserName: DataMgr.Instance._userData.username,
            newNickName: newNickName
        })
        // 关闭界面
        //close()
    }
    /**
     * 取消更新
     */
    cancel() {
        this.close()
    }
    /**
     * 关闭界面
     */
    close() {

        this.node.active = false
    }
}


