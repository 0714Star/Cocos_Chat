import { _decorator, Component, Label, math, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
import { EventDispatcher } from './EventDispatcher';
import { clientEnum, sendData } from './SocketClient';
import { AudioManager } from './AudioManager';
import { EventName } from '../script/Itf';
import { DialogItem } from '../script/DialogItem';
const { ccclass, property } = _decorator;

/**
 * @作用 用于content自动调整内容拜访顺序
 * @挂载对象 挂载在ScollView的View的content上
 */
@ccclass('autoADD')
export class autoAdd extends Component {

    @property(Number)
    marginLeft: number = 0;//左边距
    @property(Number)
    marginHeight: number = 0;//上下边距
    contentItems: Node[] = null;
    protected onLoad(): void {
        EventDispatcher.instance.target.on(EventName.updateContent, this.updateContent, this)
        EventDispatcher.instance.target.on(EventName.UserDataUpData, this.updateUserNickName, this)
        this.contentItems = this.node.children
    }

    addHeight = 0;

    updateContent(sendData: sendData) {
        console.log("updateContent:" + sendData, sendData.senderType, sendData.sendUserName, sendData.senderNickName, sendData.message)
        let senderType = sendData.senderType;

        let index = this.contentItems.length - 1
        let curHeight = this.contentItems[index].getComponent(UITransform).contentSize.y

        let item = this.contentItems[index]
        let newX = 0;
        let newY = this.addHeight + (this.marginHeight) //上下边距

        if (senderType === clientEnum.otherSend) {
            newX = - this.node.getComponent(UITransform).contentSize.x / 2 + this.marginLeft
            item.setPosition(newX, newY);
        } else if (senderType === clientEnum.selfSend) {
            newX = this.node.getComponent(UITransform).contentSize.x / 2 - this.marginLeft
        }
        item.getComponent(DialogItem).setAttribute(sendData)

        item.setPosition(newX, newY);
        if (sendData.senderType === clientEnum.otherSend) { //收到消息给到提示音
            AudioManager.Instance.playEffectAudio("appleMessage")
            console.log("消息提示音")
        }
        this.addHeight += curHeight
    }


    // 加载资源
    loadHeadRes(name: string): SpriteFrame {
        return resources.get(`image/head/${name}/spriteFrame`, SpriteFrame) //+ name
    }

    /**
     * 聊天记录的 用户信息 
     * 用户昵称更新
     */
    updateUserNickName({ updateUserName, newNickName }) {
        console.log("updateUserNickName", updateUserName, newNickName)
        this.contentItems.forEach(element => {
            console.log(updateUserName, "newNickName : ", newNickName)
            element.getComponent(DialogItem).updateNickName(updateUserName, newNickName);
        })
    }
}


