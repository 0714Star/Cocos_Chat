import { _decorator, Component, Label, math, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
import { clientEnum, sendData } from '../TalkSystem/SocketClient';
const { ccclass, property } = _decorator;

@ccclass('DialogItem')
export class DialogItem extends Component {
    public username: string = "";
    public nickname: string = ""
    public avatar: string = "";
    public message: string = "";
    public messageType: clientEnum = clientEnum.selfSend; //默认自己的消息

    /**
     * 
     * @param sendData 通过传递的信息更新初始化自身
     */
    init(sendData: sendData) {
        this.setAttribute(sendData)
    }

    public setAttribute(sendData: sendData) {
        console.log("sendData IN DailogItem")
        // 信息
        let dialogBody = this.node.getChildByName("dialogBody")
        dialogBody.getComponent(Label).string = sendData.message as string
        let Width = this.node.getChildByName("dialogBody").getComponent(UITransform).contentSize.x // 文字的宽
        let Height = this.node.getComponent(UITransform).contentSize.y    // 结点的高
        this.username = sendData.sendUserName

        // 添加 margin 共 30 px
        this.scheduleOnce(() => {
            console.log("!")
            this.node.getChildByName("dialogBg").getComponent(UITransform).setContentSize(Width + 30, Height) // 对话框整体背景大小设置
        }, 0)

        // 加载、设置头像
        let avatarName = sendData.avatar

        this.node.getChildByName("headIcon").getComponent(Sprite).spriteFrame = resources.get(`image/head/${avatarName}/spriteFrame`, SpriteFrame)
        // 昵称
        this.node.getChildByName("nickname").getComponent(Label).string = sendData.senderNickName as string
        // 加载
        if (sendData.senderType === clientEnum.selfSend) {
            dialogBody.getComponent(Label).color = math.Color.GREEN // 自己消息 绿色字体
        }
        else if (sendData.senderType === clientEnum.otherSend) {
            dialogBody.getComponent(Label).color = math.Color.WHITE// 别人消息 红色字体
        }
    }

    updateNickName(userName, newNickName) {
        console.log("updateNickName : Before")
        if (this.username === userName) {
            this.nickname = newNickName
            console.log("dialogItem UPDATE!!", userName, newNickName)
            // 更新标签
            this.node.getChildByName("nickname").getComponent(Label).string = newNickName
        }
    }

}


