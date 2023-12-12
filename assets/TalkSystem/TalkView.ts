import { _decorator, Component, EditBox, instantiate, Label, Node, Prefab, random, resources } from 'cc';
import { clientEnum, sendData, SocketClient } from './SocketClient';
import { EventDispatcher } from './EventDispatcher';
import { SceneMgr } from '../script/Mgr/SceneMgr';
import { DataMgr } from '../script/Mgr/DataMgr';
import { EventName } from '../script/Itf';
const { ccclass, property } = _decorator;


/**
 * 挂载在Talk节点下
 */
@ccclass('TalkView')
export class TalkView extends Component {
    @property(Node)
    talkContent: Node = null
    @property(Prefab)
    public selfItem: Prefab = null;
    @property(Prefab)
    public otherItem: Prefab = null;
    @property(EditBox)
    inputEditBox: EditBox = null;
    @property(Label)
    public nickName: Label = null;
    @property({ displayName: "UserDataChange", tooltip: "用户信息编辑弹窗|预制体", type: Prefab })
    public userChangePrefab: Prefab = null;
    @property(Node)
    public PopView: Node = null;
    public userName: string = null
    protected onLoad(): void {
        SocketClient.Instance(); //初始化
        this.nickName.string = DataMgr.Instance._userData.nickname
        this.userName = DataMgr.Instance._userData.username
        EventDispatcher.instance.target.on(EventName.renderMessage, this.renderMessage, this)
        resources.loadDir("image/head")//资源加载2
    }

    /**
     * @作用 渲染消息 默认渲染的消息类型为其他人发的
     * @param sendData  
     */
    renderMessage(sendData: sendData) {
        let item: Node = null; //聊天框
        if (sendData.senderType == clientEnum.otherSend) {
            item = instantiate(this.otherItem)
        } else if (sendData.senderType === clientEnum.selfSend) {
            item = instantiate(this.selfItem)
        }
        this.talkContent.addChild(item)
        console.log("renderMessage-senderType:" + sendData.senderType as string)
        EventDispatcher.instance.target.emit(EventName.updateContent, sendData) //更新聊天框显示
    }

    sendMessage() {
        SocketClient.Instance().send__({
            type: "sendMessage",
            senderType: clientEnum.otherSend, // 这里设置类型为别人发的
            senderNickName: DataMgr.Instance._userData.nickname,
            sendUserName: this.userName,
            message: this.inputEditBox.string,
            avatar: DataMgr.Instance._userData.avatar
        })

        //渲染自己的消息
        this.renderMessage({
            senderType: clientEnum.selfSend,
            senderNickName: DataMgr.Instance._userData.nickname,
            sendUserName: this.userName,
            message: this.inputEditBox.string,
            avatar: DataMgr.Instance._userData.avatar,
        })
        this.inputEditBox.string = "";
    }

    exitChat() {
        //关闭连接
        SocketClient.Instance().closeConnect()
        //返回登陆场景
        SceneMgr.loadScene("login", function () {
            console.log("关闭连接回到登陆界面")
        })
    }

    //打开编辑弹窗
    editUserData(_) {
        let userChangeNode = this.PopView.getChildByName(this.userChangePrefab.name)
        if (!userChangeNode) {
            userChangeNode = instantiate(this.userChangePrefab)
        } else { userChangeNode.active = true }
    }


    /**
     * 清空输入框信息
     */
    clearInputEdit() {
        this.inputEditBox.string = ""
    }
}


